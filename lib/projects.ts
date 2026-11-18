export type Project = {
  slug: string;
  name: string;
  eyebrow: string;
  tagline: string;
  summary: string;
  description: string;
  stack: string[];
  highlights: { title: string; body: string }[];
  accent: string;
  visual: "plot" | "flow";
};

export const projects: Project[] = [
  {
    slug: "eigenplot3d",
    name: "EigenPlot3D",
    eyebrow: "01 / SCIENTIFIC SOFTWARE",
    tagline: "Objects, configuration, and interaction for scientific 3D graphics.",
    summary: "A high-level, object-oriented interface to PyVista for configurable, interactive 3D visualization.",
    description: "EigenPlot3D organizes PyVista-backed visualizations into reusable objects with explicit configuration and interactive controls.",
    stack: ["Python", "PyVista / VTK", "Object-Oriented API", "Qt GUI"],
    highlights: [
      { title: "Object-oriented API", body: "Build plots using reusable objects." },
      { title: "Configurable workflows", body: "Configure plotting options and appearance." },
      { title: "Interactive exploration", body: "Inspect plots interactively." }
    ],
    accent: "#f3bb80",
    visual: "plot"
  },
  {
    slug: "slime",
    name: "SLIME",
    eyebrow: "02 / NUMERICAL METHODS & HPC",
    tagline: "Simulating fluid flow around complex and moving objects.",
    summary: "A GPU-powered tool for simulating how viscous fluids flow around objects with complex shapes and moving boundaries.",
    description: "SLIME combines lattice Boltzmann boundary treatment with GPU-accelerated multigrid to compute steady Stokes flows.",
    stack: ["C++", "CUDA", "LBM", "Multigrid", "GPU Computing"],
    highlights: [
      { title: "Steady-state formulation", body: "Compute steady Stokes-flow solutions." },
      { title: "GPU multigrid", body: "Use multigrid to improve convergence." },
      { title: "Verified geometry cases", body: "Test cases include a moving sphere inside a spherical cavity." }
    ],
    accent: "#68d7e8",
    visual: "flow"
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
