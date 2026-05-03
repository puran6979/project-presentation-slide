import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import {
  BigGhostNumber,
  IconBadge,
  Pill,
  SlideHeader,
  SlideShell,
} from "../components/index.ts";
import { DISTANCE, DURATION, fadeInLeft, fadeInRight, stagger } from "../lib/motion.ts";

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

// Stage highlight config
const STAGE_CFG = [
  { rgb: "245,158,11", color: "#F59E0B" },
  { rgb: "245,158,11", color: "#F59E0B" },
  { rgb: "124,58,237", color: "#7C3AED" },
  { rgb: "16,185,129", color: "#10B981" },
  { rgb: "59,130,246", color: "#3B82F6" },
] as const;

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const FADE = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit:    { opacity: 0, transition: { duration: 0.15 } },
} as const;

function DocText({ children }: { children: string }) {
  return (
    <p style={{ fontSize: 8.5, color: "#6B7280", lineHeight: 1.6, margin: 0, fontFamily: "monospace" }}>
      {children}
    </p>
  );
}

const crumbStyle: CSSProperties = {
  display: "inline-block",
  padding: "2px 8px",
  borderRadius: 20,
  border: "1px solid rgba(124,58,237,0.3)",
  background: "rgba(124,58,237,0.08)",
  fontSize: 9,
  color: "#7C3AED",
  whiteSpace: "nowrap",
  fontWeight: 600,
};

// ── Raw input card body variants ──────────────────────────────────────────
function RawContent() {
  return (
    <motion.div key="raw" {...FADE}>
      <DocText>{"This document establishes the information security policies for XYZ Corporation. All employees and contractors must adhere to these guidelines. Access to sensitive systems requires prior authorization from the IT Security team."}</DocText>
    </motion.div>
  );
}

function CutContent() {
  return (
    <motion.div key="cut" {...FADE}>
      <DocText>{"This document establishes information security policies for XYZ Corporation. All employees must comply."}</DocText>
      <div style={{ position: "relative", height: 20, margin: "5px 0" }}>
        <motion.div
          style={{ height: 2, background: "linear-gradient(90deg,#F59E0B,#EF4444)", borderRadius: 2, width: "100%", transformOrigin: "left center" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
        />
        <motion.span
          style={{ position: "absolute", fontSize: 13, userSelect: "none", pointerEvents: "none" }}
          initial={{ left: 0, opacity: 0 }}
          animate={{ left: "calc(100% - 18px)", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut", times: [0, 0.05, 0.85, 1] }}
        >✂</motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ position: "absolute", right: 0, fontSize: 8, fontWeight: 600, color: "#F59E0B", background: "rgba(245,158,11,0.1)", padding: "1px 6px", borderRadius: 4 }}
        >
          structural boundary
        </motion.span>
      </div>
      <DocText>{"2.1 All users must authenticate using MFA. Password rotation is mandatory every 90 days."}</DocText>
    </motion.div>
  );
}

// ── Breadcrumb card body variants ─────────────────────────────────────────
function BreadcrumbContent() {
  return (
    <motion.div key="bc" {...FADE}>
      <div style={{ marginBottom: 8 }}>
        <div style={crumbStyle}>Policy › IT Security › 2.1 Overview</div>
      </div>
      <DocText>{"2.1 Access control requires MFA for all users. Password rotation every 90 days. Privileged accounts need additional verification before system access."}</DocText>
    </motion.div>
  );
}

function PrependContent() {
  return (
    <motion.div key="prepend" {...FADE}>
      <div style={{ position: "relative", height: 22, marginBottom: 8 }}>
        {/* Section header fades/slides out */}
        <motion.div
          initial={{ opacity: 1, x: 0 }}
          animate={{ opacity: 0, x: 12 }}
          transition={{ duration: 0.32, delay: 0.1 }}
          style={{ position: "absolute", fontSize: 10, fontWeight: 700, color: "#F59E0B", whiteSpace: "nowrap" }}
        >
          § 2 · IT Security Policy
        </motion.div>
        {/* Breadcrumb slides in from left */}
        <motion.div
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.3 }}
          style={{ ...crumbStyle, position: "absolute" }}
        >
          Policy › IT Security › 2.1 Overview
        </motion.div>
      </div>
      <DocText>{"2.1 All users must authenticate using MFA. Password rotation every 90 days. Privileged accounts require additional verification steps."}</DocText>
    </motion.div>
  );
}

// ── Chunks area variants ──────────────────────────────────────────────────
function ChunksContent() {
  return (
    <motion.div key="chunks" {...FADE} style={{ display: "flex", gap: 10 }}>
      {[
        { bc: "Policy › IT Security › 2.1", text: "All users must use MFA. Password rotation every 90 days. Exceptions require written sign-off from IT Security manager." },
        { bc: "Policy › IT Security › 2.2", text: "Network segmentation enforces zone-based traffic filtering. Inter-zone traffic must pass through approved firewall rules." },
      ].map((c) => (
        <div key={c.bc} style={{ flex: 1, borderRadius: 10, border: "1px solid rgba(16,185,129,0.25)", background: "rgba(16,185,129,0.05)", padding: "10px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#10B981", letterSpacing: "0.06em", textTransform: "uppercase" }}>≤ 512 tokens</div>
          <div style={{ fontSize: 8, color: "#10B981", fontFamily: "monospace" }}>[{c.bc}]</div>
          <DocText>{c.text}</DocText>
        </div>
      ))}
    </motion.div>
  );
}

