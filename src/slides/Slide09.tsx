import { motion } from "framer-motion";
import type { ReactElement } from "react";
import { SlideShell } from "../components/SlideShell.tsx";
import { SlideLabel } from "../components/SlideLabel.tsx";
import { GradientText } from "../components/GradientText.tsx";
import { AccentLine } from "../components/AccentLine.tsx";
import { ThaiText } from "../components/ThaiText.tsx";
import { EASE } from "../lib/motion.ts";

const GLOWS = [
  { top: -200, right: -100, size: 640, color: "124,58,237", opacity: 0.1 },
  { bottom: -150, left: -80, size: 500, color: "16,185,129", opacity: 0.08 },
];

// ── Pulse rings radiating outward ──────────────────────────────────────────
function PulseRings({ color, delay }: { color: string; delay: number }) {
  return (
    <>
      {[0, 0.9, 1.8].map((d, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: `1.5px solid ${color}`,
            pointerEvents: "none",
          }}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: [0.6, 1.4, 2.2], opacity: [0, 0.55, 0] }}
          transition={{
            duration: 2.5,
            delay: delay + d,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
}

// ── Animated icons ─────────────────────────────────────────────────────────
function IconLayers({ delay }: { delay: number }) {
  const p = (d: string, sw: number, extra: number) => (
    <motion.path
      d={d}
      stroke="white"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        pathLength: { duration: 0.7, delay: delay + extra, ease: "easeInOut" },
        opacity: { duration: 0.01, delay: delay + extra },
      }}
    />
  );
  return (
    <motion.svg width="56" height="56" viewBox="0 0 24 24" fill="none">
      {p("M12 2L2 7l10 5 10-5-10-5z", 1.8, 0)}
      {p("M2 17l10 5 10-5", 1.8, 0.55)}
      {p("M2 12l10 5 10-5", 1.8, 0.9)}
    </motion.svg>
  );
}

function IconGraph({ delay }: { delay: number }) {
  const p = (d: string, sw: number, extra: number, opacity = 1) => (
    <motion.path
      d={d}
      stroke={`rgba(255,255,255,${opacity})`}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        pathLength: { duration: 0.5, delay: delay + extra, ease: "easeInOut" },
        opacity: { duration: 0.01, delay: delay + extra },
      }}
    />
  );
  const dot = (cx: number, cy: number, extra: number) => (
    <motion.circle
      cx={cx}
      cy={cy}
      r={1.8}
      fill="white"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.9 }}
      transition={{ duration: 0.25, delay: delay + extra, ease: "backOut" }}
    />
  );
  return (
    <motion.svg width="56" height="56" viewBox="0 0 24 24" fill="none">
      {/* Center node */}
      {p("M9.5 12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0", 1.8, 0)}
      {/* Spokes */}
      {p("M12 9.5V4", 1.1, 0.4, 0.65)}
      {p("M14.5 10.5L19.5 5.5", 1.1, 0.5, 0.65)}
      {p("M14.5 12H20", 1.1, 0.6, 0.65)}
      {p("M14.5 13.5L19.5 18.5", 1.1, 0.7, 0.65)}
      {p("M12 14.5V20", 1.1, 0.8, 0.65)}
      {p("M9.5 13.5L4.5 18.5", 1.1, 0.9, 0.65)}
      {p("M9.5 12H4", 1.1, 1.0, 0.65)}
      {p("M9.5 10.5L4.5 5.5", 1.1, 1.1, 0.65)}
      {/* Outer dots */}
      {dot(12, 3, 1.2)}
      {dot(20.5, 4.5, 1.3)}
      {dot(21, 12, 1.4)}
      {dot(20.5, 19.5, 1.5)}
      {dot(12, 21, 1.6)}
      {dot(3.5, 19.5, 1.7)}
      {dot(3, 12, 1.8)}
      {dot(3.5, 4.5, 1.9)}
    </motion.svg>
  );
}

function IconSync({ delay }: { delay: number }) {
  const p = (d: string, sw: number, extra: number) => (
    <motion.path
      d={d}
      stroke="white"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        pathLength: { duration: 0.8, delay: delay + extra, ease: "easeInOut" },
        opacity: { duration: 0.01, delay: delay + extra },
      }}
    />
  );
  return (
    <motion.svg width="56" height="56" viewBox="0 0 24 24" fill="none">
      {p("M1 4v6h6", 1.8, 0)}
      {p("M23 20v-6h-6", 1.8, 0.3)}
      {p(
        "M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15",
        1.8,
        0.55,
      )}
    </motion.svg>
  );
}

