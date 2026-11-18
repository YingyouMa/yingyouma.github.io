"use client";

import Link from "next/link";
import { LanguageSwitcher } from "./language-switcher";
import { useLanguage } from "./language-provider";

export function SiteHeader() {
  const { language } = useLanguage();
  const zh = language === "zh-CN";
  return (
    <header className="site-header">
      <Link className="wordmark" href="/">Yingyou Ma<span className="wordmark-dot">.</span></Link>
      <nav aria-label={zh ? "主导航" : "Main navigation"}>
        <Link href="/projects">{zh ? "项目" : "Projects"}</Link>
        <Link href="/about">{zh ? "关于" : "About"}</Link>
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
