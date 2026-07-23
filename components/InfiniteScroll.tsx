"use client";

/**
 * InfiniteScroll — Editorial tech ticker.
 * Refined pills, soft mask, pauses on hover.
 */

import { useState } from "react";

export interface Technology {
  name: string;
}

function TechPill({ tech }: { tech: Technology }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      role="listitem"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2 px-6 py-3 glass-pill mx-2 cursor-default shrink-0 select-none transition-all duration-300"
      style={{
        background: hovered ? "var(--glass-bg-strong)" : "var(--glass-bg)",
        color: hovered ? "var(--ink-strong)" : "var(--ink-mid)",
        transform: hovered ? "translateY(-3px) scale(1.04)" : "translateY(0) scale(1)",
      }}>
      <span className="text-base font-semibold whitespace-nowrap tracking-tight">
        {tech.name}
      </span>
    </div>
  );
}

export default function InfiniteScroll({
  technologies,
}: {
  technologies: Technology[];
}) {
  const doubled = [...technologies, ...technologies];

  return (
    <div
      dir="ltr"
      role="list"
      aria-label="Technology stack"
      className="relative overflow-hidden py-4"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
      }}>
      <div
        className="flex animate-infinite-scroll"
        style={{ width: "max-content" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState = "running";
        }}>
        {doubled.map((tech, i) => (
          <TechPill key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </div>
    </div>
  );
}
