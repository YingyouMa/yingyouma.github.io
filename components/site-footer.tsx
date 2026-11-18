"use client";

import { useLanguage } from "./language-provider";

export function SiteFooter({ year }: { year: number }) {
  const { language } = useLanguage();
  return (
    <footer className="site-footer">
      <span>© {year} Yingyou Ma</span>
      <span>{language === "zh-CN" ? "科学计算与软件" : "Scientific computing and software"}</span>
    </footer>
  );
}
