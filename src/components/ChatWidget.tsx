import { useEffect, useRef, useState } from 'react';
import { CHAT_LIVE, usePreviewVisible } from '@/config/flags';

/**
 * Sales manager assistant.
 *
 * Talks to /api/chat.php, which holds the Anthropic key server-side. Nothing
 * secret is in this file or in the bundle it ships in.
 *
 * Degrades honestly: if the endpoint is missing (local dev, or before the
 * server is configured) it says the assistant is not available and offers
 * WhatsApp, rather than sitting there looking broken.
 */

const LANGS = [
  { code: 'en-IN', label: 'English' },
  { code: 'hi-IN', label: 'हिन्दी' },
  { code: 'mr-IN', label: 'मराठी' },
  { code: 'gu-IN', label: 'ગુજરાતી' },
  { code: 'bn-IN', label: 'বাংলা' },
  { code: 'ta-IN', label: 'தமிழ்' },
  { code: 'te-IN', label: 'తెలుగు' },
  { code: 'kn-IN', label: 'ಕನ್ನಡ' },
];

import COPY from './chatI18n.json';

/** Remembered so a returning visitor is not asked to choose twice. */
const LANG_KEY = 'gs.chatLang';

type Copy = typeof COPY['en-IN'];
const copyFor = (code: string): Copy =>
  ((COPY as Record<string, Copy>)[code] ?? COPY['en-IN']);
const openersFor = (c: Copy) => [c.o1, c.o2, c.o3, c.o4];

type Msg = { role: 'user' | 'assistant'; content: string };

/**
 * Models emit **bold** and `code` however hard you ask them not to, and the
 * panel was showing the raw asterisks. This turns those markers into elements.
 *
 * Deliberately no lookbehind in the pattern: Safari only gained support in
 * 16.4, and an unsupported regex throws at construction — which would take the
 * whole widget down on an older iPhone rather than just mis-formatting a word.
 * No innerHTML either, so a reply containing tags can only ever render as text.
 */
