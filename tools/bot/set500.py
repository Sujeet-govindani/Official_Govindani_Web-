#!/usr/bin/env python3
"""The 500-question fact matrix, with an exact expected answer for each.

Every question here turns on a figure the quotation states, so scoring needs no
judge: the reply either contains the right number, or it contains a wrong one,
and both are decidable. That matters — yesterday's model judge produced two
wrong verdicts and nine infrastructure failures counted as bot failures.

Each case carries:
  must    — at least one of these strings has to appear
  must_not— none of these may appear (the other plans' figures, forbidden ones)
"""
import json, pathlib, random, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from facts import PLANS, ONE_OFF, FORBIDDEN, overage, plan_for, inr

random.seed(7)
cases = []

def add(q, must, must_not, tag):
    cases.append({"q": q, "must": sorted(set(must)),
                  "must_not": sorted(set(must_not) - set(must)), "tag": tag})

OTHER = lambda plan, key: [str(PLANS[p][key]) for p in PLANS if p != plan]

# ---- 1. plan price ---------------------------------------------------------
PRICE_Q = [
    "{p} plan ka price kya hai?", "{p} kitne ka hai per year?",
    "What does the {p} plan cost?", "{p} ka annual charge batao",
    "{p} plan mein saal ka kitna dena hoga?",
    "{p} plan ki fees kitni hai?", "{p} ka saalana kharcha?",
    "{p} plan — yearly cost with GST kya banta hai?",
    "{p} प्लान की कीमत क्या है?", "{p} प्लान का सालाना शुल्क कितना है?",
    "{p} plan budget mein kitna rakhna padega?",
    "Tell me the yearly price of {p}",
]
for plan, d in PLANS.items():
    for t in PRICE_Q:
        add(t.format(p=plan), inr(d["price"]), OTHER(plan, "price"), "plan price")

# ---- 2. active-donor capacity ---------------------------------------------
CAP_Q = [
    "{p} plan mein kitne active donors included hain?",
    "How many active donors does {p} support?",
    "{p} ki donor capacity kya hai?",
    "{p} plan kitne donors handle kar sakta hai?",
    "{p} में कितने सक्रिय डोनर शामिल हैं?",
    "{p} plan ka active donor limit batao",
    "Active donor ka number {p} mein kya hai?",
    "{p} plan mein donor ki seema kitni hai?",
]
for plan, d in PLANS.items():
    for t in CAP_Q:
        add(t.format(p=plan), inr(d["donors"]), OTHER(plan, "donors"), "donor capacity")

# ---- 3. which plan fits N active donors -----------------------------------
for n in (200, 300, 500, 750, 900, 1200, 1500, 1800, 1999, 2000, 2001, 2500,
          3000, 4000, 5000, 6000, 7500, 8500, 9000, 9500, 9999, 10000, 10001,
          11000, 12000, 15000, 18000, 20000, 22000, 24999, 25000, 25001,
          28000, 30000, 40000, 50000, 75000, 100000):
    right = plan_for(n)
    add(f"Hamare {n:,} active donors hain — kaunsa plan lena chahiye?",
        [right], [p for p in PLANS if p != right], "plan fit")
    add(f"We manage {n:,} active donors. Which plan do we need?",
        [right], [p for p in PLANS if p != right], "plan fit")
    add(f"{n:,} सक्रिय डोनर हैं — कौन सा प्लान लेना चाहिए?",
        [right], [p for p in PLANS if p != right], "plan fit")

# ---- 4. receipts included --------------------------------------------------
for plan, d in PLANS.items():
    add(f"{plan} plan mein mahine ke kitne 80G receipts included hain?",
        inr(d["receipts"]), OTHER(plan, "receipts"), "receipts included")
    add(f"How many receipts a month does {plan} include?",
        inr(d["receipts"]), OTHER(plan, "receipts"), "receipts included")

# ---- 5. receipt overage arithmetic ----------------------------------------
for plan, d in PLANS.items():
    inc = d["receipts"]
    for n in (inc, inc + 1, inc + 100, inc + 300, inc + 500, inc + 750,
              inc + 1000, inc + 1500, inc + 2000, inc + 2500, inc + 4000,
              inc + 5000, inc + 7500, inc * 2, inc * 3, inc * 4, inc * 5):
        extra, cost = overage(plan, n)
        if extra == 0:
            add(f"{plan} plan par ek mahine mein {n:,} receipts ban gayi — extra charge kitna?",
                ["koi extra", "no extra", "included", "nahi lagega", "shunya", "zero", "0"],
                [str(x) for x in FORBIDDEN], "overage zero")
        else:
            add(f"{plan} plan par ek mahine mein {n:,} receipts ban gayi — extra kitna dena hoga?",
                inr(cost), list(FORBIDDEN), "overage arithmetic")
            add(f"On {plan}, we issued {n:,} receipts in one month. What is the overage?",
                inr(cost), list(FORBIDDEN), "overage arithmetic")
            add(f"{plan} पर एक महीने में {n:,} रसीदें बनीं — अतिरिक्त शुल्क कितना?",
                inr(cost), list(FORBIDDEN), "overage arithmetic")

