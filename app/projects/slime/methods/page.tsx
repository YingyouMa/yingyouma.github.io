import Link from "next/link";
import Image from "next/image";
import slimeTimescales from "../../../../figures/SLIME/slime_timescales.png";
import stokesFigure from "../../../../figures/SLIME/stokes.png";
import multigridFigure from "../../../../figures/SLIME/multigrid.png";
import boundaryFigure from "../../../../figures/SLIME/BFL_warmup.png";
import warmStartFigure from "../../../../figures/SLIME/warmup.png";
import kokkosFigure from "../../../../figures/SLIME/Kokkos.png";
import { SlimeScrollProgress } from "../../../../components/slime-scroll-progress";
import { SlimeScrollReveal } from "../../../../components/slime-scroll-reveal";
import { SlimeLightbox } from "../../../../components/slime-lightbox";
import "../../../slime.css";

const sections = [
  { label: "01 / BACKGROUND", title: "The challenge of low-Reynolds-number flow", paragraphs: ["Highly viscous flows often involve two very different time scales. The large-scale motion driven by external forces can evolve slowly, while momentum within the fluid adjusts much more rapidly. A conventional time-stepping simulation must still resolve that fast adjustment, even when the flow of interest is effectively steady. This separation of time scales makes direct time integration unnecessarily expensive.", "The lattice Boltzmann method (LBM) is attractive because it handles complex and moving solid boundaries naturally, but using it to follow the physical transient can require very small time steps. Conventional Stokes solvers avoid that transient, yet enforcing incompressibility and accommodating complicated, moving boundaries can require substantial additional machinery. SLIME is designed to combine the useful features of both approaches."] },
  { label: "02 / STEADY LBM", title: "Solving for the steady state directly", paragraphs: ["SLIME modifies the lattice Boltzmann formulation to better match the Stokes regime. First, it removes the nonlinear part of the fluid update, eliminating the inertial advection term that is negligible at low Reynolds numbers.", "Instead of repeatedly advancing that update in physical time until the fluid relaxes, SLIME solves directly for its fixed point: the state that would remain unchanged under another update. This bypasses the fast transient while retaining the lattice-based treatment of forcing and solid boundaries."] },
  { label: "03 / MULTIGRID", title: "Accelerating convergence across scales", paragraphs: ["Directly solving for a fixed point still requires an efficient iterative method. Local iterations typically remove rapidly varying, short-wavelength errors first, while smooth, long-wavelength errors decay much more slowly. Multigrid accelerates convergence by correcting long-wavelength errors on coarser grids, where they are easier to eliminate.", "SLIME uses a multigrid W-cycle to accelerate convergence of its steady lattice system, with parameters tuned for the default grid configuration."] },
  { label: "04 / BOUNDARY CONDITIONS", title: "Local boundary treatment for complex geometries", paragraphs: ["A major reason to retain the lattice Boltzmann formulation is its treatment of solid boundaries. No-slip conditions can be imposed through local lattice rules, including bounce-back-based treatments for curved surfaces. This avoids the need to construct a body-fitted mesh or rebuild a global discretization around each complicated object—complications that conventional Stokes solvers may face when handling complex or moving boundaries.", "When a solid moves, SLIME updates which lattice sites belong to the fluid and how the boundary intersects nearby lattice links. Because the boundary treatment is local, changing the geometry primarily affects the region near the moving surface. This makes complex and moving boundaries relatively straightforward to update."] },
  { label: "05 / WARM START", title: "Reusing the previous steady solution", paragraphs: ["Many applications require a sequence of closely related steady-flow solutions—for example, as an immersed object moves a small distance between steps. Solving each configuration from scratch would discard useful information from the preceding one.", "SLIME can instead initialize the next solve from the previous steady-state solution. When the geometry and forcing change only slightly, this initial guess is already close to the new solution, so the multigrid solver has less remaining error to remove."] },
  { label: "06 / GPU IMPLEMENTATION", title: "GPU parallel computing with Kokkos", paragraphs: ["SLIME is implemented in C++ with Kokkos, a performance-portability framework for parallel computing. Rather than writing separate low-level kernels for every device, the solver expresses its parallel lattice operations through Kokkos and uses the selected execution backend to run them.", "On NVIDIA GPUs, the Kokkos CUDA backend executes the repeated lattice updates, residual calculations, and multigrid operations. The same programming model also supports CPU execution and offers a path to other supported GPU backends."] },
];

