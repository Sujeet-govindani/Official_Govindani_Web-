#!/usr/bin/env python3
"""The quotation's figure spine, in one place, plus the arithmetic it implies.

Single source of truth for every test that checks a number. Read off the
master quotation's comparison table; nothing here is derived from a model.
"""
PLANS = {
    "Starter":  {"price": 25000, "donors": 2000,  "receipts": 1000,  "rate": 0.90,
                 "emails": 1000,  "members": 1000, "cases": 2,  "usage_gate": 500,
                 "whatsapp": None},
    "Growth":   {"price": 45000, "donors": 10000, "receipts": 5000,  "rate": 0.70,
                 "emails": 2500,  "members": 3000, "cases": 5,  "usage_gate": 1500,
                 "whatsapp": 1.00},
    "Advanced": {"price": 80000, "donors": 25000, "receipts": 15000, "rate": 0.50,
                 "emails": 25000, "members": 10000, "cases": 10, "usage_gate": 5000,
                 "whatsapp": 0.98},
}
ONE_OFF = {
    "website migration": 20000, "dedicated server per month": 15000,
    "android app": 30000, "ios app": 30000, "both apps bundle": 100000,
    "cold vault per year": 499, "play developer account": 2500,
    "apple developer account": 8500, "advanced website build value": 250000,
    "whatsapp business setup": 3000,
}
# Figures that must never be quoted as ours.
FORBIDDEN = {"0.95": "out-of-date WhatsApp rate from the renewal guide",
             "2,00,000": "the Advanced build is 2,50,000",
             "200000": "the Advanced build is 2,50,000"}

def overage(plan: str, receipts_in_month: int):
    """Receipts beyond the monthly allowance, and what they cost."""
    p = PLANS[plan]
    extra = max(0, receipts_in_month - p["receipts"])
    return extra, round(extra * p["rate"], 2)

def plan_for(active_donors: int) -> str:
    for name in ("Starter", "Growth", "Advanced"):
        if active_donors <= PLANS[name]["donors"]:
            return name
    return "Advanced"          # beyond 25,000 the rest go to sleeping storage, free

def inr(n) -> list:
    """Every way an Indian reply might write this number."""
    n = round(n, 2)
    whole = int(n)
    out = set()
    if n == whole:
        s = f"{whole:,}"
        out |= {s, str(whole), s.replace(",", "")}
        # Indian grouping: 1,00,000 as well as 100,000
        if whole >= 100000:
            r = str(whole)
            out.add(f"{r[:-5]},{r[-5:-3]},{r[-3:]}".lstrip(","))
    else:
        out |= {f"{n:.2f}", f"{whole:,}.{str(n).split('.')[1]}"}
    return sorted(out)
