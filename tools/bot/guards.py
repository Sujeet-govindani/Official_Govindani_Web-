#!/usr/bin/env python3
"""Python mirror of the PHP guards in chat.php, so the probe measures what
production actually sends rather than what the model happened to say."""
import re

MONEY = re.compile(r"(?:₹|\bRs\.?\b|\brupees?\b|\blakhs?\b|\bcrores?\b|\b\d{1,3}(?:,\d{2,3})+\b)", re.I)
SPLIT = re.compile(r"(?<=[.!?।])\s+")
FALLBACK = ("Pricing is confirmed by our team directly, because it depends on what you "
            "actually need rather than a generic figure. WhatsApp us on +91 92019 58271 "
            "and someone will give you the right number, or leave your name and mobile "
            "here and we will call you.")


def strip_money(t: str) -> str:
    kept = []
    for s in filter(None, SPLIT.split(t)):
        probe = s.replace("+91 92019 58271", "").replace("919201958271", "").replace("92019 58271", "")
        if not MONEY.search(probe):
            kept.append(s)
    out = " ".join(kept).strip()
    return FALLBACK if len(out) < 40 else out


def one_question(t: str) -> str:
    """Keep everything up to the first question mark, then only what follows
    that asks nothing more.

    Splitting on sentence punctuation alone was not enough: Tamil and Bengali
    replies came back with two question marks inside what the splitter saw as
    one sentence, and both questions survived."""
    if t.count("?") < 2:
        return t.strip()
    head, _, tail = t.partition("?")
    rest = [s for s in filter(None, SPLIT.split(tail)) if "?" not in s]
    return (head + "?" + (" " + " ".join(rest) if rest else "")).strip()


def apply(t: str) -> str:
    return one_question(strip_money(t))
