import type { SiteLanguage } from "../components/language-provider";

type AboutCopy = {
  eyebrow: string;
  title: string;
  heading: string;
  paragraphs: string[];
  tags: string[];
};

export const aboutCopy: Record<SiteLanguage, AboutCopy> = {
  en: {
    eyebrow: "ABOUT ME",
    title: "About",
    heading: "Computational physics, numerical methods & scientific software",
    paragraphs: [
      "I'm a computational physicist with a Ph.D. in Physics from Brandeis University. My work focuses on numerical methods, high-performance computing, and scientific software development. I'm particularly interested in combining physical modeling, numerical algorithms, and efficient software implementations to investigate complex physical systems.",
      "During my Ph.D., my research focused on the theory and numerical simulation of soft matter dynamics, particularly the geometry and dynamics of topological defects. My research also involved molecular dynamics simulations, continuum modeling, and numerical analysis to explore the behavior of complex soft matter systems.",
      "My scientific computing projects include SLIME, a GPU-accelerated 3D Stokes-flow solver combining lattice Boltzmann and multigrid methods, and EigenPlot3D, an object-oriented framework for interactive scientific visualization built on PyVista and VTK. I also have experience in scientific data analysis and data-driven studies of dynamical systems.",
      "I work primarily with C++ and Python, emphasizing numerical accuracy, computational performance, reproducibility, and usability. My goal is to build scientific software that not only performs reliable computations but also helps researchers explore, analyze, and understand physical systems more effectively.",
    ],
    tags: [
      "Soft Matter Dynamics",
      "Topological Defects",
      "Numerical Methods",
      "Scientific Software",
      "GPU Computing",
      "3D Visualization",
    ],
  },
  "zh-CN": {
    eyebrow: "个人简介",
    title: "关于我",
    heading: "计算物理、数值方法与科学软件",
    paragraphs: [
      "我在布兰迪斯大学获得物理学博士学位，研究背景是计算物理。我的工作涉及物理建模、数值方法和科学计算软件开发，也包括高性能计算和科学数据分析。",
      "博士期间，我主要研究软物质动力学，结合理论分析和数值模拟，重点关注拓扑缺陷的几何性质及其动力学行为。相关研究还涉及分子动力学模拟、连续介质建模和数值分析。",
      "在科学软件开发方面，我开发了 SLIME，一个结合格子玻尔兹曼方法、多重网格算法和 GPU 加速的三维 Stokes 流动求解器。另一个项目 EigenPlot3D 基于 PyVista 和 VTK，提供面向对象的三维科学可视化接口，方便调整绘图参数和交互查看数据。此外，我也做过数据驱动的动力学分析。",
      "我主要使用 C++ 和 Python。做数值计算时，我看重算法的准确性和运行效率；开发软件时，也重视结果的可复现性，以及工具在实际科研中的使用体验。",
    ],
    tags: [
      "软物质动力学",
      "拓扑缺陷",
      "数值方法",
      "科学软件开发",
      "GPU 计算",
      "三维可视化",
    ],
  },
};