// ── Card data ──────────────────────────────────────────────────────────────
const CARDS: {
  num: string;
  gap: string;
  gapColor: string;
  gapRgb: string;
  title: string;
  th: string;
  grad: [string, string];
  ringColor: string;
  hoverShadow: string;
  cardDelay: number;
  Icon: (props: { delay: number }) => ReactElement;
}[] = [
  {
    num: "01",
    gap: "The Ingestion Gap",
    gapColor: "#EF4444",
    gapRgb: "239,68,68",
    title: "Ingestion Quality",
    th: "Pipeline ที่เน้นการสกัดเนื้อหาอย่างละเอียด ใช้เทคนิค Graph-based Chunking เพื่อรักษาโครงสร้างของเอกสาร",
    grad: ["#7C3AED", "#A855F7"],
    ringColor: "rgba(196,181,253,0.5)",
    hoverShadow: "0 16px 48px rgba(124,58,237,0.28)",
    cardDelay: 0.28,
    Icon: IconLayers,
  },
  {
    num: "02",
    gap: "The Contextual Gap",
    gapColor: "#F59E0B",
    gapRgb: "245,158,11",
    title: "Hybrid Knowledge",
    th: "ไม่เพียงแค่ Vector Embeddings แต่ยังใช้ Graph-relation เพื่อทำ GraphRAG",
    grad: ["#06B6D4", "#3B82F6"],
    ringColor: "rgba(147,210,249,0.5)",
    hoverShadow: "0 16px 48px rgba(6,182,212,0.28)",
    cardDelay: 0.42,
    Icon: IconGraph,
  },
  {
    num: "03",
    gap: "The Synchronization Gap",
    gapColor: "#10B981",
    gapRgb: "16,185,129",
    title: "Real-time Sync",
    th: "Event Driven Pipeline คอยอัปเดทข้อมูลใน RAG อยู่ตลอดเวลาแบบอัตโนมัติ",
    grad: ["#10B981", "#059669"],
    ringColor: "rgba(110,231,183,0.5)",
    hoverShadow: "0 16px 48px rgba(16,185,129,0.28)",
    cardDelay: 0.56,
    Icon: IconSync,
  },
];

// ── Slide ──────────────────────────────────────────────────────────────────
export function Slide09() {
  return (
    <SlideShell glows={GLOWS}>
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        style={{
          paddingBottom: 22,
          borderBottom: "1px solid #F0F0F0",
          marginBottom: 24,
        }}
      >
        <SlideLabel label="09 — Aingo" style={{ marginBottom: 14 }} />
        <h1
          style={{
            fontSize: 72,
            fontWeight: 900,
            letterSpacing: "-2.5px",
            lineHeight: 1.0,
            margin: "0 0 16px",
            color: "#0A0A0A",
            userSelect: "none",
            paddingTop: 4,
          }}
        >
          AiQ&apos;s <GradientText>Approach.</GradientText>
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <AccentLine delay={0.4} width={80} />
          <span
            style={{
              fontSize: 13,
              color: "#9CA3AF",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            <ThaiText>
              โฟกัสการแก้ปัญหาด้วย Ingestion · Preparation Pipeline
            </ThaiText>
          </span>
        </div>
      </motion.div>

      {/* ── 3 Cards ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          gap: 16,
          minHeight: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {CARDS.map((card) => (
          <motion.div
            key={card.title}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={{
              hidden: { opacity: 0, y: 28 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.7,
                  delay: card.cardDelay,
                  ease: EASE,
                },
              },
              hover: {
                y: -6,
                transition: { duration: 0.2, ease: "easeOut" },
              },
            }}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 22,
              padding: "24px 16px 12px",
              cursor: "default",
            }}
          >
            {/* ── Circle icon ── */}
            <motion.div
              variants={{
                visible: {
                  boxShadow: `0 4px 24px rgba(${card.gapRgb},0.18), 0 0 0 3px rgba(${card.gapRgb},0.12)`,
                },
                hover: {
                  boxShadow:
                    card.hoverShadow + `, 0 0 0 4px rgba(${card.gapRgb},0.22)`,
                },
              }}
              style={{
                width: 170,
                height: 170,
                borderRadius: "50%",
                background: `linear-gradient(145deg, ${card.grad[0]}, ${card.grad[1]})`,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              {/* Dot grid */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              />
              {/* Pulse rings + icon */}
              <div
                style={{
                  position: "relative",
                  width: 88,
                  height: 88,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PulseRings
                  color={card.ringColor}
                  delay={card.cardDelay + 1.5}
                />
                <card.Icon delay={card.cardDelay + 0.2} />
              </div>
            </motion.div>

            {/* ── Text below circle ── */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                textAlign: "center",
              }}
            >
              {/* Gap badge */}
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: card.gapColor,
                  background: `rgba(${card.gapRgb}, 0.1)`,
                  border: `1px solid rgba(${card.gapRgb}, 0.25)`,
                  padding: "3px 10px",
                  borderRadius: 99,
                  letterSpacing: "0.05em",
                }}
              >
                {card.gap}
              </span>

              <div
                style={{
                  fontSize: "var(--slide-card-heading)",
                  fontWeight: 800,
                  color: "#0A0A0A",
                  lineHeight: 1.2,
                }}
              >
                {card.title}
              </div>

              <div
                style={{
                  width: 32,
                  height: 3,
                  borderRadius: 2,
                  background: `linear-gradient(90deg, ${card.grad[0]}, ${card.grad[1]})`,
                }}
              />

              <p
                style={{
                  fontSize: "var(--slide-body)",
                  color: "#6B7280",
                  margin: 0,
                  lineHeight: 1.65,
                  maxWidth: 260,
                }}
              >
                <ThaiText>{card.th}</ThaiText>
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  );
}