function formatted(text: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  // A literal "- " at the start of a line reads as a stray dash; use a bullet.
  const src = text.replace(/^[ \t]*[-*][ \t]+/gm, '\u2022 ');
  // An UNCLOSED ** is left behind by the model often enough to matter — a reply
  // opening "**Tum kis kaam..." with no closing pair showed the asterisks raw.
  // Pairs are formatted; any odd marker left over is deleted rather than shown.
  const re = /\*\*([\s\S]+?)\*\*|`([^`]+?)`/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(src))) {
    if (m.index > last) out.push(src.slice(last, m.index));
    if (m[1] !== undefined) out.push(<strong key={k++}>{m[1]}</strong>);
    else out.push(<code key={k++}>{m[2]}</code>);
    last = re.lastIndex;
  }
  if (last < src.length) out.push(src.slice(last));
  return out.map((n) => (typeof n === 'string' ? n.replace(/\*\*/g, '') : n));
}

const WA = 'https://wa.me/919201958278';

/* Conversations persist in the visitor's own browser, not on our server.
   Two reasons: nothing of theirs sits in our infrastructure to be leaked or
   subject-access-requested, and it costs nothing to run. It is capped and it
   expires, because an unbounded transcript is both a privacy liability and a
   token bill — every remembered turn is re-sent, and re-charged, on the next
   question. Prompt caching does not help there: it caches the fixed brief,
   never the moving conversation. */
const STORE = 'gs.chat';
const KEEP_TURNS = 12;
const EXPIRES_MS = 1000 * 60 * 60 * 24 * 7;   // a week, then it forgets

function loadHistory(): Msg[] {
  try {
    const raw = localStorage.getItem(STORE);
    if (!raw) return [];
    const v = JSON.parse(raw);
    if (!v?.at || Date.now() - v.at > EXPIRES_MS) { localStorage.removeItem(STORE); return []; }
    return Array.isArray(v.msgs) ? v.msgs.slice(-KEEP_TURNS * 2) : [];
  } catch { return []; }
}

function saveHistory(msgs: Msg[]) {
  try {
    localStorage.setItem(STORE, JSON.stringify({ at: Date.now(), msgs: msgs.slice(-KEEP_TURNS * 2) }));
  } catch { /* private mode, or storage full — the chat still works, it just forgets */ }
}

export default function ChatWidget() {
  const visible = usePreviewVisible(CHAT_LIVE);
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [restored, setRestored] = useState(false);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [lang, setLang] = useState('en-IN');
  // Null until they have chosen: the first thing the panel shows is the language
  // picker, so nobody has to read an English wall before they can reply.
  const [picked, setPicked] = useState<string | null>(null);
  const c = copyFor(lang);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved) { setLang(saved); setPicked(saved); }
    } catch { /* private mode: just ask again */ }
  }, []);

  const choose = (code: string) => {
    setLang(code);
    setPicked(code);
    try { localStorage.setItem(LANG_KEY, code); } catch { /* not essential */ }
  };
  const [speak, setSpeak] = useState(false);
  const [listening, setListening] = useState(false);
  const [micNote, setMicNote] = useState('');
  const [dead, setDead] = useState('');
  const [choices, setChoices] = useState<{ prompt: string; options: string[] } | null>(null);
  const recog = useRef<any>(null);
  const feed = useRef<HTMLDivElement>(null);

  // Restore after mount, never during render, so the prerendered markup and the
  // first client render agree.
  useEffect(() => {
    const prev = loadHistory();
    if (!prev.length) return;
    setMsgs(prev);
    setRestored(true);
    // The input row only renders once a language has been picked, and the
    // picker only rendered when there were no messages. So a visitor whose
    // stored conversation predates the language picker came back to their old
    // thread with no picker and no input — a panel they could read and could
    // not answer. Anyone who used the bot before the picker shipped is in that
    // state. If history survived but the language choice did not, fall back to
    // the current default so there is always a way to type.
    setPicked((cur) => cur ?? 'en-IN');
  }, []);

  useEffect(() => { if (msgs.length) saveHistory(msgs); }, [msgs]);

  useEffect(() => {
    // Scroll to the TOP of the newest reply, not the bottom of the feed.
    // Jumping to the end left the visitor looking at the last line of a long
    // answer with no idea where it began.
    const box = feed.current;
    if (!box) return;
    const msgs = box.querySelectorAll<HTMLElement>('.gsc-msg.assistant');
    const last = msgs[msgs.length - 1];
    if (last) {
      const top = last.offsetTop - box.offsetTop - 8;
      box.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    } else {
      box.scrollTo({ top: box.scrollHeight, behavior: 'smooth' });
    }
  }, [msgs, busy]);

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  }, [open]);

  /* what they told the pricing finder, so the assistant does not re-ask */
  const carriedContext = () => {
    try {
      const raw = sessionStorage.getItem('gs.pick') || sessionStorage.getItem('gs.pick.seen');
      if (!raw) return '';
      const p = JSON.parse(raw);
      const bits = [];
      if (p.industryLabel) bits.push(`Industry: ${p.industryLabel}`);
      if (p.picked?.length) bits.push(`Asked for: ${p.picked.join(', ')}`);
      if (p.described) bits.push(`In their words: ${p.described}`);
      return bits.join('. ').slice(0, 900);
    } catch { return ''; }
  };

  const say = (text: string) => {
    if (!speak || typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang;
      window.speechSynthesis.speak(u);
    } catch { /* voice is a bonus, never a requirement */ }
  };

  const send = async (text: string) => {
    const clean = text.trim();
    if (!clean || busy) return;
    const next: Msg[] = [...msgs, { role: 'user', content: clean }];
    setMsgs(next);
    setDraft('');
    setChoices(null);
    setBusy(true);
    try {
      const res = await fetch('/api/chat.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next.slice(-12),
          lang: LANGS.find((l) => l.code === lang)?.label ?? 'English',
          context: carriedContext(),
        }),
      });
      const ct = res.headers.get('content-type') || '';
      if (!ct.includes('application/json')) throw new Error('not-json');
      const data = await res.json();
      if (data.setup) { setDead('notlive'); setBusy(false); return; }
      if (data.reply) {
        setMsgs((m) => [...m, { role: 'assistant', content: data.reply }]);
        if (data.choices?.options?.length) setChoices(data.choices);
        say(data.reply);
      } else {
        setMsgs((m) => [...m, {
          role: 'assistant',
          content: data.error || 'I could not answer that just now. WhatsApp is quicker for anything urgent.',
        }]);
      }
    } catch {
      setDead('offline');
    } finally {
      setBusy(false);
    }
  };

  /* Why this is more than three lines.
   *
   * Every failure here used to be silent: an unsupported browser returned
   * early, a denied microphone only flipped a flag, and r.start() could throw
   * without anyone hearing it. On a phone that reads as a dead button, which is
   * exactly how it was reported. So each outcome now says something.
   *
   * The permission is also requested through getUserMedia first. Speech
   * recognition alone does not reliably raise the OS prompt on mobile — on some
   * builds it fails straight to "not-allowed" without ever asking — and the
   * stream is released immediately, since it is only there to get consent. */
  const micSay = (m: string) => { setMicNote(m); window.setTimeout(() => setMicNote(''), 4200); };

  const mic = async () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      micSay(c.micUnsupported);
      return;
    }
    if (listening) { recog.current?.stop(); return; }

    /* Ask, don't lecture.
     *
     * getUserMedia is what actually opens the browser's permission dialog, and
     * it only opens while the permission is still in its default state. Once a
     * browser has recorded a refusal it will never prompt again from a page —
     * that is the browser's rule, not ours, and no amount of asking changes it.
     *
     * So the state is checked first, and the "turn it on in settings" line is
     * kept for the one case where the browser truly will not ask. Everywhere
     * else the dialog is opened, including when the permission has never been
     * requested. Safari does not answer a microphone permission query at all;
     * that throws, and an unknown state is treated as worth asking. */
    let denied = false;
    try {
      const q = (navigator as any).permissions?.query;
      if (q) {
        const st = await (navigator as any).permissions.query({ name: 'microphone' });
        denied = st?.state === 'denied';
      }
    } catch { /* Safari and others: no answer, so go ahead and ask */ }

    if (denied) {
      micSay(c.micBlocked);
      return;
    }

    try {
      const media = navigator.mediaDevices;
      if (media?.getUserMedia) {
        const stream = await media.getUserMedia({ audio: true });
        stream.getTracks().forEach((t) => t.stop());   // consent only, not a recording
      }
    } catch (e: any) {
      // Dismissing the dialog lands here too, which is a refusal for now but not
      // a permanent one, so it does not get the settings lecture.
      micSay(e?.name === 'NotFoundError' ? c.micNoDevice
        : e?.name === 'NotAllowedError' ? c.micBlocked : c.micDenied);
      return;
    }

    const r = new SR();
    recog.current = r;
    r.lang = lang; r.interimResults = true; r.continuous = false;
    r.onresult = (e: any) => setDraft(Array.from(e.results).map((x: any) => x[0].transcript).join(' '));
    r.onerror = (e: any) => {
      setListening(false);
      const k = e?.error;
      if (k === 'not-allowed' || k === 'service-not-allowed') micSay(c.micBlocked);
      else if (k === 'no-speech') micSay(c.micNoSpeech);
      else if (k === 'audio-capture') micSay(c.micNoDevice);
      else if (k !== 'aborted') micSay(c.micFailed);
    };
    r.onend = () => setListening(false);
    setListening(true);
    try {
      r.start();
    } catch {
      setListening(false);
      micSay(c.micFailed);
    }
  };

  // Read after mount, not during render: the prerendered markup has no window,
  // and a value computed during render would disagree with it on hydration.
  const [micAvailable, setMicAvailable] = useState(false);
  useEffect(() => {
    setMicAvailable(!!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition));
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{CSS}</style>

      <button className={`gsc-launch${open ? ' hidden' : ''}`} onClick={() => setOpen(true)}
        aria-label="Open GI Assistant">
        <svg className="gsc-ic" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
            stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="gsc-lt">GI Assistant</span>
      </button>

      {open && (
        <div className="gsc" role="dialog" aria-label="GI Assistant">
          <header className="gsc-head">
            <div>
              <b>GI Assistant</b>
              <span>{c.subtitle}</span>
            </div>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              {msgs.length > 0 && (
                <button className="gsc-clear"
                  onClick={() => {
                    try { localStorage.removeItem(STORE); } catch { /* nothing to clear */ }
                    setMsgs([]); setRestored(false); setDead('');
                  }}
                  aria-label="Forget this conversation">Clear</button>
              )}
              <button onClick={() => setOpen(false)} aria-label="Close">×</button>
            </div>
          </header>

          <div className="gsc-feed" ref={feed}>
            {!dead && !picked && (
              <div className="gsc-pick">
                <p>Which language would you like to talk in?</p>
                <div className="gsc-picks">
                  {LANGS.map((l) => (
                    <button key={l.code} onClick={() => choose(l.code)} lang={l.code}>
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {msgs.length === 0 && !dead && picked && (
              <>
                <p className="gsc-hello">{c.welcome}</p>
                <div className="gsc-openers">
                  {openersFor(c).map((o) => (
                    <button key={o} onClick={() => send(o)}>{o}</button>
                  ))}
                </div>
              </>
            )}

            {restored && msgs.length > 0 && (
              <p className="gsc-resumed">
                Picking up where we left off. <button onClick={() => {
                  try { localStorage.removeItem(STORE); } catch { /* nothing to clear */ }
                  setMsgs([]); setRestored(false);
                }}>Start fresh</button>
              </p>
            )}

            {msgs.map((m, i) => (
              <div key={i} className={`gsc-msg ${m.role}`}>
                {m.role === 'assistant' ? formatted(m.content) : m.content}
              </div>
            ))}

            {busy && <div className="gsc-msg assistant gsc-dots"><i /><i /><i /></div>}

            {!busy && choices && (
              <div className="gsc-choices">
                <p>{choices.prompt}</p>
                {choices.options.map((o) => (
                  <button key={o} onClick={() => send(o)}>{o}</button>
                ))}
              </div>
            )}

            {dead && (
              <div className="gsc-dead">
                <b>{dead === 'notlive' ? 'The assistant is not switched on yet.' : 'I cannot reach the assistant.'}</b>
                <span>
                  {dead === 'notlive'
                    ? 'It is being set up. In the meantime a person will answer you faster than I would.'
                    : 'That is on our side, not yours. A person will answer faster anyway.'}
                </span>
                <div className="gsc-deadcta">
                  <a href={WA} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
                  <a href="/contact-us/">Contact form</a>
                </div>
              </div>
            )}
          </div>

          <div className="gsc-tools">
            <select value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Language">
              {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
            <button className={`gsc-sp${speak ? ' on' : ''}`} onClick={() => setSpeak(!speak)}
              aria-pressed={speak} aria-label="Read answers aloud">
              <svg className="gsc-ic2" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M11 5 6 9H3v6h3l5 4V5z" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round" />
                {speak && <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"
                  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}
              </svg>
              {speak ? 'Reading aloud' : 'Read aloud'}
            </button>
          </div>

          {micNote && <p className="gsc-micnote" role="status">{micNote}</p>}

          {picked && (
          <form className="gsc-input" onSubmit={(e) => { e.preventDefault(); send(draft); }}>
            {(
              <button type="button" className={`gsc-mic${listening ? ' on' : ''}${micAvailable ? '' : ' off'}`} onClick={mic}
                aria-label={listening ? 'Stop' : 'Speak your question'}>
                {listening ? (
                  <svg className="gsc-ic2" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="7" y="7" width="10" height="10" rx="1.5" fill="currentColor" />
                  </svg>
                ) : (
                  <svg className="gsc-ic2" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" strokeWidth="1.8"
                      strokeLinecap="round" />
                  </svg>
                )}
              </button>
            )}
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(draft); }
              }}
              placeholder={listening ? 'Listening…' : c.placeholder}
              rows={1}
              disabled={busy}
            />
            <button type="submit" disabled={busy || !draft.trim()} aria-label="Send">→</button>
          </form>
          )}

          <p className="gsc-foot">
            An assistant, not a quotation. For anything binding, talk to a person.
          </p>
        </div>
      )}
    </>
  );
}

const CSS = `
.gsc-launch { position:fixed; right:20px; bottom:96px; z-index:9999998;
  display:flex; align-items:center; gap:9px; background:#111; color:#fff;
  border:1px solid #b3924f; border-radius:999px; padding:12px 18px; cursor:pointer;
  font-family:'Inter',system-ui,sans-serif; font-size:.87rem; font-weight:600;
  box-shadow:0 8px 26px rgba(0,0,0,.28); transition:transform .2s, background .2s; }
