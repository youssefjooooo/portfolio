"use client";

/**
 * InfiniteScroll — Client Component (Dark Monochromatic)
 *
 * Seamless CSS ticker. Array doubled for perfect -50% loop.
 * Pill style: subtle dark glass panel.
 * Hover: text brightens.
 * Pauses on hover so users can inspect individual badges.
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
      className="flex items-center gap-2 px-5 py-2.5 rounded-xl mx-3 cursor-default shrink-0 select-none glass-surface"
      style={{
        opacity: hovered ? 1 : 0.45,
        color: hovered ? "rgba(255,255,255,0.80)" : "rgba(255,255,255,0.40)",
        transition: "opacity 0.35s ease, color 0.35s ease",
      }}>
      <span className="text-sm font-semibold whitespace-nowrap">
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
      className="relative overflow-hidden py-2"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}>
      <div
        className="flex animate-infinite-scroll"
        style={{ width: "max-content" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState =
            "paused";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState =
            "running";
        }}>
        {doubled.map((tech, i) => (
          <TechPill key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </div>
    </div>
  );
}
