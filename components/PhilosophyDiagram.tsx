"use client";

/**
 * PhilosophyDiagram — Animated radial architecture diagram.
 * Light Apple-Glass palette + Lucide icons in each node.
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import {
  Hexagon,
  LayoutDashboard,
  Server,
  Database,
  Cloud,
  type LucideIcon,
} from "lucide-react";

interface Node {
  id: string;
  cx: number;
  cy: number;
  r: number;
  labelKey: string;
  Icon: LucideIcon;
}

interface Edge {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const NODES: Node[] = [
  { id: "core",     cx: 200, cy: 180, r: 44, labelKey: "node_core",     Icon: Hexagon         },
  { id: "frontend", cx: 200, cy: 52,  r: 30, labelKey: "node_frontend", Icon: LayoutDashboard },
  { id: "backend",  cx: 330, cy: 180, r: 30, labelKey: "node_backend",  Icon: Server          },
  { id: "data",     cx: 70,  cy: 180, r: 30, labelKey: "node_data",     Icon: Database        },
  { id: "infra",    cx: 200, cy: 310, r: 30, labelKey: "node_infra",    Icon: Cloud           },
];

const EDGES: Edge[] = [
  { x1: 200, y1: 136, x2: 200, y2: 82  },
  { x1: 244, y1: 180, x2: 300, y2: 180 },
  { x1: 100, y1: 180, x2: 156, y2: 180 },
  { x1: 200, y1: 224, x2: 200, y2: 280 },
];

export default function PhilosophyDiagram() {
  const t = useTranslations("philosophy");
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="flex items-center justify-center py-6 relative z-10">
      <svg
        viewBox="0 -20 400 390"
        className="w-full max-w-[340px]"
        aria-hidden="true">
        <defs>
          <radialGradient id="core-grad-light" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="rgba(78,123,255,0.45)" />
            <stop offset="60%" stopColor="rgba(139,107,255,0.25)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.75)" />
          </radialGradient>
          <radialGradient id="node-grad-light" cx="50%" cy="35%" r="70%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.55)" />
          </radialGradient>
          <filter id="glow-blue">
            <feGaussianBlur stdDeviation="5" result="blur" />
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
              x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
              stroke="rgba(11,16,32,0.10)" strokeWidth="1.5"
            />
            <motion.line
              x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
              stroke="rgba(78,123,255,0.55)" strokeWidth="1.5"
              strokeDasharray="5 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={active ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: "easeOut" }}
            />
            {active && (
              <motion.circle
                r={3.5}
                fill="rgba(78,123,255,0.9)"
                opacity={0.9}
                initial={{ "--offset-distance": "0%", opacity: 0.9 } as never}
                animate={{ "--offset-distance": "100%", opacity: [0.9, 0.9, 0] } as never}
                transition={{
                  duration: 1.6,
                  delay: 0.8 + i * 0.4,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
                style={{
                  offsetPath: `path("M ${e.x1} ${e.y1} L ${e.x2} ${e.y2}")`,
                  offsetDistance: "var(--offset-distance)",
                  filter: "url(#glow-blue)",
                } as React.CSSProperties}
              />
            )}
          </g>
        ))}

        {/* ── Nodes ───────────────────────────────────── */}
        {NODES.map((n, i) => {
          const iconSize = n.id === "core" ? 28 : 20;
          return (
            <g key={n.id}>
              {active && (
                <motion.circle
                  cx={n.cx} cy={n.cy} r={n.r}
                  fill="none"
                  stroke={n.id === "core" ? "rgba(78,123,255,0.45)" : "rgba(11,16,32,0.18)"}
                  strokeWidth="1.5"
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
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
                cx={n.cx} cy={n.cy} r={n.r}
                fill={n.id === "core" ? "url(#core-grad-light)" : "url(#node-grad-light)"}
                stroke={n.id === "core" ? "rgba(78,123,255,0.45)" : "rgba(11,16,32,0.14)"}
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
                  filter: n.id === "core" ? "url(#glow-blue)" : "none",
                }}
              />

              <motion.foreignObject
                x={n.cx - iconSize / 2}
                y={n.cy - iconSize / 2}
                width={iconSize}
                height={iconSize}
                initial={{ opacity: 0 }}
                animate={active ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: n.id === "core" ? "rgba(11,16,32,0.95)" : "rgba(11,16,32,0.6)",
                  }}
                >
                  <n.Icon size={iconSize} strokeWidth={1.7} />
                </div>
              </motion.foreignObject>

              <motion.text
                x={n.cx}
                y={n.cy + n.r + 22}
                textAnchor="middle"
                fontSize={10}
                fontWeight="700"
                letterSpacing="0.12em"
                initial={{ opacity: 0, y: 20 }}
                animate={active ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                style={{ textTransform: "uppercase", userSelect: "none", fill: "rgb(var(--ink) / 0.55)" }}>
                {t(n.labelKey as Parameters<typeof t>[0])}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