function MergeContent() {
  const orphanCtrl = useAnimationControls();
  const targetCtrl = useAnimationControls();

  useEffect(() => {
    let alive = true;
    (async () => {
      await wait(300);
      if (!alive) return;
      orphanCtrl.start({ y: -58, opacity: 0, scale: 0.82, transition: { duration: 0.42, ease: "easeIn" } });
      await wait(320);
      if (!alive) return;
      await targetCtrl.start({ scale: [1, 1.04, 1], transition: { duration: 0.36, times: [0, 0.5, 1] } });
    })();
    return () => { alive = false; };
  }, [orphanCtrl, targetCtrl]);

  const box: CSSProperties = { flex: 1, borderRadius: 10, border: "1px solid rgba(16,185,129,0.2)", background: "rgba(16,185,129,0.04)", padding: "10px 12px", display: "flex", flexDirection: "column", gap: 5 };
  const orphanBox: CSSProperties = { ...box, border: "1px dashed rgba(245,158,11,0.45)", background: "rgba(245,158,11,0.03)" };

  return (
    <motion.div key="merge" {...FADE} style={{ display: "flex", gap: 10 }}>
      <motion.div animate={targetCtrl} style={box}>
        <div style={{ fontSize: 9, fontWeight: 700, color: "#10B981", letterSpacing: "0.06em", textTransform: "uppercase" }}>≤ 512 tokens</div>
        <div style={{ fontSize: 8, color: "#10B981", fontFamily: "monospace" }}>[Policy › IT Security › 2.1]</div>
        <DocText>{"All users must use MFA. Password rotation every 90 days."}</DocText>
      </motion.div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        <motion.div animate={orphanCtrl} style={orphanBox}>
          <div style={{ fontSize: 8, fontFamily: "monospace" }}>
            <span style={{ color: "#10B981" }}>[Policy › IT Security › 2.1]</span>
            {"  "}<span style={{ color: "#F59E0B", fontSize: 7 }}>· 48 tokens</span>
          </div>
          <DocText>{"Exceptions require written approval."}</DocText>
        </motion.div>
        <div style={{ ...box, flex: "none" }}>
          <div style={{ fontSize: 8, color: "#10B981", fontFamily: "monospace" }}>[Policy › IT Security › 2.2]</div>
          <DocText>{"Network segmentation enforces zone-based traffic filtering."}</DocText>
        </div>
      </div>
    </motion.div>
  );
}