# ---- 6. per-receipt overage rate ------------------------------------------
for plan, d in PLANS.items():
    add(f"{plan} plan mein receipt overage ka rate per receipt kya hai?",
        [f"{d['rate']:.2f}"], [f"{PLANS[p]['rate']:.2f}" for p in PLANS if p != plan],
        "overage rate")

# ---- 7. WhatsApp per-message rate -----------------------------------------
for plan, d in PLANS.items():
    if d["whatsapp"] is None:
        add(f"{plan} plan mein WhatsApp message bhej sakte hain?",
            ["Growth", "nahi", "not available", "available nahi"], ["0.95"], "whatsapp starter")
    else:
        add(f"{plan} plan mein WhatsApp message ka rate kya hai?",
            [f"{d['whatsapp']:.2f}"],
            [f"{PLANS[p]['whatsapp']:.2f}" for p in PLANS
             if p != plan and PLANS[p]["whatsapp"]] + ["0.95"], "whatsapp rate")
        add(f"What is the WhatsApp per-message rate on {plan}?",
            [f"{d['whatsapp']:.2f}"],
            [f"{PLANS[p]['whatsapp']:.2f}" for p in PLANS
             if p != plan and PLANS[p]["whatsapp"]] + ["0.95"], "whatsapp rate")

# ---- 8. marketing email allowance -----------------------------------------
for plan, d in PLANS.items():
    for t in ("{p} plan mein mahine ke kitne marketing emails included hain?",
              "How many marketing emails a month on {p}?",
              "{p} में हर महीने कितने मार्केटिंग ईमेल शामिल हैं?",
              "{p} ka email limit kitna hai per month?"):
        add(t.format(p=plan), inr(d["emails"]), OTHER(plan, "emails"), "email allowance")

# ---- 9. members and seats --------------------------------------------------
for plan, d in PLANS.items():
    for t in ("{p} plan mein kitne members add kar sakte hain?",
              "How many members can {p} hold?",
              "{p} में कितने सदस्य जोड़ सकते हैं?"):
        add(t.format(p=plan), inr(d["members"]), OTHER(plan, "members"), "members")

# ---- 10. cases built by the team ------------------------------------------
for plan, d in PLANS.items():
    add(f"{plan} plan mein aapki team mahine mein kitne cases banati hai?",
        [str(d["cases"])], [str(PLANS[p]["cases"]) for p in PLANS if p != plan], "team cases")

# ---- 11. usage-bill threshold ---------------------------------------------
for plan, d in PLANS.items():
    add(f"{plan} plan mein usage bill kab generate hota hai?",
        inr(d["usage_gate"]), OTHER(plan, "usage_gate"), "usage threshold")

# ---- 12. one-off charges ---------------------------------------------------
ONE_Q = ["{k} ka charge kitna hai?", "How much is the {k}?",
         "{k} ke liye kitna dena hoga?", "{k} ki cost batao",
         "{k} — kitna paisa lagega?"]
for k, v in ONE_OFF.items():
    for t in ONE_Q:
        add(t.format(k=k), inr(v), list(FORBIDDEN), "one-off charge")

# ---- 13. sleeping donors are always free ---------------------------------
for n in (5000, 20000, 50000, 100000, 200000, 500000):
    add(f"Hamare paas {n:,} purane sleeping donor records hain — inka charge lagega?",
        ["free", "muft", "koi charge nahi", "nahi lagega", "unlimited"],
        list(FORBIDDEN), "sleeping free")

# ---- 14. the trap that already failed live -------------------------------
add("Hamari list mein 30,000 log hain but active donors sirf 4,000 hain. Kaunsa plan?",
    ["Growth"], ["Advanced", "Starter"], "active-not-list")
add("Database mein 2 lakh records hain, active donors 1,800. Kaunsa plan sahi hai?",
    ["Starter"], ["Advanced"], "active-not-list")
add("Sleeping donor ne dobara donate kiya — reactivation ka charge lagta hai?",
    ["nahi", "free", "koi charge nahi", "never charged"], list(FORBIDDEN), "reactivation free")

