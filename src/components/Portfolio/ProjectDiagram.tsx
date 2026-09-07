import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { EASE_OUT_EXPO, viewportOnce } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { palette, hexToRgba } from "../../theme/palette";

const { gold: GOLD, offWhite: OFFWHITE } = palette;

export type DiagramVariant = "collection" | "nach" | "gateway";

interface Node {
  id: string;
  label: string;
  sub?: string;
  col: 0 | 1 | 2;
  row: 0 | 1 | 2;
  accent?: boolean;
}
interface Edge {
  from: string;
  to: string;
  dashed?: boolean;
}
interface Spec {
  nodes: Node[];
  edges: Edge[];
}

const SPECS: Record<DiagramVariant, Spec> = {
  collection: {
    nodes: [
      { id: "banks", label: "Bank APIs", sub: "5 partners", col: 0, row: 1 },
      { id: "engine", label: "Reconciliation Engine", sub: "status-check · retry", col: 1, row: 1, accent: true },
      { id: "va", label: "Virtual Accounts", sub: "600 live", col: 2, row: 0 },
      { id: "ledger", label: "Ledger & Recon", sub: "₹5 Cr / wk", col: 2, row: 2 },
    ],
    edges: [
      { from: "banks", to: "engine" },
      { from: "engine", to: "va" },
      { from: "engine", to: "ledger" },
      { from: "va", to: "engine", dashed: true },
    ],
  },
  nach: {
    nodes: [
      { id: "mandate", label: "Mandate Request", col: 0, row: 1 },
      { id: "enach", label: "ICICI E-NACH", sub: "register · verify", col: 1, row: 1, accent: true },
      { id: "sched", label: "Scheduler", sub: "auto-debit", col: 2, row: 0 },
      { id: "settle", label: "Settlement", sub: "GST / base split", col: 2, row: 2 },
    ],
    edges: [
      { from: "mandate", to: "enach" },
      { from: "enach", to: "sched" },
      { from: "enach", to: "settle" },
      { from: "sched", to: "settle", dashed: true },
    ],
  },
  gateway: {
    nodes: [
      { id: "merchant", label: "Merchant App", col: 0, row: 1 },
      { id: "core", label: "Gateway Core", sub: "txn state machine", col: 1, row: 1, accent: true },
      { id: "icici", label: "ICICI APIs", col: 2, row: 1 },
      { id: "audit", label: "Audit Log", col: 1, row: 0 },
      { id: "monitor", label: "Monitoring", col: 1, row: 2 },
    ],
    edges: [
      { from: "merchant", to: "core" },
      { from: "core", to: "icici" },
      { from: "core", to: "audit", dashed: true },
      { from: "core", to: "monitor", dashed: true },
    ],
  },
};

const W = 132;
const H = 54;
const COL_X = [8, 162, 316];
const ROW_Y = [16, 103, 190];
const VB_W = COL_X[2] + W + 8;
const VB_H = ROW_Y[2] + H + 16;

const center = (n: Node) => ({ x: COL_X[n.col] + W / 2, y: ROW_Y[n.row] + H / 2 });

const anchor = (from: Node, to: Node) => {
  const a = center(from);
  const b = center(to);
  if (from.col === to.col) {
    const dir = b.y > a.y ? 1 : -1;
    return { x1: a.x, y1: a.y + (dir * H) / 2, x2: b.x, y2: b.y - (dir * H) / 2 };
  }
  const dir = b.x > a.x ? 1 : -1;
  return { x1: a.x + (dir * W) / 2, y1: a.y, x2: b.x - (dir * W) / 2, y2: b.y };
};

const ProjectDiagram: React.FC<{ variant: DiagramVariant; title?: string }> = ({ variant, title }) => {
  const reducedMotion = useReducedMotion();
  const spec = SPECS[variant];
  const byId = Object.fromEntries(spec.nodes.map((n) => [n.id, n]));

  const lineAnim = reducedMotion
    ? {}
    : {
        initial: { pathLength: 0, opacity: 0 },
        whileInView: { pathLength: 1, opacity: 1 },
        viewport: viewportOnce,
        transition: { duration: 1.1, ease: EASE_OUT_EXPO },
      };
  const nodeAnim = (i: number) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: viewportOnce,
          transition: { duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.15 + i * 0.09 },
        };

  return (
    <Box
      sx={{
        width: "100%",
        border: `1px solid ${hexToRgba(GOLD, 0.18)}`,
        background: `radial-gradient(120% 120% at 15% 0%, ${hexToRgba(GOLD, 0.06)}, transparent 60%)`,
        p: { xs: 2, md: 3 },
      }}
    >
      <Box
        component="svg"
        role="img"
        aria-label={title ? `${title} — architecture diagram` : "Architecture diagram"}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        sx={{ width: "100%", height: "auto", display: "block", color: OFFWHITE, fontFamily: "inherit" }}
      >
        {spec.edges.map((e, i) => {
          const { x1, y1, x2, y2 } = anchor(byId[e.from], byId[e.to]);
          return (
            <motion.line
              key={`${e.from}-${e.to}-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={e.dashed ? hexToRgba(OFFWHITE, 0.3) : hexToRgba(GOLD, 0.55)}
              strokeWidth={1.4}
              strokeDasharray={e.dashed ? "4 4" : undefined}
              {...lineAnim}
            />
          );
        })}

        {spec.nodes.map((n, i) => (
          <motion.g key={n.id} {...nodeAnim(i)}>
            <rect
              x={COL_X[n.col]}
              y={ROW_Y[n.row]}
              width={W}
              height={H}
              rx={3}
              fill={n.accent ? hexToRgba(GOLD, 0.12) : "rgba(255,255,255,0.02)"}
              stroke={n.accent ? GOLD : hexToRgba(OFFWHITE, 0.16)}
              strokeWidth={1}
            />
            <text
              x={COL_X[n.col] + W / 2}
              y={ROW_Y[n.row] + (n.sub ? 22 : 30)}
              textAnchor="middle"
              fill={n.accent ? GOLD : OFFWHITE}
              style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.02em" }}
            >
              {n.label}
            </text>
            {n.sub && (
              <text
                x={COL_X[n.col] + W / 2}
                y={ROW_Y[n.row] + 38}
                textAnchor="middle"
                fill={hexToRgba(OFFWHITE, 0.55)}
                style={{ fontSize: 9, letterSpacing: "0.03em" }}
              >
                {n.sub}
              </text>
            )}
          </motion.g>
        ))}
      </Box>
    </Box>
  );
};

export default ProjectDiagram;