// ── FlowArrow ─────────────────────────────────────────────────────────────
function FlowArrow({ label, color = "#9CA3AF", traveling = false }: { label?: string; color?: string; traveling?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "3px 0", flexShrink: 0 }}>
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{ width: 1, height: 12, background: color }} />
        {traveling && (
          <motion.div
            style={{ position: "absolute", top: 0, left: "50%", marginLeft: -3, width: 6, height: 6, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}` }}
            animate={{ y: [0, 12] }}
            transition={{ duration: 0.35, repeat: Infinity, ease: "linear" }}
          />
        )}
        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
          <path d="M4 6L0 0H8L4 6Z" fill={color} />
        </svg>
      </div>
      {label && (
        <span style={{ fontSize: 10, fontWeight: 600, color, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</span>
      )}
    </div>
  );
}

// ── Slide ─────────────────────────────────────────────────────────────────
export function Slide15() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((s) => (s + 1) % 9), 1100);
    return () => clearInterval(t);
  }, []);

  const stageActive = (i: number) => tick === i * 2;
  const arrowActive = (i: number) => tick === i * 2 + 1;

  function stageGlow(i: number) {
    const { rgb, color } = STAGE_CFG[i];
    return stageActive(i)
      ? { boxShadow: `0 0 0 1.5px ${color}, 0 0 16px rgba(${rgb},0.22)` }
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
                style={{ flex: 1, position: "relative", borderRadius: 16, border: `1px solid rgba(${step.rgb},0.18)`, background: `rgba(${step.rgb},0.03)`, padding: "14px 16px 14px 14px", overflow: "hidden", display: "flex", gap: 14, alignItems: "flex-start" }}
              >
                <BigGhostNumber rgb={step.rgb} size={72} opacity={0.07} style={{ position: "absolute", right: 12, bottom: -8, letterSpacing: "-4px" }}>
                  {step.num}
                </BigGhostNumber>
                <IconBadge gradient={step.grad} shadow={`rgba(${step.rgb},0.3)`} size={36} radius={10} style={{ flexShrink: 0, marginTop: 2 }}>
                  <span style={{ fontSize: 12, fontWeight: 900, color: "white", letterSpacing: "-0.5px" }}>{step.num}</span>
                </IconBadge>
                <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
                  <div style={{ fontSize: "var(--slide-card-heading)", fontWeight: 800, color: "#0A0A0A", lineHeight: 1.2, marginBottom: 6 }}>{step.title}</div>
                  <p style={{ fontSize: "var(--slide-body)", color: "#6B7280", margin: 0, lineHeight: 1.6 }}>{step.body}</p>
                </div>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, borderRadius: "16px 0 0 16px", background: `linear-gradient(180deg,${step.grad[0]},${step.grad[1]})` }} />
              </motion.div>
              {i < STEPS.length - 1 && (
                <div style={{ display: "flex", justifyContent: "flex-start", paddingLeft: 32 }}>
                  <FlowArrow color={`rgba(${STEPS[i + 1].rgb},0.45)`} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Right: full pipeline, all stages visible ── */}
        <motion.div
          {...fadeInRight(0.32, { distance: DISTANCE.sm, duration: DURATION.med })}
          style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, borderRadius: 18, border: "1px solid rgba(0,0,0,0.07)", background: "rgba(250,250,252,0.8)", padding: "16px 20px", justifyContent: "space-between" }}
        >
          <div style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>
            Pipeline Visualization
          </div>

          {/* Stage 0 — Raw Input */}
          <motion.div animate={stageGlow(0)} transition={{ duration: 0.35 }}
            style={{ borderRadius: 12, border: "1px solid #E5E7EB", background: "white", padding: "10px 12px", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                  <polyline points="14 2 14 8 20 8" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#374151" }}>SharePoint / Xhive Document</div>
                <div style={{ fontSize: 10, color: "#9CA3AF" }}>PDF · DOCX · PPTX · Images</div>
              </div>
              <Pill color="#F59E0B" rgb="245,158,11" fontSize={9} padding="2px 7px" style={{ marginLeft: "auto" }}>Raw Input</Pill>
            </div>
            {/* Raw text swaps to cut animation on tick 1 */}
            <AnimatePresence mode="wait">
              {tick === 1 ? <CutContent /> : <RawContent />}
            </AnimatePresence>
          </motion.div>

          <FlowArrow label="Step 01 — Detect boundaries" color="rgba(245,158,11,0.7)" traveling={arrowActive(0)} />

          {/* Stage 1 — Sectioned document */}
          <motion.div animate={stageGlow(1)} transition={{ duration: 0.35 }}
            style={{ borderRadius: 12, border: "1px solid rgba(245,158,11,0.25)", background: "rgba(245,158,11,0.03)", padding: "10px 14px", flexShrink: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#F59E0B", marginBottom: 3 }}>§ 1 · Introduction</div>
                <DocText>{"This document establishes information security policies. All employees must comply."}</DocText>
                <div style={{ height: 1, background: "rgba(245,158,11,0.2)", marginTop: 5 }} />
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#F59E0B", marginBottom: 3 }}>§ 2 · IT Security Policy</div>
                <DocText>{"2.1 All users must use MFA. Password rotation mandatory every 90 days."}</DocText>
                <div style={{ height: 1, background: "rgba(245,158,11,0.2)", marginTop: 5 }} />
              </div>
            </div>
          </motion.div>

          <FlowArrow label="Step 02 — Serialize breadcrumbs" color="rgba(124,58,237,0.7)" traveling={arrowActive(1)} />

          {/* Stage 2 — Breadcrumb chunk (swaps to prepend animation on tick 3) */}
          <motion.div animate={stageGlow(2)} transition={{ duration: 0.35 }}
            style={{ borderRadius: 12, border: "1px solid rgba(124,58,237,0.2)", background: "rgba(124,58,237,0.03)", padding: "10px 14px", flexShrink: 0, overflow: "hidden" }}>
            <AnimatePresence mode="wait">
              {tick === 3 ? <PrependContent /> : <BreadcrumbContent />}
            </AnimatePresence>
          </motion.div>

          <FlowArrow label="Step 03 — Token-aware merging" color="rgba(16,185,129,0.7)" traveling={arrowActive(2)} />

          {/* Stage 3 — Output chunks (swaps to merge animation on tick 5) */}
          <motion.div animate={stageGlow(3)} transition={{ duration: 0.35 }}
            style={{ borderRadius: 10, flexShrink: 0, overflow: "hidden" }}>
            <AnimatePresence mode="wait">
              {tick === 5 ? <MergeContent /> : <ChunksContent />}
            </AnimatePresence>
          </motion.div>

          <FlowArrow label="Vectorize → Qdrant" color="rgba(59,130,246,0.7)" traveling={arrowActive(3)} />

          {/* Stage 4 — Qdrant */}
          <motion.div animate={stageGlow(4)} transition={{ duration: 0.35 }}
            style={{ borderRadius: 10, border: "1px solid rgba(59,130,246,0.25)", background: "rgba(59,130,246,0.05)", padding: "8px 14px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
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
            <Pill color="#3B82F6" rgb="59,130,246" fontSize={9} padding="2px 7px" dot style={{ marginLeft: "auto" }}>Indexed</Pill>
          </motion.div>
        </motion.div>
      </div>
    </SlideShell>
  );
}
