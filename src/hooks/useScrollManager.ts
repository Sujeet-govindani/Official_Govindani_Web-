// hooks/useGsapManager.ts - SAFE VERSION (NO INTERVAL / NO SCROLL FIGHT)
import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export const useGsapManager = () => {
  const triggersRef = useRef<Map<string, ScrollTrigger>>(new Map());
  const initializedRef = useRef(false);
  useEffect(() => {
    if (initializedRef.current || typeof window === "undefined") return;
    initializedRef.current = true;
    // ✅ Only GSAP config - don't force overflow here (CSS should own it)
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
    });
    // ✅ Good for scroll responsiveness
    gsap.ticker.lagSmoothing(0);
    return () => {
      // ✅ Clean safely on unmount
      triggersRef.current.forEach((t) => {
        try {
          t?.kill(true);
        } catch {}
      });
      triggersRef.current.clear();
    };
  }, []);
  const registerTrigger = useCallback((id: string, trigger: ScrollTrigger) => {
    if (!id || !trigger) return;
    const existing = triggersRef.current.get(id);
    if (existing && existing !== trigger) {
      try {
        existing.kill(true);
      } catch {}
    }
    triggersRef.current.set(id, trigger);
  }, []);
  const unregisterTrigger = useCallback((id: string) => {
    const trigger = triggersRef.current.get(id);
    if (!trigger) return;
    try {
      trigger.kill(true);
    } catch {}
    triggersRef.current.delete(id);
  }, []);
  const clearAllTriggers = useCallback(() => {
    triggersRef.current.forEach((trigger) => {
      try {
        trigger?.kill(true);
      } catch {}
    });
    triggersRef.current.clear();
  }, []);
  const refreshAll = useCallback(() => {
    if (typeof window === "undefined") return;
    requestAnimationFrame(() => {
      try {
        ScrollTrigger.refresh(true);
      } catch {}
    });
  }, []);
  return { registerTrigger, unregisterTrigger, clearAllTriggers, refreshAll };
};





