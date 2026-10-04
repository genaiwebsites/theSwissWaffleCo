"use client";

import { useEffect } from "react";

export default function ScriptsLoader() {
  useEffect(() => {
    let cancelled = false;

    const scripts = [
      "/assets/js/vendor/gsap.min.js",
      "/assets/js/vendor/ScrollTrigger.min.js",
      "/assets/js/vendor/SplitText.min.js",
      "/assets/js/vendor/DrawSVGPlugin.min.js",
      "/assets/js/vendor/lenis.min.js",
      "/assets/js/vendor/motion.js",
      "/assets/js/main.js",
      "/assets/js/scene.js",
    ];

    async function loadScripts() {
      for (const src of scripts) {
        if (cancelled) return;
        await new Promise<void>((resolve) => {
          // If script tag already exists and is loaded
          const existing = document.querySelector(`script[data-src="${src}"]`);
          if (existing) {
            resolve();
            return;
          }

          const s = document.createElement("script");
          s.src = src;
          s.setAttribute("data-src", src);
          s.async = false;
          s.onload = () => resolve();
          s.onerror = (e) => {
            console.error(`Failed to load ${src}:`, e);
            resolve();
          };
          document.body.appendChild(s);
        });
      }

      if (!cancelled && typeof window !== "undefined" && (window as any).ScrollTrigger) {
        setTimeout(() => {
          (window as any).ScrollTrigger.refresh();
        }, 100);
      }
    }

    loadScripts();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
