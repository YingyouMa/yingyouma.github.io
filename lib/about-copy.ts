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
      "I have a Ph.D. in Physics from Brandeis University, with a background in theoretical and computational research on complex fluids. My work involves analytical derivations, numerical simulations, and scientific software development, as well as high-performance computing and improvements to numerical algorithms.",
      "During my Ph.D., I primarily studied soft matter and fluid mechanics problems in biophysics. My most significant work investigated the geometry and dynamics of topological defects in liquid crystals, including the derivation, stability analysis, and numerical solution of equations governing the liquid-crystal order parameter and its coupling to fluid dynamics, alongside large-scale molecular dynamics simulations.",
      "My scientific computing projects include SLIME, a GPU-accelerated 3D Stokes-flow solver combining lattice Boltzmann and multigrid methods, primarily designed for highly viscous flows with moving, geometrically complex boundaries, and EigenPlot3D, an object-oriented framework for interactive scientific visualization built on PyVista and VTK. I have also developed Python packages specifically for liquid-crystal research, including tools that use data-driven methods and machine learning to uncover dynamical patterns in liquid crystals, as well as Nematics3D, a highly optimized Python package for analyzing physical properties and visualizing three-dimensional liquid-crystal director fields and topological defect networks.",
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
      "我在布兰迪斯大学获得物理学博士学位，主要研究复杂流体的理论分析与数值计算。我的工作涉及公式推导、数值模拟和科学计算软件开发，也包括高性能计算和数值算法的改进。",
      "博士期间，我主要研究生物物理中的软物质和流体力学问题。其中，我的主要研究工作集中在液晶拓扑缺陷的几何性质及其动力学行为上，包括液晶序参量演化方程及与之耦合的流体力学方程的推导、稳定性分析和数值求解，并结合大规模分子动力学模拟开展研究。",
      "在科学软件开发方面，我开发了 SLIME，一个结合格子玻尔兹曼方法、多重网格算法和 GPU 加速的三维斯托克斯流动求解器，主要用于求解具有复杂几何形状和运动边界的高黏性流体问题。另一个项目 EigenPlot3D 基于 PyVista 和 VTK，提供面向对象的三维科学可视化接口，便于交互调整绘图参数和查看三维数据。此外，我还开发过一些面向液晶研究的 Python 工具包，包括利用数据驱动方法和机器学习识别液晶动力学典型模式的工具，以及 Nematics3D。后者经过性能优化，用于分析和可视化三维液晶指向场及其拓扑缺陷网络。",
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
