#!/usr/bin/env python3
"""Raw call to the free gateway. translate.py's call() filters the reply down to
the keys it sent, which is right for translation and wrong for generation."""
import json, re, subprocess, time, urllib.request

BASE = "https://api.experientiallabs.ai/v1"
CHAIN = ["gpt-5.6-luna", "deepseek-v4-flash", "qwen3.8-27b", "gpt-6-astra"]


def key():
    return subprocess.run(["security", "find-generic-password", "-s", "experientiallabs",
                           "-a", "api", "-w"], capture_output=True, text=True).stdout.strip()


def ask(system, user, k, models=None, tries=2, max_tokens=None, temperature=0.7):
    """Returns the assistant text, or None."""
    for m in (models or CHAIN):
        for attempt in range(tries):
            body = {"model": m, "temperature": temperature,
                    "messages": [{"role": "system", "content": system},
                                 {"role": "user", "content": user}]}
            if max_tokens:
                body["max_tokens"] = max_tokens
            try:
                req = urllib.request.Request(
                    BASE + "/chat/completions", data=json.dumps(body).encode(),
                    headers={"Content-Type": "application/json", "Authorization": "Bearer " + k})
                with urllib.request.urlopen(req, timeout=600) as r:
                    return json.loads(r.read())["choices"][0]["message"]["content"], m
            except Exception as e:
                s = str(e)
                if "429" in s:
                    break                      # this model is capped; next model
                if attempt == tries - 1:
                    break
                time.sleep(3 + attempt * 4)
    return None, None


def as_json(text):
    """Pull a JSON object or array out of a model reply."""
    if not text:
        return None
    t = re.sub(r"^\s*```(?:json)?|```\s*$", "", text.strip()).strip()
    for pat in (r"\{.*\}", r"\[.*\]"):
        m = re.search(pat, t, re.S)
        if m:
            try:
                return json.loads(m.group(0))
            except Exception:
                continue
    try:
        return json.loads(t)
    except Exception:
        return None
