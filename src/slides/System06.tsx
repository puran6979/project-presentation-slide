import { motion } from "framer-motion";
import { useRef, type ReactElement } from "react";
import {
  AnimatedBeam,
  GradientText,
  IconBadge,
  Pill,
  SlideHeader,
  SlideShell,
  DotPoint,
  QueryIcon,
  HydeIcon,
  RetIcon,
  ReactAgentIcon,
  ToolIcon,
  AnswerIcon,
  ThaiText,
} from "../components/index.ts";
import { DURATION, fadeIn, fadeInUp, scaleIn, stagger } from "../lib/motion.ts";

const GLOWS = [
  { top: -180, right: -100, size: 700, color: "236,72,153", opacity: 0.1 },
  { bottom: -140, left: -60, size: 580, color: "124,58,237", opacity: 0.09 },
  { top: "30%", left: "35%", size: 420, color: "59,130,246", opacity: 0.06 },
];

const BEAM_STYLE = {
  opacity: 0.16,
  highlightOpacity: 0.52,
  width: 1.9,
};

const BEAM_TIMING = {
  duration: 0.95,
  repeatDelay: 4.55,
};

const FLOW_STEPS = [
  {
    step: 1,
    label: "Parse",
    color: "#EC4899",
    rgb: "236,72,153",
    left: "56%",
    top: "18%",
    delay: 0.76,
  },
  {
    step: 2,
    label: "Rewrite",
    color: "#7C3AED",
    rgb: "124,58,237",
    left: "56%",
    top: "40%",
    delay: 0.84,
  },
  {
    step: 3,
    label: "Tool Call",
    color: "#F59E0B",
    rgb: "245,158,11",
    left: "56%",
    top: "60%",
    delay: 0.92,
  },
  {
    step: 4,
    label: "Retrieve",
    color: "#3B82F6",
    rgb: "59,130,246",
    left: "56%",
    top: "80%",
    delay: 1.0,
  },
  {
    step: 5,
    label: "Context",
    color: "#EC4899",
    rgb: "236,72,153",
    left: "22%",
    top: "50%",
    delay: 1.08,
  },
  {
    step: 6,
    label: "Generate",
    color: "#10B981",
    rgb: "16,185,129",
    left: "80%",
    top: "25%",
    delay: 1.16,
  },
] as const;

