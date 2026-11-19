"use client";

import Link from "next/link";
import { useLanguage } from "./language-provider";

export function HomeHero() {
  const { language } = useLanguage();
  const zh = language === "zh-CN";

  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">
          {zh ? "科学计算 / 软件工程" : "SCIENTIFIC COMPUTING / SOFTWARE ENGINEERING"}
        </p>
        <h1>
          {zh ? "科学计算" : "Scientific computing"}
          <br />
          <em>{zh ? "与软件开发。" : "and software."}</em>
        </h1>
        <p className="hero-lede">
          {zh
            ? "我从事数值方法、科学数据分析和三维可视化软件的研究与开发。"
            : "I work on numerical methods, scientific data analysis, and 3D visualization software."}
        </p>
        <div className="hero-actions">
          <Link href="#projects" className="button-primary">
            {zh ? "项目" : "Projects"} <span>↓</span>
          </Link>
          <Link href="/about" className="text-link">
            {zh ? "关于我" : "About me"} <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
