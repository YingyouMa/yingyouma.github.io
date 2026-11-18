"use client";

import { useLanguage } from "./language-provider";
import { ProjectCard } from "./project-card";
import { projects, type Project } from "../lib/projects";

type ProjectListingTranslation = Pick<Project, "summary" | "stack"> & { imageAlt: string };

const chineseCopy: Record<string, ProjectListingTranslation> = {
  eigenplot3d: {
    summary: "基于 PyVista 的高层面向对象接口，支持灵活配置与交互式三维科学可视化。",
    stack: ["Python", "PyVista / VTK", "面向对象接口", "Qt 图形界面"],
    imageAlt: "EigenPlot3D 三维矢量场可视化效果图",
  },
  slime: {
    summary: "GPU 加速的三维黏性流动模拟工具，擅长处理复杂几何体和运动边界。",
    stack: ["C++", "CUDA", "格子玻尔兹曼方法（LBM）", "多重网格", "GPU 计算"],
    imageAlt: "SLIME 流体模拟封面图",
  },
};

export function ProjectsListing() {
  const { language } = useLanguage();
  const zh = language === "zh-CN";

  return (
    <section className="section listing-page">
      <h1 className="page-title">{zh ? "项目" : "Projects"}</h1>
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
