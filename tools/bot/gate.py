#!/usr/bin/env python3
"""Faithful Python port of looksRelevant() in public/api/chat.php.

The lists are read straight out of the PHP so this can never drift from what
production actually runs. The point of the gate is that junk is refused BEFORE
any API call — so this test measures spend, not answer quality, and costs
nothing to run.
"""
import pathlib, re

CHAT = pathlib.Path(__file__).resolve().parents[2] / "public" / "api" / "chat.php"


def _list(name: str) -> list[str]:
    s = CHAT.read_text()
    m = re.search(rf"const {name}\s*=\s*\[(.*?)\];", s, re.S)
    if not m:
        raise SystemExit(f"{name} not found in chat.php")
    return re.findall(r"'([^']+)'", m.group(1))


OFF_LIMITS = _list("OFF_LIMITS")
TOPIC = _list("TOPIC")


def looks_relevant(text: str, is_follow_up: bool = False) -> bool:
    t = text.strip().lower()
    if t == "":
        return False
    for bad in OFF_LIMITS:
        if bad in t:
            return False
    for w in TOPIC:
        if w in t:
            return True
    if is_follow_up:
        return True
    return len(t) <= 200
