import Link from "next/link";
import { ProjectCard } from "../components/project-card";
import { projects } from "../lib/projects";

export default function Home() {
  return (
    <>
      <section className="hero">
        
        <div className="hero-content">
          <p className="eyebrow">SCIENTIFIC COMPUTING / SOFTWARE ENGINEERING</p>
          <h1>Scientific computing<br /><em>and software.</em></h1>
          <p className="hero-lede">I work on numerical methods, scientific data analysis, and 3D visualization software.</p>
          <div className="hero-actions"><Link href="#projects" className="button-primary">Projects <span>↓</span></Link><Link href="/about" className="text-link">About me <span>→</span></Link></div>
        </div>
        
      </section>
      <section className="section projects-section" id="projects">
        <div className="section-heading">
          <h2>Projects</h2>
        </div>
        <div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
      </section>
    </>
  );
}
