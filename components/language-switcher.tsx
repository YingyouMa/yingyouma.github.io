"use client";

import { useEffect, useRef } from "react";
import { Check, ChevronDown, Globe2 } from "lucide-react";
import { SiteLanguage, useLanguage } from "./language-provider";

const options: { value: SiteLanguage; label: string }[] = [
  { value: "en", label: "English" },
  { value: "zh-CN", label: "简体中文" }
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const zh = language === "zh-CN";
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      const details = detailsRef.current;
      if (details && !details.contains(event.target as Node)) details.open = false;
    }
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, []);

  function selectLanguage(nextLanguage: SiteLanguage) {
    setLanguage(nextLanguage);
    if (detailsRef.current) detailsRef.current.open = false;
    summaryRef.current?.focus();
  }

  return (
    <details
      ref={detailsRef}
      className="language-switcher"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          if (detailsRef.current) detailsRef.current.open = false;
          summaryRef.current?.focus();
        }
      }}
    >
      <summary ref={summaryRef} aria-label={zh ? "选择语言，当前：简体中文" : "Choose language, current: English"}>
        <Globe2 size={16} aria-hidden="true" />
        <span>{zh ? "语言" : "Language"}</span>
        <span className="language-current" aria-hidden="true">{language === "en" ? "EN" : "中"}</span>
        <ChevronDown className="language-chevron" size={14} aria-hidden="true" />
      </summary>
      <div className="language-menu" role="group" aria-label={zh ? "选择语言" : "Choose language"}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            lang={option.value}
            aria-pressed={language === option.value}
            onClick={() => selectLanguage(option.value)}
          >
            <span>{zh && option.value === "en" ? "英语" : option.label}</span>
            {language === option.value && <Check size={15} aria-hidden="true" />}
          </button>
        ))}
      </div>
    </details>
  );
}
