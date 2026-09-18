#!/usr/bin/env python3
"""Replays respectfulForm()'s real patterns, read out of chat.php, in order."""
import pathlib, re, sys
PHP = pathlib.Path("public/api/chat.php").read_text()
body = re.search(r"function respectfulForm.*?\n    \];", PHP, re.S).group(0)
pairs = re.findall(r"'(/(?:[^'\\]|\\.)*?/u)'\s*=>\s*'((?:[^'\\]|\\.)*)'", body)
print(f"  {len(pairs)} substitutions read from chat.php")
rules = []
for pat, rep in pairs:
    rules.append((re.compile(pat[1:-2].replace("\\\\", "\\"), re.U),
                  re.sub(r"\$(\d)", r"\\\1", rep)))
def fix(t):
    for rx, rep in rules:
        t = rx.sub(rep, t)
    return t
CASES = [
    ("Aap kis liye dekhre ho?",            "dekh rahe hain"),
    ("Tum kis kaam ke liye website chahiye?", "Aapko"),
    ("Aap kya soch rahe ho?",              "rahe hain"),
    ("Kaise ho aap?",                      "Kaise hain"),
    ("Aap plan compare kar rahe ho na?",   "rahe hain"),
    ("Yeh kaam ho jayega aaj hi.",         "ho jayega"),   # must NOT change
    ("Payment ho gaya hai kya?",           "ho gaya"),     # must NOT change
    ("Tera plan kaunsa hai?",              "Aapka"),
    ("आप क्या देख रहे हो?",                  "रहे हैं"),
    ("आप कितने donors manage करते हो?",       "करते हैं"),
    ("यह काम हो जाएगा।",                      "हो जाएगा"),
    ("Aap donate karte ho?",               "karte hain"),
]
bad = 0
for src, expect in CASES:
    out = fix(src)
    ok = expect in out
    bad += not ok
    print(f"   {'ok  ' if ok else 'FAIL'}  {src}\n         -> {out}")
sys.exit(1 if bad else 0)
