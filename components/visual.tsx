import type { Project } from "../lib/projects";
import Image from "next/image";
import slimeCover from "../figures/SLIME/slime.png";

export function ProjectVisual({ kind, large = false }: { kind: Project["visual"]; large?: boolean }) {
  if (kind === "flow") {
    return (
      <div className={`project-visual visual-flow ${large ? "visual-large" : ""}`}>
        <Image src={slimeCover} alt="SLIME fluid simulation cover" fill sizes={large ? "(max-width: 950px) 100vw, 50vw" : "(max-width: 650px) 100vw, 33vw"} style={{ objectFit: "contain", objectPosition: "center" }} priority={large} />
      </div>
    );
  }
  return (
    <div className={`project-visual visual-${kind} ${large ? "visual-large" : ""}`} aria-label={`Abstract visual illustration for ${kind}`} role="img">
      <div className="visual-grid" />
      {kind === "nematics" && (
        <svg viewBox="0 0 600 350" className="visual-svg" aria-hidden="true">
          <defs><linearGradient id="nem" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#d7bbff" /><stop offset="1" stopColor="#6e81ed" /></linearGradient></defs>
          {Array.from({ length: 13 }, (_, i) => (
            <path key={i} d={`M ${80 + i * 33} 300 C ${30 + i * 28} 205, ${160 + i * 14} 125, ${120 + i * 30} 40`} fill="none" stroke="url(#nem)" strokeWidth="2" opacity={0.25 + (i % 4) * 0.14} />
          ))}
          <ellipse cx="305" cy="170" rx="125" ry="74" fill="none" stroke="#d4c2ff" strokeDasharray="5 8" opacity=".5" transform="rotate(-24 305 170)" />
          <circle cx="305" cy="170" r="8" fill="#e1c9ff" />
        </svg>
      )}
      {kind === "plot" && (
        <svg viewBox="0 0 600 350" className="visual-svg" aria-hidden="true">
          <rect x="160" y="46" width="280" height="96" rx="5" fill="#25394a" stroke="#e6b38b" strokeWidth="1.5" />
          <text x="185" y="77" fontSize="12" fill="#d7a17e" letterSpacing="2">VISUAL OBJECT</text>
          <text x="185" y="116" fontSize="31" fontWeight="600" fill="#f2e8df">PlotRod</text>
          <path d="M300 142V184M102 184H498M102 184V209M300 184V209M498 184V209" stroke="#b7a18e" strokeWidth="1.5" fill="none" />
          {[[32,"GEOMETRY","coordinates"],[230,"OPTIONS","OptsRod"],[428,"INTERACTION","Qt panel"]].map(([x,label,sub])=><g key={label}><rect x={Number(x)} y="209" width="140" height="85" rx="4" fill="#253344" stroke="#64778a" /><text x={Number(x)+14} y="241" fontSize="12" fill="#e3b48f">{label}</text><text x={Number(x)+14} y="267" fontSize="15" fill="#d6e2e9">{sub}</text></g>)}
        </svg>
      )}
      <span className="visual-caption">{kind === "plot" ? "OBJECT MODEL · CONFIGURATION · INTERACTION" : "CONCEPTUAL VISUALIZATION · NOT SIMULATION DATA"}</span>
    </div>
  );
}
