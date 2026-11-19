"use client";

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
