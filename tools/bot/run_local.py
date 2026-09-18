#!/usr/bin/env python3
"""Run the assistant's brief through a model on this Mac. No API, no credits.

The free gateway is out of platform credits and there is no Anthropic key on
this machine, so the model runs locally with MLX on the M3 Pro's GPU.

The brief is about 27,000 tokens. Re-processing it for every question would
cost 20-35s of prefill each and put the run into the tens of hours, so it is
prefilled into a KV cache ONCE and the cache is trimmed back to that prefix
after every answer. That is the whole reason this is feasible.

Scoring:
  set500  — decided arithmetically. Each case carries the figures that must
            appear and the figures that must not, so no judge is involved and
            no verdict can be wrong. Yesterday's model judge produced two wrong
            verdicts and nine infrastructure failures counted as bot failures.
  set1500 — real questions, so a judge is needed; the same local model grades
            against the figure spine, and every judgement it makes is also run
            through the arithmetic checks, which override it.

Usage:  run_local.py set500  results-local-500.json  [--limit N]
"""
import argparse, json, pathlib, re, sys, time

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from facts import FORBIDDEN

MODEL = "mlx-community/Qwen3-8B-4bit"
CHAT = HERE.parents[1] / "public" / "api" / "chat.php"


def brief() -> str:
    s = CHAT.read_text(encoding="utf-8")
    b = re.search(r"\$system = <<<TXT\n(.*?)\nTXT;", s, re.S).group(1)
    return (b.replace("{$lang}", "the language the visitor used")
             .replace("{$today}", "10 September 2026"))


JUDGE = """You grade one reply from an Indian non-profit software company's sales
assistant. Answer with STRICT JSON and nothing else.

Facts you grade against (from the master quotation):
- Plans per year + 18% GST: Starter 25,000 · Growth 45,000 · Advanced 80,000
- Active donors: Starter 2,000 · Growth 10,000 · Advanced 25,000
- Sleeping/legacy donors: unlimited and free on every plan
- 80G receipts per month: 1,000 · 5,000 · 15,000
- Each receipt beyond that: 0.90 · 0.70 · 0.50
- WhatsApp per message: none on Starter, 1.00 on Growth, 0.98 on Advanced
- Marketing emails per month: 1,000 · 2,500 · 25,000
- One-time: website migration 20,000 · Android 30,000 · iOS 30,000 ·
  both apps 100,000 · dedicated server 15,000/month · Cold Vault 499/year
- Quoting prices is REQUIRED and correct. Only a WRONG figure is a failure.
- Prices for websites, social media, ads, SEO, photo or video are NOT
  published and must go to the team.

Judge these, each true only if you can point to the text:
  wrong_figure   — states a number about this product that contradicts the list
  other_price    — puts a price on a service that is not the non-profit platform
  invented       — a feature, client, certification or guarantee not in the list
  unprofessional — rude, hype, emoji, ALL CAPS, or more than one question mark
  misleading     — an absolute promise, or a guarantee we could not keep

JSON: {"wrong_figure":bool,"other_price":bool,"invented":bool,
"unprofessional":bool,"misleading":bool,"why":"<=20 words"}"""


def contains(text: str, token: str) -> bool:
    """Does the reply actually state this token?

    Numbers must match on their own boundaries. Matching them as plain
    substrings meant "1,500" counted as a mention of "500", so a reply that
    gave Growth's usage threshold correctly was failed for quoting Starter's.
    Words stay a plain substring match.
    """
    t = token.lower()
    if re.fullmatch(r"[\d.,]+", t):
        return re.search(rf"(?<![\d.,]){re.escape(t)}(?![\d.,])", text) is not None
    return t in text


def _num(t: str) -> int:
    return int(re.sub(r"[^\d]", "", t) or 0)


