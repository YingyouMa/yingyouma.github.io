export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <section className="section about-page">
      <p className="eyebrow">ABOUT</p>
      <h1 className="page-title">About</h1>
      <div className="about-layout">
        <div><h2>Scientific computing and software</h2></div>
        <div><p>I work on numerical simulation, scientific data analysis, and 3D visualization. My projects include plotting tools, analysis software, and GPU-based numerical solvers.</p><p>This site collects a few of my software projects. Biography and contact details will be added later.</p><div className="tag-row"><span>Numerical Methods</span><span>Scientific Software</span><span>3D Visualization</span><span>GPU Computing</span></div></div>
      </div>
    </section>
  );
}
