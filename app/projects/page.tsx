import { ProjectCard } from "../../components/project-card";
import { projects } from "../../lib/projects";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <section className="section listing-page">
      <h1 className="page-title">Projects</h1>
      <div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
    </section>
  );
}
