import Link from "next/link";
import type { Project } from "../lib/projects";
import { ProjectVisual } from "./visual";

export function ProjectCard({ project, index, vectorFieldCover = false, categoryLabel = "PROJECT", visualAlt }: { project: Project; index: number; vectorFieldCover?: boolean; categoryLabel?: string; visualAlt?: string }) {
  return (
    <Link className="project-card" href={`/projects/${project.slug}`} style={{ "--accent": project.accent } as React.CSSProperties}>
      <ProjectVisual kind={project.visual} vectorFieldCover={vectorFieldCover} alt={visualAlt} />
      <div className="card-body">
        <div className="card-meta"><span>0{index + 1} / {categoryLabel}</span><span>↗</span></div>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        <div className="tag-row">{project.stack.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
    </Link>
  );
}