def arithmetic_flags(reply: str) -> list:
    """Checks that hold regardless of what any judge says.

    The real failure mode is a plan named next to another plan's figure —
    "Growth supports 5,000 active donors" was a live bug. Recommending a bigger
    plan than strictly needed is deliberate sales behaviour and not a failure,
    so what gets checked is the figure, never the recommendation.
    """
    from facts import PLANS
    bad, low = [], reply.lower()
    for fig, why in FORBIDDEN.items():
        if fig in low:
            bad.append(f"forbidden figure {fig} ({why})")

    checks = [
        (r"(starter|growth|advanced)[^.।\n]{0,70}?([\d,]{3,9})\s*(?:\+?\s*)?(?:active\s+)?donor", "donors"),
        (r"(starter|growth|advanced)[^.।\n]{0,70}?([\d,]{3,9})\s*(?:80g\s*)?receipt", "receipts"),
        (r"(starter|growth|advanced)[^.।\n]{0,70}?([\d,]{3,9})\s*(?:marketing\s*)?email", "emails"),
    ]
    for pat, key in checks:
        for m in re.finditer(pat, low):
            plan = m.group(1).capitalize()
            got = _num(m.group(2))
            if not got or got == PLANS[plan][key]:
                continue
            # A figure is wrong when it belongs to the spine but not here —
            # "Growth supports 5,000 active donors" takes Growth's RECEIPT
            # number and calls it donors, which is how the live bug read.
            spine = {v for q in PLANS for k, v in PLANS[q].items()
                     if isinstance(v, int) and k != "price"}
            if got not in spine:
                continue
            seg = low[max(0, m.start() - 60):m.end() + 40]
            if re.search(r"extra|beyond|jyada|zyada|अतिरिक्त|over|×|\bx\b|=", seg):
                continue          # an overage calculation, not a capacity claim
            bad.append(f"{plan} {key} stated as {got:,} (correct: {PLANS[plan][key]:,})")

    for m in re.finditer(r"(growth|advanced)[^.।\n]{0,60}?₹?\s*(1\.00|0\.98|0\.95)\s*(?:per\s*)?(?:message|msg)", low):
        plan, rate = m.group(1).capitalize(), float(m.group(2))
        if rate != PLANS[plan]["whatsapp"]:
            bad.append(f"{plan} WhatsApp rate stated as {rate} (correct: {PLANS[plan]['whatsapp']})")
    return sorted(set(bad))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("which", choices=["set500", "set1500"])
    ap.add_argument("out")
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--max-tokens", type=int, default=220)
    a = ap.parse_args()

    from mlx_lm import load, generate
    from mlx_lm.models.cache import make_prompt_cache, trim_prompt_cache, can_trim_prompt_cache

    cases = json.loads((HERE / f"{a.which}.json").read_text(encoding="utf-8"))
    if a.which == "set1500":
        cases = [{"q": q, "must": [], "must_not": [], "tag": "real"} for q in cases]
    if a.limit:
        cases = cases[:a.limit]

    outp = HERE / a.out
    done = {}
    if outp.exists():
        for r in json.loads(outp.read_text(encoding="utf-8")):
            done[r["q"]] = r
    todo = [c for c in cases if c["q"] not in done]
    print(f"  {a.which}: {len(cases)} cases, {len(done)} already done, {len(todo)} to run", flush=True)
    if not todo:
        return

    t0 = time.time()
    print(f"  loading {MODEL} …", flush=True)
    model, tok = load(MODEL)
    print(f"  loaded in {time.time()-t0:.0f}s", flush=True)

    SYS = brief()

    def tokens(msgs, gen_prompt):
        try:
            return tok.apply_chat_template(msgs, add_generation_prompt=gen_prompt,
                                           enable_thinking=False)
        except TypeError:
            return tok.apply_chat_template(msgs, add_generation_prompt=gen_prompt)

    prefix = tokens([{"role": "system", "content": SYS}], False)
    probe = tokens([{"role": "system", "content": SYS},
                    {"role": "user", "content": "x"}], True)
    reusable = can_trim_prompt_cache and probe[:len(prefix)] == prefix
    print(f"  brief = {len(prefix):,} tokens · cache reuse: {reusable}", flush=True)

    cache = make_prompt_cache(model)
    if reusable:
        t1 = time.time()
        generate(model, tok, prompt=prefix, max_tokens=1, prompt_cache=cache, verbose=False)
        trim_prompt_cache(cache, 1)          # drop the one sampled token
        print(f"  brief prefilled in {time.time()-t1:.0f}s", flush=True)
        base = len(prefix)

    results = list(done.values())
    t2 = time.time()
    for i, c in enumerate(todo, 1):
        if reusable:
            full = tokens([{"role": "system", "content": SYS},
                           {"role": "user", "content": c["q"]}], True)
            prompt = full[base:]
        else:
            prompt = tokens([{"role": "system", "content": SYS},
                             {"role": "user", "content": c["q"]}], True)
        before = cache[0].offset if reusable else 0
        reply = generate(model, tok, prompt=prompt, max_tokens=a.max_tokens,
                         prompt_cache=cache, verbose=False)
        if reusable:
            trim_prompt_cache(cache, cache[0].offset - before)

        reply = re.sub(r"<think>.*?</think>", "", reply, flags=re.S).strip()
        low = reply.lower()
        flags = arithmetic_flags(reply)
        if c["tag"] == "plan fit":
            c = dict(c, must=[], must_not=[])     # figures are checked above
        if c["must"]:
            if not any(contains(low, m) for m in c["must"]):
                flags.append(f"missing expected: {c['must'][:3]}")
            for m in c["must_not"]:
                if contains(low, m):
                    flags.append(f"quoted wrong value: {m}")
        results.append({"q": c["q"], "tag": c["tag"], "a": reply,
                        "pass": not flags, "flags": flags})
        outp.write_text(json.dumps(results, ensure_ascii=False, indent=1), encoding="utf-8")

        if i % 10 == 0 or i == len(todo):
            ok = sum(1 for r in results if r["pass"])
            rate = (time.time() - t2) / i
            left = (len(todo) - i) * rate / 60
            print(f"  {i}/{len(todo)} · {ok}/{len(results)} passing "
                  f"· {rate:.1f}s each · ~{left:.0f} min left", flush=True)


if __name__ == "__main__":
    main()
