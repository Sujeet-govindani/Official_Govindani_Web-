#!/usr/bin/env python3
"""Translate the strings the HTML extractor could never see. Resumable."""
import importlib.util, json, pathlib, time

HERE = pathlib.Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("tr", HERE / "translate.py")
tr = importlib.util.module_from_spec(spec); spec.loader.exec_module(tr)

todo = json.loads((HERE / "source_missing.json").read_text())
hi = json.loads((HERE / "hi.json").read_text())
todo = [s for s in todo if s not in hi]
print(f"  {len(todo):,} to translate", flush=True)

k = tr.key()
chain = ["gpt-5.6-luna", "deepseek-v4-flash", "gpt-6-astra", "qwen3.8-27b"]
live = list(chain)
done = 0
t0 = time.time()
for i in range(0, len(todo), 20):
    chunk = todo[i:i + 20]
    batch = {str(j): s for j, s in enumerate(chunk)}
    got = {"__error__": "none"}
    for mi, m in enumerate(list(live)):
        got = tr.call(m, batch, k, tries=2)
        if "__error__" not in got:
            if mi:
                live.insert(0, live.pop(mi))
            break
        if "429" in got["__error__"] and len(live) > 1:
            print(f"  {m} capped -> next", flush=True)
            live.remove(m)
    if "__error__" in got:
        print(f"  batch {i//20+1} failed: {got['__error__']}", flush=True)
        if not live:
            break
        continue
    for j, s in batch.items():
        v = (got.get(j) or "").strip()
        if v:
            hi[s] = v
            done += 1
    (HERE / "hi.json").write_text(json.dumps(hi, ensure_ascii=False, indent=0))
    if (i // 20) % 10 == 0:
        print(f"  {min(i+20,len(todo))}/{len(todo)} · {done} added · "
              f"{(time.time()-t0)/60:.0f}m", flush=True)
print(f"  done: {done} added", flush=True)
