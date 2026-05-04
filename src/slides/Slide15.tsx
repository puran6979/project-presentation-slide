  import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import {
  BigGhostNumber,
  GradientText,
  Pill,
  SlideHeader,
  SlideShell,
  ThaiText,
} from "../components/index.ts";
import { DISTANCE, DURATION, fadeInUp, scaleIn, stagger } from "../lib/motion.ts";

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const GLOWS = [
  { top: -200, right: -120, size: 680, color: "124,58,237", opacity: 0.1 },
  { bottom: -160, left: -80, size: 540, color: "16,185,129", opacity: 0.08 },
];

// ── Mock embedding scatter data ──────────────────────────────────────────────

/** Document cluster — same in both diagrams */
const DOC_POINTS = [
  { x: 154, y: 38, label: "Policy §2.1" },
  { x: 168, y: 52, label: "Access §3.4" },
  { x: 148, y: 62, label: "Password §1.2" },
  { x: 162, y: 28, label: "Compliance" },
  { x: 142, y: 74, label: "Network §5" },
];

const STANDARD_QUERY = { x: 28, y: 68, label: "\"find security policy\"" };
const HYPOTHETICAL   = { x: 157, y: 55, label: "Hypothetical Answer" };

// ── SVG Scatter Components ────────────────────────────────────────────────────

function ScatterGrid() {
  return (
    <>
      {[40, 80, 120].map((y) => (
        <line key={`hy${y}`} x1="10" y1={y} x2="190" y2={y} stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      ))}
      {[50, 100, 150].map((x) => (
        <line key={`vx${x}`} x1={x} y1="10" x2={x} y2="110" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      ))}
      <text x="100" y="125" textAnchor="middle" fontSize="7" fill="rgba(0,0,0,0.25)">semantic dimension 1</text>
      <text x="6" y="65" textAnchor="middle" fontSize="7" fill="rgba(0,0,0,0.25)" transform="rotate(-90,6,65)">dim 2</text>
    </>
  );
}

function DocCluster() {
  return (
    <>
      <ellipse cx="156" cy="52" rx="28" ry="26" fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.15)" strokeWidth="1" strokeDasharray="3 2" />
      <text x="156" y="90" textAnchor="middle" fontSize="7" fontWeight="600" fill="rgba(59,130,246,0.7)">Document Cluster</text>
      {DOC_POINTS.map((p) => (
        <g key={p.label}>
          <circle cx={p.x} cy={p.y} r="4.5" fill="#3B82F6" opacity="0.85" />
          <circle cx={p.x} cy={p.y} r="4.5" fill="none" stroke="rgba(59,130,246,0.4)" strokeWidth="3" />
        </g>
      ))}
    </>
  );
}

