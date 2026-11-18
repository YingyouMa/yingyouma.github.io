import Link from "next/link";
import { LanguageSwitcher } from "./language-switcher";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/">Yingyou Ma<span className="wordmark-dot">.</span></Link>
      <nav aria-label="Main navigation">
        <Link href="/projects">Projects</Link>
        <Link href="/about">About</Link>
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
