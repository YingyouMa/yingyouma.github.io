import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/">YOUR NAME<span className="wordmark-dot">.</span></Link>
      <nav aria-label="Main navigation">
        <Link href="/projects">Projects</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
}
