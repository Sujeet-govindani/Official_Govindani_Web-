import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initLang, refreshLang, setLang } from './siteLang';
import { LANG_LIVE, usePreviewVisible } from '../config/flags';

/**
 * Keeps the chosen language applied across client-side navigation.
 * Each route needs its own slice of the dictionary, so this re-runs per path.
 */
export default function LangSync() {
  const { pathname } = useLocation();
  const visible = usePreviewVisible(LANG_LIVE);

  useEffect(() => {
    // A stored 'hi' from an earlier preview must not leak Hindi onto the live
    // site once the toggle is hidden again — force back to English instead.
    if (!visible) {
      // Not persisted: this also runs on the first render of every page load,
      // before the gate has resolved, and must not erase a stored choice.
      void setLang('en', false);
      return;
    }
    void initLang();
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    // Let the new route paint before walking it.
    const id = window.setTimeout(() => void refreshLang(), 60);
    return () => window.clearTimeout(id);
  }, [pathname, visible]);

  return null;
}
