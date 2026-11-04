"use client";

import { useEffect } from "react";

export function SlimeSpotlightCards() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(hover: none)").matches) return;
    const cards = document.querySelectorAll<HTMLElement>(".slime-showcase .slime-capability, .slime-showcase .slime-example");
    const cleanups = Array.from(cards, card => {
      const move = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
        card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
      };
      card.addEventListener("pointermove", move, { passive: true });
      return () => card.removeEventListener("pointermove", move);
    });
    return () => cleanups.forEach(cleanup => cleanup());
  }, []);
  return null;
}
