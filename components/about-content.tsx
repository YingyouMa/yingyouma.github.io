"use client";

import Image from "next/image";
import { useLanguage } from "./language-provider";
import { aboutCopy } from "../lib/about-copy";

export function AboutContent() {
  const { language } = useLanguage();
  const copy = aboutCopy[language];

  return (
    <section className="section about-page">
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1 className="page-title">{copy.title}</h1>
      <div className="about-layout">
        <div>
          <h2>{copy.heading}</h2>
          <Image
            className="about-cover"
            src="/images/about-cover.png"
            alt={language === "zh-CN" ? "EigenPlot3D 科学可视化封面图" : "EigenPlot3D scientific visualization cover"}
            width={936}
            height={935}
          />
        </div>
        <div>
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="tag-row">
            {copy.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
