"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "eigen-concept", label: "The idea", number: "01" },
  { id: "eigen-principles", label: "The workflow", number: "02" },
  { id: "eigen-interactive-refinement", label: "Interactive refinement", number: "2.2", sub: true },
  { id: "eigen-inspect-options", label: "Inspect options", number: "2.3", sub: true },
  { id: "eigen-reuse-options", label: "Save & reuse", number: "2.4", sub: true },
  { id: "eigen-architecture", label: "Architecture", number: "03" },
  { id: "eigen-advanced-interactivity", label: "Interactive presentation", number: "04" },
  { id: "eigen-pick-inspect", label: "Pick & inspect", number: "4.1", sub: true },
  { id: "eigen-highlight", label: "Highlight objects", number: "4.2", sub: true },
  { id: "eigen-vector-plane", label: "Field sampling", number: "4.3", sub: true },
];

export function EigenplotScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? Math.min(100, Math.max(0, window.scrollY / maxScroll * 100)) : 100);
      let current = 0;
      sections.forEach((section, index) => {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * .38) current = index;
      });
      setActive(current);
      frame = 0;
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <>
    <div className="eigen-scroll-track" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
    <nav className={`eigen-scroll-nav${desktopOpen ? " is-expanded" : ""}`} aria-label="EigenPlot3D page sections">
      <button className="eigen-scroll-toggle" type="button" aria-expanded={desktopOpen} aria-label={desktopOpen ? "Collapse chapter navigation" : "Expand chapter navigation"} onClick={() => setDesktopOpen(value => !value)}><span aria-hidden="true">{desktopOpen ? "→" : "☰"}</span></button>
      <div className="eigen-scroll-items">
        {sections.map((section, index) => <a key={section.id} href={`#${section.id}`} onClick={() => setDesktopOpen(false)} className={`${index === active ? "is-active " : ""}${section.sub ? "is-sub" : ""}`} aria-current={index === active ? "location" : undefined}><span className="eigen-scroll-number">{section.number}</span><span>{section.label}</span></a>)}
      </div>
      <div className="eigen-scroll-footer"><strong>{Math.round(progress)}%</strong><div className="eigen-scroll-meter" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div></div>
    </nav>
    <div className="eigen-scroll-mobile">
      <button type="button" aria-expanded={open} aria-controls="eigen-mobile-sections" onClick={() => setOpen(value => !value)}><span>Sections · {sections[active].label}</span><span aria-hidden="true">{open ? "−" : "+"}</span></button>
      {open && <nav id="eigen-mobile-sections" aria-label="EigenPlot3D page sections (mobile)">{sections.map((section, index) => <a key={section.id} href={`#${section.id}`} aria-current={index === active ? "location" : undefined} onClick={() => setOpen(false)}>{section.number} · {section.label}</a>)}</nav>}
    </div>
  </>;
}
