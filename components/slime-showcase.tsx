"use client";

import { ProjectVisual } from "./visual";
import Image from "next/image";
import Link from "next/link";
import { SlimeScrollProgress } from "./slime-scroll-progress";
import { SlimeScrollReveal } from "./slime-scroll-reveal";
import { SlimeSpotlightCards } from "./slime-spotlight-cards";
import { SlimeUnderwater } from "./slime-underwater";
import slimeOverview from "../figures/SLIME/slime_overview.png";
import slimeMethod from "../figures/SLIME/slime_method.png";
import { useLanguage } from "./language-provider";
import { slimeHomeCopy } from "../lib/slime-home-copy";
import "../app/slime.css";

function CaseFigure({ kind, caption, ariaLabel }: { kind: string; caption: string; ariaLabel: string }) {
  return <div className={`slime-case-figure slime-figure-${kind}`} role="img" aria-label={ariaLabel}>
    <svg viewBox="0 0 420 220" aria-hidden="true">
      {kind === "channel" && <>
        <path d="M35 48H385M35 172H385" stroke="#7894a9" strokeWidth="5" />
        {Array.from({length:7},(_,i)=>{const y=67+i*15;const length=65+130*(1-Math.pow((y-110)/68,2));return <path key={i} d={`M85 ${y}h${length}`} stroke="#4f9fba" strokeWidth="2.5" strokeLinecap="round" />})}
        <path d="m275 101 14 9-14 9" fill="none" stroke="#4f9fba" strokeWidth="2" />
      </>}
      {kind === "stokeslet" && <>
        <rect x="52" y="28" width="316" height="164" fill="none" stroke="#9eb2c1" strokeDasharray="5 6" />
        {Array.from({length:9},(_,i)=>{const y=44+i*17;return <path key={i} d={`M65 ${y} C145 ${y}, 165 ${y+(y<110?-15:15)}, 225 ${y+(y<110?-15:15)} S320 ${y}, 355 ${y}`} stroke="#61a5bd" strokeWidth="1.8" fill="none" />})}
        <circle cx="210" cy="110" r="7" fill="#d99661" /><path d="M210 109h55m-10-8 10 8-10 8" stroke="#d99661" strokeWidth="3" fill="none" />
      </>}
      {kind === "dumbbell" && <>
        {Array.from({length:9},(_,i)=>{const y=25+i*22;return <path key={i} d={`M10 ${y} C130 ${y-20}, 250 ${y+20}, 410 ${y}`} stroke="#6da9bc" strokeWidth="1.5" fill="none" opacity=".55" />})}
        <g transform="rotate(-24 210 110)"><path d="M108 110 C108 84 128 64 155 64 C181 64 192 82 207 86 C224 91 237 78 260 78 C281 78 299 92 299 110 C299 128 281 142 260 142 C237 142 224 129 207 134 C192 138 181 156 155 156 C128 156 108 136 108 110 Z" fill="#65869b" stroke="#b6d1df" strokeWidth="2" strokeLinejoin="round"/></g>
      </>}
      {kind === "cavity" && <>
        <circle cx="210" cy="110" r="88" fill="#dfeaf0" stroke="#7598ae" strokeWidth="3" />
        <circle cx="238" cy="110" r="29" fill="#6b90a5" stroke="#476a82" strokeWidth="2" />
        <path d="M238 110h80m-11-8 11 8-11 8" fill="none" stroke="#d18b54" strokeWidth="3" />
        <path d="M210 110h-32" stroke="#7391a4" strokeDasharray="4 5" />
      </>}
    </svg>
    <span>{caption}</span>
  </div>;
}

export function SlimeShowcase() {
  const { language } = useLanguage();
  const copy = slimeHomeCopy[language];
  return <article className="slime-showcase">
    <SlimeUnderwater />
    <SlimeScrollReveal />
    <SlimeSpotlightCards />
    <SlimeScrollProgress sections={copy.sections} labels={copy.scrollLabels} />
    <a className="back-link" href="/projects">← {copy.back}</a>
    <header className="slime-hero">
      <div className="slime-hero-copy">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>SLIME<span className="period">.</span></h1>
        <p className="slime-full-name">Stokes Lattice-Boltzmann Iterative Multigrid Engine</p>
        <p className="slime-hero-title">{copy.heroTitle}</p>
        <div className="tag-row">{copy.heroTags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <div className="slime-hero-jumps">
          <a className="slime-jump" href="#slime-examples">{copy.jumps[0]} ↓</a>
          <a className="slime-jump" href="#slime-engine">{copy.jumps[1]} ↓</a>
        </div>
      </div>
      <div className="slime-hero-art"><ProjectVisual kind="flow" large alt={copy.heroImageAlt} /></div>
    </header>

    <section className="slime-section slime-overview slime-numbered-section" id="slime-overview" data-section-number="01">
      <p className="eyebrow slime-reveal">{copy.overview.label}</p>
      <div className="slime-section-layout"><h2 className="slime-reveal">{copy.overview.title}</h2><div className="slime-reveal">{copy.overview.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></div>
      <figure className="slime-overview-figure slime-reveal slime-reveal-image"><Image src={slimeOverview} alt={copy.overview.imageAlt} sizes="(max-width: 650px) 100vw, 1100px" /></figure>
    </section>

    <section className="slime-section slime-numbered-section" id="slime-capabilities" data-section-number="02">
      <p className="eyebrow slime-reveal">{copy.capabilitiesLabel}</p><h2 className="slime-reveal">{copy.capabilitiesTitle}</h2>
      <div className="slime-capabilities">{copy.capabilities.map((item,index)=><div key={item.number} className="slime-capability slime-reveal" style={{ transitionDelay: `${index * 100}ms` }}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></div>)}</div>
    </section>

    <section className="slime-section slime-numbered-section" id="slime-examples" data-section-number="03">
      <p className="eyebrow slime-reveal">{copy.validation.label}</p><h2 className="slime-reveal">{copy.validation.title}</h2><p className="slime-section-lede slime-reveal">{copy.validation.introduction}</p>
      <div className="slime-examples">{copy.examples.map((item,index)=><div className="slime-example slime-reveal" style={{ transitionDelay: `${index * 100}ms` }} key={item.figure}><CaseFigure kind={item.figure} caption={copy.validation.schematicCaption} ariaLabel={`${copy.validation.schematicAria}：${item.title}`}/><div className="slime-example-copy"><p className="eyebrow">{item.type}</p><h3>{item.title}</h3><p className="slime-example-subtitle">{item.subtitle}</p><p>{item.text}</p></div></div>)}</div>
    </section>

    <section className="slime-section slime-engine slime-numbered-section" id="slime-engine" data-section-number="04">
      <p className="eyebrow slime-reveal">{copy.engine.label}</p><h2 className="slime-reveal">{copy.engine.title}</h2>
      <p className="slime-engine-lede slime-reveal">{copy.engine.lede}</p>
      <p className="slime-engine-description slime-reveal">{copy.engine.description}</p>
      <figure className="slime-method-figure slime-reveal slime-reveal-image"><Image src={slimeMethod} alt={copy.engine.imageAlt} sizes="(max-width: 650px) 100vw, 1100px" /></figure>
      <div className="tag-row">{copy.engine.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <Link className="slime-methods-link" href="/projects/slime/methods">{copy.engine.methodsLink} ↗</Link>
    </section>

    <div className="detail-next"><a href="/projects">← {copy.back}</a></div>
  </article>;
}
