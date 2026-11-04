"use client";

import Link from "next/link";
import { useState } from "react";
import "../app/eigenplot.css";

const features = [
  { n: "01", title: "Objects, not loose actors", body: "A PlotRod, PlotTube, or PlotVector has its own identity, options, and update lifecycle. Work with a meaningful visual object rather than coordinating scattered rendering calls.", label: "OBJECT MODEL" },
  { n: "02", title: "Configuration as an interface", body: "Typed option objects keep geometry and appearance together. Visual properties can be specified as constants, per-element values, or data-dependent callables where supported.", label: "CONFIGURATION" },
  { n: "03", title: "Interactive when you need it", body: "Optional Qt panels expose visual and lighting controls for interactive exploration, while the same plotting objects remain usable from Python scripts and offscreen workflows.", label: "INTERACTION" },
];

export function EigenplotShowcase() {
  const [opacity, setOpacity] = useState(0.68);
  const [radius, setRadius] = useState(0.52);
  const [selected, setSelected] = useState(1);

  return <article className="eigen-page">
    <Link href="/projects" className="back-link">← All projects</Link>
    <header className="eigen-hero">
      <div className="eigen-hero-copy">
        <p className="eyebrow">PYTHON SOFTWARE / SCIENTIFIC VISUALIZATION</p>
        <h1>Eigen<span>Plot</span>3D<span className="period">.</span></h1>
        <p className="eigen-hero-lede">Scientific 3D visualization, organized around objects rather than rendering calls.</p>
        <p className="eigen-subline">A high-level, object-oriented interface built on PyVista for configurable and interactive scientific graphics.</p>
        <div className="tag-row"><span>Python</span><span>PyVista / VTK</span><span>Object-oriented API</span><span>Qt Controls</span></div>
        <a className="eigen-hero-link" href="#eigen-concept">Explore the design <span>↓</span></a>
      </div>
      <div className="eigen-hero-visual" aria-label="Diagram of a visual object with geometry, configuration, and interactive controls">
        <div className="eigen-diagram-top">ONE VISUAL OBJECT <span>↗</span></div>
        <div className="eigen-object-box"><span className="eigen-object-icon">◈</span><div><small>VISUAL OBJECT</small><strong>PlotRod</strong><p>identity · state · lifecycle</p></div><span className="eigen-object-pulse" /></div>
        <div className="eigen-diagram-connector" />
        <div className="eigen-diagram-bottom"><div><small>GEOMETRY</small><strong>Coordinates</strong><span>Orientation / shape</span></div><div><small>OPTIONS</small><strong>OptsRod</strong><span>Color / radius / opacity</span></div><div><small>CONTROLS</small><strong>Qt Panel</strong><span>Interactive editing</span></div></div>
        <p className="eigen-diagram-caption">CONCEPTUAL SOFTWARE MODEL · NOT A RENDERING BENCHMARK</p>
      </div>
    </header>

    <section id="eigen-concept" className="eigen-section eigen-intro">
      <p className="eyebrow">01 / THE IDEA</p>
      <div className="eigen-two-column"><h2>Built on PyVista.<br /><em>Focused on the workflow.</em></h2><div><p>PyVista already provides a powerful 3D rendering toolkit. EigenPlot3D does not aim to replace its rendering engine or introduce a new family of visual effects.</p><p>Instead, it provides a higher-level layer for working with scientific graphics: persistent objects, structured options, and optional interactive controls. The goal is to make complex scenes easier to configure, update, and reuse.</p></div></div>
    </section>

    <section className="eigen-section" id="eigen-principles">
      <p className="eyebrow">02 / DESIGN PRINCIPLES</p><h2>Three layers of control.</h2>
      <div className="eigen-feature-grid">{features.map(f=><div className="eigen-feature" key={f.n}><div className="eigen-feature-top"><span>{f.n}</span><span>{f.label}</span></div><h3>{f.title}</h3><p>{f.body}</p></div>)}</div>
    </section>

    <section className="eigen-section" id="eigen-workflow">
      <p className="eyebrow">03 / CONFIGURATION WORKFLOW</p><div className="eigen-two-column"><h2>Change the options.<br /><em>Keep the object.</em></h2><p>Instead of rebuilding a scene for every adjustment, a visualization object retains its identity while its configuration changes. Below is a conceptual illustration of the workflow—not a live EigenPlot3D renderer or an exact screenshot of its Qt panel.</p></div>
      <div className="eigen-demo">
        <div className="eigen-demo-code"><div className="eigen-demo-label"><span className="eigen-status-dot" /> PYTHON / CONCEPTUAL EXAMPLE</div><pre><code><span className="code-comment"># Configure a persistent visual object</span>{"\n"}<span className="code-key">rod</span>.opts.opacity = <span className="code-value">{opacity.toFixed(2)}</span>{"\n"}<span className="code-key">rod</span>.opts.radius = <span className="code-value">{radius.toFixed(2)}</span>{"\n"}<span className="code-key">rod</span>.act_commit(){"\n\n"}<span className="code-comment"># Object identity is preserved</span></code></pre><div className="eigen-code-foot">One object · configurable state · explicit update</div></div>
        <div className="eigen-demo-panel"><div className="eigen-demo-label">INTERACTIVE CONTROLS <span>LIVE CONCEPT DEMO</span></div><div className="eigen-demo-stage"><svg viewBox="0 0 420 180" role="img" aria-label="Schematic rods responding to the opacity and radius controls">{[0,1,2,3,4].map(i=><g key={i} onClick={()=>setSelected(i)} style={{cursor:"pointer"}}><line x1={75+i*65} y1={136-i*6} x2={115+i*51} y2={40+i*7} stroke={selected===i?"#e4a875":"#8cb7c4"} strokeWidth={7+radius*13} strokeLinecap="round" opacity={opacity} /><circle cx={75+i*65} cy={136-i*6} r={5+radius*3} fill={selected===i?"#e4a875":"#8cb7c4"} opacity={opacity}/></g>)}</svg><span>SCHEMATIC OBJECT PREVIEW</span></div><label htmlFor="eigen-opacity">Opacity <output>{opacity.toFixed(2)}</output></label><input id="eigen-opacity" type="range" min="0.1" max="1" step="0.01" value={opacity} onChange={e=>setOpacity(Number(e.target.value))}/><label htmlFor="eigen-radius">Radius <output>{radius.toFixed(2)}</output></label><input id="eigen-radius" type="range" min="0.15" max="1" step="0.01" value={radius} onChange={e=>setRadius(Number(e.target.value))}/><p className="eigen-demo-note">Click a rod to select it. The controls update this illustration and the corresponding example values.</p></div>
      </div>
    </section>

    <section className="eigen-section" id="eigen-architecture"><p className="eyebrow">04 / ARCHITECTURE</p><div className="eigen-two-column"><h2>A small layer between<br /><em>data and rendering.</em></h2><p>PlotFigure manages the scene, camera, and visual-object registry. Individual PlotGlyph-derived objects encapsulate their options and updates. PyVista / VTK remains responsible for rendering; optional Qt components provide interactive controls.</p></div><div className="eigen-architecture"><div><small>SCENE MANAGEMENT</small><strong>PlotFigure</strong><span>Camera · registry · lifecycle</span></div><span className="eigen-arch-arrow">↓</span><div className="eigen-arch-middle"><div><small>VISUAL OBJECTS</small><strong>PlotRod · PlotTube · PlotVector</strong><span>Geometry + options + updates</span></div><div><small>OPTIONAL INTERACTION</small><strong>Qt control panels</strong><span>Object & lighting controls</span></div></div><span className="eigen-arch-arrow">↓</span><div><small>RENDERING BACKEND</small><strong>PyVista / VTK</strong><span>3D rendering and display</span></div></div></section>
    <div className="eigen-footer"><p>Designed as reusable Python software, not a replacement rendering engine.</p><Link href="/projects">← All projects</Link></div>
  </article>;
}
