#!/usr/bin/env python3
"""Generate a large, varied question bank the way Indian buyers actually ask."""
import importlib.util, json, pathlib, sys

HERE = pathlib.Path(__file__).resolve().parent
_g = importlib.util.spec_from_file_location("gw", HERE.parent / "blog" / "gw.py")
gw = importlib.util.module_from_spec(_g); _g.loader.exec_module(gw)

SYSTEM = """You write test questions for Govindani Infotech's website sales assistant. It
sells Give Setu — an operating system for Indian non-profits: donations, 80G
receipts, donor CRM, members, cases, campaigns, 10BD/10BE compliance, WhatsApp,
a website included in the plan, and an optional mobile app. Plans are Starter,
Growth and Advanced. It quotes Give Setu prices; for websites, social and ads it
routes to the team.

Write questions the way real Indian NGO people ask them — trustees, founders,
accountants, project coordinators, CA firms, and the sceptical uncle on the
board. Blunt, sometimes rude, often half-informed, frequently mixing English
with their own language. Include typos and one-line messages.

Return ONLY a JSON array of question strings."""

THEMES = [
 ("overage and limits", "exceeding donors or receipts, what happens at 35,000 donors, what if we cross the limit mid-month, is the donation blocked, how is overage billed, when is it charged, what if I cannot pay it"),
 ("active vs sleeping donors", "what counts as active, our database has 2 lakh names, do we pay per donor, what happens to old donors, reactivation, imports"),
 ("plan choice", "which plan for our size, can we downgrade, can we upgrade mid-year, what happens at renewal, why is Starter not available at renewal, is Growth enough"),
 ("money justification", "why should we pay when a freelancer is cheaper, what does 0.50 paise actually buy, we can host on AWS ourselves, our nephew can build this, why not free tools, commission platforms are cheaper"),
 ("80G, 10BD, 10BE compliance", "receipt numbering, corrections, audit, PAN missing, cash above 2000, financial year reset, filing batches, what if the auditor objects"),
 ("technology and trust", "is your SMS DLT approved, is WhatsApp official, where is our data stored, who owns our data, can we leave, is it secure, DPDP, what is DLT"),
 ("website and app", "is the website really free, what happens if we stop paying, can we take the code, is the app native, store accounts, custom domain"),
 ("WhatsApp and email", "per message cost, is there a platform fee, template approval, can we send bulk, marketing email limits, unsubscribes"),
 ("payments and gateways", "which gateway, who holds the money, settlement time, failover, recurring UPI mandate, donor covering the fee, foreign donations"),
 ("objections and hostility", "you are just a chatbot, this is too expensive, another vendor promised more, show me proof, we were cheated before, why should we trust you"),
 ("practical operations", "how long to go live, can you import our Tally data, training, support response, who do we call, branch offices, multiple users"),
 ("regional languages", "the same questions written in Hindi, Hinglish, Marathi, Gujarati, Bengali, Tamil, Telugu and Kannada"),
]


def main():
    per = int(sys.argv[1]) if len(sys.argv) > 1 else 25
    rounds = int(sys.argv[2]) if len(sys.argv) > 2 else 9
    k = gw.key()
    out, seen = [], set()
    existing = HERE / "questions_1200.json"
    if existing.exists():
        out = json.loads(existing.read_text())
        seen = {q.lower().strip() for q in out}
    for r in range(rounds):
        for name, theme in THEMES:
            txt, _ = gw.ask(SYSTEM,
                f"Theme: {name} — {theme}\n\nGive exactly {per} questions. "
                f"Batch {r+1}: make them different from the obvious phrasing.",
                k, tries=2, temperature=1.0)
            arr = gw.as_json(txt)
            if not isinstance(arr, list):
                continue
            for q in arr:
                if not isinstance(q, str) or len(q) < 6:
                    continue
                kk = q.lower().strip()
                if kk in seen:
                    continue
                seen.add(kk); out.append(q)
            existing.write_text(json.dumps(out, ensure_ascii=False, indent=1))
        print(f"  round {r+1}/{rounds}: {len(out)} questions", flush=True)
    print(f"  total {len(out)}")


if __name__ == "__main__":
    main()
