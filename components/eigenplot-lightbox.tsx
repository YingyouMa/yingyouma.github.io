"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type EigenplotImage = { src: string; alt: string };

export function EigenplotLightbox({ images }: { images: EigenplotImage[] }) {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const image = target.closest<HTMLImageElement>("img[data-eigen-lightbox]");
      if (!image) return;
      const index = images.findIndex(item => item.src === image.getAttribute("src"));
      if (index < 0) return;
      event.preventDefault();
      previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setActive(index);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [images]);

  useEffect(() => {
    if (active === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive(index => index === null ? null : (index + 1) % images.length);
      if (event.key === "ArrowLeft") setActive(index => index === null ? null : (index - 1 + images.length) % images.length);
      if (event.key === "Tab") {
        const controls = Array.from(document.querySelectorAll<HTMLElement>(".eigen-lightbox button"));
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previousFocus.current?.focus();
    };
  }, [active !== null, images.length]);

  if (active === null || typeof document === "undefined") return null;
  const item = images[active];
  return createPortal(<div className="eigen-lightbox" role="dialog" aria-modal="true" aria-label="Enlarged scientific visualization" onMouseDown={event => { if (event.target === event.currentTarget) setActive(null); }}>
    <button ref={closeRef} type="button" className="eigen-lightbox-close" aria-label="Close enlarged image" onClick={() => setActive(null)}>×</button>
    <button type="button" className="eigen-lightbox-prev" aria-label="Previous image" onClick={() => setActive((active - 1 + images.length) % images.length)}>‹</button>
    <figure><img src={item.src} alt={item.alt} /><figcaption>{active + 1} / {images.length} · {item.alt}</figcaption></figure>
    <button type="button" className="eigen-lightbox-next" aria-label="Next image" onClick={() => setActive((active + 1) % images.length)}>›</button>
  </div>, document.body);
}
