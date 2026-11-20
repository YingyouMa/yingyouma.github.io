import type { SiteLanguage } from "../components/language-provider";

type MethodsSectionCopy = {
  nav: string;
  label: string;
  title: string;
  paragraphs: [string, string];
  figureAlt: string;
  lightboxAlt: string;
  lightboxTitle: string;
};

type MethodsCopy = {
  back: string;
  bottomBack: string;
  eyebrow: string;
  title: string;
  introduction: string;
  scrollLabels: { mobileTitle: string; navTitle: string; readingProgress: string; ariaLabel: string };
  lightboxLabels: {
    enlarge: string;
    viewer: string;
    close: string;
    previous: string;
    next: string;
    hint: string;
  };
  sections: MethodsSectionCopy[];
};

/** SLIME numerical methods page only; the original figures and route anchors stay unchanged. */
export const slimeMethodsCopy: Record<SiteLanguage, MethodsCopy> = {
  en: {
    back: "SLIME overview",
    bottomBack: "Back to SLIME overview",
    eyebrow: "SLIME / NUMERICAL METHODS",
    title: "Numerical methods & implementation",
    introduction: "Why low-Reynolds-number flow is computationally challenging, and how SLIME combines a steady lattice Boltzmann formulation, multigrid acceleration, local boundary treatment, warm starts, and portable parallel computing.",
    scrollLabels: { mobileTitle: "Sections", navTitle: "ON THIS PAGE", readingProgress: "READING PROGRESS", ariaLabel: "Page sections" },
    lightboxLabels: {
      enlarge: "Enlarge figure:",
      viewer: "Technical figure viewer",
      close: "Close image viewer",
      previous: "Previous figure",
      next: "Next figure",
      hint: "← → to navigate · Esc to close",
    },
    sections: [
      {
        nav: "Background",
        label: "01 / BACKGROUND",
        title: "The challenge of low-Reynolds-number flow",
        paragraphs: [
          "Highly viscous flows often involve two very different time scales. The large-scale motion driven by external forces can evolve slowly, while momentum within the fluid adjusts much more rapidly. A conventional time-stepping simulation must still resolve that fast adjustment, even when the flow of interest is effectively steady. This separation of time scales makes direct time integration unnecessarily expensive.",
          "The lattice Boltzmann method (LBM) is attractive because it handles complex and moving solid boundaries naturally, but using it to follow the physical transient can require very small time steps. Conventional Stokes solvers avoid that transient, yet enforcing incompressibility and accommodating complicated, moving boundaries can require substantial additional machinery. SLIME is designed to combine the useful features of both approaches.",
        ],
        figureAlt: "Time-scale separation between slow macroscopic motion and rapid fluid relaxation at low Reynolds numbers",
        lightboxAlt: "Time-scale separation in viscous flow",
        lightboxTitle: "Background · Time-scale separation",
      },
      {
        nav: "Steady LBM",
        label: "02 / STEADY LBM",
        title: "Solving for the steady state directly",
        paragraphs: [
          "SLIME modifies the lattice Boltzmann formulation to better match the Stokes regime. First, it removes the nonlinear part of the fluid update, eliminating the inertial advection term that is negligible at low Reynolds numbers.",
          "Instead of repeatedly advancing that update in physical time until the fluid relaxes, SLIME solves directly for its fixed point: the state that would remain unchanged under another update. This bypasses the fast transient while retaining the lattice-based treatment of forcing and solid boundaries.",
        ],
        figureAlt: "Illustration of solving directly for steady Stokes flow",
        lightboxAlt: "Direct solution of steady Stokes flow",
        lightboxTitle: "Steady LBM · Fixed-point solution",
      },
      {
        nav: "Multigrid",
        label: "03 / MULTIGRID",
        title: "Accelerating convergence across scales",
        paragraphs: [
          "Directly solving for a fixed point still requires an efficient iterative method. Local iterations typically remove rapidly varying, short-wavelength errors first, while smooth, long-wavelength errors decay much more slowly. Multigrid accelerates convergence by correcting long-wavelength errors on coarser grids, where they are easier to eliminate.",
          "SLIME uses a multigrid W-cycle to accelerate convergence of its steady lattice system, with parameters tuned for the default grid configuration.",
        ],
        figureAlt: "Illustration of multigrid error correction across grid resolutions",
        lightboxAlt: "Multigrid error correction",
        lightboxTitle: "Multigrid · Correction across scales",
      },
      {
        nav: "Boundaries",
        label: "04 / BOUNDARY CONDITIONS",
        title: "Local boundary treatment for complex geometries",
        paragraphs: [
          "A major reason to retain the lattice Boltzmann formulation is its treatment of solid boundaries. No-slip conditions can be imposed through local lattice rules, including bounce-back-based treatments for curved surfaces. This avoids the need to construct a body-fitted mesh or rebuild a global discretization around each complicated object—complications that conventional Stokes solvers may face when handling complex or moving boundaries.",
          "When a solid moves, SLIME updates which lattice sites belong to the fluid and how the boundary intersects nearby lattice links. Because the boundary treatment is local, changing the geometry primarily affects the region near the moving surface. This makes complex and moving boundaries relatively straightforward to update.",
        ],
        figureAlt: "Illustration of lattice-based boundary treatment for curved solid surfaces",
        lightboxAlt: "Lattice treatment of curved solid boundaries",
        lightboxTitle: "Boundary conditions · Local lattice rules",
      },
      {
        nav: "Warm Start",
        label: "05 / WARM START",
        title: "Reusing the previous steady solution",
        paragraphs: [
          "Many applications require a sequence of closely related steady-flow solutions—for example, as an immersed object moves a small distance between steps. Solving each configuration from scratch would discard useful information from the preceding one.",
          "SLIME can instead initialize the next solve from the previous steady-state solution. When the geometry and forcing change only slightly, this initial guess is already close to the new solution, so the multigrid solver has less remaining error to remove.",
        ],
        figureAlt: "Illustration of reusing a previous steady-flow solution as the initial guess for the next solve",
        lightboxAlt: "Reusing a previous steady solution",
        lightboxTitle: "Warm start · Reusing solutions",
      },
      {
        nav: "GPU",
        label: "06 / GPU IMPLEMENTATION",
        title: "GPU parallel computing with Kokkos",
        paragraphs: [
          "SLIME is implemented in C++ with Kokkos, a performance-portability framework for parallel computing. Rather than writing separate low-level kernels for every device, the solver expresses its parallel lattice operations through Kokkos and uses the selected execution backend to run them.",
          "On NVIDIA GPUs, the Kokkos CUDA backend executes the repeated lattice updates, residual calculations, and multigrid operations. The same programming model also supports CPU execution and offers a path to other supported GPU backends.",
        ],
        figureAlt: "Illustration of Kokkos parallel execution across GPU and CPU backends",
        lightboxAlt: "Kokkos parallel backends",
        lightboxTitle: "GPU implementation · Kokkos",
      },
    ],
  },
  "zh-CN": {
    back: "SLIME 项目概述",
    bottomBack: "返回 SLIME 项目概述",
    eyebrow: "SLIME / 数值方法",
    title: "数值方法与实现",
    introduction: "介绍低雷诺数流动的数值计算难点，以及 SLIME 如何结合稳态格子玻尔兹曼方法、多重网格加速、局部边界处理、热启动和跨硬件平台的并行计算技术。",
    scrollLabels: { mobileTitle: "章节", navTitle: "本页目录", readingProgress: "阅读进度", ariaLabel: "页面章节" },
    lightboxLabels: {
      enlarge: "放大图片：",
      viewer: "技术示意图查看器",
      close: "关闭图片查看器",
      previous: "上一张图片",
      next: "下一张图片",
      hint: "← → 切换图片 · Esc 关闭",
    },
    sections: [
      {
        nav: "研究背景",
        label: "01 / 研究背景",
        title: "低雷诺数流动的计算挑战",
        paragraphs: [
          "高黏性流动中通常存在相差悬殊的两个时间尺度：外力驱动的大尺度运动可能演化得很慢，而流体内部的动量调整却快得多。即使只关心近似稳态的流动，传统时间推进方法仍需要解析较快的流体调整过程。这种时间尺度差异会显著增加直接时间积分的计算成本。",
          "格子玻尔兹曼方法（LBM）能够方便地处理复杂或运动的固体边界，但若用它来追踪真实的瞬态演化，可能需要很小的时间步长。传统的斯托克斯流求解器则可以直接求解稳态流动，避开这一瞬态过程，但在满足不可压缩条件、处理复杂或运动边界时，往往需要额外的数值处理。SLIME 将这两种方法的特点结合起来。",
        ],
        figureAlt: "低雷诺数流动中缓慢宏观运动与快速流体松弛过程的时间尺度分离示意图",
        lightboxAlt: "黏性流动中的时间尺度分离",
        lightboxTitle: "研究背景 · 时间尺度分离",
      },
      {
        nav: "稳态LBM方法",
        label: "02 / 稳态格子玻尔兹曼方法",
        title: "直接求解稳态流动",
        paragraphs: [
          "SLIME 对格子玻尔兹曼方法进行调整，使其更适用于斯托克斯流动。首先，去除流体更新方程中的非线性项，从而消除在低雷诺数条件下可以忽略的惯性对流项。",
          "SLIME 不再沿物理时间反复推进流体状态、等待流动逐渐松弛，而是直接求解离散更新算子的不动点，即经过一次离散更新后仍保持不变的状态。这样既绕过了快速瞬态过程，也保留了格点方法在外力和固体边界处理上的优势。",
        ],
        figureAlt: "直接求解稳态斯托克斯流动的示意图",
        lightboxAlt: "直接求解稳态斯托克斯流动",
        lightboxTitle: "稳态格子玻尔兹曼方法 · 不动点求解",
      },
      {
        nav: "多重网格",
        label: "03 / 多重网格",
        title: "跨尺度加速收敛",
        paragraphs: [
          "直接求解不动点仍然需要高效的迭代方法。局部迭代通常能够快速消除高频误差，但对低频误差的收敛较慢。多重网格方法在更粗的网格上校正低频误差，从而加快整体收敛。",
          "SLIME 采用多重网格 W 循环，加速稳态格子玻尔兹曼离散方程的收敛，并针对默认网格配置调节相关参数。",
        ],
        figureAlt: "不同网格分辨率下的多重网格误差校正示意图",
        lightboxAlt: "多重网格误差校正",
        lightboxTitle: "多重网格 · 跨尺度误差校正",
      },
      {
        nav: "边界条件",
        label: "04 / 边界条件",
        title: "复杂几何体的局部边界处理",
        paragraphs: [
          "保留格子玻尔兹曼框架的一个重要原因，是它能够方便地在局部格点上处理固体边界。无滑移边界条件可以通过局部格点规则施加，例如采用适用于曲面边界的反弹（bounce-back）规则。这样不必为每个复杂物体构建贴体网格，也不需要随着物体运动重新构建整个计算域的离散系统。",
          "固体运动时，SLIME 会重新判定流体格点与固体格点，并更新边界与相邻格子连线的交点位置。由于边界处理具有局部性，几何形状的变化主要影响运动表面附近的区域，因此复杂边界和运动边界的更新相对直接。",
        ],
        figureAlt: "基于格点的曲面固体边界处理示意图",
        lightboxAlt: "曲面固体边界的格点处理",
        lightboxTitle: "边界条件 · 局部格点规则",
      },
      {
        nav: "热启动",
        label: "05 / 热启动",
        title: "复用前一次稳态解",
        paragraphs: [
          "许多应用需要反复求解一组相近的稳态流动问题。例如，浸没物体在相邻步骤之间仅移动很小一段距离。如果每次都从头求解，就会浪费上一次计算中已经得到的有用信息。",
          "SLIME 可以将上一次求得的稳态解作为下一次求解的初始猜测。当几何形状和外力变化很小时，这个初始猜测已经接近新的稳态解，因此多重网格求解器需要消除的剩余误差也更少。",
        ],
        figureAlt: "复用前一次稳态流动解作为下一次求解初始猜测的示意图",
        lightboxAlt: "复用前一次稳态解",
        lightboxTitle: "热启动 · 复用稳态解",
      },
      {
        nav: "GPU 实现",
        label: "06 / GPU 实现",
        title: "基于 Kokkos 的 GPU 并行计算",
        paragraphs: [
          "SLIME 使用 C++ 和 Kokkos 实现。Kokkos 是一个支持跨平台高性能并行计算的编程框架。求解器无需为每种计算设备分别编写底层计算内核，而是通过 Kokkos 表达并行格点运算，再由选定的执行后端完成计算。",
          "在 NVIDIA GPU 上，Kokkos 的 CUDA 后端执行格点更新、残差计算和多重网格运算。同一套代码也可以通过 CPU 后端运行，并支持迁移到其他兼容的 GPU 后端。",
        ],
        figureAlt: "Kokkos 在 GPU 与 CPU 后端上执行并行计算的示意图",
        lightboxAlt: "Kokkos 并行执行后端",
        lightboxTitle: "GPU 实现 · Kokkos",
      },
    ],
  },
};
