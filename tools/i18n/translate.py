#!/usr/bin/env python3
"""Translate harvested site strings via the Experiential gateway (free models).

Resumable by design: every batch is written to the cache the moment it lands, so
a daily cap, a dropped connection or a Ctrl-C costs one batch, never the run.
"""
import argparse, json, os, pathlib, re, subprocess, sys, time, urllib.error, urllib.request

BASE = os.environ.get("EXPLABS_BASE", "https://api.experientiallabs.ai/v1")
ROOT = pathlib.Path(__file__).resolve().parent

SYSTEM = """You translate website copy from English to natural, professional Hindi (Devanagari).

This is a real business website for Govindani Infotech, an IT services company in Pune, India.
The audience is Indian business owners and NGO founders.

RULES — follow every one:
1. Translate into Hindi that a Pune business owner reads comfortably. Not literal,
   not academic Sanskritised Hindi. Everyday professional register.
2. KEEP IN ENGLISH (do not transliterate, do not translate): brand and product names
   (Govindani, Govindani Infotech, Give Setu, WhatsApp, WordPress, Shopify, Google,
   Meta, Canva, Zoho, React, SEO, CRM, API, GST, NGO, 80G, IT), and any proper noun.
3. Numbers, prices, dates, percentages, phone numbers and email addresses stay EXACTLY
   as written, including the ₹ symbol, commas and the digits. Never convert or reformat.
4. Keep the same tone and length register. A 2-word button stays a short Hindi button
   label, not a sentence.
5. If a string is only a brand name, a number, or already Hindi, return it UNCHANGED.
6. Never add commentary, quotes, notes or explanation.

You receive a JSON object of numbered strings. Return ONLY a JSON object with the
SAME keys and the Hindi values. No markdown fence, no prose."""


def key():
    return subprocess.run(["security", "find-generic-password", "-s", "experientiallabs",
                           "-a", "api", "-w"], capture_output=True, text=True).stdout.strip()


def call(model, batch, k, tries=3):
    body = json.dumps({
        "model": model, "temperature": 0.2,
        "messages": [{"role": "system", "content": SYSTEM},
                     {"role": "user", "content": json.dumps(batch, ensure_ascii=False, indent=0)}],
    }).encode()
    for a in range(tries):
        try:
            r = urllib.request.Request(BASE + "/chat/completions", data=body, headers={
                "Content-Type": "application/json", "Authorization": "Bearer " + k})
            with urllib.request.urlopen(r, timeout=300) as resp:
                txt = json.loads(resp.read())["choices"][0]["message"]["content"]
            txt = re.sub(r"^\s*```(?:json)?|```\s*$", "", txt.strip()).strip()
            m = re.search(r"\{.*\}", txt, re.S)
            got = json.loads(m.group(0) if m else txt)
            return {str(kk): str(vv) for kk, vv in got.items() if str(kk) in batch}
        except Exception as e:
            if a == tries - 1:
                return {"__error__": f"{type(e).__name__}: {str(e)[:120]}"}
            time.sleep(2 + a * 3)
    return {}


def batches(strings, cache, per_batch, max_words):
    cur, words = {}, 0
    for i, s in enumerate(strings):
        if s in cache:
            continue
        w = len(s.split())
        if cur and (len(cur) >= per_batch or words + w > max_words):
            yield cur
            cur, words = {}, 0
        cur[str(i)] = s
        words += w
    if cur:
        yield cur


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", default="gpt-5.6-luna,deepseek-v4-flash,gpt-6-astra,qwen3.8-27b",
                    help="comma-separated fallback chain")
    ap.add_argument("--out", default="hi.json")
    ap.add_argument("--limit", type=int, default=0, help="stop after N batches (testing)")
    ap.add_argument("--per-batch", type=int, default=30)
    ap.add_argument("--max-words", type=int, default=700)
    a = ap.parse_args()

    data = json.loads((ROOT / "strings.json").read_text())
    # Page order keeps each batch contextually coherent — "Home" next to the nav it
    # belongs to translates better than "Home" alone in an alphabetical list.
    ordered, seen = [], set()
    for page, ss in data["byPage"].items():
        for s in ss:
            if s not in seen:
                seen.add(s); ordered.append(s)

    out = ROOT / a.out
    cache = json.loads(out.read_text()) if out.exists() else {}
    todo = [s for s in ordered if s not in cache]
    print(f"  model {a.model} · {len(cache):,} cached · {len(todo):,} to do", flush=True)

    k = key()
    if not k:
        print("  no API key in Keychain"); sys.exit(1)

    chain = [m.strip() for m in a.model.split(",") if m.strip()]
    live = list(chain)
    n = errs = 0
    t0 = time.time()
    for b in batches(ordered, cache, a.per_batch, a.max_words):
        got = {"__error__": "no model"}
        for mi, m in enumerate(list(live)):
            got = call(m, b, k, tries=2)
            if "__error__" not in got:
                if mi:  # a fallback worked — promote it so we stop retrying the dead one
                    live.insert(0, live.pop(mi))
                break
            if "429" in got["__error__"] and len(live) > 1:
                print(f"  {m} capped/rate-limited -> falling back", flush=True)
                live.remove(m)
        if "__error__" in got:
            errs += 1
            print(f"  batch {n+1} failed — {got['__error__']}", flush=True)
            if not live:
                print("  every model exhausted; cache intact, rerun tomorrow to resume")
                break
            if errs >= 12:
                print("  too many failures, stopping (cache is intact; rerun to resume)")
                break
        else:
            for kk, v in got.items():
                if kk in b and v.strip():
                    cache[b[kk]] = v.strip()
            out.write_text(json.dumps(cache, ensure_ascii=False, indent=0))
        n += 1
        if n % 10 == 0 or a.limit:
            done = len(cache); rate = done / max(1, time.time() - t0)
            print(f"  {n} batches · {done:,}/{len(ordered):,} strings"
                  f" · {rate:.1f}/s · {errs} errors", flush=True)
        if a.limit and n >= a.limit:
            break
    print(f"  done: {len(cache):,}/{len(ordered):,} translated, {errs} errors -> {out.name}")


if __name__ == "__main__":
    main()
