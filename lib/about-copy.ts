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
      "我是一名计算物理研究者，拥有布兰迪斯大学物理学博士学位，主要从事数值方法、高性能科学计算和科学软件开发。我尤其关注如何将物理建模、数值算法与高效的软件实现相结合，以研究复杂的物理系统。",
      "博士期间，我的研究主要围绕软物质动力学的理论与数值模拟展开，尤其关注拓扑缺陷的几何性质及其动力学。我的研究也涉及分子动力学模拟、连续介质建模和数值分析，以探索复杂软物质系统的物理行为。",
      "在科学计算与软件开发方面，我开发了 SLIME，一个结合格子玻尔兹曼方法、多重网格算法和 GPU 加速的三维 Stokes 流动求解器；以及 EigenPlot3D，一个基于 PyVista 和 VTK 的面向对象交互式科学可视化工具。我还具有科学数据分析和数据驱动动力学研究的经验。",
      "我主要使用 C++ 和 Python 开发科学软件，重视数值计算的准确性、计算性能、可复现性和易用性。我希望开发的不仅是能够可靠完成计算的程序，更是能够帮助研究人员高效探索、分析和理解物理系统的计算工具。",
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
