#!/usr/bin/env python3
"""Re-apply scoring to replies already on disk. No model, no cost.

Every reply is stored, so when a scoring rule is corrected the whole run can be
re-judged in a second instead of re-generated in hours.
"""
import json, pathlib, sys, importlib.util, collections
HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
spec = importlib.util.spec_from_file_location("rl", HERE / "run_local.py")
rl = importlib.util.module_from_spec(spec); spec.loader.exec_module(rl)

cases = {c["q"]: c for c in json.loads((HERE / "set500.json").read_text(encoding="utf-8"))}
path = HERE / sys.argv[1] if len(sys.argv) > 1 else HERE / "results-local-500.json"
rs = json.loads(path.read_text(encoding="utf-8"))

before = sum(1 for r in rs if r["pass"])
changed = []
for r in rs:
    c = cases.get(r["q"])
    if not c:
        continue
    low = r["a"].lower()
    flags = rl.arithmetic_flags(r["a"])
    must, must_not = c["must"], c["must_not"]
    if c["tag"] == "plan fit":
        must, must_not = [], []
    if must:
        if not any(rl.contains(low, m) for m in must):
            flags.append(f"missing expected: {must[:3]}")
        for m in must_not:
            if rl.contains(low, m):
                flags.append(f"quoted wrong value: {m}")
    was = r["pass"]
    r["flags"], r["pass"] = flags, not flags
    if was != r["pass"]:
        changed.append((r["tag"], was, r["pass"]))

after = sum(1 for r in rs if r["pass"])
path.write_text(json.dumps(rs, ensure_ascii=False, indent=1), encoding="utf-8")
print(f"  {path.name}: {len(rs)} scored")
print(f"  passing {before} -> {after}  ({before/len(rs)*100:.0f}% -> {after/len(rs)*100:.0f}%)")
print(f"  verdicts changed: {len(changed)}")
for tag, n in collections.Counter(t for t, w, a in changed if a).most_common():
    print(f"    +{n:<3} now passing: {tag}")
print("\n  remaining failures by type:")
for tag, n in collections.Counter(r["tag"] for r in rs if not r["pass"]).most_common(8):
    tot = sum(1 for r in rs if r["tag"] == tag)
    print(f"    {n:>3}/{tot:<3} {tag}")
