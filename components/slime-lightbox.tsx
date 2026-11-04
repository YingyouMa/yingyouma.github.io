"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Figure = { src: StaticImageData; alt: string; title: string };

export function SlimeLightbox({ figures }: { figures: Figure[] }) {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.querySelector(".slime-methods-page");
    if (!root) return;
    const images = Array.from(root.querySelectorAll<HTMLElement>(".slime-method-figure"));
    const cleanups = images.map((figure, index) => {
      if (index >= figures.length) return () => {};
      const button = document.createElement("button");
      button.type = "button";
      button.className = "slime-lightbox-trigger";
      button.setAttribute("aria-label", `Enlarge figure: ${figures[index].title}`);
      while (figure.firstChild) button.appendChild(figure.firstChild);
      figure.appendChild(button);
      const open = () => { previousFocus.current = button; setActive(index); };
      button.addEventListener("click", open);
      return () => { button.removeEventListener("click", open); while (button.firstChild) figure.appendChild(button.firstChild); button.remove(); };
    });
    return () => cleanups.forEach(cleanup => cleanup());
  }, [figures]);

  useEffect(() => {
    if (active === null) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive(value => value === null ? null : (value + 1) % figures.length);
      if (event.key === "ArrowLeft") setActive(value => value === null ? null : (value - 1 + figures.length) % figures.length);
      if (event.key === "Tab") {
        const controls = Array.from(document.querySelectorAll<HTMLElement>(".slime-lightbox-dialog button"));
        const current = controls.indexOf(document.activeElement as HTMLElement);
        if (current === -1) { event.preventDefault(); controls[0]?.focus(); }
        else if (event.shiftKey && current === 0) { event.preventDefault(); controls[controls.length - 1]?.focus(); }
        else if (!event.shiftKey && current === controls.length - 1) { event.preventDefault(); controls[0]?.focus(); }
      }
    };
    window.addEventListener("keydown", keydown);
    return () => { document.body.style.overflow = originalOverflow; window.removeEventListener("keydown", keydown); previousFocus.current?.focus(); };
  }, [active, figures.length]);

  if (active === null || typeof document === "undefined") return null;
  const figure = figures[active];
  return createPortal(<div className="slime-lightbox-overlay" onMouseDown={event => { if (event.target === event.currentTarget) setActive(null); }}>
    <div className="slime-lightbox-dialog" role="dialog" aria-modal="true" aria-label="Technical figure viewer">
      <div className="slime-lightbox-top"><span>{String(active + 1).padStart(2, "0")} / {String(figures.length).padStart(2, "0")}</span><button ref={closeRef} type="button" onClick={() => setActive(null)} aria-label="Close image viewer">✕</button></div>
      <div className="slime-lightbox-stage"><button type="button" aria-label="Previous figure" onClick={() => setActive((active - 1 + figures.length) % figures.length)}>‹</button><Image src={figure.src} alt={figure.alt} sizes="95vw" priority /><button type="button" aria-label="Next figure" onClick={() => setActive((active + 1) % figures.length)}>›</button></div>
      <div className="slime-lightbox-caption">{figure.title}<span>← → to navigate · Esc to close</span></div>
    </div>
  </div>, document.body);
}