function StandardRagDiagram() {
  const lineCtrl  = useAnimationControls();
  const badgeCtrl = useAnimationControls();
  const queryCtrl = useAnimationControls();

  useEffect(() => {
    let alive = true;
    (async () => {
      while (alive) {
        lineCtrl.set({ pathLength: 0, opacity: 0 });
        badgeCtrl.set({ opacity: 0, scale: 0.85 });
        // pulse query dot
        queryCtrl.start({ scale: [1, 1.3, 1], transition: { duration: 0.5 } });
        await wait(200);
        if (!alive) break;
        // weak similarity line draws in
        await lineCtrl.start({ pathLength: 1, opacity: 0.75, transition: { duration: 1.2, ease: "easeOut" } });
        if (!alive) break;
        // score badge pops in
        await badgeCtrl.start({ opacity: 1, scale: 1, transition: { duration: 0.35, type: "spring", bounce: 0.4 } });
        if (!alive) break;
        await wait(1800);
        if (!alive) break;
        await Promise.all([
          lineCtrl.start({ opacity: 0, transition: { duration: 0.45 } }),
          badgeCtrl.start({ opacity: 0, scale: 0.85, transition: { duration: 0.35 } }),
        ]);
        await wait(500);
      }
    })();
    return () => { alive = false; };
  }, [lineCtrl, badgeCtrl, queryCtrl]);

  const q = STANDARD_QUERY;
  const nearest = DOC_POINTS[4];
  return (
    <svg viewBox="0 0 200 130" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <ScatterGrid />
      <DocCluster />
      <ellipse cx={q.x} cy={q.y} rx="22" ry="18" fill="rgba(245,158,11,0.06)" stroke="rgba(245,158,11,0.2)" strokeWidth="1" strokeDasharray="3 2" />
      <text x={q.x} y={q.y + 28} textAnchor="middle" fontSize="7" fontWeight="600" fill="rgba(245,158,11,0.7)">Query Space</text>
      {/* Animated weak similarity line */}
      <motion.path
        d={`M${q.x + 10},${q.y - 4} L${nearest.x - 6},${nearest.y}`}
        stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4 2" fill="none"
        animate={lineCtrl}
        initial={{ pathLength: 0, opacity: 0 }}
      />
      {/* Animated score badge */}
      <motion.g animate={badgeCtrl} initial={{ opacity: 0, scale: 0.85 }} style={{ transformOrigin: "89px 61px" }}>
        <rect x="68" y="54" width="42" height="13" rx="4" fill="rgba(239,68,68,0.12)" stroke="rgba(239,68,68,0.3)" strokeWidth="0.8" />
        <text x="89" y="63.5" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#EF4444">sim ≈ 0.31</text>
      </motion.g>
      {/* Animated query dot */}
      <motion.g animate={queryCtrl} style={{ transformOrigin: `${q.x}px ${q.y}px` }}>
        <circle cx={q.x} cy={q.y} r="5.5" fill="#F59E0B" />
        <circle cx={q.x} cy={q.y} r="5.5" fill="none" stroke="rgba(245,158,11,0.4)" strokeWidth="4" />
      </motion.g>
      <text x={q.x} y={q.y - 10} textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#F59E0B">{q.label}</text>
    </svg>
  );
}

