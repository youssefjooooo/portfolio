"use client";

/**
 * PhilosophyDiagram — Client Component (Dark Monochromatic)
 *
 * Animated SVG system-architecture diagram.
 * 5 nodes (Core + 4 satellites) in a radial layout connected by
 * animated dashed paths. pathLength animates 0→1 on scroll entry.
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

interface Node {
  id: string;
  cx: number;
  cy: number;
  r: number;
  labelKey: string;
  icon: string;
}

interface Edge {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const NODES: Node[] = [
  { id: "core", cx: 200, cy: 180, r: 44, labelKey: "node_core", icon: "⬡" },
  {
    id: "frontend",
    cx: 200,
    cy: 52,
    r: 30,
    labelKey: "node_frontend",
    icon: "◈",
  },
  {
    id: "backend",
    cx: 330,
    cy: 180,
    r: 30,
    labelKey: "node_backend",
    icon: "◎",
  },
  { id: "data", cx: 70, cy: 180, r: 30, labelKey: "node_data", icon: "◇" },
  { id: "infra", cx: 200, cy: 310, r: 30, labelKey: "node_infra", icon: "▦" },
];

const EDGES: Edge[] = [
  { x1: 200, y1: 136, x2: 200, y2: 82 },
  { x1: 244, y1: 180, x2: 300, y2: 180 },
  { x1: 100, y1: 180, x2: 156, y2: 180 },
  { x1: 200, y1: 224, x2: 200, y2: 280 },
];

export default function PhilosophyDiagram() {
  const t = useTranslations("philosophy");
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="flex items-center justify-center py-6">
      <svg
        viewBox="0 -20 400 390"
        className="w-full max-w-[340px]"
        aria-hidden="true">
        <defs>
          <radialGradient id="core-grad-dark" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.30)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.10)" />
          </radialGradient>
          <filter id="glow-dark">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Animated edges ──────────────────────────── */}
        {EDGES.map((e, i) => (
          <g key={i}>
            <line
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1.5"
            />
            <motion.line
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1.5"
              strokeDasharray="5 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={active ? { pathLength: 1, opacity: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3 + i * 0.15,
                ease: "easeOut",
              }}
            />
            {active && (
              <motion.circle
                r={3}
                fill="rgba(255,255,255,0.7)"
                opacity={0.8}
                initial={{ "--offset-distance": "0%", opacity: 0.8 } as any}
                animate={
                  { "--offset-distance": "100%", opacity: [0.8, 0.8, 0] } as any
                }
                transition={{
                  duration: 1.6,
                  delay: 0.8 + i * 0.4,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
                style={
                  {
                    offsetPath: `path("M ${e.x1} ${e.y1} L ${e.x2} ${e.y2}")`,
                    offsetDistance: "var(--offset-distance)",
                  } as React.CSSProperties
                }
              />
            )}
          </g>
        ))}

        {/* ── Nodes ───────────────────────────────────── */}
        {NODES.map((n, i) => (
          <g key={n.id}>
            {active && (
              <motion.circle
                className={`flex items-center justify-center`}
                cx={n.cx}
                cy={n.cy}
                r={n.r}
                fill="none"
                stroke="rgba(255,255,255,0.20)"
                strokeWidth="1.5"
                initial={{ scale: 1, opacity: 0.4 }}
                animate={{ scale: [1, 1.7, 1], opacity: [0.4, 0, 0.4] }}
                transition={{
                  duration: 3,
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
              />
            )}

            <motion.circle
              className={`flex items-center justify-center`}
              cx={n.cx}
              cy={n.cy}
              r={n.r}
              fill={
                n.id === "core"
                  ? "url(#core-grad-dark)"
                  : "rgba(255,255,255,0.05)"
              }
              stroke="rgba(255,255,255,0.15)"
              strokeWidth={1.5}
              initial={{ scale: 0, opacity: 0 }}
              animate={active ? { scale: 1, opacity: 1 } : {}}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
                delay: 0.1 + i * 0.1,
              }}
              style={{
                transformOrigin: `${n.cx}px ${n.cy}px`,
                filter: n.id === "core" ? "url(#glow-dark)" : "none",
              }}
            />

            <motion.text
              className={`text-3xl flex items-center justify-center`}
              x={n.cx}
              y={n.cy + (n.id === "core" ? 6 : 10)}
              textAnchor="middle"
              fontSize={n.id === "core" ? 18 : 14}
              fill={
                n.id === "core"
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(255,255,255,0.45)"
              }
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
              style={{ userSelect: "none" }}>
              {n.icon}
            </motion.text>

            <motion.text
              className={` mt-2 text-sm flex items-center justify-center`}
              x={n.cx}
              y={n.cy + n.r + 25}
              textAnchor="middle"
              fontSize={10}
              fontWeight="600"
              fill="rgba(255,255,255,0.25)"
              letterSpacing="0.08em"
              initial={{ opacity: 0, y: 20 }}
              animate={active ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1 }}
              style={{ textTransform: "uppercase", userSelect: "none" }}>
              {t(n.labelKey as Parameters<typeof t>[0])}
            </motion.text>
          </g>
        ))}
      </svg>
    </div>
  );
}