# ---- 15. GST-inclusive totals (the quotation's own ₹94,400 confirms this) --
for plan, d in PLANS.items():
    allin = round(d["price"] * 1.18)
    for t in ("{p} plan GST ke saath total kitna banta hai?",
              "What is the all-in cost of {p} including 18% GST?",
              "{p} plan — 18% GST milake final amount?",
              "{p} प्लान जीएसटी सहित कुल कितना?"):
        add(t.format(p=plan), inr(allin),
            [str(round(PLANS[q]["price"] * 1.18)) for q in PLANS if q != plan],
            "gst total")

# ---- 16. receipts included, more ways to ask -----------------------------
for plan, d in PLANS.items():
    for t in ("{p} plan ka monthly receipt quota kya hai?",
              "{p} mein free receipts kitni milti hain har mahine?",
              "{p} में हर महीने कितनी रसीदें शामिल हैं?",
              "Monthly included receipts on {p}?"):
        add(t.format(p=plan), inr(d["receipts"]), OTHER(plan, "receipts"),
            "receipts included")

# ---- 17. overage rate, more ways ------------------------------------------
for plan, d in PLANS.items():
    for t in ("{p} mein extra receipt ka per-piece charge kya hai?",
              "Beyond the quota, what does one receipt cost on {p}?",
              "{p} में कोटा के बाद प्रति रसीद कितना लगता है?"):
        add(t.format(p=plan), [f"{d['rate']:.2f}"],
            [f"{PLANS[q]['rate']:.2f}" for q in PLANS if q != plan], "overage rate")

# ---- 18. WhatsApp, more ways incl. GST-inclusive -------------------------
for plan, d in PLANS.items():
    if d["whatsapp"] is None:
        for t in ("{p} par WhatsApp rail milta hai?",
                  "Is the WhatsApp rail included on {p}?",
                  "{p} में व्हाट्सएप उपलब्ध है?"):
            add(t.format(p=plan), ["Growth", "nahi", "not available", "available nahi", "नहीं"],
                ["0.95"], "whatsapp starter")
    else:
        for t in ("{p} par ek WhatsApp message kitne ka?",
                  "{p} mein WhatsApp marketing message ka charge?",
                  "{p} में व्हाट्सएप संदेश का रेट क्या है?",
                  "Per message WhatsApp cost on {p} with GST?"):
            add(t.format(p=plan), [f"{d['whatsapp']:.2f}"],
                [f"{PLANS[q]['whatsapp']:.2f}" for q in PLANS
                 if q != plan and PLANS[q]["whatsapp"]] + ["0.95"], "whatsapp rate")

# ---- 19. team-built cases and usage gate, more ways ----------------------
for plan, d in PLANS.items():
    for t in ("{p} mein aapki team kitne cases banake deti hai per month?",
              "How many cases does your team build monthly on {p}?",
              "{p} में आपकी टीम महीने में कितने केस बनाती है?"):
        add(t.format(p=plan), [str(d["cases"])],
            [str(PLANS[q]["cases"]) for q in PLANS if q != plan], "team cases")
    for t in ("{p} mein usage bill kis amount ke baad aata hai?",
              "At what accrued amount does {p} raise a usage bill?",
              "{p} में उपयोग बिल किस राशि के बाद बनता है?"):
        add(t.format(p=plan), inr(d["usage_gate"]), OTHER(plan, "usage_gate"),
            "usage threshold")

# ---- 20. what is unlimited and free on every plan ------------------------
for thing, words in [
    ("transactional email jaise receipts aur confirmations", ["unlimited", "free", "muft", "asimit"]),
    ("live cases", ["unlimited", "free", "muft"]),
    ("live campaigns", ["unlimited", "free", "muft"]),
    ("data export", ["free", "unlimited", "koi charge nahi", "muft"]),
]:
    for plan in PLANS:
        add(f"{plan} plan mein {thing} par kya charge hai?", words,
            list(FORBIDDEN), "unlimited free")

# ---- 21. store developer accounts are bought by the NGO ------------------
for t in ("Play Store developer account ka charge kaun deta hai aur kitna?",
          "Apple developer account kiske naam par lena hota hai, kitne ka?",
          "App store accounts ka paisa aapko dena hai ya humein?"):
    add(t, ["2,500", "8,500", "2500", "8500", "aapke naam", "your own name", "khud"],
        list(FORBIDDEN), "store accounts")

random.shuffle(cases)
cases = cases[:500]
out = pathlib.Path(__file__).parent / "set500.json"
out.write_text(json.dumps(cases, ensure_ascii=False, indent=1), encoding="utf-8")

import collections
print(f"  {len(cases)} cases -> {out.name}")
for tag, n in collections.Counter(c["tag"] for c in cases).most_common():
    print(f"    {n:>4}  {tag}")
