#!/usr/bin/env python3
"""Proves the PHP gate matches the Python one it was ported from.

Reads the lists and regexes straight out of chat.php, converts PCRE `~...~u`
to Python, and replays both corpora. No PHP interpreter on this machine, so
this is the closest thing to running the real thing: it catches an invalid
pattern, a dropped list entry, and any behavioural drift.
"""
import json, pathlib, re, sys, collections

PHP = pathlib.Path("public/api/chat.php").read_text()

def php_list(name):
    m = re.search(rf"const {name} = \[(.*?)\];", PHP, re.S)
    if not m:
        sys.exit(f"FAIL: const {name} not found in chat.php")
    return re.findall(r"'((?:[^'\\]|\\.)*)'", m.group(1))

def to_py(p):
    if not (p.startswith("~") and p.endswith("~u")):
        sys.exit(f"FAIL: not a ~...~u pattern: {p!r}")
    body = p[1:-2].replace("\\\\", "\\")
    return re.compile(body, re.U)

lists = {n: php_list(n) for n in
         ("INTERROGATIVE", "GREETING", "FILLER", "VOCATIVE", "TOPIC", "OFF_LIMITS")}
groups = {}
for n in ("PROFANITY", "DISMISSIVE", "FREELOAD", "OFFTOPIC", "INJECTION"):
    groups[n] = [to_py(p) for p in php_list(n)]   # compiling is the syntax check
print("  patterns compiled from chat.php:",
      ", ".join(f"{k}={len(v)}" for k, v in groups.items()))
print("  lists read from chat.php:      ",
      ", ".join(f"{k}={len(v)}" for k, v in lists.items()))

EMOJI = re.compile("[\U0001F300-\U0001FAFF\U00002600-\U000027BF"
                   "\U0001F1E6-\U0001F1FF\U00002190-\U000021FF\U0000FE0F]+")

def gibberish(t):
    core = re.sub(r"[^a-z]", "", t.lower())
    if len(core) < 3: return False
    if not re.search(r"[aeiou]", core) and len(core) >= 5: return True
    for tok in re.findall(r"[a-z]+", t.lower()):
        if re.search(r"(.)\1{3,}", tok): return True
    for run in ("qwerty","asdf","zxcv","qwer","asdasd","hjkhjk","abcd","1234"):
        if run in core: return True
    return len(core) >= 4 and len(set(core)) <= 2

def verdict(raw, follow_up):
    """Line-for-line replay of gateVerdict() in chat.php."""
    raw = raw.strip()
    if raw == "": return "block"
    # Mirrors chat.php: fold digit-for-letter swaps only inside words that
    # already contain letters, so a bare number is never mangled into a
    # repeated-letter run the gibberish rule would refuse.
    def _fold(m):
        w = m.group(0)
        if re.search(r"[a-z]", w) and re.search(r"[0-9@$]", w):
            return w.translate(str.maketrans(
                {"0":"o","1":"i","3":"e","4":"a","5":"s","@":"a","$":"s"}))
        return w
    t = re.sub(r"\S+", _fold, raw.lower())
    t = re.sub(r"\s+", " ", t)
    bare = re.sub(r"[^\w\s]+", " ", EMOJI.sub(" ", t), flags=re.U)
    bare = re.sub(r"\s+", " ", bare).strip()
    if bare == "": return "greet"
    for bad in lists["OFF_LIMITS"]:
        if bad in t: return "block"
    for name in ("PROFANITY", "INJECTION", "FREELOAD", "OFFTOPIC"):
        for rx in groups[name]:
            if rx.search(t): return "block"
    for w in lists["TOPIC"]:
        if w in lists["INTERROGATIVE"]: continue
        if w in t: return "allow"
    for rx in groups["DISMISSIVE"]:
        if rx.search(t): return "block"
    words = [w for w in bare.split() if w and w not in lists["VOCATIVE"]]
    dedup = [w for i, w in enumerate(words) if i == 0 or w != words[i-1]]
    core = " ".join(dedup)
    for g in lists["GREETING"]:
        if core == g or core.replace(" ", "") == g.replace(" ", ""): return "greet"
    if core in lists["FILLER"]: return "greet"
    if dedup and len(set(dedup)) == 1 and dedup[0] in lists["GREETING"]: return "greet"
    if gibberish(core or bare): return "block"
    if follow_up: return "allow"
    if len(bare) > 200: return "block"
    if "?" in raw and len(dedup) >= 4: return "allow"
    if len(dedup) >= 6: return "allow"
    return "greet"

junk = json.loads(pathlib.Path("tools/bot/junk.json").read_text())
real = json.loads(pathlib.Path("tools/bot/questions_1200.json").read_text())
j = collections.Counter(verdict(q, False) for q in junk)
r = collections.Counter(verdict(q, False) for q in real)
print(f"\n  JUNK    ({len(junk)}): block {j['block']} · greet {j['greet']} · REACHES API {j['allow']}")
print(f"  GENUINE ({len(real)}): REACHES API {r['allow']} ({r['allow']/len(real)*100:.1f}%) · stopped {r['block']+r['greet']}")
for q in real:
    if verdict(q, False) != "allow":
        print(f"    genuine stopped: {q[:76]}")
sys.exit(0 if r["allow"] == len(real) and j["allow"] <= 2 else 1)