.gsc-launch .gsc-ic { width:19px; height:19px; flex:none; display:block; color:#e8c877; }
.gsc-ic2 { width:15px; height:15px; flex:none; display:inline-block; vertical-align:-2px;
  margin-right:5px; color:currentColor; }
.gsc-input button .gsc-ic2 { width:18px; height:18px; margin:0; vertical-align:0; }
.gsc-launch:hover { transform:translateY(-2px); background:#1b1a17; }
.gsc-launch.hidden { display:none; }
/* Mobile: clear the 57px bottom dock (plus the iPhone home indicator) and
   shrink to an icon-only pill so it never crowds the dock's centre button. */
@media (max-width:640px){
  .gsc-launch { right:16px; bottom:calc(72px + env(safe-area-inset-bottom, 0px));
    padding:0; width:52px; height:52px; justify-content:center; gap:0; }
  .gsc-launch .gsc-ic { width:23px; height:23px; }
  .gsc-launch .gsc-lt { display:none; }
}

.gsc { position:fixed; right:20px; bottom:96px; z-index:9999999; width:min(390px,calc(100vw - 40px));
  height:min(580px,calc(100vh - 140px)); background:#141311; border:1px solid #3a352c;
  border-radius:18px; display:flex; flex-direction:column; overflow:hidden;
  font-family:'Inter',system-ui,sans-serif; box-shadow:0 24px 60px rgba(0,0,0,.5);
  animation:gscIn .26s cubic-bezier(.2,0,.2,1); }
@keyframes gscIn { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:none } }
@media (max-width:640px){
  .gsc { left:10px; right:10px; width:auto;
    bottom:calc(66px + env(safe-area-inset-bottom, 0px));
    height:min(72vh, calc(100vh - 150px)); }
}

.gsc-head { display:flex; justify-content:space-between; align-items:center; gap:12px;
  padding:15px 17px; border-bottom:1px solid #2a251f; background:#1a1815; }
.gsc-head b { display:block; color:#fff; font-size:.95rem; }
.gsc-head span { display:block; color:#8f8878; font-size:.76rem; margin-top:2px; }
.gsc-head button { background:none; border:0; color:#8f8878; font-size:1.5rem; cursor:pointer;
  line-height:1; padding:0 4px; }
.gsc-head button:hover { color:#fff; }

.gsc-feed { flex:1; overflow-y:auto; padding:16px 17px; display:flex; flex-direction:column; gap:10px; }
.gsc-hello { color:#c9c3b6; font-size:.88rem; line-height:1.6; margin:0; }
.gsc-openers { display:flex; flex-direction:column; gap:7px; margin-top:4px; }
.gsc-openers button { text-align:left; background:rgba(255,255,255,.05);
  border:1px solid #3a352c; color:#ddd7ca; border-radius:9px; padding:9px 12px;
  font:inherit; font-size:.83rem; cursor:pointer; }
.gsc-openers button:hover { border-color:#b3924f; color:#fff; }

.gsc-msg { max-width:86%; padding:10px 13px; border-radius:12px; font-size:.88rem;
  line-height:1.6; white-space:pre-wrap; word-break:break-word; }
.gsc-msg.user { align-self:flex-end; background:#b3924f; color:#111; font-weight:500;
  border-bottom-right-radius:4px; }
.gsc-msg strong { font-weight:700; color:#f0e9d8; }
.gsc-msg em { font-style:italic; }
.gsc-msg code { font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:.82em;
  background:rgba(255,255,255,.08); padding:1px 5px; border-radius:4px; }
.gsc-msg.assistant { align-self:flex-start; background:rgba(255,255,255,.06); color:#ddd7ca;
  border:1px solid #2a251f; border-bottom-left-radius:4px; }
.gsc-dots { display:flex; gap:5px; align-items:center; }
.gsc-dots i { width:6px; height:6px; border-radius:50%; background:#8f8878;
  animation:gscBlink 1.2s infinite; }
.gsc-dots i:nth-child(2){ animation-delay:.18s } .gsc-dots i:nth-child(3){ animation-delay:.36s }
@keyframes gscBlink { 0%,80%,100%{opacity:.25} 40%{opacity:1} }

.gsc-dead { background:rgba(179,146,79,.1); border:1px solid #4a4033; border-radius:12px;
  padding:14px; }
.gsc-dead b { display:block; color:#d8c48d; font-size:.88rem; margin-bottom:5px; }
.gsc-dead span { display:block; color:#a49b8b; font-size:.83rem; line-height:1.55; }
.gsc-deadcta { display:flex; gap:8px; margin-top:11px; }
.gsc-deadcta a { flex:1; text-align:center; background:#b3924f; color:#111; font-weight:700;
  font-size:.82rem; padding:9px; border-radius:8px; text-decoration:none; }
.gsc-deadcta a:last-child { background:none; border:1px solid #4a4033; color:#d8c48d; }

.gsc-tools { display:flex; gap:8px; padding:9px 14px; border-top:1px solid #2a251f; }
.gsc-tools select, .gsc-sp { background:rgba(255,255,255,.06); border:1px solid #3a352c;
  color:#c9c3b6; font:inherit; font-size:.76rem; padding:6px 9px; border-radius:7px; cursor:pointer; }
.gsc-tools select option { background:#1a1815; }
.gsc-sp.on { border-color:#b3924f; color:#d8c48d; }

.gsc-input { display:flex; gap:8px; padding:11px 14px 12px; border-top:1px solid #2a251f;
  align-items:flex-end; }
.gsc-input textarea { flex:1; background:rgba(255,255,255,.06); border:1px solid #3a352c;
  border-radius:10px; color:#fff; font:inherit; font-size:.88rem; padding:10px 12px;
  resize:none; max-height:96px; line-height:1.45; }
.gsc-input textarea::placeholder { color:#7d7566; }
.gsc-input button { flex:none; width:40px; height:40px; border-radius:10px; border:0;
  background:#b3924f; color:#111; font-size:1.05rem; font-weight:700; cursor:pointer; }
.gsc-input button:disabled { opacity:.35; cursor:not-allowed; }
.gsc-mic.off { opacity:.45; }
.gsc-micnote { margin:0; padding:0 14px 6px; color:#d8b26a; font-size:.76rem; line-height:1.45; }
.gsc-mic { background:rgba(255,255,255,.08) !important; color:#d8c48d !important;
  border:1px solid #3a352c !important; }
.gsc-mic.on { background:#c0392b !important; color:#fff !important;
  animation:gscPulse 1.1s ease-in-out infinite; }
@keyframes gscPulse { 0%,100%{opacity:1} 50%{opacity:.6} }

.gsc-foot { margin:0; padding:0 14px 12px; color:#6f6859; font-size:.71rem; line-height:1.5; }
.gsc-pick p { color:#c9c3b6; font-size:.9rem; margin:2px 0 12px; }
.gsc-picks { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.gsc-picks button { padding:11px 10px; border-radius:11px; border:1px solid #3a352c;
  background:rgba(255,255,255,.04); color:#e5dfd2; font-size:.92rem; cursor:pointer;
  transition:.18s; font-family:inherit; }
.gsc-picks button:hover { background:rgba(212,175,55,.14); border-color:#b3924f; }
@media (prefers-reduced-motion:reduce){
  .gsc { animation:none } .gsc-dots i, .gsc-mic.on { animation:none }
}
.gsc-clear { background:none; border:1px solid #3a352c; color:#8f8878; font:inherit;
  font-size:.72rem; padding:4px 9px; border-radius:6px; cursor:pointer; }
.gsc-clear:hover { border-color:#b3924f; color:#d8c48d; }
.gsc-resumed { margin:0 0 4px; font-size:.76rem; color:#7d7566; text-align:center; }
.gsc-resumed button { background:none; border:0; color:#b3924f; font:inherit; font-size:.76rem;
  cursor:pointer; text-decoration:underline; text-underline-offset:3px; padding:0; }
.gsc-choices { display:flex; flex-direction:column; gap:6px; margin-top:2px; }
.gsc-choices p { margin:0 0 4px; font-size:.79rem; color:#8f8878; }
.gsc-choices button { text-align:left; background:rgba(216,196,141,.1); border:1px solid #6b5f47;
  color:#e8e3d9; border-radius:9px; padding:9px 13px; font:inherit; font-size:.84rem;
  cursor:pointer; transition:background .15s, border-color .15s; }
.gsc-choices button:hover { background:rgba(216,196,141,.22); border-color:#d8c48d; color:#fff; }
`;
