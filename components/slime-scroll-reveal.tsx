"use client";

import { useEffect } from "react";

export function SlimeScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.querySelector("article.slime-showcase");
    if (!root || !('IntersectionObserver' in window)) return;
    const elements = Array.from(root.querySelectorAll<HTMLElement>(".slime-reveal"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("slime-reveal-pending");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px -10% 0px" });
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top > window.innerHeight * 0.9) {
        element.classList.add("slime-reveal-pending");
        observer.observe(element);
      }
    });
    root.classList.add("slime-reveal-ready");
    return () => {
      observer.disconnect();
      root.classList.remove("slime-reveal-ready");
      elements.forEach((element) => element.classList.remove("slime-reveal-pending"));
    };
  }, []);
  return null;
}