function BeamStepTag({
  step,
  label,
  color,
  rgb,
  left,
  top,
  delay,
}: {
  step: number;
  label: string;
  color: string;
  rgb: string;
  left: string;
  top: string;
  delay: number;
}) {
  return (
    <motion.div
      {...fadeIn(delay, { duration: DURATION.base })}
      style={{
        position: "absolute",
        left,
        top,
        transform: "translate(-50%, -50%)",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 8px 4px 4px",
        borderRadius: 999,
        border: `1px solid rgba(${rgb},0.16)`,
        background: "rgba(255,255,255,0.9)",
        boxShadow: `0 8px 18px rgba(${rgb},0.08)`,
        backdropFilter: "blur(4px)",
        pointerEvents: "none",
        whiteSpace: "nowrap",
        zIndex: 2,
      }}
    >
      <div
        style={{
          minWidth: 18,
          height: 18,
          borderRadius: 999,
          background: color,
          color: "#FFFFFF",
          fontSize: 8,
          fontWeight: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 5,
          paddingRight: 5,
          boxShadow: `0 4px 10px rgba(${rgb},0.22)`,
        }}
      >
        {step}
      </div>
      <span
        style={{
          fontSize: 8.5,
          fontWeight: 800,
          color: "#374151",
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

// ── Node data ─────────────────────────────────────────────────────────────────
const NS = {
  query: {
    color: "#06B6D4",
    rgb: "6,182,212",
    grad: ["#06B6D4", "#3B82F6"] as [string, string],
    label: "User Query",
    sub: "NestJS → SSE",
  },
  hyde: {
    color: "#7C3AED",
    rgb: "124,58,237",
    grad: ["#7C3AED", "#A855F7"] as [string, string],
    label: "HyDE Expansion",
    sub: "LLM rewrite",
  },
  retrieval: {
    color: "#3B82F6",
    rgb: "59,130,246",
    grad: ["#3B82F6", "#06B6D4"] as [string, string],
    label: "Qdrant Retrieval",
    sub: "k=8 · HNSW",
  },
  react: {
    color: "#EC4899",
    rgb: "236,72,153",
    grad: ["#EC4899", "#7C3AED"] as [string, string],
    label: "ReAct Agent",
    sub: "CrewAI · Reason→Act",
  },
  tools: {
    color: "#F59E0B",
    rgb: "245,158,11",
    grad: ["#F59E0B", "#F97316"] as [string, string],
    label: "MCP Tools",
    sub: "web · doc search",
  },
  answer: {
    color: "#10B981",
    rgb: "16,185,129",
    grad: ["#10B981", "#059669"] as [string, string],
    label: "Answer + Cites",
    sub: "streamed via SSE",
  },
};

type NodeId = keyof typeof NS;
const ICONS: Record<NodeId, () => ReactElement> = {
  query: QueryIcon,
  hyde: () => <HydeIcon />,
  retrieval: RetIcon,
  react: ReactAgentIcon,
  tools: ToolIcon,
  answer: AnswerIcon,
};

// ── Node component — NO scale animation so getBoundingClientRect stays accurate ──
function FlowNode({
  id,
  anchorRef,
  isCenter = false,
  delay = 0,
}: {
  id: NodeId;
  anchorRef: React.RefObject<HTMLDivElement | null>;
  isCenter?: boolean;
  delay?: number;
}) {
  const s = NS[id];
  const Icon = ICONS[id];
  return (
    <motion.div
      {...fadeIn(delay, { duration: DURATION.med })}
      style={{
        width: isCenter ? 108 : 82,
        height: isCenter ? 108 : 82,
        borderRadius: isCenter ? 26 : 20,
        border: `1.5px solid rgba(${s.rgb},${isCenter ? 0.4 : 0.28})`,
        background: isCenter
          ? `linear-gradient(135deg, rgba(${s.rgb},0.18), rgba(${s.rgb},0.06))`
          : `rgba(${s.rgb},0.06)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isCenter ? 7 : 5,
        boxShadow: isCenter
          ? `0 0 0 4px rgba(${s.rgb},0.12), 0 8px 32px rgba(${s.rgb},0.2)`
          : `0 4px 16px rgba(${s.rgb},0.1)`,
        flexShrink: 0,
        position: "relative",
        zIndex: 1,
      }}
    >
      <div ref={anchorRef}>
        <IconBadge
          gradient={s.grad}
          shadow={`rgba(${s.rgb},0.4)`}
          size={isCenter ? 46 : 32}
          radius={isCenter ? 13 : 9}
        >
          <Icon />
        </IconBadge>
      </div>
      <div style={{ textAlign: "center", paddingLeft: 4, paddingRight: 4 }}>
        <div
          style={{
            fontSize: isCenter ? 9.5 : 8,
            fontWeight: 800,
            color: "#111827",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
          }}
        >
          {s.label}
        </div>
        {isCenter && (
          <div
            style={{
              fontSize: 7.5,
              color: "#9CA3AF",
              marginTop: 2,
              whiteSpace: "nowrap",
            }}
          >
            {s.sub}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Slide ─────────────────────────────────────────────────────────────────────
export function System06() {
  const containerRef = useRef<HTMLDivElement>(null);
  const queryRef = useRef<HTMLDivElement>(null);
  const hydeRef = useRef<HTMLDivElement>(null);
  const retRef = useRef<HTMLDivElement>(null);
  const reactRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);

  return (
    <SlideShell glows={GLOWS}>
      <SlideHeader
        label="Aingo"
        title="AI Engine"
        highlight="ReAct Flow."
        tagline="Linear Grid Pipeline · Reason→Act loop · HyDE query expansion · MCP tool calling"
        marginBottom={18}
      />

      <div style={{ flex: 1, display: "flex", gap: 28, minHeight: 0 }}>
        {/* ── Left: beam diagram using grid layout ── */}
        <div
          ref={containerRef}
          style={{
            flex: "0 0 54%",
            position: "relative",
            isolation: "isolate",
            borderRadius: 20,
            border: "1px solid rgba(0,0,0,0.07)",
            background: "rgba(250,250,252,0.7)",
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gridTemplateRows: "repeat(5, 1fr)",
            alignItems: "center",
            justifyItems: "center",
            padding: "20px 0",
            gap: 0,
            overflow: "hidden",
          }}
        >
          <div style={{ gridColumn: 2, gridRow: 1 }}>
            <FlowNode id="query" anchorRef={queryRef} delay={0.2} />
          </div>
          <div style={{ gridColumn: 2, gridRow: 2, zIndex: 10 }}>
            <FlowNode id="react" anchorRef={reactRef} isCenter delay={0.28} />
          </div>
          <div style={{ gridColumn: 3, gridRow: 2 }}>
            <FlowNode id="answer" anchorRef={answerRef} delay={0.34} />
          </div>
          <div style={{ gridColumn: 2, gridRow: 3 }}>
            <FlowNode id="hyde" anchorRef={hydeRef} delay={0.4} />
          </div>
          <div style={{ gridColumn: 2, gridRow: 4 }}>
            <FlowNode id="tools" anchorRef={toolsRef} delay={0.46} />
          </div>
          <div style={{ gridColumn: 2, gridRow: 5 }}>
            <FlowNode id="retrieval" anchorRef={retRef} delay={0.52} />
          </div>

          {/* ── Beams (overlay) ── */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={queryRef}
            toRef={reactRef}
            curvature={0}
            gradientStartColor="#06B6D4"
            gradientStopColor="#EC4899"
            pathColor="#EC4899"
            pathOpacity={BEAM_STYLE.opacity}
            gradientOpacity={BEAM_STYLE.highlightOpacity}
            pathWidth={BEAM_STYLE.width}
            duration={BEAM_TIMING.duration}
            delay={0}
            repeatDelay={BEAM_TIMING.repeatDelay}
            showArrow
          />

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={reactRef}
            toRef={hydeRef}
            curvature={0}
            gradientStartColor="#EC4899"
            gradientStopColor="#7C3AED"
            pathColor="#7C3AED"
            pathOpacity={BEAM_STYLE.opacity}
            gradientOpacity={BEAM_STYLE.highlightOpacity}
            pathWidth={BEAM_STYLE.width}
            duration={BEAM_TIMING.duration}
            delay={0.5}
            repeatDelay={BEAM_TIMING.repeatDelay}
            showArrow
          />

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={hydeRef}
            toRef={toolsRef}
            curvature={0}
            gradientStartColor="#7C3AED"
            gradientStopColor="#F59E0B"
            pathColor="#F59E0B"
            pathOpacity={BEAM_STYLE.opacity}
            gradientOpacity={BEAM_STYLE.highlightOpacity}
            pathWidth={BEAM_STYLE.width}
            duration={BEAM_TIMING.duration}
            delay={1.0}
            repeatDelay={BEAM_TIMING.repeatDelay}
            showArrow
          />

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={toolsRef}
            toRef={retRef}
            curvature={0}
            gradientStartColor="#F59E0B"
            gradientStopColor="#3B82F6"
            pathColor="#3B82F6"
            pathOpacity={BEAM_STYLE.opacity}
            gradientOpacity={BEAM_STYLE.highlightOpacity}
            pathWidth={BEAM_STYLE.width}
            duration={BEAM_TIMING.duration}
            delay={1.5}
            repeatDelay={BEAM_TIMING.repeatDelay}
            showArrow
          />

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={retRef}
            toRef={reactRef}
            curvatureX={-160}
            gradientStartColor="#3B82F6"
            gradientStopColor="#EC4899"
            pathColor="#DB2777"
            pathOpacity={BEAM_STYLE.opacity}
            gradientOpacity={BEAM_STYLE.highlightOpacity}
            pathWidth={BEAM_STYLE.width}
            duration={BEAM_TIMING.duration}
            delay={2.0}
            repeatDelay={BEAM_TIMING.repeatDelay}
            showArrow
          />

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={reactRef}
            toRef={answerRef}
            curvature={0}
            gradientStartColor="#EC4899"
            gradientStopColor="#10B981"
            pathColor="#10B981"
            pathOpacity={BEAM_STYLE.opacity}
            gradientOpacity={BEAM_STYLE.highlightOpacity}
            pathWidth={BEAM_STYLE.width}
            duration={BEAM_TIMING.duration}
            delay={2.5}
            repeatDelay={BEAM_TIMING.repeatDelay}
            showArrow
          />

          {FLOW_STEPS.map((step) => (
            <BeamStepTag key={step.step} {...step} />
          ))}

          {/* Loop label */}
          <motion.div
            {...fadeIn(0.7, { duration: 0.6 })}
            style={{
              position: "absolute",
              left: "18%",
              top: "55%",
              fontSize: 8,
              color: "#9CA3AF",
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              background: "rgba(255,255,255,0.9)",
              padding: "3px 8px",
              borderRadius: 20,
              border: "1px solid rgba(236,72,153,0.18)",
              pointerEvents: "none",
              backdropFilter: "blur(4px)",
              zIndex: 2,
            }}
          >
            iterates until confident
          </motion.div>
        </div>

        {/* ── Right: redesigned panel ── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            minHeight: 0,
          }}
        >
          {/* ── Card 1: ReAct Pattern ── */}
          <motion.div
            {...fadeInUp(0.36, { distance: 16, duration: DURATION.med })}
            style={{
              flex: 1,
              borderRadius: 18,
              border: "1px solid rgba(236,72,153,0.18)",
              background:
                "linear-gradient(135deg, rgba(236,72,153,0.06) 0%, rgba(124,58,237,0.04) 100%)",
              padding: "14px 16px",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {/* top gradient bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: "linear-gradient(90deg,#EC4899,#7C3AED)",
                borderRadius: "18px 18px 0 0",
              }}
            />
            {/* header row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                paddingTop: 2,
              }}
            >
              <IconBadge
                gradient={["#EC4899", "#7C3AED"]}
                shadow="rgba(236,72,153,0.35)"
                size={32}
                radius={9}
              >
                <ReactAgentIcon />
              </IconBadge>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: "#111827",
                    lineHeight: 1.2,
                  }}
                >
                  ReAct Pattern
                </div>
                <div style={{ fontSize: 9, color: "#9CA3AF", marginTop: 1 }}>
                  Reason → Act → Observe
                </div>
              </div>
              <Pill
                color="#EC4899"
                rgb="236,72,153"
                fontSize={8}
                padding="2px 8px"
                style={{ marginLeft: "auto" }}
              >
                CrewAI
              </Pill>
            </div>
            {/* bullets */}
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {[
                "สลับกระบวนการระหว่าง ความคิด → การกระทำ → การสังเกต",
                "จัดลำดับข้อมูลที่สืบค้นมาใหม่ (Re-rank) ในทุกรอบการให้เหตุผล",
                "สิ้นสุดกระบวนการเมื่อได้ผลลัพธ์ถึงเกณฑ์ความมั่นใจที่ตั้งไว้",
              ].map((pt) => (
                <DotPoint key={pt} gradient={["#EC4899", "#7C3AED"]}>
                  <ThaiText>{pt}</ThaiText>
                </DotPoint>
              ))}
            </div>
          </motion.div>

          {/* ── Card 2: MCP Tools ── */}
          <motion.div
            {...fadeInUp(0.46, { distance: 16, duration: DURATION.med })}
            style={{
              flex: 1,
              borderRadius: 18,
              border: "1px solid rgba(245,158,11,0.18)",
              background:
                "linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(249,115,22,0.04) 100%)",
              padding: "14px 16px",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: "linear-gradient(90deg,#F59E0B,#F97316)",
                borderRadius: "18px 18px 0 0",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                paddingTop: 2,
              }}
            >
              <IconBadge
                gradient={["#F59E0B", "#F97316"]}
                shadow="rgba(245,158,11,0.35)"
                size={32}
                radius={9}
              >
                <ToolIcon />
              </IconBadge>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: "#111827",
                    lineHeight: 1.2,
                  }}
                >
                  MCP Tools
                </div>
                <div style={{ fontSize: 9, color: "#9CA3AF", marginTop: 1 }}>
                  Model Context Protocol
                </div>
              </div>
              <Pill
                color="#F59E0B"
                rgb="245,158,11"
                fontSize={8}
                padding="2px 8px"
                style={{ marginLeft: "auto" }}
              >
                Custom Tools
              </Pill>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {[
                "สร้างมาตรฐานการเชื่อมต่อกับเครื่องมือภายนอกผ่านโปรโตคอล",
                "ช่วยให้ระบบสามารถเลือกอ่านข้อมูลเชิงโครงสร้างเชิงลึกได้",
                "เสริมความสามารถให้ AI Agent ด้วยเครื่องมือค้นหาเอกสารเฉพาะทาง",
              ].map((pt) => (
                <DotPoint key={pt} gradient={["#F59E0B", "#F97316"]}>
                  <ThaiText>{pt}</ThaiText>
                </DotPoint>
              ))}
            </div>
          </motion.div>

          {/* ── Stats row ── */}
          <div style={{ display: "flex", gap: 8, flex: "0 0 auto" }}>
            {(
              [
                {
                  val: "0.97",
                  label: "Task Completion",
                  sub: "LLM-as-Judge",
                  grad: ["#10B981", "#059669"] as [string, string],
                  rgb: "16,185,129",
                },
                {
                  val: "0.99",
                  label: "Tool Correctness",
                  sub: "Deterministic",
                  grad: ["#3B82F6", "#7C3AED"] as [string, string],
                  rgb: "59,130,246",
                },
                {
                  val: "+20.6%",
                  label: "vs Baseline",
                  sub: "ดีขึ้นจากพื้นฐาน",
                  grad: ["#F59E0B", "#F97316"] as [string, string],
                  rgb: "245,158,11",
                },
              ] as const
            ).map((s, i) => (
              <motion.div
                key={s.label}
                {...scaleIn(stagger(0.58, 0.1, i), { duration: DURATION.med })}
                style={{
                  flex: 1,
                  borderRadius: 14,
                  border: `1px solid rgba(${s.rgb},0.2)`,
                  background: `rgba(${s.rgb},0.05)`,
                  padding: "10px 12px",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2.5,
                    background: `linear-gradient(90deg,${s.grad[0]},${s.grad[1]})`,
                    borderRadius: "14px 14px 0 0",
                  }}
                />
                <GradientText
                  from={s.grad[0]}
                  to={s.grad[1]}
                  style={{
                    fontSize: 22,
                    fontWeight: 900,
                    lineHeight: 1,
                    display: "block",
                  }}
                >
                  {s.val}
                </GradientText>
                <div
                  style={{
                    fontSize: 9.5,
                    fontWeight: 700,
                    color: "#374151",
                    lineHeight: 1.2,
                  }}
                >
                  {s.label}
                </div>
                <div style={{ fontSize: 8, color: "#9CA3AF" }}>
                  <ThaiText>{s.sub}</ThaiText>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