const methodNavigation = [
  { id: "slime-background", label: "Background" },
  { id: "slime-steady-lbm", label: "Steady LBM" },
  { id: "slime-multigrid", label: "Multigrid" },
  { id: "slime-boundaries", label: "Boundaries" },
  { id: "slime-warm-start", label: "Warm Start" },
  { id: "slime-gpu", label: "GPU" },
];

const lightboxFigures = [
  { src: slimeTimescales, alt: "Time-scale separation in viscous flow", title: "Background · Time-scale separation" },
  { src: stokesFigure, alt: "Direct solution of steady Stokes flow", title: "Steady LBM · Fixed-point solution" },
  { src: multigridFigure, alt: "Multigrid error correction", title: "Multigrid · Correction across scales" },
  { src: boundaryFigure, alt: "Lattice treatment of curved solid boundaries", title: "Boundary conditions · Local lattice rules" },
  { src: warmStartFigure, alt: "Reusing a previous steady solution", title: "Warm start · Reusing solutions" },
  { src: kokkosFigure, alt: "Kokkos parallel backends", title: "GPU implementation · Kokkos" },
];

export default function SlimeMethodsPage() {
  return <article className="slime-showcase slime-methods-page">
    <SlimeScrollReveal />
    <SlimeLightbox figures={lightboxFigures} />
    <SlimeScrollProgress sections={methodNavigation} />
    <Link className="back-link" href="/projects/slime">← SLIME overview</Link>
    <header className="slime-section">
      <p className="eyebrow">SLIME / NUMERICAL METHODS</p>
      <h1>Numerical methods &amp; implementation</h1>
      <p className="slime-methods-intro">Why low-Reynolds-number flow is computationally challenging, and how SLIME combines a steady lattice Boltzmann formulation, multigrid acceleration, local boundary treatment, warm starts, and portable parallel computing.</p>
    </header>
    {sections.map((section, index) => <section className="slime-section slime-numbered-section" key={section.label} id={methodNavigation[index].id} data-section-number={String(index + 1).padStart(2, "0")}>
      <p className="eyebrow slime-reveal">{section.label}</p>
      <h2 className="slime-reveal">{section.title}</h2>
      {section.paragraphs.map(paragraph => <p className="slime-reveal" key={paragraph}>{paragraph}</p>)}
      {section.label === "01 / BACKGROUND" && <figure className="slime-method-figure slime-reveal slime-reveal-image"><Image src={slimeTimescales} alt="Time-scale separation between slow macroscopic motion and rapid fluid relaxation at low Reynolds numbers" sizes="(max-width: 650px) 100vw, 1000px" /></figure>}
      {section.label === "02 / STEADY LBM" && <figure className="slime-method-figure slime-reveal slime-reveal-image"><Image src={stokesFigure} alt="Illustration of solving directly for steady Stokes flow" sizes="(max-width: 650px) 100vw, 1000px" /></figure>}
      {section.label === "03 / MULTIGRID" && <figure className="slime-method-figure slime-reveal slime-reveal-image"><Image src={multigridFigure} alt="Illustration of multigrid error correction across grid resolutions" sizes="(max-width: 650px) 100vw, 1000px" /></figure>}
      {section.label === "04 / BOUNDARY CONDITIONS" && <figure className="slime-method-figure slime-reveal slime-reveal-image"><Image src={boundaryFigure} alt="Illustration of lattice-based boundary treatment for curved solid surfaces" sizes="(max-width: 650px) 100vw, 1000px" /></figure>}
      {section.label === "05 / WARM START" && <figure className="slime-method-figure slime-reveal slime-reveal-image"><Image src={warmStartFigure} alt="Illustration of reusing a previous steady-flow solution as the initial guess for the next solve" sizes="(max-width: 650px) 100vw, 1000px" /></figure>}
      {section.label === "06 / GPU IMPLEMENTATION" && <figure className="slime-method-figure slime-reveal slime-reveal-image"><Image src={kokkosFigure} alt="Illustration of Kokkos parallel execution across GPU and CPU backends" sizes="(max-width: 650px) 100vw, 1000px" /></figure>}
    </section>)}
    <div className="detail-next"><Link href="/projects/slime">← Back to SLIME overview</Link></div>
  </article>;
}
