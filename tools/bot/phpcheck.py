#!/usr/bin/env python3
"""A structural check for chat.php, standing in for `php -l` on a machine with
no PHP. Tokenizes strings, comments and heredocs properly — the crude
regex-strip version reported a false imbalance — then checks that every
bracket closes and every string terminates."""
import sys

def scan(src):
    i, n = 0, len(src)
    stack, errs = [], []
    line = 1
    while i < n:
        c = src[i]
        if c == "\n":
            line += 1; i += 1; continue
        # comments
        if src.startswith("//", i) or c == "#":
            j = src.find("\n", i); i = n if j < 0 else j; continue
        if src.startswith("/*", i):
            j = src.find("*/", i + 2)
            if j < 0: errs.append(f"line {line}: unterminated /* comment"); break
            line += src.count("\n", i, j); i = j + 2; continue
        # heredoc / nowdoc
        if src.startswith("<<<", i):
            j = src.find("\n", i)
            tag = src[i + 3:j].strip().strip("'\"")
            end = src.find("\n" + tag, j)
            while end != -1 and src[end + 1 + len(tag):end + 2 + len(tag)] not in (";", "\n", ",", ")"):
                end = src.find("\n" + tag, end + 1)
            if end < 0: errs.append(f"line {line}: unterminated heredoc {tag}"); break
            line += src.count("\n", i, end); i = end + 1 + len(tag); continue
        # strings
        if c in "'\"":
            q, j = c, i + 1
            while j < n:
                if src[j] == "\\": j += 2; continue
                if src[j] == q: break
                if src[j] == "\n": line += 1
                j += 1
            if j >= n: errs.append(f"line {line}: unterminated {q} string"); break
            i = j + 1; continue
        if c in "{([":
            stack.append((c, line)); i += 1; continue
        if c in "})]":
            want = {"}": "{", ")": "(", "]": "["}[c]
            if not stack:
                errs.append(f"line {line}: stray closing {c}")
            elif stack[-1][0] != want:
                o, ol = stack[-1]
                errs.append(f"line {line}: {c} closes {o} opened at line {ol}")
                stack.pop()
            else:
                stack.pop()
            i += 1; continue
        i += 1
    for o, ol in stack:
        errs.append(f"line {ol}: {o} never closed")
    return errs

for path in sys.argv[1:]:
    src = open(path, encoding="utf-8").read()
    errs = scan(src)
    print(f"  {path}: {'CLEAN' if not errs else str(len(errs)) + ' PROBLEM(S)'}")
    for e in errs[:12]:
        print(f"     {e}")
sys.exit(1 if any(scan(open(p, encoding='utf-8').read()) for p in sys.argv[1:]) else 0)
