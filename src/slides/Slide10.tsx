import { motion } from "framer-motion";
import { SlideShell } from "../components/SlideShell.tsx";
import { SlideLabel } from "../components/SlideLabel.tsx";
import { GradientText } from "../components/GradientText.tsx";
import { AccentLine } from "../components/AccentLine.tsx";
import { ThaiText } from "../components/ThaiText.tsx";
import { EASE } from "../lib/motion.ts";

const GLOWS = [
  { top: -220, right: -100, size: 680, color: "16,185,129", opacity: 0.09 },
  { bottom: -160, left: -80, size: 540, color: "124,58,237", opacity: 0.08 },
];

// ── Academic / Technical benefits ─────────────────────────────────────────
const ACADEMIC = [
  {
    icon: "✓",
    label: "Validated Architecture",
    color: "#7C3AED",
    rgb: "124,58,237",
  },
  {
    icon: "✓",
    label: "Data Pipeline Expertise",
    color: "#7C3AED",
    rgb: "124,58,237",
  },
  { icon: "✓", label: "RAG Optimization", color: "#7C3AED", rgb: "124,58,237" },
];

// ── Industrial / Professional benefits ────────────────────────────────────
const INDUSTRIAL = [
  { icon: "✓", label: "Efficiency", color: "#10B981", rgb: "16,185,129" },
  {
    icon: "✓",
    label: "Knowledge Consolidation",
    color: "#10B981",
    rgb: "16,185,129",
  },
  {
    icon: "✓",
    label: "Streamlined Onboarding",
    color: "#10B981",
    rgb: "16,185,129",
  },
];

