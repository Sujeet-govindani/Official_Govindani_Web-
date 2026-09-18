/**
 * Site-wide Hindi via DOM text substitution.
 *
 * Why this and not t() in every component: the site renders from 249 components
 * and 5.9 MB of source. Wrapping each one would be a 249-file refactor with a
 * real chance of breaking pages. Translating what the DOM actually shows covers
 * every component, including ones nobody remembers to update, and cannot drift
 * from the rendered output.
 *
 * The dictionary is FETCHED, never bundled — an English visitor downloads zero
 * extra bytes, and the Hindi payload is split per page so nobody pulls the
 * whole site's copy to read one page.
 */

export type Lang = 'en' | 'hi';
const KEY = 'gi.lang';
const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE', 'TEXTAREA', 'SVG']);
const ATTRS = ['alt', 'title', 'placeholder', 'aria-label'] as const;

let dict: Record<string, string> = {};
let originalTitle: string | null = null;
let observer: MutationObserver | null = null;
let applying = false;

/** Same normalisation the extractor used, or nothing would ever match. */
const norm = (s: string) => s.replace(/\s+/g, ' ').trim();

/** Originals are kept so switching back to English needs no reload. */
const originals = new WeakMap<Node, string>();
const attrOriginals = new WeakMap<Element, Map<string, string>>();

export function getLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  return window.localStorage.getItem(KEY) === 'hi' ? 'hi' : 'en';
}

function pageSlug(): string {
  const p = window.location.pathname.replace(/^\/+|\/+$/g, '');
  return p ? p.replace(/[^a-z0-9]+/gi, '-').toLowerCase() : 'home';
}

async function loadDict(): Promise<void> {
  const want = ['common', pageSlug()];
  const parts = await Promise.all(
    want.map((n) =>
      fetch(`/i18n/hi/${n}.json`)
        .then((r) => (r.ok ? r.json() : {}))
        .catch(() => ({})),
    ),
  );
  dict = Object.assign({}, ...parts);
}

function translateNode(root: Node): void {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      const p = n.parentElement;
      if (!p || SKIP.has(p.tagName)) return NodeFilter.FILTER_REJECT;
      return n.nodeValue && n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
  const hits: Text[] = [];
  let cur: Node | null;
  while ((cur = walker.nextNode())) hits.push(cur as Text);

  for (const t of hits) {
    const raw = t.nodeValue || '';
    const hit = dict[norm(raw)];
    if (!hit) continue;
    if (!originals.has(t)) originals.set(t, raw);
    // Preserve the node's own leading/trailing whitespace — dropping it collapses
    // inline layout ("Read more" glued to the next word).
    const lead = raw.match(/^\s*/)?.[0] ?? '';
    const tail = raw.match(/\s*$/)?.[0] ?? '';
    t.nodeValue = lead + hit + tail;
  }

  const el = root instanceof Element ? root : document.body;
  el.querySelectorAll<HTMLElement>('[alt],[title],[placeholder],[aria-label]').forEach((node) => {
    for (const a of ATTRS) {
      const v = node.getAttribute(a);
      if (!v) continue;
      const hit = dict[norm(v)];
      if (!hit) continue;
      let m = attrOriginals.get(node);
      if (!m) attrOriginals.set(node, (m = new Map()));
      if (!m.has(a)) m.set(a, v);
      node.setAttribute(a, hit);
    }
  });
}

function restore(root: Node): void {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let cur: Node | null;
  while ((cur = walker.nextNode())) {
    const o = originals.get(cur);
    if (o !== undefined) (cur as Text).nodeValue = o;
  }
  document.querySelectorAll('[alt],[title],[placeholder],[aria-label]').forEach((node) => {
    const m = attrOriginals.get(node);
    if (m) m.forEach((v, a) => node.setAttribute(a, v));
  });
}

function watch(): void {
  if (observer) return;
  observer = new MutationObserver((muts) => {
    if (applying) return;               // our own writes must not re-trigger us
    applying = true;
    observer!.disconnect();
    for (const m of muts) {
      m.addedNodes.forEach((n) => {
        if (n.nodeType === 1 || n.nodeType === 3) translateNode(n);
      });
      if (m.type === 'characterData' && m.target.nodeType === 3) translateNode(m.target);
    }
    observer!.observe(document.body, { childList: true, subtree: true, characterData: true });
    applying = false;
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
}

/**
 * `persist: false` shows a language WITHOUT recording the choice. The preview
 * gate needs this: it resolves to "hidden" on the first render of every page
 * load and only flips to "visible" in an effect afterwards. Writing 'en' during
 * that first pass overwrote a visitor's stored Hindi before it could be read,
 * so Hindi never survived a page load.
 */
export async function setLang(lang: Lang, persist = true): Promise<void> {
  if (typeof window === 'undefined') return;
  if (persist) {
    try { window.localStorage.setItem(KEY, lang); } catch { /* private mode */ }
  }
  document.documentElement.lang = lang;

  if (lang === 'en') {
    observer?.disconnect();
    observer = null;
    restore(document.body);
    if (originalTitle !== null) {
      document.title = originalTitle;
      originalTitle = null;
    }
    return;
  }
  await loadDict();
  applying = true;
  translateNode(document.body);
  const dt = dict[norm(document.title)];
  if (dt) {
    if (originalTitle === null) originalTitle = document.title;
    document.title = dt;
  }
  applying = false;
  watch();
}

/** Re-run after a client-side route change: a new page needs its own slice. */
export async function refreshLang(): Promise<void> {
  if (getLang() === 'hi') await setLang('hi');
}

export async function initLang(): Promise<void> {
  if (getLang() === 'hi') await setLang('hi');
}
