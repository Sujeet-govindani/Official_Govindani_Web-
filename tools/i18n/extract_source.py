#!/usr/bin/env python3
"""Harvest user-facing copy from the SOURCE, not just the prerendered HTML.

The HTML extractor sees one render of each page. Anything the client draws
later — a rotating hero slide, the mobile-only dock, a modal, a carousel that
has not advanced — never appears in it. Those strings were translated nowhere
and stayed English no matter what the visitor picked.

False positives are cheap here: a dictionary entry that never matches a DOM node
simply never fires, and translation runs on free models. Missing a string is the
expensive failure, so this leans towards keeping.
"""
import json, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
SRC = ROOT / "src"

# Anything matching these is code, not copy.
REJECT = re.compile(
    r"^(?:https?://|/|\./|\.\./|#|@|data:|mailto:|tel:)"          # urls & paths
    r"|^[a-z]+(?:[A-Z][a-z]*)+$"                                   # camelCase idents
    r"|^[a-z0-9_-]+$"                                              # css classes / keys
    r"|[<>{}\\]"                                                   # markup / template
    r"|^\s*$"
)
# tailwind-ish utility strings: "md:hidden", "text-lg sm:text-xl", "flex items-center"
# Flat, not nested: (?:X+\s*)+ backtracks catastrophically on a long non-match.
TAILWIND = re.compile(r"^[a-z0-9:_/\[\]().%\s-]+$")
# Two simple, linear patterns. A single alternation with a backreference
# backtracks catastrophically on a 900 KB data file.
SQ = re.compile(r"'([^'\n]{3,300})'")
DQ = re.compile(r'"([^"\n]{3,300})"')
JSX = re.compile(r">([^<>{}\n][^<>{}]{2,300})<")


def is_copy(s: str) -> bool:
    s = s.strip()
    if len(s) < 3 or len(s) > 300:
        return False
    if REJECT.search(s):
        return False
    letters = re.findall(r"[A-Za-z]", s)
    if len(letters) < 3:
        return False
    if TAILWIND.match(s) and not re.search(r"[.?!,]", s):
        return False
    # real copy either has a space, or is a Title-Case label
    if " " not in s and not re.match(r"^[A-Z][a-z]{2,}$", s):
        return False
    # reject strings that are mostly punctuation/identifiers
    if len(letters) / len(s) < 0.45:
        return False

    # Tailwind class lists survive the checks above because they are ordinary
    # lowercase words separated by spaces. These are what actually distinguishes
    # them from prose.
    if "[" in s or "]" in s or "=" in s:
        return False
    words = s.split()
    hyphened = sum(1 for w in words if "-" in w or ":" in w)
    if words and hyphened / len(words) > 0.34:
        return False
    if re.search(r"\b(?:px|py|pt|pb|pl|pr|mx|my|mt|mb|ml|mr|w|h|gap|text|bg|border|rounded|flex|grid|absolute|relative|translate|opacity|ring|shadow|hover|focus|peer|inset|z)-", s):
        return False
    # prose has at least a few multi-letter plain words
    plain = sum(1 for w in words if re.fullmatch(r"[A-Za-z][A-Za-z'’]{1,}", w))
    if plain < 2 and len(words) > 1:
        return False
    return True


def main():
    found = {}
    for f in sorted(SRC.rglob("*.ts*")):
        if f.suffix not in (".ts", ".tsx") or f.name.endswith(".d.ts"):
            continue
        # blogs.ts is 943 KB of article bodies that the prerenderer already
        # renders into HTML, so the HTML extractor has them; scanning it here
        # only costs time.
        if "/i18n/" in str(f) or f.name in ("blogs.ts",):
            continue
        try:
            text = f.read_text(encoding="utf-8", errors="replace")
        except Exception:
            continue
        # strip imports so module paths never leak in
        text = re.sub(r"^\s*import .*$", "", text, flags=re.M)
        # JSX text content is not a string literal — `>We Build Revenue
        # Engines.</h1>` has no quotes anywhere. That is where the hero copy
        # lives, which is why it stayed English in every language.
        for pat in (SQ, DQ, JSX):
          for m in pat.finditer(text):
            s = m.group(1).strip()
            s = re.sub(r"\s+", " ", s)
            if is_copy(s):
                found[s] = found.get(s, 0) + 1

    hi = json.loads((pathlib.Path(__file__).parent / "hi.json").read_text())
    missing = sorted(s for s in found if s not in hi)
    print(f"  copy-like literals in source   {len(found):,}")
    print(f"  already translated             {len(found) - len(missing):,}")
    print(f"  NEW, never translated          {len(missing):,}")
    (pathlib.Path(__file__).parent / "source_missing.json").write_text(
        json.dumps(missing, ensure_ascii=False, indent=0))
    print("\n  a sample of what was being missed:")
    for s in sorted(missing, key=len, reverse=True)[:12]:
        print("   -", s[:88])


if __name__ == "__main__":
    main()
