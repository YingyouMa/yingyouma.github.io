"use client";

import { useLanguage } from "./language-provider";
import { ProjectCard } from "./project-card";
import { projects, type Project } from "../lib/projects";

type ProjectListingTranslation = Pick<Project, "summary" | "stack"> & { imageAlt: string };

const chineseCopy: Record<string, ProjectListingTranslation> = {
  eigenplot3d: {
    summary: "基于 PyVista 构建的面向对象绘图接口，支持三维科学可视化的交互调整和参数配置。",
    stack: ["Python", "PyVista / VTK", "面向对象接口", "Qt 图形界面"],
    imageAlt: "EigenPlot3D 项目封面图",
  },
  slime: {
    summary: "基于 GPU 加速的三维黏性流动求解器，适用于复杂几何和运动边界问题。",
    stack: ["C++", "CUDA", "格子玻尔兹曼方法（LBM）", "多重网格", "GPU 计算"],
    imageAlt: "SLIME 流体模拟封面图",
  },
};

export function ProjectsListing({ home = false }: { home?: boolean }) {
  const { language } = useLanguage();
  const zh = language === "zh-CN";

  return (
    <section className={home ? "section projects-section project-listing" : "section listing-page project-listing"} id={home ? "projects" : undefined}>
      {home ? (
        <div className="section-heading">
          <h2>{zh ? "项目" : "Projects"}</h2>
        </div>
      ) : (
        <h1 className="page-title">{zh ? "项目" : "Projects"}</h1>
      )}
      <div className="project-grid">
        {projects.map((project, index) => {
          const copy = zh ? chineseCopy[project.slug] : undefined;
          return (
            <ProjectCard
              key={project.slug}
              project={copy ? { ...project, summary: copy.summary, stack: copy.stack } : project}
              index={index}
              categoryLabel={zh ? "项目" : "PROJECT"}
              visualAlt={copy?.imageAlt}
              vectorFieldCover={project.slug === "eigenplot3d"}
            />
          );
        })}
      </div>
    </section>
  );
}
