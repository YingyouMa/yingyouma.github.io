import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectVisual } from "../../../components/visual";
import { SlimeShowcase } from "../../../components/slime-showcase";
import { EigenplotShowcase } from "../../../components/eigenplot-showcase";
import { getProject, projects } from "../../../lib/projects";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  if (slug === "slime") return <SlimeShowcase />;
  if (slug === "eigenplot3d") return <EigenplotShowcase />;
  return (
    <article className="detail-page" style={{ "--accent": project.accent } as React.CSSProperties}>
      <Link href="/projects" className="back-link">← All projects</Link>
      <header className="detail-header">
        <p className="eyebrow">{project.eyebrow}</p>
        <h1>{project.name}</h1>
        <p className="detail-tagline">{project.tagline}</p>
        <div className="tag-row">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </header>
      <ProjectVisual kind={project.visual} large />
      <div className="detail-content">
        <section className="detail-intro"><p className="eyebrow">OVERVIEW</p><h2>What it does</h2><p>{project.description}</p></section>
        <section className="detail-highlights"><p className="eyebrow">DETAILS</p><h2>Main features</h2><div className="highlights-grid">{project.highlights.map((item, i) => <div className="highlight" key={item.title}><span className="highlight-number">0{i + 1}</span><h3>{item.title}</h3><p>{item.body}</p></div>)}</div></section>
        {slug === "slime" && <section className="validation-panel"><p className="eyebrow">WR19 / NUMERICAL VERIFICATION</p><h2>WR19 validation case</h2><p>One reported validation studies an eccentric sphere moving inside a spherical cavity across 101 positions on a 128³ lattice. The presentation reports drag errors of 0.24–0.31% and velocity-field L₂ errors of 0.32–0.35% for this test. These are case-specific validation results, not general solver accuracy guarantees.</p><div className="metric-grid"><div><strong>101</strong><span>geometry positions</span></div><div><strong>0.24–0.31%</strong><span>drag error</span></div><div><strong>0.32–0.35%</strong><span>velocity L₂ error</span></div></div><p className="data-note">Source: existing SLIME technical presentation. Benchmark figures and conditions will be added after asset review. Hybrid results are excluded.</p></section>}
        <div className="detail-next"><Link href="/projects">← Projects</Link></div>
      </div>
    </article>
  );
}
