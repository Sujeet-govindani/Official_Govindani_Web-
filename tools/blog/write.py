#!/usr/bin/env python3
"""Write the articles, one JSON file per slug so the run is resumable."""
import importlib.util, json, pathlib, re, sys, time

HERE = pathlib.Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("gw", HERE / "gw.py")
gw = importlib.util.module_from_spec(spec); spec.loader.exec_module(gw)
OUT = HERE / "out"; OUT.mkdir(exist_ok=True)

SYSTEM = """You write long-form SEO articles for Govindani Infotech, an IT services company
in Pune, India (govindaniit.com). Readers are Indian NGO founders, small-business
owners, D2C brands, schools, clinics and agencies deciding what to build or buy.

VOICE. Plain, specific, useful. Write like an experienced practitioner explaining
a decision to a client, not like a marketing page. Short paragraphs. No hype, no
"in today's fast-paced digital world", no exclamation marks, no emoji.

TRUTH — these are absolute:
- NEVER invent statistics, survey results, or precise figures you cannot support.
  If a number matters, describe the range or the direction and say what it depends
  on. Do not attribute numbers to named reports you are not certain exist.
- NEVER invent client names, case studies, testimonials or project outcomes.
- NEVER state Govindani Infotech's own prices. Market ranges in general terms are
  fine where genuinely useful; our own pricing is confirmed by the team on
  WhatsApp, and you may say exactly that once, near the end.
- Do not promise results, rankings, or timelines.

STRUCTURE:
- Open by answering the question in the first two sentences. No throat-clearing.
- Use ## for main sections and ### for sub-sections. 6-9 main sections.
- Include a comparison table in GitHub-flavoured markdown where it genuinely helps.
- Include a "## Frequently Asked Questions" section near the end with 4-6 ###
  questions, each answered in 2-4 sentences.
- End with a short "## Where to Start" section with practical next steps, and one
  sentence inviting the reader to talk to the team on WhatsApp.
- India-specific throughout: rupees, GST, Indian platforms, Indian regulations,
  Indian buying habits. Mention Pune or Maharashtra only where it is natural.

LENGTH: 2,300 to 2,800 words. This matters — do not stop early.
Return ONLY the article body in markdown, starting with a ## heading. No title
line, no front-matter, no code fences."""


def write_one(topic, k):
    tags = ", ".join(topic.get("tags") or [])
    user = (f"Title: {topic['title']}\n"
            f"Primary keyword: {topic.get('keyword','')}\n"
            f"Related phrases: {tags}\n"
            f"Category: {topic.get('category','')}\n\n"
            f"Write the full article now. 2,300-2,800 words.")
    txt, model = gw.ask(SYSTEM, user, k, tries=2, temperature=0.75)
    if not txt:
        return None
    body = re.sub(r"^\s*```(?:markdown)?|```\s*$", "", txt.strip()).strip()
    words = len(body.split())
    if words < 1200 or not body.startswith("#"):
        return None
    return {"body": body, "words": words, "model": model}


def main():
    topics = json.loads((HERE / "topics.json").read_text())
    # Sharding, not a work queue: each worker owns a fixed slice, so several can
    # run at once without a lock and without writing the same file twice.
    shard, of, limit = 0, 1, 0
    for a in sys.argv[1:]:
        if a.startswith("--shard="): shard = int(a.split("=")[1])
        elif a.startswith("--of="): of = int(a.split("=")[1])
        else: limit = int(a)
    k = gw.key()
    todo = [(s, t) for i, (s, t) in enumerate(sorted(topics.items()))
            if i % of == shard and not (OUT / f"{s}.json").exists()]
    if limit:
        todo = todo[:limit]
    print(f"  {len(todo)} to write", flush=True)
    ok = fail = 0
    t0 = time.time()
    for i, (slug, topic) in enumerate(todo, 1):
        r = write_one(topic, k)
        if not r:
            fail += 1
            print(f"  [{i}/{len(todo)}] FAILED {slug}", flush=True)
            continue
        rec = {**topic, "slug": slug, "content": r["body"], "words": r["words"],
               "model": r["model"]}
        (OUT / f"{slug}.json").write_text(json.dumps(rec, ensure_ascii=False))
        ok += 1
        if i % 5 == 0 or i <= 3:
            print(f"  [{i}/{len(todo)}] {ok} ok, {fail} failed, "
                  f"{r['words']}w, {(time.time()-t0)/60:.0f}m elapsed", flush=True)
    print(f"  done: {ok} written, {fail} failed", flush=True)


if __name__ == "__main__":
    main()
