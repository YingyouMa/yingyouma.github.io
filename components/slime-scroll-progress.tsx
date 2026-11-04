"use client";

import { useEffect, useState } from "react";

type Section = { id: string; label: string };

export function SlimeScrollProgress({ sections }: { sections: Section[] }) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100)) : 100);
      const current = sections.reduce((index, section, i) => {
        const element = document.getElementById(section.id);
        return element && element.getBoundingClientRect().top <= window.innerHeight * 0.38 ? i : index;
      }, 0);
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
  }, [sections]);

  return <>
    <div className="slime-scroll-track" aria-hidden="true"><div style={{ width: `${progress}%` }} /></div>
    <div className="slime-scroll-mobile">
      <button type="button" aria-expanded={mobileOpen} aria-controls="slime-mobile-sections" onClick={() => setMobileOpen(value => !value)}>
        <span>Sections · {sections[active]?.label}</span><span aria-hidden="true">{mobileOpen ? "−" : "+"}</span>
      </button>
      {mobileOpen && <nav id="slime-mobile-sections" aria-label="Page sections (mobile)">
        {sections.map((section, index) => <a key={section.id} href={`#${section.id}`} aria-current={index === active ? "location" : undefined} onClick={() => setMobileOpen(false)}>{String(index + 1).padStart(2, "0")} · {section.label}</a>)}
      </nav>}
    </div>
    <nav className="slime-scroll-nav" aria-label="Page sections">
      <div className="slime-scroll-heading"><span>ON THIS PAGE</span><span className="slime-scroll-count">{String(active + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}</span></div>
      <div className="slime-scroll-items">
        {sections.map((section, index) => <a key={section.id} href={`#${section.id}`} className={index === active ? "is-active" : ""} aria-current={index === active ? "location" : undefined}>
          <span className="slime-scroll-number">{String(index + 1).padStart(2, "0")}</span>
          <span className="slime-scroll-label">{section.label}</span>
          <span className="slime-scroll-arrow" aria-hidden="true">↗</span>
        </a>)}
      </div>
      <div className="slime-scroll-footer"><span>READING PROGRESS</span><strong>{Math.round(progress)}%</strong><div className="slime-scroll-meter"><span style={{ width: `${progress}%` }} /></div></div>
    </nav>
  </>;
}
