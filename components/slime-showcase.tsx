import { ProjectVisual } from "./visual";
import Image from "next/image";
import Link from "next/link";
import { SlimeScrollProgress } from "./slime-scroll-progress";
import { SlimeScrollReveal } from "./slime-scroll-reveal";
import { SlimeSpotlightCards } from "./slime-spotlight-cards";
import slimeOverview from "../figures/SLIME/slime_overview.png";
import slimeMethod from "../figures/SLIME/slime_method.png";
import "../app/slime.css";

const capabilities = [
  { number: "01", title: "Steady-state flow", text: "Solve the steady Stokes problem directly, without marching through the physical relaxation transient." },
  { number: "02", title: "Complex solid boundaries", text: "Represent curved and non-convex immersed objects with lattice-based no-slip boundary treatment." },
  { number: "03", title: "Moving geometries", text: "Update fluid and solid nodes as objects change position, with warm starts between successive solves." },
  { number: "04", title: "Volumetric forcing", text: "Apply body forces throughout the computational domain, including localized and periodic forcing." },
];

const examples = [
  { type: "BODY-FORCE VALIDATION", title: "Periodic Stokeslet", subtitle: "Localized volumetric forcing", text: "The flow response to a localized force in a periodic domain tests how SLIME applies body forces throughout the fluid.", figure: "stokeslet" },
  { type: "STANDARD BOUNDARY VALIDATION", title: "Channel flows", subtitle: "Poiseuille & Couette", text: "Pressure-driven and wall-driven channel flows verify the treatment of conventional no-slip boundaries through their velocity profiles.", figure: "channel" },
  { type: "COMPLEX BOUNDARY VALIDATION", title: "Rotating dumbbell", subtitle: "Non-convex solid geometry", text: "A rotating two-lobe body provides a benchmark for hydrodynamic flow around a non-convex object, testing the accuracy of SLIME's complex-boundary treatment.", figure: "dumbbell" },
  { type: "MOVING BOUNDARY VALIDATION", title: "Sphere in a spherical cavity", subtitle: "Translating sphere in a fixed cavity", text: "A sphere translates within a fixed spherical cavity, testing how accurately SLIME handles moving solid boundaries and the resulting fluid flow.", figure: "cavity" },
];

const showcaseSections = [
  { id: "slime-overview", label: "Overview" },
  { id: "slime-capabilities", label: "Capabilities" },
  { id: "slime-examples", label: "Validation" },
  { id: "slime-engine", label: "How it works" },
];

function CaseFigure({ kind }: { kind: string }) {
  return <div className={`slime-case-figure slime-figure-${kind}`} role="img" aria-label={`Schematic illustration of ${kind}; not simulation data`}>
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
    <span>SCHEMATIC · NOT SIMULATION DATA</span>
  </div>;
}

export function SlimeShowcase() {
  return <article className="slime-showcase">
    <SlimeScrollReveal />
    <SlimeSpotlightCards />
    <SlimeScrollProgress sections={showcaseSections} />
    <a className="back-link" href="/projects">← All projects</a>
    <header className="slime-hero">
      <div className="slime-hero-copy">
        <p className="eyebrow">SCIENTIFIC COMPUTING SOFTWARE / GPU SOLVER</p>
        <h1>SLIME<span className="period">.</span></h1>
        <p className="slime-full-name">Stokes Lattice-Boltzmann Iterative Multigrid Engine</p>
        <p className="slime-hero-title">A GPU-accelerated solver for 3D viscous fluid flows around complex and moving objects.</p>
        <div className="tag-row"><span>3D Fluid Simulation</span><span>GPU Accelerated</span><span>Complex Geometries</span><span>Moving Boundaries</span></div>
        <a className="slime-jump" href="#slime-examples">Explore simulation cases ↓</a>
      </div>
      <div className="slime-hero-art"><ProjectVisual kind="flow" large /></div>
    </header>

    <section className="slime-section slime-overview slime-numbered-section" id="slime-overview" data-section-number="01">
      <p className="eyebrow slime-reveal">01 / OVERVIEW</p>
      <div className="slime-section-layout"><h2 className="slime-reveal">Combining efficient computation with flexible boundaries.</h2><div className="slime-reveal"><p>Simulating highly viscous fluids presents a practical trade-off. Some conventional methods can solve steady flow efficiently but require more elaborate treatment of complex or moving solid boundaries. Other methods handle such boundaries naturally, yet can become computationally expensive when they must simulate the rapid relaxation of a highly viscous fluid.</p><p>SLIME brings these strengths together. It uses the lattice Boltzmann method to handle complicated boundaries and a GPU-accelerated multigrid solver to compute steady Stokes flow directly, without spending time simulating the transient relaxation.</p></div></div>
      <figure className="slime-overview-figure slime-reveal slime-reveal-image"><Image src={slimeOverview} alt="Overview illustration of the SLIME solver" sizes="(max-width: 650px) 100vw, 1100px" /></figure>
    </section>

    <section className="slime-section slime-numbered-section" id="slime-capabilities" data-section-number="02">
      <p className="eyebrow slime-reveal">02 / CAPABILITIES</p><h2 className="slime-reveal">What the engine can do</h2>
      <div className="slime-capabilities">{capabilities.map((item,index)=><div key={item.number} className="slime-capability slime-reveal" style={{ transitionDelay: `${index * 100}ms` }}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></div>)}</div>
    </section>

    <section className="slime-section slime-numbered-section" id="slime-examples" data-section-number="03">
      <p className="eyebrow slime-reveal">03 / ANALYTICAL VALIDATION</p><h2 className="slime-reveal">Fluid mechanics benchmarks</h2><p className="slime-section-lede slime-reveal">Benchmark problems used to validate SLIME against analytical solutions, spanning canonical flows, hydrodynamic interactions, and complex moving boundaries.</p>
      <div className="slime-examples">{examples.map((item,index)=><div className="slime-example slime-reveal" style={{ transitionDelay: `${index * 100}ms` }} key={item.title}><CaseFigure kind={item.figure}/><div className="slime-example-copy"><p className="eyebrow">{item.type}</p><h3>{item.title}</h3><p className="slime-example-subtitle">{item.subtitle}</p><p>{item.text}</p></div></div>)}</div>
    </section>

    <section className="slime-section slime-engine slime-numbered-section" id="slime-engine" data-section-number="04">
      <p className="eyebrow slime-reveal">04 / UNDER THE HOOD</p><h2 className="slime-reveal">How SLIME works</h2>
      <p className="slime-engine-lede slime-reveal">GPU computation meets multilevel error correction.</p>
      <p className="slime-engine-description slime-reveal">SLIME combines the lattice Boltzmann method for flexible boundary handling with multigrid acceleration for efficient steady-state flow computation. Its CUDA implementation supports three-dimensional simulations.</p>
      <figure className="slime-method-figure slime-reveal slime-reveal-image"><Image src={slimeMethod} alt="Illustration of the SLIME numerical method" sizes="(max-width: 650px) 100vw, 1100px" /></figure>
      <div className="tag-row"><span>Lattice Boltzmann Method</span><span>Multigrid Solver</span><span>CUDA Acceleration</span></div>
      <Link className="slime-methods-link" href="/projects/slime/methods">Explore the numerical methods ↗</Link>
    </section>

    <div className="detail-next"><a href="/projects">← All projects</a></div>
  </article>;
}
