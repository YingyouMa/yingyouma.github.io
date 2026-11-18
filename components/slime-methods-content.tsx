"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import slimeTimescales from "../figures/SLIME/slime_timescales.png";
import stokesFigure from "../figures/SLIME/stokes.png";
import multigridFigure from "../figures/SLIME/multigrid.png";
import boundaryFigure from "../figures/SLIME/BFL_warmup.png";
import warmStartFigure from "../figures/SLIME/warmup.png";
import kokkosFigure from "../figures/SLIME/Kokkos.png";
import { SlimeScrollProgress } from "./slime-scroll-progress";
import { SlimeScrollReveal } from "./slime-scroll-reveal";
import { SlimeLightbox } from "./slime-lightbox";
import { SlimeUnderwater } from "./slime-underwater";
import { useLanguage } from "./language-provider";
import { slimeMethodsCopy } from "../lib/slime-methods-copy";
import "../app/slime.css";

const methodIds = [
  "slime-background",
  "slime-steady-lbm",
  "slime-multigrid",
  "slime-boundaries",
  "slime-warm-start",
  "slime-gpu",
] as const;

// Preserve the original image assets and their order in both languages.
const methodFigures = [
  slimeTimescales,
  stokesFigure,
  multigridFigure,
  boundaryFigure,
  warmStartFigure,
  kokkosFigure,
];

export function SlimeMethodsContent() {
  const { language } = useLanguage();
  const copy = slimeMethodsCopy[language];

  const navigation = useMemo(
    () => copy.sections.map((section, index) => ({ id: methodIds[index], label: section.nav })),
    [copy],
  );
  const lightboxFigures = useMemo(
    () => copy.sections.map((section, index) => ({
      src: methodFigures[index],
      alt: section.lightboxAlt,
      title: section.lightboxTitle,
    })),
    [copy],
  );

  return (
    <article className="slime-showcase slime-methods-page">
      <SlimeUnderwater />
      <SlimeScrollReveal />
      <SlimeLightbox figures={lightboxFigures} labels={copy.lightboxLabels} />
      <SlimeScrollProgress sections={navigation} labels={copy.scrollLabels} />
      <Link className="back-link" href="/projects/slime">← {copy.back}</Link>
      <header className="slime-section">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p className="slime-methods-intro">{copy.introduction}</p>
      </header>
      {copy.sections.map((section, index) => (
        <section
          className="slime-section slime-numbered-section"
          key={methodIds[index]}
          id={methodIds[index]}
          data-section-number={String(index + 1).padStart(2, "0")}
        >
          <p className="eyebrow slime-reveal">{section.label}</p>
          <h2 className="slime-reveal">{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p className="slime-reveal" key={paragraph}>{paragraph}</p>
          ))}
          <figure className="slime-method-figure slime-reveal slime-reveal-image">
            <Image
              src={methodFigures[index]}
              alt={section.figureAlt}
              sizes="(max-width: 650px) 100vw, 1000px"
            />
          </figure>
        </section>
      ))}
      <div className="detail-next">
        <Link href="/projects/slime">← {copy.bottomBack}</Link>
      </div>
    </article>
  );
}
