#!/usr/bin/env python3
"""Check every figure claim in the brief against the quotation's own spine.

The wrong_figure failures the probe found are symptoms. The cause is either a
figure stated inconsistently somewhere in a 3,800-line brief that has been
edited many times, or a figure the brief never states so the model guesses.
This finds the first kind exhaustively — which clears that failure class for
every question at once, not only the sampled ones.
"""
import re, pathlib, sys, collections

BRIEF = pathlib.Path("public/api/chat.php").read_text(encoding="utf-8")
b = re.search(r"\$system = <<<TXT\n(.*?)\nTXT;", BRIEF, re.S)
BODY = b.group(1) if b else BRIEF

# The authoritative spine, read off the quotation's comparison table.
TRUTH = {
    "plan price":      {"starter": "25,000", "growth": "45,000", "advanced": "80,000"},
    "active donors":   {"starter": "2,000",  "growth": "10,000", "advanced": "25,000"},
    "receipts/month":  {"starter": "1,000",  "growth": "5,000",  "advanced": "15,000"},
    "receipt overage": {"starter": "0.90",   "growth": "0.70",   "advanced": "0.50"},
    "marketing email": {"starter": "1,000",  "growth": "2,500",  "advanced": "25,000"},
    "team cases/mo":   {"starter": "2",      "growth": "5",      "advanced": "10"},
    "whatsapp msg":    {"growth": "1.00",    "advanced": "0.98"},
    "usage threshold": {"starter": "500",    "growth": "1,500",  "advanced": "5,000"},
}
ONE_OFF = {"website migration": "20,000", "dedicated server": "15,000",
           "android app": "30,000", "ios app": "30,000", "app bundle": "1,00,000",
           "cold vault": "499", "play account": "2,500", "apple account": "8,500",
           "advanced website value": "2,50,000"}

# Figures that must NEVER appear as a Give Setu number.
FORBIDDEN = {
    "2,00,000": "the Advanced custom build is 2,50,000; 2,00,000 was a wrong figure caught in testing",
    "0.95":     "an out-of-date WhatsApp rate from the renewal guide",
    "5,00,000": "not a figure in the quotation",
}

problems = []

# 1. Forbidden figures anywhere in the brief.
for bad, why in FORBIDDEN.items():
    for m in re.finditer(re.escape(bad), BODY):
        ctx = " ".join(BODY[max(0, m.start()-90):m.end()+90].split())
        problems.append(("FORBIDDEN FIGURE", f"{bad} — {why}", ctx[:150]))

# 2. Plan capacity stated next to the wrong plan name.
PLAN_RE = r"(starter|growth|advanced)"
for label, per in TRUTH.items():
    for plan, val in per.items():
        others = [v for p, v in per.items() if p != plan]
        # a sentence naming this plan and one of the OTHER plans' figures
        for m in re.finditer(rf"[^.\n]*\b{plan}\b[^.\n]*", BODY, re.I):
            seg = m.group(0)
            if re.search(rf"\b{re.escape(val)}\b", seg):
                continue                       # states its own figure: fine
            for wrong in others:
                if re.search(rf"₹?\s*{re.escape(wrong)}\b", seg) and label != "plan price":
                    # only flag when the segment is talking about this metric
                    key = label.split("/")[0].split()[0]
                    if key.lower() in seg.lower():
                        problems.append(("PLAN/FIGURE MISMATCH",
                                         f"{plan} + {wrong} where {label} should be {val}",
                                         " ".join(seg.split())[:150]))

# 3. Every one-off charge should appear at least once, or the model must guess.
for name, val in ONE_OFF.items():
    if not re.search(re.escape(val), BODY):
        problems.append(("MISSING FIGURE", f"{name} ({val}) never stated in the brief", ""))

seen, uniq = set(), []
for kind, what, ctx in problems:
    k = (kind, what)
    if k in seen: continue
    seen.add(k); uniq.append((kind, what, ctx))

by = collections.Counter(k for k, _, _ in uniq)
print(f"  brief body: {len(BODY.splitlines())} lines, {len(BODY.split()):,} words")
print(f"  problems: {dict(by) if by else 'none'}\n")
for kind, what, ctx in uniq:
    print(f"  [{kind}] {what}")
    if ctx: print(f"      …{ctx}")
sys.exit(1 if uniq else 0)
