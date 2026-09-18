#!/usr/bin/env python3
"""Find what the corpus asks about that the brief never covers.

Every `invented` failure so far came from the same place: the question turned on
a fact the brief does not state, so the model filled the gap. That is
predictable without generating an answer for all 1,502 remaining questions —
extract what each one is about, and check the brief actually says something.
"""
import json, pathlib, re, collections

BRIEF = pathlib.Path("public/api/chat.php").read_text(encoding="utf-8")
body = re.search(r"\$system = <<<TXT\n(.*?)\nTXT;", BRIEF, re.S)
BODY = (body.group(1) if body else BRIEF).lower()

todo = json.loads(pathlib.Path("tools/bot/todo.json").read_text())

# The subjects a trustee actually raises, and the words that mark each one.
SUBJECTS = {
    "source code / handover":      ["source code", "code milega", "code hand", "code dega"],
    "one-time build vs plan":      ["one time", "one-time", "ek baar", "sirf website bana"],
    "who builds it / team":        ["team kaun", "developer kaun", "in-house", "kaun banata", "kitne log"],
    "SLA / uptime / downtime":     ["uptime", "downtime", "sla", "server down", "site down"],
    "data residency / servers":    ["data kahan", "server kahan", "residency", "aws", "cloud kaun"],
    "contract / notice / refund":  ["refund", "notice period", "contract", "agreement", "cancel karne"],
    "training / onboarding":       ["training", "sikhayenge", "onboard", "kaise sikh"],
    "support hours / response":    ["support kitne", "response time", "kitni der mein reply", "24x7", "24×7"],
    "custom development":          ["custom feature", "extra feature", "customi", "hamare hisaab se"],
    "integrations / API":          ["api", "integrat", "tally", "zoho", "webhook"],
    "payment gateway / charges":   ["gateway", "razorpay", "transaction charge", "pg charge", "mdr"],
    "GST / invoice / TDS":         ["gst", "invoice", "tds", "bill milega"],
    "80G / 10BD / compliance":     ["80g", "10bd", "10be", "fcra", "csr"],
    "receipts & overage":          ["receipt", "rasid"],
    "donor capacity":              ["active donor", "donor limit", "kitne donor"],
    "WhatsApp rail":               ["whatsapp"],
    "email limits":                ["email"],
    "mobile app":                  ["app ", "android", "ios", "play store"],
    "website in the plan":         ["website"],
    "migration from existing":     ["migrat", "purana data", "shift kar"],
    "security / privacy / DPDP":   ["dpdp", "security", "privacy", "encrypt", "leak"],
    "deletion / opt-out":          ["delete", "hatao", "opt-out", "opt out", "remove kar"],
    "pricing / plan choice":       ["plan", "price", "kitna", "cost", "rate"],
}

# Does the brief say anything substantive about the subject?
COVER = {
    "source code / handover":     ["commercial term", "leave with everything", "unlimited export"],
    "one-time build vs plan":     ["no longer sell one-time"],
    "who builds it / team":       ["satara road", "do not invent a team"],
    "SLA / uptime / downtime":    ["sev-1", "24×7", "recovery point"],
    "data residency / servers":   ["data residency india", "dedicated server"],
    "contract / notice / refund": ["notice period", "no exit fee", "settled by the team"],
    "training / onboarding":      ["onboarding", "training"],
    "support hours / response":   ["24-hour", "24×7", "sev-1", "priority"],
    "custom development":         ["custom-coded", "settled by the team"],
    "integrations / API":         ["developer api", "webhook"],
    "payment gateway / charges":  ["payment gateway", "razorpay", "two or more gateway"],
    "GST / invoice / TDS":        ["18% gst", "gst"],
    "80G / 10BD / compliance":    ["10bd", "80g", "fcra"],
    "receipts & overage":         ["receipts included", "each receipt beyond"],
    "donor capacity":             ["active donors", "sleeping"],
    "WhatsApp rail":              ["whatsapp rail", "per-message rate"],
    "email limits":               ["marketing email", "transactional email"],
    "mobile app":                 ["mobile application", "₹30,000"],
    "website in the plan":        ["custom-coded ui/ux", "wordpress"],
    "migration from existing":   ["website migration", "20,000"],
    "security / privacy / DPDP":  ["dpdp", "pan encrypted", "tls in transit"],
    "deletion / opt-out":         ["undo bin", "opt-out honoured", "append-only"],
    "pricing / plan choice":      ["₹25,000", "₹45,000", "₹80,000"],
}

counts = collections.Counter()
for q in todo:
    t = q.lower()
    for subj, marks in SUBJECTS.items():
        if any(m in t for m in marks):
            counts[subj] += 1

rows = []
for subj, n in counts.most_common():
    marks = COVER.get(subj, [])
    hits = [m for m in marks if m in BODY]
    rows.append((n, subj, len(hits), len(marks), [m for m in marks if m not in BODY]))

print(f"  {len(todo)} unscored questions, grouped by what they turn on\n")
print(f"  {'asked':>6}  {'subject':30} brief coverage")
for n, subj, got, tot, missing in rows:
    flag = "OK " if got == tot else ("THIN" if got else "NONE")
    print(f"  {n:>6}  {subj:30} [{flag}] {got}/{tot}" + (f"  missing: {missing}" if missing else ""))
