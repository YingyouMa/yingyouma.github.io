import type { SiteLanguage } from "../components/language-provider";

type Capability = { number: string; title: string; text: string };
type Example = { type: string; title: string; subtitle: string; text: string; figure: string };
type Section = { id: string; label: string };
type SlimeHomeCopy = {
  back: string;
  eyebrow: string;
  heroTitle: string;
  heroImageAlt: string;
  heroTags: string[];
  jumps: [string, string];
  sections: Section[];
  scrollLabels: { mobileTitle: string; navTitle: string; readingProgress: string; ariaLabel: string };
  overview: { label: string; title: string; paragraphs: [string, string]; imageAlt: string };
  capabilitiesLabel: string;
  capabilitiesTitle: string;
  capabilities: Capability[];
  validation: { label: string; title: string; introduction: string; schematicCaption: string; schematicAria: string };
  examples: Example[];
  engine: { label: string; title: string; lede: string; description: string; imageAlt: string; tags: string[]; methodsLink: string };
};

/** Main SLIME showcase only. The separate /methods page keeps its original content. */
export const slimeHomeCopy: Record<SiteLanguage, SlimeHomeCopy> = {
  en: {
    back: "All projects",
    eyebrow: "SCIENTIFIC COMPUTING SOFTWARE / GPU SOLVER",
    heroTitle: "A GPU-accelerated solver for 3D viscous fluid flows around complex and moving objects.",
    heroImageAlt: "SLIME fluid simulation cover",
    heroTags: ["3D Fluid Simulation", "GPU Accelerated", "Complex Geometries", "Moving Boundaries"],
    jumps: ["Explore simulation cases", "Explore numerical methods"],
    sections: [
      { id: "slime-overview", label: "Overview" },
      { id: "slime-capabilities", label: "Capabilities" },
      { id: "slime-examples", label: "Validation" },
      { id: "slime-engine", label: "How it works" },
    ],
    scrollLabels: { mobileTitle: "Sections", navTitle: "ON THIS PAGE", readingProgress: "READING PROGRESS", ariaLabel: "Page sections" },
    overview: {
      label: "01 / OVERVIEW",
      title: "Combining efficient computation with flexible boundaries.",
      paragraphs: [
        "Simulating highly viscous fluids presents a practical trade-off. Some conventional methods can solve steady flow efficiently but require more elaborate treatment of complex or moving solid boundaries. Other methods handle such boundaries naturally, yet can become computationally expensive when they must simulate the rapid relaxation of a highly viscous fluid.",
        "SLIME brings these strengths together. It uses the lattice Boltzmann method to handle complicated boundaries and a GPU-accelerated multigrid solver to compute steady Stokes flow directly, without spending time simulating the transient relaxation.",
      ],
      imageAlt: "Overview illustration of the SLIME solver",
    },
    capabilitiesLabel: "02 / CAPABILITIES",
    capabilitiesTitle: "What the engine can do",
    capabilities: [
      { number: "01", title: "Steady-state flow", text: "Solve the steady Stokes problem directly, without marching through the physical relaxation transient." },
      { number: "02", title: "Complex solid boundaries", text: "Represent curved and non-convex immersed objects with lattice-based no-slip boundary treatment." },
      { number: "03", title: "Moving geometries", text: "Update fluid and solid nodes as objects change position, with warm starts between successive solves." },
      { number: "04", title: "Volumetric forcing", text: "Apply body forces throughout the computational domain, including localized and periodic forcing." },
    ],
    validation: {
      label: "03 / ANALYTICAL VALIDATION",
      title: "Fluid mechanics benchmarks",
      introduction: "Benchmark problems used to validate SLIME against analytical solutions, spanning canonical flows, hydrodynamic interactions, and complex moving boundaries.",
      schematicCaption: "SCHEMATIC · NOT SIMULATION DATA",
      schematicAria: "Schematic illustration, not simulation data",
    },
    examples: [
      { type: "BODY-FORCE VALIDATION", title: "Periodic Stokeslet", subtitle: "Localized volumetric forcing", text: "The flow response to a localized force in a periodic domain tests how SLIME applies body forces throughout the fluid.", figure: "stokeslet" },
      { type: "STANDARD BOUNDARY VALIDATION", title: "Channel flows", subtitle: "Poiseuille & Couette", text: "Pressure-driven and wall-driven channel flows verify the treatment of conventional no-slip boundaries through their velocity profiles.", figure: "channel" },
      { type: "COMPLEX BOUNDARY VALIDATION", title: "Rotating dumbbell", subtitle: "Non-convex solid geometry", text: "A rotating two-lobe body provides a benchmark for hydrodynamic flow around a non-convex object, testing the accuracy of SLIME's complex-boundary treatment.", figure: "dumbbell" },
      { type: "MOVING BOUNDARY VALIDATION", title: "Sphere in a spherical cavity", subtitle: "Translating sphere in a fixed cavity", text: "A sphere translates within a fixed spherical cavity, testing how accurately SLIME handles moving solid boundaries and the resulting fluid flow.", figure: "cavity" },
    ],
    engine: {
      label: "04 / UNDER THE HOOD",
      title: "How SLIME works",
      lede: "GPU computation meets multilevel error correction.",
      description: "SLIME combines the lattice Boltzmann method for flexible boundary handling with multigrid acceleration for efficient steady-state flow computation. Its CUDA implementation supports three-dimensional simulations.",
      imageAlt: "Illustration of the SLIME numerical method",
      tags: ["Lattice Boltzmann Method", "Multigrid Solver", "CUDA Acceleration"],
      methodsLink: "Explore the numerical methods",
    },
  },
  "zh-CN": {
    back: "所有项目",
    eyebrow: "科学计算软件 / GPU 求解器",
    heroTitle: "面向复杂几何和运动边界的 GPU 加速三维黏性流动求解器",
    heroImageAlt: "SLIME 流体模拟封面图",
    heroTags: ["三维流体模拟", "GPU 加速", "复杂几何体", "运动边界"],
    jumps: ["查看模拟算例", "了解数值方法"],
    sections: [
      { id: "slime-overview", label: "项目概述" },
      { id: "slime-capabilities", label: "主要功能" },
      { id: "slime-examples", label: "验证算例" },
      { id: "slime-engine", label: "工作原理" },
    ],
    scrollLabels: { mobileTitle: "章节", navTitle: "本页目录", readingProgress: "阅读进度", ariaLabel: "页面章节" },
    overview: {
      label: "01 / 项目概述",
      title: "兼顾高效计算与复杂边界处理。",
      paragraphs: [
        "高黏性流动的数值计算面临一个重要问题：如何兼顾求解效率与复杂运动边界的处理。一些稳态求解方法效率较高，但处理形状复杂或持续运动的固体边界时，往往需要额外的数值处理。另一些方法能够较方便地处理这些边界，但如果通过时间推进等待流体达到稳态，就需要解析其中较快的流体松弛过程，计算成本可能很高。",
        "SLIME 使用格子玻尔兹曼方法处理复杂边界，并通过 GPU 加速的多重网格方法直接求解稳态斯托克斯流动，无需模拟流体达到稳态之前的瞬态松弛过程。",
      ],
      imageAlt: "SLIME 求解器概览示意图",
    },
    capabilitiesLabel: "02 / 主要功能",
    capabilitiesTitle: "SLIME 能做什么",
    capabilities: [
      { number: "01", title: "稳态流动求解", text: "直接求解稳态斯托克斯流动，无需逐步模拟流体的瞬态松弛过程。" },
      { number: "02", title: "复杂固体边界", text: "利用基于格点的无滑移边界条件，处理曲面和非凸形状的浸没固体边界。" },
      { number: "03", title: "运动几何体", text: "物体移动时，更新流体与固体格点的划分，并利用上一次的稳态解作为初始猜测，加快后续求解。" },
      { number: "04", title: "体力作用", text: "支持在计算域内施加空间分布的体力，包括局部施力和周期性分布的体力。" },
    ],
    validation: {
      label: "03 / 解析解验证",
      title: "流体力学基准算例",
      introduction: "选取经典流动、流体动力学相互作用和复杂运动边界等基准算例，将 SLIME 的数值结果与解析解进行比较，验证求解器的准确性。",
      schematicCaption: "示意图（非实际模拟结果）",
      schematicAria: "示意图，并非实际模拟数据",
    },
    examples: [
      { type: "体积力验证", title: "周期性点力流动", subtitle: "局部体积力作用", text: "在周期性计算域内施加局部力，观察流体的响应，以检验 SLIME 对体积力的处理方式。", figure: "stokeslet" },
      { type: "标准边界验证", title: "通道流动", subtitle: "泊肃叶流与库埃特流", text: "通过压力驱动和壁面驱动的通道流速度剖面，验证常规无滑移边界条件的处理效果。", figure: "channel" },
      { type: "复杂边界验证", title: "旋转哑铃体", subtitle: "非凸固体几何", text: "通过计算旋转哑铃体周围的流动，检验 SLIME 对非凸固体边界的处理精度。", figure: "dumbbell" },
      { type: "运动边界验证", title: "球形腔体中的移动球体", subtitle: "固定腔体内的平移球体", text: "让球体在固定的球形腔体内平移，以检验 SLIME 对运动固体边界及其引起的流体运动的计算准确性。", figure: "cavity" },
    ],
    engine: {
      label: "04 / 内部机制",
      title: "SLIME 的工作原理",
      lede: "通过 GPU 并行计算和多重网格方法加速稳态求解。",
      description: "SLIME 利用格子玻尔兹曼方法处理固体边界，并通过多重网格方法加速稳态流动的求解。其 Kokkos 实现可通过 CUDA 后端在 GPU 上运行，支持三维流体模拟。",
      imageAlt: "SLIME 数值方法示意图",
      tags: ["格子玻尔兹曼方法", "多重网格求解器", "CUDA 加速"],
      methodsLink: "了解数值方法",
    },
  },
};
