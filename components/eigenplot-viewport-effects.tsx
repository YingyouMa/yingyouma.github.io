"use client";

import { useEffect } from "react";

export function EigenplotViewportEffects() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".eigen-page");
    if (!page || !('IntersectionObserver' in window)) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = Array.from(page.querySelectorAll<HTMLElement>(".eigen-section"));
    let revealObserver: IntersectionObserver | undefined;
    if (!reduceMotion) {
      // Mark only sections below the viewport as pending: never hide content already visible.
      sections.forEach(section => {
        if (section.getBoundingClientRect().top > window.innerHeight * 0.92) section.classList.add("eigen-reveal-pending");
      });
      revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove("eigen-reveal-pending");
          revealObserver?.unobserve(entry.target);
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });
      sections.forEach(section => revealObserver?.observe(section));
      page.classList.add("eigen-reveal-ready");
    }

    const videos = Array.from(page.querySelectorAll<HTMLVideoElement>("video.eigen-vector-plane-video, video.eigen-public-demo-video"));
    const videoObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35 && !document.hidden) {
          // Keep playback tied to visibility; no background playback.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, { threshold: [0, 0.35, 0.75] });
    videos.forEach(video => videoObserver.observe(video));
    const onVisibilityChange = () => {
      if (document.hidden) videos.forEach(video => video.pause());
      else videos.forEach(video => {
        const bounds = video.getBoundingClientRect();
        const visible = Math.max(0, Math.min(bounds.bottom, window.innerHeight) - Math.max(bounds.top, 0));
        if (visible / Math.max(bounds.height, 1) >= 0.35) video.play().catch(() => {});
      });
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      revealObserver?.disconnect();
      videoObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      sections.forEach(section => section.classList.remove("eigen-reveal-pending"));
      page.classList.remove("eigen-reveal-ready");
      videos.forEach(video => video.pause());
    };
  }, []);
  return null;
}