function HydeDiagram() {
  const arcCtrl   = useAnimationControls();
  const dotCtrl   = useAnimationControls();
  const lineCtrl  = useAnimationControls();
  const badgeCtrl = useAnimationControls();

  useEffect(() => {
    let alive = true;
    (async () => {
      while (alive) {
        arcCtrl.set({ pathLength: 0, opacity: 0 });
        dotCtrl.set({ scale: 0, opacity: 0 });
        lineCtrl.set({ pathLength: 0, opacity: 0 });
        badgeCtrl.set({ opacity: 0 });
        await wait(300);
        if (!alive) break;
        // 1. LLM arc draws (query → hypothetical)
        await arcCtrl.start({ pathLength: 1, opacity: 0.7, transition: { duration: 0.9, ease: "easeInOut" } });
        if (!alive) break;
        // 2. Hypothetical dot springs in
        await dotCtrl.start({ scale: 1, opacity: 1, transition: { duration: 0.4, type: "spring", bounce: 0.55 } });
        if (!alive) break;
        // 3. Strong similarity line draws
        await lineCtrl.start({ pathLength: 1, opacity: 0.85, transition: { duration: 0.65, ease: "easeOut" } });
        if (!alive) break;
        // 4. Score badge fades in
        await badgeCtrl.start({ opacity: 1, transition: { duration: 0.3 } });
        if (!alive) break;
        await wait(2200);
        if (!alive) break;
        await Promise.all([
          arcCtrl.start({ opacity: 0, transition: { duration: 0.4 } }),
          dotCtrl.start({ scale: 0, opacity: 0, transition: { duration: 0.35 } }),
          lineCtrl.start({ opacity: 0, transition: { duration: 0.4 } }),
          badgeCtrl.start({ opacity: 0, transition: { duration: 0.3 } }),
        ]);
        await wait(400);
      }
    })();
    return () => { alive = false; };
  }, [arcCtrl, dotCtrl, lineCtrl, badgeCtrl]);

  const q = STANDARD_QUERY;
  const h = HYPOTHETICAL;
  const nearest = DOC_POINTS[0];
  return (
    <svg viewBox="0 0 200 130" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <ScatterGrid />
      <DocCluster />
      {/* Faded original query (always visible) */}
      <circle cx={q.x} cy={q.y} r="4" fill="rgba(107,114,128,0.4)" />
      <text x={q.x} y={q.y - 8} textAnchor="middle" fontSize="6" fill="rgba(107,114,128,0.5)">Original Query</text>
      <text x={q.x} y={q.y + 14} textAnchor="middle" fontSize="6" fill="rgba(107,114,128,0.4)">{q.label}</text>
      {/* LLM arc label */}
      <text x="80" y="10" textAnchor="middle" fontSize="6.5" fill="rgba(124,58,237,0.6)">LLM generates</text>
      {/* Animated LLM arc */}
      <motion.path
        d={`M${q.x + 10},${q.y - 6} C70,10 110,10 ${h.x - 12},${h.y - 8}`}
        fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeDasharray="3 2"
        animate={arcCtrl}
        initial={{ pathLength: 0, opacity: 0 }}
      />
      {/* Animated strong similarity line */}
      <motion.path
        d={`M${h.x},${h.y} L${nearest.x},${nearest.y}`}
        stroke="#10B981" strokeWidth="1.5" fill="none"
        animate={lineCtrl}
        initial={{ pathLength: 0, opacity: 0 }}
      />
      {/* Animated score badge */}
      <motion.g animate={badgeCtrl} initial={{ opacity: 0 }}>
        <rect x="131" y="17" width="42" height="13" rx="4" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.35)" strokeWidth="0.8" />
        <text x="152" y="26.5" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#10B981">sim ≈ 0.89</text>
      </motion.g>
      {/* Animated hypothetical dot */}
      <motion.g animate={dotCtrl} initial={{ scale: 0, opacity: 0 }} style={{ transformOrigin: `${h.x}px ${h.y}px` }}>
        <circle cx={h.x} cy={h.y} r="6" fill="#7C3AED" />
        <circle cx={h.x} cy={h.y} r="6" fill="none" stroke="rgba(124,58,237,0.45)" strokeWidth="5" />
        <text x={h.x + 14} y={h.y + 3} textAnchor="start" fontSize="6.5" fontWeight="700" fill="#7C3AED">{h.label}</text>
      </motion.g>
    </svg>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const CONCEPTS = [
  {
    pill: "Standard RAG",
    pillColor: "#F59E0B",
    pillRgb: "245,158,11",
    heading: "The Problem",
    headingColor: "#F59E0B",
    body: "คำถามของผู้ใช้มักจะสั้นและขาดบริบท (Low-density) ต่างจากเอกสารองค์กรที่มีข้อมูลหนาแน่น ความแตกต่างนี้ทำให้การสืบค้นแบบเดิมมีค่าความคล้ายคลึงต่ำ ระบบจึงดึงข้อมูลที่ไม่ตรงกับความต้องการออกมา",
    grad: ["#F59E0B", "#EF4444"] as [string, string],
    rgb: "245,158,11",
    Diagram: StandardRagDiagram,
  },
  {
    pill: "AiQ HyDE",
    pillColor: "#7C3AED",
    pillRgb: "124,58,237",
    heading: "The Solution",
    headingColor: "#7C3AED",
    body: "แทนที่จะใช้คำถามสั้น ๆ ไปค้นหาตรง ๆ ระบบจะให้ AI สร้าง 'คำตอบสมมติที่สมบูรณ์แบบ' ขึ้นมาก่อน แล้วจึงนำคำตอบนั้นไปสืบค้นข้อมูล ซึ่งจะตรงกับกลุ่มเอกสารที่เกี่ยวข้องมากกว่า ทำให้ดึงข้อมูลได้แม่นยำขึ้น",
    grad: ["#7C3AED", "#10B981"] as [string, string],
    rgb: "124,58,237",
    Diagram: HydeDiagram,
  },
];

const STATS = [
  {
    big: "+20.6%",
    label: "Performance vs baseline",
    sub: "เทียบกับการสืบค้นด้วยเวกเตอร์แบบปกติ",
    color: "#10B981",
    rgb: "16,185,129",
    grad: ["#10B981", "#059669"] as [string, string],
    ghost: "+",
  },
  {
    big: "0.77",
    label: "Faithfulness score",
    sub: "เทียบกับระดับ 0.55–0.65 ของ RAG ทั่วไป",
    color: "#7C3AED",
    rgb: "124,58,237",
    grad: ["#7C3AED", "#A855F7"] as [string, string],
    ghost: "F",
  },
  {
    big: "GraphRAG",
    label: "Rejected",
    sub: "ความล่าช้าในการซิงก์ 142 วินาที · HyDE ให้ความแม่นยำสูงกว่าและต้นทุนต่ำกว่า",
    color: "#F59E0B",
    rgb: "245,158,11",
    grad: ["#F59E0B", "#F97316"] as [string, string],
    ghost: "×",
  },
];

// ── Components ────────────────────────────────────────────────────────────────

function ConceptCard({
  concept,
  delay,
}: {
  concept: (typeof CONCEPTS)[number];
  delay: number;
}) {
  return (
    <motion.div
      {...fadeInUp(delay, { distance: DISTANCE.sm, duration: DURATION.med })}
      style={{
        flex: 1,
        minHeight: 0,
        borderRadius: 16,
        border: `1px solid rgba(${concept.rgb},0.2)`,
        background: `rgba(${concept.rgb},0.03)`,
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${concept.grad[0]}, ${concept.grad[1]})`,
          borderRadius: "16px 16px 0 0",
        }}
      />

      {/* Text */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Pill color={concept.pillColor} rgb={concept.pillRgb} fontSize={9} padding="2px 8px">
            {concept.pill}
          </Pill>
          <div style={{ fontSize: "var(--slide-card-heading)", fontWeight: 800, color: concept.headingColor }}>
            {concept.heading}
          </div>
        </div>
        <p style={{ fontSize: "var(--slide-body)", color: "#6B7280", margin: 0, lineHeight: 1.6 }}>
          <ThaiText>{concept.body}</ThaiText>
        </p>
      </div>

      {/* Below: SVG scatter visualization */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          borderRadius: 10,
          background: "rgba(0,0,0,0.025)",
          border: "1px solid rgba(0,0,0,0.07)",
          padding: "6px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <concept.Diagram />
      </div>
    </motion.div>
  );
}

// ── Slide ─────────────────────────────────────────────────────────────────────

export function Slide15() {
  return (
    <SlideShell glows={GLOWS}>
      <SlideHeader
        label="Aingo"
        title="HyDE &"
        highlight="Density Gap."
        tagline="Bridging the semantic mismatch between queries and enterprise documents"
        marginBottom={20}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, minHeight: 0 }}>

        {/* ── Top row: two concept cards ── */}
        <div style={{ display: "flex", gap: 20, flex: 1, minHeight: 0 }}>
          {CONCEPTS.map((c, i) => (
            <ConceptCard key={c.pill} concept={c} delay={stagger(0.28, 0.14, i)} />
          ))}
        </div>

        {/* ── Bottom row: 3 stat callout boxes ── */}
        <div style={{ display: "flex", gap: 16, flex: "0 0 auto" }}>
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              {...scaleIn(stagger(0.55, 0.12, i), { duration: DURATION.med })}
              style={{
                flex: 1,
                borderRadius: 16,
                border: `1px solid rgba(${stat.rgb},0.2)`,
                background: `rgba(${stat.rgb},0.04)`,
                padding: "16px 20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <BigGhostNumber
                rgb={stat.rgb}
                size={80}
                opacity={0.06}
                style={{ position: "absolute", right: 8, bottom: -10, letterSpacing: "-4px" }}
              >
                {stat.ghost}
              </BigGhostNumber>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 3,
                  borderRadius: "16px 0 0 16px",
                  background: `linear-gradient(180deg, ${stat.grad[0]}, ${stat.grad[1]})`,
                }}
              />
              <div style={{ position: "relative" }}>
                <GradientText
                  from={stat.grad[0]}
                  to={stat.grad[1]}
                  style={{ fontSize: 28, fontWeight: 900, lineHeight: 1, display: "block", marginBottom: 4 }}
                >
                  {stat.big}
                </GradientText>
                <div style={{ fontSize: "var(--slide-card-heading)", fontWeight: 700, color: "#0A0A0A", marginBottom: 4 }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: "var(--slide-body)", color: "#9CA3AF", lineHeight: 1.5 }}>
                  <ThaiText>{stat.sub}</ThaiText>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}
