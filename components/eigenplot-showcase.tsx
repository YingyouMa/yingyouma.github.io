"use client";

import Link from "next/link";
import { EigenplotScrollProgress } from "./eigenplot-scroll-progress";
import { EigenplotLightbox } from "./eigenplot-lightbox";
import { EigenplotViewportEffects } from "./eigenplot-viewport-effects";
import { EigenplotGallery, eigenplotGalleryCases } from "./eigenplot-gallery";
import { EigenplotApiDiscovery } from "./eigenplot-api-discovery";
import { useLanguage } from "./language-provider";
import { eigenplotChinese } from "../lib/eigenplot-copy";
import "../app/eigenplot.css";
import "../app/eigenplot-contrast.css";
import "../app/eigenplot-architecture.css";

function PythonCode({ source }: { source: string }) {
  const tokens = source.match(/#[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b\d+(?:\.\d+)?\b|\b[A-Za-z_]\w*\b|[^#'"\w\d]+|./g) ?? [];
  return <>{tokens.map((token, index) => {
    let kind = "";
    if (token.startsWith("#")) kind = "comment";
    else if (/^['"]/.test(token)) kind = "string";
    else if (/^\d/.test(token)) kind = "number";
    else if (/^(from|import|as|def|return|for|in|if|else|None|True|False)$/.test(token)) kind = "keyword";
    else if (/^(PlotFigure|PlotVector|OptsVector|OptsGlyph)$/.test(token)) kind = "class";
    else if (/^(print|act_commit|act_save_json|act_load_json)$/.test(token)) kind = "function";
    else if (/^(coords|orient|figure|length|radius|color|opacity|name|opts|shading_type|paint_by|anchor|ambient|diffuse|specular|tip_length_fraction|tip_radius_ratio|is_visible)$/.test(token)) kind = "property";
    return kind ? <span className={`eigen-py-${kind}`} key={index}>{token}</span> : <span key={index}>{token}</span>;
  })}</>;
}

export function EigenplotShowcase() {
  const { language } = useLanguage();
  const zh = language === "zh-CN";
  const t = (english: string) => zh ? (eigenplotChinese[english] ?? english) : english;
  return <article className="eigen-page">
    <EigenplotScrollProgress />
    <EigenplotViewportEffects />
    <EigenplotLightbox images={[
      { src: "/images/eigenplot3d/vector-field-main.png", alt: t("Three-dimensional vortex vector field sampled on a two-dimensional plane, rendered with EigenPlot3D") },
      { src: "/images/eigenplot3d/main.png", alt: t("Vector field rendered using EigenPlot3D from supplied coordinates, orientations, and RGB colors") },
      { src: "/images/eigenplot3d/pick.png", alt: t("EigenPlot3D glyph picking with numbered markers and object information") },
      { src: "/images/eigenplot3d/highlight.png", alt: t("Only the vectors inside the reference ring are highlighted; surrounding vectors, the ring, and markers remain unhighlighted") },
      ...eigenplotGalleryCases.map(item => ({ src: item.image, alt: zh ? item.titleZh : item.title })),
    ]} />
    <Link href="/projects" className="back-link">← {t("All projects")}</Link>
    <header className="eigen-hero">
      <div className="eigen-hero-copy">
        <p className="eyebrow">{t("PYTHON SOFTWARE / SCIENTIFIC VISUALIZATION")}</p>
        <h1>Eigen<span>Plot</span>3D<span className="period">.</span></h1>
        <p className="eigen-hero-lede">{t("Scientific 3D visualization, organized around objects rather than rendering calls.")}</p>
        <p className="eigen-subline">{t("A high-level, object-oriented interface built on PyVista for configurable and interactive scientific graphics.")}</p>
        <div className="tag-row"><span>Python</span><span>PyVista / VTK</span><span>{t("Object-oriented API")}</span><span>{t("Qt Controls")}</span></div>
        <a className="eigen-hero-link" href="#eigen-concept">{t("Explore the design")} <span>↓</span></a>
      </div>
      <div className="eigen-hero-visual eigen-vector-visual" aria-label={t("Real EigenPlot3D vector-field rendering with geometry, options, and controls annotations")}>
        <div className="eigen-vector-top"><span>{t("ONE OBJECT · THREE LAYERS")}</span></div>
        <div className="eigen-vector-frame">
          <img data-eigen-lightbox src="/images/eigenplot3d/vector-field-main.png" alt={t("Three-dimensional vortex vector field sampled on a two-dimensional plane, rendered with EigenPlot3D")} />
          <div className="eigen-vector-callout eigen-vector-geometry"><small>{t("01 / GEOMETRY")}</small><strong>{t("Coordinates + orientation")}</strong><span>{t("What to draw")}</span></div>
          <div className="eigen-vector-callout eigen-vector-options"><small>{t("02 / OPTIONS")}</small><strong>{t("Color · radius · length")}</strong><span>{t("How it looks")}</span></div>
        </div>
        <div className="eigen-vector-controls"><div><small>{t("03 / CONTROLS")}</small><strong>{t("Qt + Python API")}</strong><span>{t("Inspect, adjust, and reuse the same object")}</span></div><div className="eigen-vector-control-lines"><span /><span /><span /></div></div>
        <div className="eigen-vector-foot">{t("ACTUAL EIGENPLOT3D RENDER · 2D DOMAIN / 3D VECTORS")}</div>
      </div>
    </header>

    <section className="eigen-public-demo" aria-label={zh ? "EigenPlot3D 介绍视频" : "EigenPlot3D introduction video"}>
      <video className="eigen-public-demo-video" muted loop playsInline controls preload="none" poster="/images/eigenplot3d/cover.png" aria-label={zh ? "EigenPlot3D 演示视频" : "EigenPlot3D demonstration video"}>
        <source src="/images/eigenplot3d/public.mp4" type="video/mp4" />
        {t("Your browser does not support HTML5 video.")}
      </video>
    </section>

    <section id="eigen-concept" className="eigen-section eigen-intro">
      <p className="eyebrow">{t("01 / THE IDEA")}</p>
      <div className="eigen-two-column"><div className="eigen-intro-heading"><h2>{t("Built on PyVista.")}<br /><em>{t("Designed for a better workflow.")}</em></h2><p className="eigen-intro-goal">{zh ? <>{t("Our goal is simple: once the scientific information is known, finding the right visualization should be ")}<strong>{t("fast")}</strong>、<strong>{t("intuitive")}</strong>地找到合适的可视化方式，并保存设置以便复现结果。</> : <>{t("Our goal is simple: once the scientific information is known, finding the right visualization should be ")}<strong>{t("fast")}</strong>, <strong>{t("intuitive")}</strong>, and <strong>{t("reproducible")}</strong>.</>}</p></div><div><p>{t("PyVista is a powerful Python library for scientific 3D visualization. So why build another layer on top of it?")}</p><p>{t("Because creating a figure is only ")}<strong>{t("half the challenge")}</strong>{t(". Finding the right visualization settings can be tedious. PyVista has a relatively steep learning curve, and refining a figure often involves repeatedly modifying code and rerunning the visualization just to see whether the changes work.")}</p><p><strong>{t("EigenPlot3D is designed to simplify this process.")}</strong></p><p>{t("By combining a highly object-oriented interface with built-in interactive controls, EigenPlot3D allows users to adjust visualization parameters directly, without repeatedly editing and rerunning their code. Once satisfied, users can easily inspect, save, and reuse their settings.")}</p></div></div>
    </section>

    <section className="eigen-section" id="eigen-principles">
      <p className="eyebrow">{t("02 / THE WORKFLOW")}</p><h2>{t("One example.")}<br /><em>{t("From data to visualization.")}</em></h2>
      <p className="eigen-workflow-intro">{t("Let's walk through the EigenPlot3D workflow using a vector field defined on a 2D plane. We assume the vector data and color scheme are already given. From there, we'll create the first plot, refine it interactively, and save the settings for reuse.")}</p>
      <div className="eigen-workflow-step">
        <div className="eigen-workflow-step-copy"><p className="eigen-workflow-step-number">{t("2.1 / FIRST PLOT")}</p><h3>{t("From arrays to arrows.")}</h3><p>{t("Suppose we already know the position, direction, and color of every vector. We store these as three arrays: ")}<code>coords</code>{t(" (N × 3 positions), ")}<code>vectors</code>{t(" (N × 3 directions), and ")}<code>colors</code>{t(" (N × 3 RGB values). We also start with predefined values for the arrow ")}<code>length</code>{zh ? "和" : " and "}<code>radius</code>{t(". With these inputs, EigenPlot3D creates the initial vector-field visualization using a single ")}<code>PlotVector</code>{t(" object.")}</p></div>
        <div className="eigen-workflow-example"><div className="eigen-workflow-code"><span className="eigen-workflow-code-label">{t("PYTHON / EIGENPLOT3D")}</span><pre><code><PythonCode source={`from eigenplot3d.visual import PlotFigure, PlotVector

${zh ? "# coords、vectors、colors 已经定义" : "# coords, vectors, colors are already defined"}
fig = PlotFigure(name="${zh ? "涡旋矢量场" : "Vortex vector field"}")
arrows = PlotVector(
    coords=coords,
    orient=vectors,
    figure=fig,
    length=0.43,
    radius=0.033,
    color=colors,
)

`} /></code></pre></div><figure className="eigen-workflow-result"><img data-eigen-lightbox src="/images/eigenplot3d/main.png" alt={t("Vector field rendered using EigenPlot3D from supplied coordinates, orientations, and RGB colors")}/><figcaption>{t("Actual EigenPlot3D Qt interface showing the result of the arrow-plotting code above.")}<span className="eigen-workflow-result-note">{t("The camera was moved closer after running the arrow-plotting code above for clearer presentation.")}</span></figcaption></figure></div>
      </div>
    </section>

    <section className="eigen-section eigen-workflow-refinement" id="eigen-interactive-refinement">
      <p className="eigen-workflow-step-number">{t("2.2 / INTERACTIVE REFINEMENT")}</p>
      <h2>{t("Fine-tune the figure.")}<br /><em>{t("Not the code.")}</em></h2>
      <p className="eigen-workflow-intro">{t("Simply ")}<strong>{t("double-right-click a plotted object")}</strong>{t(" to open its interactive control panel. Fine-tune a wide range of visualization settings directly through the Qt interface and see the changes immediately—without editing or rerunning the Python script.")}</p>
      <figure className="eigen-advanced-pick-figure">
        <video className="eigen-vector-plane-video" muted loop playsInline controls preload="none" poster="/images/eigenplot3d/vectors-poster.jpg" width={1280} height={695} aria-label={t("Recording of live vector visualization refinement using EigenPlot3D Qt controls")}>
          <source src="/images/eigenplot3d/vectors.mp4" type="video/mp4" />
          {t("Your browser does not support HTML5 video.")}
        </video>
        <figcaption>{t("Actual EigenPlot3D Qt interaction · Watch visualization settings update directly in the scene.")}</figcaption>
      </figure>
      <div className="eigen-workflow-snapshots">
        <h3>{t("Experiment freely.")} <em>{t("Revert anytime.")}</em></h3>
        <p>{t("What if you experiment a little too much and end up with a figure you don't like? No problem. The control panel automatically captures the settings when it opens. Click ")}<strong>{t("Restore Original")}</strong>{t(" to return to that starting point whenever you want.")}</p>
        <p>{t("You can also use ")}<strong>{t("Save Current")}</strong>{t(" to keep multiple snapshots of your favorite settings, then restore the latest one with ")}<strong>{t("Load Latest Save")}</strong>{t(" or choose an earlier version with ")}<strong>{t("Load Saved...")}</strong>{t(". Explore different looks without losing the ones you want to keep.")}</p>
      </div>
    </section>

    <section className="eigen-section eigen-workflow-opts" id="eigen-inspect-options">
      <p className="eigen-workflow-step-number">{t("2.3 / INSPECT THE OPTIONS")}</p>
      <h2>{t("Every setting.")}<br /><em>{t("At your fingertips.")}</em></h2>
      <p className="eigen-workflow-intro">{t("After refining the visualization interactively, simply inspect the object's ")}<code>opts</code>{t(" to see its current settings in detail. The options remain accessible directly from Python.")}</p>
      <div className="eigen-workflow-opts-code">
        <span className="eigen-workflow-code-label">{t("PYTHON / CURRENT OBJECT OPTIONS")}</span>
        <pre><code><PythonCode source={`print(arrows.opts)

OptsVector: the options of PlotVector('vector')
  is_visible              = True,
  shading_type            = 'phong',
  ambient                 = 0.2,
  diffuse                 = 0.7,
  specular                = 0.2,
  paint_by                = 'color',
  color                   = <ndarray shape=(289, 3), too many elements to display>,
  opacity                 = 1,
  radius                  = 0.033,
  length                  = 0.43,
  tip_length_fraction     = 0.2,
  tip_radius_ratio        = 2.5,
  anchor                  = 'center',
  ...                     ${zh ? "# 其余参数略" : "# More options omitted"}`} /></code></pre>
      </div>
      <p className="eigen-workflow-intro eigen-workflow-opts-followup">{t("You can also modify these options directly from Python at any time. Assigning a single option applies the change immediately; for several changes, ")}<code>act_commit()</code>{t(" applies them together, avoiding repeated computation and rendering.")}</p>
      <div className="eigen-workflow-opts-code">
        <span className="eigen-workflow-code-label">{t("PYTHON / MODIFY OPTIONS")}</span>
        <pre><code><PythonCode source={`${zh ? "# 修改单个参数，立即生效" : "# Change one setting; applied immediately"}
arrows.opts.radius = 0.04

${zh ? "# 一次性应用多项参数修改" : "# Apply several settings in one update"}
arrows.act_commit(radius=0.04, opacity=0.8)`} /></code></pre>
      </div>
    </section>

    <section className="eigen-section eigen-workflow-reuse" id="eigen-reuse-options">
      <p className="eigen-workflow-step-number">{t("2.4 / SAVE & REUSE")}</p>
      <h2>{t("Save once.")}<br /><em>{t("Reuse anywhere.")}</em></h2>
      <p className="eigen-workflow-intro">{t("Save an object's ")}<code>opts</code>{t(" to a JSON file for later inspection and reproducibility. The same visualization settings can then be applied to another ")}<code>PlotVector</code>{t("—even when its coordinates and orientations are completely different—either by loading the saved options or by reusing the options of an existing object.")}</p>
      <div className="eigen-workflow-opts-code">
        <span className="eigen-workflow-code-label">{t("PYTHON / SAVE & REUSE OPTIONS")}</span>
        <pre><code><PythonCode source={`from eigenplot3d.visual import OptsVector

${zh ? "# 保存调整后的设置，以供后续使用" : "# Save the refined settings for future use"}
arrows.opts.act_save_json("vector_style.json")

${zh ? "# 方法一：为另一个 PlotVector 加载已保存的设置" : "# Option 1: Load saved settings for another PlotVector"}
saved_opts = OptsVector()
saved_opts.act_load_json("vector_style.json")
other_arrows.act_commit(opts=saved_opts)

${zh ? "# 方法二：复用已有 PlotVector 的参数" : "# Option 2: Reuse settings from an existing PlotVector"}
other_arrows.act_commit(opts=arrows.opts)`} /></code></pre>
      </div>
    </section>

    <section className="eigen-section eigen-advanced-section" id="eigen-advanced-interactivity">
      <p className="eyebrow">{t("03 / INTERACTIVE PRESENTATION")}</p>
      <h2>{t("More than a figure.")}<br /><em>{t("Make your science come alive.")}</em></h2>
      <p className="eigen-workflow-intro">{t("EigenPlot3D is designed not only to help researchers find the right visualization settings and produce publication-ready figures, but also to make live scientific presentations more informative and intuitive. Through built-in interactions, presenters can highlight objects, mark specific locations, and reveal detailed information directly within the 3D scene—helping audiences better understand what they are looking at.")}</p>
      <div className="eigen-advanced-pick" id="eigen-pick-inspect">
        <p className="eigen-workflow-step-number">{t("3.1 / PICK, MARK & INSPECT")}</p>
        <h2>{t("Pick a glyph.")}<br /><em>{t("See what it represents.")}</em></h2>
        <p className="eigen-workflow-intro"><strong>{t("Double-left-click a glyph")}</strong>{t(" to place a numbered marker at the selected location. EigenPlot3D also reports information about the picked object, including its orientation, color, and geometric properties, so you can inspect the underlying visualization rather than just its appearance. Double-left-click near an existing marker to remove it.")}</p>
        <figure className="eigen-advanced-pick-figure"><img data-eigen-lightbox src="/images/eigenplot3d/pick.png" alt={t("EigenPlot3D glyph picking with numbered markers and object information")} loading="lazy" /><figcaption>{t("Actual EigenPlot3D picking screenshot · Click to enlarge.")}<span className="eigen-pick-figure-note">{t("For clearer presentation on this webpage, the marker-related settings were adjusted from their defaults using EigenPlot3D's built-in public interface.")}</span></figcaption></figure>
      </div>
      <div className="eigen-advanced-pick" id="eigen-highlight">
        <p className="eigen-workflow-step-number">{t("3.2 / HIGHLIGHT OBJECTS")}</p>
        <h2>{t("Highlight one object.")}<br /><em>{t("Reveal all its glyphs.")}</em></h2>
        <p className="eigen-workflow-intro"><strong>{t("Right-click a glyph")}</strong>{t(" to highlight every glyph belonging to the same plot object with a black outline. The console also displays the object's type and name, making it easy to identify which object is being presented. Right-click again to toggle the highlight off.")}</p>
        <p className="eigen-workflow-intro">{t("To make the highlighting effect easier to see, we split the same vortex vector field into two separate PlotVector objects—one inside the reference ring and one outside—and added a thin ring and four spherical markers. In the screenshot, only the vectors inside the ring are highlighted; the outer vectors and other objects keep their original appearance.")}</p>
        <figure className="eigen-advanced-pick-figure"><img data-eigen-lightbox src="/images/eigenplot3d/highlight.png" alt={t("Only the vectors inside the reference ring are highlighted; surrounding vectors, the ring, and markers remain unhighlighted")} loading="lazy" /><figcaption>{t("Actual EigenPlot3D highlighting screenshot · Click to enlarge.")}<span className="eigen-pick-figure-note">{t("For clearer presentation on this webpage, the silhouette outline thickness was adjusted from its default using EigenPlot3D's built-in public interface.")}</span></figcaption></figure>
      </div>
      <div className="eigen-advanced-pick" id="eigen-vector-plane">
        <p className="eigen-workflow-step-number">{t("3.3 / INTERACTIVE FIELD SAMPLING")}</p>
        <h2>{t("Move the plane.")}<br /><em>{t("See the field respond.")}</em></h2>
        <p className="eigen-workflow-intro">{t("With ")}<code>VectorPlane</code>{t(", researchers can interactively adjust how a three-dimensional vector field is sampled and displayed. Changing the sampling plane and its grid settings updates the vector glyphs in the scene, making it easier to explore spatial structure and explain it during a live presentation.")}</p>
        <figure className="eigen-advanced-pick-figure">
          <video className="eigen-vector-plane-video" muted loop playsInline controls preload="none" poster="/images/eigenplot3d/plane-poster.jpg" width={1280} height={695} aria-label={t("Recording of interactive VectorPlane grid and plane adjustments in EigenPlot3D")}>
            <source src="/images/eigenplot3d/plane.mp4" type="video/mp4" />
            {t("Your browser does not support HTML5 video.")}
          </video>
          <figcaption>{t("Actual EigenPlot3D interaction · 25-second recording showing live adjustments to the sampling plane and grid.")}</figcaption>
        </figure>
      </div>
    </section>
    <EigenplotGallery />
    <EigenplotApiDiscovery />
    <section className="eigen-section eigen-architecture-section" id="eigen-architecture">
      <p className="eyebrow">{t("06 / ARCHITECTURE OVERVIEW")}</p>
      <p className="eigen-architecture-lede">{t("EigenPlot3D is an ")}<strong>{t("object-oriented, highly parameterized 3D visualization package")}</strong>{t(" designed to help researchers efficiently find, refine, and reproduce visualization settings for their spatial data.")}</p>
      <div className="eigen-architecture-v2 eigen-architecture-diagram" role="img" aria-label={t("Architecture: external spatial data is supplied to EigenPlot3D plot objects. PlotFigure manages plot objects such as PlotVector. Visualization options are configured by the Python API, refined with Qt controls, and saved or loaded for reproducibility. PyVista and VTK provide the rendering backend.")}>
        <svg viewBox="0 0 1000 680" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="eigen-arch-arrowhead" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M1 1 L7 4.5 L1 8" fill="none" stroke="#6689a6" strokeWidth="1.5"/></marker>
            <marker id="eigen-arch-orangehead" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M1 1 L7 4.5 L1 8" fill="none" stroke="#a65c32" strokeWidth="1.5"/></marker>
          </defs>
          <rect x="235" y="12" width="750" height="590" rx="16" fill="#f4f7fa" stroke="#7897b2" strokeWidth="2" strokeDasharray="8 5"/>
          <text x="260" y="43" fontSize="19" fontWeight="800" fill="#315d86">EIGENPLOT3D</text>
          <rect x="460" y="61" width="305" height="72" rx="10" fill="#e7eef5" stroke="#7897b2" strokeWidth="2"/>
          <text x="612" y="91" textAnchor="middle" fontSize="24" fontWeight="700" fill="#263442">PlotFigure</text>
          <text x="612" y="114" textAnchor="middle" fontSize="16" fill="#536477">{t("Scene · Camera · Lighting")}</text>
          <path d="M612 133 V173" stroke="#6689a6" strokeWidth="2.5" fill="none" markerEnd="url(#eigen-arch-arrowhead)"/>
          <text x="627" y="158" fontSize="14" fill="#536477">{t("manages")}</text>
          <rect x="410" y="178" width="405" height="78" rx="10" fill="#e7eef5" stroke="#7897b2" strokeWidth="2"/>
          <text x="612" y="209" textAnchor="middle" fontSize="24" fontWeight="700" fill="#263442">{t("Plot Objects")}</text>
          <text x="612" y="237" textAnchor="middle" fontSize="17" fill="#536477">{t("PlotVector (example)")}</text>
          <rect x="10" y="179" width="200" height="108" rx="10" fill="#e8f1e9" stroke="#72977b" strokeWidth="2"/>
          <text x="110" y="207" textAnchor="middle" fontSize="19" fontWeight="800" fill="#2b6241">{t("EXTERNAL INPUT")}</text>
          <text x="110" y="233" textAnchor="middle" fontSize="21" fontWeight="700" fill="#2b6241">{t("Spatial Data")}</text>
          <text x="110" y="258" textAnchor="middle" fontSize="14" fill="#4e7359">{t("Coordinates · Orientations")}</text>
          <path d="M210 232 H404" stroke="#72977b" strokeWidth="2.5" fill="none" markerEnd="url(#eigen-arch-arrowhead)"/>
          <text x="307" y="220" textAnchor="middle" fontSize="14" fill="#416b4c">{t("supplied to")}</text>
          <path d="M612 256 V294" stroke="#6689a6" strokeWidth="2.5" fill="none" markerEnd="url(#eigen-arch-arrowhead)"/>
          <rect x="443" y="300" width="339" height="106" rx="10" fill="#fff4e8" stroke="#c48b56" strokeWidth="2.5"/>
          <text x="612" y="336" textAnchor="middle" fontSize="24" fontWeight="800" fill="#965622">{t("Visualization Options")}</text>
          <text x="612" y="363" textAnchor="middle" fontSize="20" fontWeight="700" fill="#965622">(opts)</text>
          <text x="612" y="388" textAnchor="middle" fontSize="16" fill="#765d46">{t("Color · Length · Radius · Opacity")}</text>
          <rect x="263" y="459" width="215" height="83" rx="9" fill="#fff8f2" stroke="#c48b56" strokeWidth="2"/>
          <text x="370" y="490" textAnchor="middle" fontSize="19" fontWeight="700" fill="#965622">{t("Interactive Qt")}</text>
          <text x="370" y="516" textAnchor="middle" fontSize="16" fill="#765d46">{t("Explore & refine opts")}</text>
          <path d="M370 459 V354 H438" stroke="#a65c32" strokeWidth="2.5" fill="none" markerEnd="url(#eigen-arch-orangehead)"/>
          <rect x="508" y="459" width="210" height="83" rx="9" fill="#e7eef5" stroke="#7897b2" strokeWidth="2"/>
          <text x="613" y="490" textAnchor="middle" fontSize="20" fontWeight="700" fill="#263442">{t("Python API")}</text>
          <text x="613" y="516" textAnchor="middle" fontSize="16" fill="#536477">{t("Construct & configure")}</text>
          <path d="M613 459 V412" stroke="#6689a6" strokeWidth="2.5" fill="none" markerEnd="url(#eigen-arch-arrowhead)"/>
          <rect x="748" y="459" width="211" height="83" rx="9" fill="#fff8f2" stroke="#c48b56" strokeWidth="2"/>
          <text x="853" y="489" textAnchor="middle" fontSize="19" fontWeight="700" fill="#965622">{t("Save / Load opts")}</text>
          <text x="853" y="516" textAnchor="middle" fontSize="15" fill="#765d46">{t("Reproduce & reuse")}</text>
          <path d="M782 376 H853 V453" stroke="#a65c32" strokeWidth="2.5" fill="none" markerEnd="url(#eigen-arch-orangehead)"/>
          <path d="M612 542 V565" stroke="#6689a6" strokeWidth="2" fill="none"/>
          <text x="612" y="586" textAnchor="middle" fontSize="16" fontWeight="700" fill="#536477">{t("High-level visualization interface")}</text>
          <path d="M612 602 V627" stroke="#6689a6" strokeWidth="2.5" fill="none" markerEnd="url(#eigen-arch-arrowhead)"/>
          <rect x="412" y="632" width="400" height="43" rx="9" fill="#e7eef5" stroke="#7897b2" strokeWidth="2"/>
          <text x="612" y="660" textAnchor="middle" fontSize="22" fontWeight="700" fill="#263442">{t("PyVista / VTK · Rendering Backend")}</text>
        </svg>
      </div>
      <div className="eigen-architecture-copy">
        <p>{t("At the highest level, ")}<strong><code>PlotFigure</code></strong>{t(" manages the visualization scene, including the canvas, camera, lighting, and rendering environment. Each figure contains independently configurable plot objects supporting a wide range of scientific visualizations.")}</p>
        <p><strong>{t("Spatial data is supplied externally.")}</strong>{t(" For example, a ")}<code>PlotVector</code>{t(" receives coordinates and orientations that determine where vectors are placed and how they are directed. EigenPlot3D focuses on how those vectors are visualized, with configurable ")}<strong><code>opts</code></strong>{t(" controlling properties such as color, length, radius, and opacity.")}</p>
        <p>{t("The ")}<strong>{t("Python API")}</strong>{t(" allows users to construct plot objects from their data and configure their visualization settings. ")}<strong>{t("Interactive Qt controls")}</strong>{t(" make it possible to explore and refine ")}<code>opts</code>{t(" directly, without repeatedly editing code or reconstructing the scene.")}</p>
        <p>{t("Once the desired appearance is achieved, ")}<strong>{t("opts can be inspected, saved, and reused")}</strong>{t(", allowing the same visualization settings to be applied to different datasets and making the results reproducible. Under the hood, EigenPlot3D encapsulates ")}<strong>PyVista / VTK</strong>{t(", providing a consistent high-level interface without exposing the underlying rendering complexity.")}</p>
      </div>
    </section>
    <div className="eigen-footer"><Link href="/projects">← {t("All projects")}</Link></div>
  </article>;
}
