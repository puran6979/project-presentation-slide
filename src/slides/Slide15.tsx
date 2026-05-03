import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  BigGhostNumber,
  IconBadge,
  Pill,
  SlideHeader,
  SlideShell,
} from "../components/index.ts";
import {
  DISTANCE,
  DURATION,
  fadeInLeft,
  fadeInRight,
  stagger,
} from "../lib/motion.ts";

const GLOWS = [
  { top: -200, right: -120, size: 680, color: "245,158,11", opacity: 0.1 },
  { bottom: -160, left: -80, size: 540, color: "124,58,237", opacity: 0.08 },
];

const STEPS = [
  {
    num: "01",
    title: "Structural Intersection",
    body: "Detects semantic boundaries and structural markers — headers, subheaders. Chunks are divided at natural breakpoints, never mid-paragraph.",
    color: "#F59E0B",
    rgb: "245,158,11",
    grad: ["#F59E0B", "#F97316"] as [string, string],
  },
  {
    num: "02",
    title: "Structural Serialization",
    body: "Document headers extracted and serialized as contextual breadcrumbs (e.g. Policy › IT › Security) prepended to every chunk.",
    color: "#7C3AED",
    rgb: "124,58,237",
    grad: ["#7C3AED", "#A855F7"] as [string, string],
  },
  {
    num: "03",
    title: "Token-Aware Merging",
    body: "Chunks capped at 512 tokens using an embedding-aligned tokenizer. Smaller related peers are merged; hierarchical breadcrumbs prepended before vectorization.",
    color: "#10B981",
    rgb: "16,185,129",
    grad: ["#10B981", "#059669"] as [string, string],
  },
];

// Stage config for loop highlight: stages 0-4, arrows 0-3
// tick 0,2,4,6,8 → stage active; tick 1,3,5,7 → arrow dot traveling
const STAGE_CFG = [
  { rgb: "245,158,11", color: "#F59E0B" }, // 0: raw input
  { rgb: "245,158,11", color: "#F59E0B" }, // 1: after detect
  { rgb: "124,58,237", color: "#7C3AED" }, // 2: after breadcrumb
  { rgb: "16,185,129", color: "#10B981" }, // 3: output chunks
  { rgb: "59,130,246", color: "#3B82F6" }, // 4: qdrant
] as const;

function DocText({ children }: { children: string }) {
  return (
    <p style={{ fontSize: 8.5, color: "#6B7280", lineHeight: 1.6, margin: 0, fontFamily: "monospace" }}>
      {children}
    </p>
  );
}

function ChunkCard({
  label, color, rgb, breadcrumb, text,
}: {
  label: string; color: string; rgb: string; breadcrumb: string; text: string;
}) {
  return (
    <div style={{ flex: 1, borderRadius: 10, border: `1px solid rgba(${rgb},0.25)`, background: `rgba(${rgb},0.05)`, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontSize: 9, fontWeight: 700, color, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: 8, color, fontFamily: "monospace", opacity: 0.8, wordBreak: "break-word" }}>[{breadcrumb}]</div>
      <DocText>{text}</DocText>
    </div>
  );
}

function FlowArrow({
  label,
  color = "#9CA3AF",
  traveling = false,
}: {
  label?: string;
  color?: string;
  traveling?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", flexShrink: 0 }}>
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 0, flexShrink: 0 }}>
        <div style={{ width: 1, height: 12, background: color }} />
        {traveling && (
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              marginLeft: -3,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: color,
              boxShadow: `0 0 8px ${color}`,
            }}
            animate={{ y: [0, 12] }}
            transition={{ duration: 0.35, repeat: Infinity, ease: "linear" }}
          />
        )}
        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
          <path d="M4 6L0 0H8L4 6Z" fill={color} />
        </svg>
      </div>
      {label && (
        <span style={{ fontSize: 10, fontWeight: 600, color, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          {label}
        </span>
      )}
    </div>
  );
}

