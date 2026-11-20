"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./language-provider";

const englishSections = [
  { id: "eigen-concept", label: "The idea", number: "01" },
  { id: "eigen-principles", label: "The workflow", number: "02" },
  { id: "eigen-interactive-refinement", label: "Interactive refinement", number: "2.2", sub: true },
  { id: "eigen-inspect-options", label: "Inspect options", number: "2.3", sub: true },
  { id: "eigen-reuse-options", label: "Save & reuse", number: "2.4", sub: true },
  { id: "eigen-advanced-interactivity", label: "Interactive presentation", number: "03" },
  { id: "eigen-pick-inspect", label: "Pick & inspect", number: "3.1", sub: true },
  { id: "eigen-highlight", label: "Highlight objects", number: "3.2", sub: true },
  { id: "eigen-vector-plane", label: "Field sampling", number: "3.3", sub: true },
  { id: "eigen-gallery", label: "Gallery", number: "04" },
  { id: "eigen-api-discovery", label: "Discoverable API", number: "05" },
  { id: "eigen-architecture", label: "Architecture", number: "06" },
];

const chineseSections: typeof englishSections = [
  { id: "eigen-concept", label: "设计理念", number: "01" },
  { id: "eigen-principles", label: "工作流程", number: "02" },
  { id: "eigen-interactive-refinement", label: "交互式调整", number: "2.2", sub: true },
  { id: "eigen-inspect-options", label: "查看参数", number: "2.3", sub: true },
  { id: "eigen-reuse-options", label: "保存与复用", number: "2.4", sub: true },
  { id: "eigen-advanced-interactivity", label: "交互式展示", number: "03" },
  { id: "eigen-pick-inspect", label: "选取与查看", number: "3.1", sub: true },
  { id: "eigen-highlight", label: "高亮对象", number: "3.2", sub: true },
  { id: "eigen-vector-plane", label: "矢量场采样", number: "3.3", sub: true },
  { id: "eigen-gallery", label: "几何图形展示", number: "04" },
  { id: "eigen-api-discovery", label: "易于发现的 API", number: "05" },
  { id: "eigen-architecture", label: "架构概览", number: "06" },
];

export function EigenplotScrollProgress() {
  const { language } = useLanguage();
  const zh = language === "zh-CN";
  const sections = zh ? chineseSections : englishSections;
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
  }, [sections]);

  return <>
    <div className="eigen-scroll-track" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
    <nav className={`eigen-scroll-nav${desktopOpen ? " is-expanded" : ""}`} aria-label={zh ? "EigenPlot3D 页面目录" : "EigenPlot3D page sections"}>
      <button className="eigen-scroll-toggle" type="button" aria-expanded={desktopOpen} aria-label={zh ? (desktopOpen ? "收起章节目录" : "展开章节目录") : (desktopOpen ? "Collapse chapter navigation" : "Expand chapter navigation")} onClick={() => setDesktopOpen(value => !value)}><span aria-hidden="true">{desktopOpen ? "→" : "☰"}</span></button>
      <div className="eigen-scroll-items">
        {sections.map((section, index) => <a key={section.id} href={`#${section.id}`} onClick={() => setDesktopOpen(false)} className={`${index === active ? "is-active " : ""}${section.sub ? "is-sub" : ""}`} aria-current={index === active ? "location" : undefined}><span className="eigen-scroll-number">{section.number}</span><span>{section.label}</span></a>)}
      </div>
      <div className="eigen-scroll-footer"><strong>{Math.round(progress)}%</strong><div className="eigen-scroll-meter" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div></div>
    </nav>
    <div className="eigen-scroll-mobile">
      <button type="button" aria-expanded={open} aria-controls="eigen-mobile-sections" onClick={() => setOpen(value => !value)}><span>{zh ? "章节" : "Sections"} · {sections[active].label}</span><span aria-hidden="true">{open ? "−" : "+"}</span></button>
      {open && <nav id="eigen-mobile-sections" aria-label={zh ? "EigenPlot3D 移动端章节目录" : "EigenPlot3D page sections (mobile)"}>{sections.map((section, index) => <a key={section.id} href={`#${section.id}`} aria-current={index === active ? "location" : undefined} onClick={() => setOpen(false)}>{section.number} · {section.label}</a>)}</nav>}
    </div>
  </>;
}
