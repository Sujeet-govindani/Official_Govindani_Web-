import { useEffect, useState } from 'react';

/**
 * Ship gates.
 *
 * The pricing flow — the full-screen finder, the industry chooser, the function
 * picker, the restructured Give Setu page and the chat assistant — is finished
 * locally before any of it is reachable from the live site. Flip PRICING_LIVE
 * to true when it is ready to go out.
 *
 * The routes themselves stay registered, so /pricing/... still works if you
 * type it. This hides the entry points, which is what a visitor can find.
 */
export const PRICING_LIVE = true;

/** The chat needs a server-side API key before it can answer anything. */
export const CHAT_LIVE = true;

/**
 * Site-wide Hindi. The dictionary is machine-translated and still filling in,
 * so the EN/हिं switch stays hidden from visitors until the copy is complete
 * and reviewed. Preview it with ?preview=1 like everything else.
 */
export const LANG_LIVE = true;

const OVERRIDE = 'gs.preview';

/**
 * True while developing, or wherever the override key has been set by hand.
 *
 * There is no hostname check here on purpose. The prerenderer drives a real
 * browser against 127.0.0.1, so "visible on localhost" evaluates to true during
 * the build and the hidden thing gets baked into the static HTML — which is
 * exactly what happened the first time this was written. localStorage is empty
 * in that browser, so keying on it keeps the build output honest.
 *
 * To preview on a built site, just visit any page with ?preview=1 once — the
 * choice sticks for that browser afterwards. ?preview=0 turns it back off.
 *
 * Resolved in an effect so the first client render matches the prerendered
 * markup and hydration stays clean.
 */
export function usePreviewVisible(live: boolean): boolean {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (live || import.meta.env.DEV) { setOn(true); return; }
    try {
      // ?preview=1 flips it on for this browser and stays on; ?preview=0 clears it
      const q = new URLSearchParams(window.location.search).get('preview');
      if (q === '1') window.localStorage.setItem(OVERRIDE, 'on');
      if (q === '0') window.localStorage.removeItem(OVERRIDE);
      if (window.localStorage.getItem(OVERRIDE) === 'on') setOn(true);
    } catch { /* private mode: stay hidden */ }
  }, [live]);
  return on;
}