function BenefitItem({
  label,
  color,
  rgb,
  delay,
}: {
  label: string;
  color: string;
  rgb: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 0",
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: `rgba(${rgb},0.12)`,
          border: `1.5px solid ${color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M1.5 5L4 7.5L8.5 2.5"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span
        style={{
          fontSize: "var(--slide-body)",
          color: "#374151",
          fontWeight: 500,
          lineHeight: 1.4,
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

export function Slide10() {
  return (
    <SlideShell glows={GLOWS}>
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        style={{
          paddingBottom: 20,
          borderBottom: "1px solid #F0F0F0",
          marginBottom: 24,
        }}
      >
        <SlideLabel label="10 — Aingo" style={{ marginBottom: 14 }} />
        <h1
          style={{
            fontSize: 64,
            fontWeight: 900,
            letterSpacing: "-2.5px",
            lineHeight: 1.0,
            margin: "0 0 14px",
            color: "#0A0A0A",
            userSelect: "none",
            paddingTop: 4,
          }}
        >
          Expected <GradientText>Results.</GradientText>
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
            ผลที่ได้จากการพัฒนา
          </span>
        </div>
      </motion.div>

      {/* ── Body ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          minHeight: 0,
        }}
      >
        {/* ── Image row ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.28, ease: EASE }}
          style={{ display: "flex", gap: 14, flex: 1, minHeight: 0 }}
        >
          {/* Image placeholder 1 */}
          <div
            style={{
              flex: 1,
              borderRadius: 14,
              border: "1px dashed #D1D5DB",
              background: "rgba(249,250,251,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                color: "#9CA3AF",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect
                  x="2"
                  y="6"
                  width="28"
                  height="20"
                  rx="3"
                  stroke="#D1D5DB"
                  strokeWidth="1.5"
                />
                <circle
                  cx="10"
                  cy="13"
                  r="2.5"
                  stroke="#D1D5DB"
                  strokeWidth="1.5"
                />
                <path
                  d="M2 22L9 16L14 20L20 14L30 22"
                  stroke="#D1D5DB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                }}
              >
                Image Placeholder
              </span>
            </div>
          </div>

          {/* Image placeholder 2 */}
          <div
            style={{
              flex: 1,
              borderRadius: 14,
              border: "1px dashed #D1D5DB",
              background: "rgba(249,250,251,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                color: "#9CA3AF",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect
                  x="2"
                  y="6"
                  width="28"
                  height="20"
                  rx="3"
                  stroke="#D1D5DB"
                  strokeWidth="1.5"
                />
                <circle
                  cx="10"
                  cy="13"
                  r="2.5"
                  stroke="#D1D5DB"
                  strokeWidth="1.5"
                />
                <path
                  d="M2 22L9 16L14 20L20 14L30 22"
                  stroke="#D1D5DB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                }}
              >
                Image Placeholder
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Before / After ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38, ease: EASE }}
          style={{ display: "flex", gap: 14 }}
        >
          {/* Before */}
          <div
            style={{
              flex: 1,
              borderRadius: 14,
              border: "1px solid #FECACA",
              background: "rgba(254,226,226,0.35)",
              padding: "14px 18px",
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "#EF4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 1,
              }}
            >
              <span
                style={{
                  color: "white",
                  fontWeight: 700,
                  fontSize: 13,
                  lineHeight: 1,
                }}
              >
                ✕
              </span>
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#EF4444",
                  marginBottom: 5,
                }}
              >
                Before
              </div>
              <p
                style={{
                  fontSize: "var(--slide-body)",
                  color: "#374151",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                <ThaiText>
                  Alex
                  ใช้เวลาหลายชั่วโมงในการค้นหาและประเมินเอกสารที่กระจัดกระจายหลายฉบับ
                </ThaiText>
              </p>
            </div>
          </div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5, ease: EASE }}
            style={{
              flexShrink: 0,
              alignSelf: "center",
              color: "#9CA3AF",
              fontSize: 22,
              fontWeight: 300,
            }}
          >
            →
          </motion.div>

          {/* After */}
          <div
            style={{
              flex: 1,
              borderRadius: 14,
              border: "1px solid #A7F3D0",
              background: "rgba(209,250,229,0.35)",
              padding: "14px 18px",
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "#10B981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 1,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M2 6.5L5.2 9.5L11 3.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#10B981",
                  marginBottom: 5,
                }}
              >
                After
              </div>
              <p
                style={{
                  fontSize: "var(--slide-body)",
                  color: "#374151",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                <ThaiText>
                  Alex ถามคำถามและได้รับคำตอบที่ถูกต้องสมบูรณ์
                  พร้อมอ้างอิงแหล่งที่มา ทันที
                </ThaiText>
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Benefits columns ── */}
        <div style={{ display: "flex", gap: 18 }}>
          {/* Academic / Technical */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.42, ease: EASE }}
            style={{
              flex: 1,
              borderRadius: 16,
              border: "1px solid rgba(124,58,237,0.15)",
              background: "rgba(124,58,237,0.04)",
              padding: "18px 20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Column header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: "linear-gradient(135deg, #7C3AED, #A855F7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 1L9 5H13L10 8L11 12L7 10L3 12L4 8L1 5H5L7 1Z"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                    fill="rgba(255,255,255,0.2)"
                  />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    color: "#7C3AED",
                  }}
                >
                  Academic / Technical Benefits
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {ACADEMIC.map((item, i) => (
                <BenefitItem
                  key={item.label}
                  label={item.label}
                  color={item.color}
                  rgb={item.rgb}
                  delay={0.55 + i * 0.1}
                />
              ))}
            </div>
          </motion.div>

          {/* Industrial / Professional */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.52, ease: EASE }}
            style={{
              flex: 1,
              borderRadius: 16,
              border: "1px solid rgba(16,185,129,0.15)",
              background: "rgba(16,185,129,0.04)",
              padding: "18px 20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Column header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: "linear-gradient(135deg, #10B981, #059669)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect
                    x="1.5"
                    y="6"
                    width="3"
                    height="6.5"
                    rx="1"
                    stroke="white"
                    strokeWidth="1.2"
                    fill="rgba(255,255,255,0.2)"
                  />
                  <rect
                    x="5.5"
                    y="3.5"
                    width="3"
                    height="9"
                    rx="1"
                    stroke="white"
                    strokeWidth="1.2"
                    fill="rgba(255,255,255,0.2)"
                  />
                  <rect
                    x="9.5"
                    y="1.5"
                    width="3"
                    height="11"
                    rx="1"
                    stroke="white"
                    strokeWidth="1.2"
                    fill="rgba(255,255,255,0.2)"
                  />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    color: "#10B981",
                  }}
                >
                  Industrial / Professional Benefit
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {INDUSTRIAL.map((item, i) => (
                <BenefitItem
                  key={item.label}
                  label={item.label}
                  color={item.color}
                  rgb={item.rgb}
                  delay={0.65 + i * 0.1}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SlideShell>
  );
}
