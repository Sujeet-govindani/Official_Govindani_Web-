/**
 * Pricing-page translations.
 *
 * Keyed by the English source string rather than by an invented key. Two
 * reasons: the English copy is already the source of truth in the data files,
 * and a missing translation falls back to English automatically instead of
 * rendering a raw key like `plans.starter.title` at a visitor.
 *
 * That fallback is what lets languages land one at a time. A half-translated
 * page reads as a bilingual page, never as a broken one.
 */

export type Dict = Record<string, string>;

/**
 * Only languages with a real dictionary belong here.
 *
 * Eight were listed while only Hindi and Marathi had translations, so five of
 * the links served English while telling Google — through hreflang — that the
 * page was Gujarati, Bengali, Tamil, Telugu or Kannada. Worse, none of those
 * URLs were prerendered, so clicking one produced a 404 on the live site.
 *
 * Add a language here when its dictionary exists, not before. The whole-site
 * EN/हिं switch in the header is separate and covers Hindi everywhere.
 */
export const LANGS = [
  { code: 'en', label: 'English',  native: 'English',  hreflang: 'en-IN' },
  { code: 'hi', label: 'Hindi',    native: 'हिन्दी',    hreflang: 'hi-IN' },
  { code: 'mr', label: 'Marathi',  native: 'मराठी',    hreflang: 'mr-IN' },
] as const;

export type LangCode = typeof LANGS[number]['code'];

export const isLang = (v: string | undefined): v is LangCode =>
  !!v && LANGS.some((l) => l.code === v);

import { hi } from './hi';
import { mr } from './mr';

const DICTS: Partial<Record<LangCode, Dict>> = { hi, mr };

/** How much of the decision content a language actually covers. */
export function coverage(code: LangCode): number {
  return code === 'en' ? 100 : Object.keys(DICTS[code] ?? {}).length;
}

/**
 * Translator for a given language. Returns the English string untouched when
 * there is no translation for it, so a partially covered language degrades
 * into bilingual rather than into gaps.
 */
export function translator(code: LangCode) {
  if (code === 'en') return (s: string) => s;
  const d = DICTS[code] ?? {};
  return (s: string) => d[s] ?? s;
}