export function Slide15() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((s) => (s + 1) % 9), 900);
    return () => clearInterval(t);
  }, []);

  const stageActive = (i: number) => tick === i * 2;
  const arrowActive = (i: number) => tick === i * 2 + 1;

  function stageGlow(i: number) {
    const { rgb, color } = STAGE_CFG[i];
    return stageActive(i)
      ? { boxShadow: `0 0 0 1.5px ${color}, 0 0 18px rgba(${rgb},0.25)` }
      : { boxShadow: "0 0 0 0px transparent" };
  }

  return (
    <SlideShell glows={GLOWS}>
      <SlideHeader
        label="Aingo"
        title="Ingestion"
        highlight="Pipeline."
        tagline="HybridChunker — structure-aware extraction via Docling"
        marginBottom={20}
      />

      <div style={{ flex: 1, display: "flex", gap: 32, minHeight: 0 }}>

        {/* ── Left: 3 step cards ── */}
        <div style={{ width: "40%", flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 8 }}>
          {STEPS.map((step, i) => (
            <div key={step.num} style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <motion.div
                {...fadeInLeft(stagger(0.28, 0.14, i), { distance: DISTANCE.sm, duration: DURATION.med })}
                style={{
                  flex: 1,
                  position: "relative",
                  borderRadius: 16,
                  border: `1px solid rgba(${step.rgb},0.18)`,
                  background: `rgba(${step.rgb},0.03)`,
                  padding: "14px 16px 14px 14px",
                  overflow: "hidden",
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                }}
              >
                <BigGhostNumber rgb={step.rgb} size={72} opacity={0.07} style={{ position: "absolute", right: 12, bottom: -8, letterSpacing: "-4px" }}>
                  {step.num}
                </BigGhostNumber>
                <IconBadge gradient={step.grad} shadow={`rgba(${step.rgb},0.3)`} size={36} radius={10} style={{ flexShrink: 0, marginTop: 2 }}>
                  <span style={{ fontSize: 12, fontWeight: 900, color: "white", letterSpacing: "-0.5px" }}>{step.num}</span>
                </IconBadge>
                <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
                  <div style={{ fontSize: "var(--slide-card-heading)", fontWeight: 800, color: "#0A0A0A", lineHeight: 1.2, marginBottom: 6 }}>
                    {step.title}
                  </div>
                  <p style={{ fontSize: "var(--slide-body)", color: "#6B7280", margin: 0, lineHeight: 1.6 }}>{step.body}</p>
                </div>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, borderRadius: "16px 0 0 16px", background: `linear-gradient(180deg, ${step.grad[0]}, ${step.grad[1]})` }} />
              </motion.div>
              {i < STEPS.length - 1 && (
                <div style={{ display: "flex", justifyContent: "flex-start", paddingLeft: 32 }}>
                  <FlowArrow color={`rgba(${STEPS[i + 1].rgb},0.5)`} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Right: Pipeline diagram ── */}
        <motion.div
          {...fadeInRight(0.32, { distance: DISTANCE.sm, duration: DURATION.med })}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 0,
            minHeight: 0,
            borderRadius: 18,
            border: "1px solid rgba(0,0,0,0.07)",
            background: "rgba(250,250,252,0.8)",
            padding: "20px 24px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
            Pipeline Visualization
          </div>

          {/* ── Stage 0: Raw Input ── */}
          <motion.div
            animate={stageGlow(0)}
            transition={{ duration: 0.35 }}
            style={{ borderRadius: 12, border: "1px solid #E5E7EB", background: "white", padding: "12px 14px", flexShrink: 0 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="14 2 14 8 20 8" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#374151" }}>SharePoint / Xhive Document</div>
                <div style={{ fontSize: 10, color: "#9CA3AF" }}>PDF · DOCX · PPTX · Images</div>
              </div>
              <Pill color="#F59E0B" rgb="245,158,11" fontSize={9} padding="2px 7px" style={{ marginLeft: "auto" }}>Raw Input</Pill>
            </div>
            <DocText>{"This document establishes the information security policies for XYZ Corporation. All employees and contractors must adhere to these guidelines. Access to sensitive systems requires prior authorization from the IT Security team. Non-compliance may result in disciplinary action."}</DocText>
          </motion.div>

          <FlowArrow label="Step 01 — Detect boundaries" color="rgba(245,158,11,0.7)" traveling={arrowActive(0)} />

          {/* ── Stage 1: After Step 01 ── */}
          <motion.div
            animate={stageGlow(1)}
            transition={{ duration: 0.35 }}
            style={{ borderRadius: 12, border: "1px solid rgba(245,158,11,0.25)", background: "rgba(245,158,11,0.03)", padding: "10px 14px", display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#F59E0B", marginBottom: 4 }}>§ 1 · Introduction</div>
                <DocText>{"This document establishes information security policies for XYZ Corporation. All employees must comply with these guidelines."}</DocText>
                <div style={{ height: 1, background: "rgba(245,158,11,0.2)", margin: "6px 0 0" }} />
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#F59E0B", marginBottom: 4 }}>§ 2 · IT Security Policy</div>
                <DocText>{"2.1 All users must authenticate using MFA. Password rotation is mandatory every 90 days. Privileged accounts require additional approval."}</DocText>
                <div style={{ height: 1, background: "rgba(245,158,11,0.2)", margin: "6px 0 0" }} />
              </div>
            </div>
          </motion.div>

          <FlowArrow label="Step 02 — Serialize breadcrumbs" color="rgba(124,58,237,0.7)" traveling={arrowActive(1)} />

          {/* ── Stage 2: After Step 02 ── */}
          <motion.div
            animate={stageGlow(2)}
            transition={{ duration: 0.35 }}
            style={{ borderRadius: 12, border: "1px solid rgba(124,58,237,0.2)", background: "rgba(124,58,237,0.03)", padding: "10px 14px", flexShrink: 0 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <Pill color="#7C3AED" rgb="124,58,237" fontSize={9} padding="2px 8px" uppercase={false}>
                Policy › IT Security › 2.1 Overview
              </Pill>
            </div>
            <DocText>{"2.1 Access control requirements specify that all users must authenticate using multi-factor authentication. Password rotation is mandatory every 90 days. Privileged accounts require additional verification steps before system access is granted."}</DocText>
          </motion.div>

          <FlowArrow label="Step 03 — Token-aware merging" color="rgba(16,185,129,0.7)" traveling={arrowActive(2)} />

          {/* ── Stage 3: Output chunks ── */}
          <motion.div
            animate={stageGlow(3)}
            transition={{ duration: 0.35 }}
            style={{ display: "flex", gap: 10, flexShrink: 0, borderRadius: 10 }}
          >
            <ChunkCard
              label="≤ 512 tokens"
              color="#10B981"
              rgb="16,185,129"
              breadcrumb="Policy › IT Security › 2.1"
              text="All users must authenticate using MFA. Password rotation mandatory every 90 days. Privileged accounts require additional approval steps."
            />
            <ChunkCard
              label="≤ 512 tokens"
              color="#10B981"
              rgb="16,185,129"
              breadcrumb="Policy › IT Security › 2.2"
              text="Network segmentation enforces zone-based traffic filtering. All inter-zone traffic must pass through approved firewall rules and be logged."
            />
          </motion.div>

          <FlowArrow label="Vectorize → Qdrant" color="rgba(59,130,246,0.7)" traveling={arrowActive(3)} />

          {/* ── Stage 4: Qdrant ── */}
          <motion.div
            animate={stageGlow(4)}
            transition={{ duration: 0.35 }}
            style={{ borderRadius: 10, border: "1px solid rgba(59,130,246,0.25)", background: "rgba(59,130,246,0.05)", padding: "8px 14px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}
          >
            <div style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L22 7V17L12 22L2 17V7L12 2Z" stroke="#3B82F6" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M12 2V22M2 7L12 12L22 7" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#3B82F6" }}>Qdrant Vector Store</div>
              <div style={{ fontSize: 10, color: "#9CA3AF" }}>Structure-aware embeddings · HNSW index</div>
            </div>
            <Pill color="#3B82F6" rgb="59,130,246" fontSize={9} padding="2px 7px" dot style={{ marginLeft: "auto" }}>
              Indexed
            </Pill>
          </motion.div>
        </motion.div>
      </div>
    </SlideShell>
  );
}
