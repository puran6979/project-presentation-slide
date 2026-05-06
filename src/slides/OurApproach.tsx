import { motion } from "framer-motion";
import type { ReactElement } from "react";
import {
  HydeIcon,
  LayersIcon,
  Pill,
  PulseRings,
  SlideHeader,
  SlideShell,
  SyncIcon,
  ThaiText,
} from "../components/index.ts";
import { EASE } from "../lib/motion.ts";

const GLOWS = [
  { top: -200, right: -100, size: 640, color: "124,58,237", opacity: 0.1 },
  { bottom: -150, left: -80, size: 500, color: "16,185,129", opacity: 0.08 },
];

const CARDS: {
  gap: string;
  gapColor: string;
  gapRgb: string;
  title: string;
  th: string;
  grad: [string, string];
  ringColor: string;
  hoverShadow: string;
  cardDelay: number;
  iconScale?: number;
  Icon: (props: { delay: number }) => ReactElement;
}[] = [
  {
    gap: "The Ingestion Gap",
    gapColor: "#EF4444",
    gapRgb: "239,68,68",
    title: "Ingestion Quality",
    th: "Pipeline ที่เน้นการสกัดเนื้อหาอย่างละเอียดด้วย Docling และ HybridChunker เพื่อรักษา hierarchy ของเอกสาร",
    grad: ["#7C3AED", "#A855F7"],
    ringColor: "rgba(196,181,253,0.5)",
    hoverShadow: "0 16px 48px rgba(124,58,237,0.28)",
    cardDelay: 0.28,
    iconScale: 1.08,
    Icon: LayersIcon,
  },
  {
    gap: "The Retrieval Gap",
    gapColor: "#F59E0B",
    gapRgb: "245,158,11",
    title: "HyDE Retrieval",
    th: "ใช้ Hypothetical Document Embeddings (HyDE) เพื่อขยายคำค้นให้ใกล้กับภาษาของเอกสารเทคนิคและเพิ่มความแม่นยำในการค้นคืน",
    grad: ["#06B6D4", "#3B82F6"],
    ringColor: "rgba(147,210,249,0.5)",
    hoverShadow: "0 16px 48px rgba(6,182,212,0.28)",
    cardDelay: 0.42,
    iconScale: 3.35,
    Icon: HydeIcon,
  },
  {
    gap: "The Synchronization Gap",
    gapColor: "#10B981",
    gapRgb: "16,185,129",
    title: "Real-time Sync",
    th: "Event Driven Pipeline คอยอัปเดทข้อมูลใน RAG อยู่ตลอดเวลาแบบอัตโนมัติ",
    grad: ["#10B981", "#059669"],
    ringColor: "rgba(110,231,183,0.5)",
    hoverShadow: "0 16px 48px rgba(16,185,129,0.28)",
    cardDelay: 0.56,
    iconScale: 1.08,
    Icon: SyncIcon,
  },
];

export function OurApproach() {
  return (
    <SlideShell glows={GLOWS}>
      <SlideHeader
        label="Aingo"
        title="AiQ's"
        highlight="Approach."
        tagline="โฟกัสการแก้ปัญหาด้วย Ingestion · Preparation Pipeline"
        thaiTagline
        marginBottom={24}
      />

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
              hover: { y: -6, transition: { duration: 0.2, ease: "easeOut" } },
            }}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 22,
              padding: "24px 12px 12px",
              cursor: "default",
            }}
          >
            {/* Circle icon */}
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
                width: 178,
                height: 178,
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
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              />
              <div
                style={{
                  position: "relative",
                  width: 96,
                  height: 96,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PulseRings
                  color={card.ringColor}
                  delay={card.cardDelay + 1.5}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: `scale(${card.iconScale ?? 1})`,
                    transformOrigin: "center",
                  }}
                >
                  <card.Icon delay={card.cardDelay + 0.2} />
                </div>
              </div>
            </motion.div>

            {/* Text below circle */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                textAlign: "center",
                width: "100%",
                maxWidth: 316,
              }}
            >
              <Pill
                color={card.gapColor}
                rgb={card.gapRgb}
                fontSize={11}
                letterSpacing="0.05em"
                uppercase={false}
              >
                {card.gap}
              </Pill>

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
                  maxWidth: "100%",
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
