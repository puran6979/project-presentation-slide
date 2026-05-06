import { motion, AnimatePresence } from "framer-motion";
import { useRef, type ReactElement } from "react";
import {
  AnimatedBeam,
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
  useStepNav,
  StepNavBar,
} from "../components/index.ts";
import { DURATION, fadeIn, fadeInUp } from "../lib/motion.ts";

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

// ── Step config ────────────────────────────────────────────────────────────
type NodeId = "query" | "hyde" | "retrieval" | "react" | "tools" | "answer";

const STEP_CONFIG = [
  {
    id: 1,
    from: "query" as NodeId,
    to: "react" as NodeId,
    color: "#EC4899",
    rgb: "236,72,153",
    label: "Parse",
    gradStart: "#06B6D4",
    gradStop: "#EC4899",
    pathColor: "#EC4899",
    delay: 0,
    curvature: 0,
    curvatureX: undefined as number | undefined,
  },
  {
    id: 2,
    from: "react" as NodeId,
    to: "hyde" as NodeId,
    color: "#7C3AED",
    rgb: "124,58,237",
    label: "Rewrite",
    gradStart: "#EC4899",
    gradStop: "#7C3AED",
    pathColor: "#7C3AED",
    delay: 0.5,
    curvature: 0,
    curvatureX: undefined as number | undefined,
  },
  {
    id: 3,
    from: "hyde" as NodeId,
    to: "tools" as NodeId,
    color: "#F59E0B",
    rgb: "245,158,11",
    label: "Tool Call",
    gradStart: "#7C3AED",
    gradStop: "#F59E0B",
    pathColor: "#F59E0B",
    delay: 1.0,
    curvature: 0,
    curvatureX: undefined as number | undefined,
  },
  {
    id: 4,
    from: "tools" as NodeId,
    to: "retrieval" as NodeId,
    color: "#3B82F6",
    rgb: "59,130,246",
    label: "Retrieve",
    gradStart: "#F59E0B",
    gradStop: "#3B82F6",
    pathColor: "#3B82F6",
    delay: 1.5,
    curvature: 0,
    curvatureX: undefined as number | undefined,
  },
  {
    id: 5,
    from: "retrieval" as NodeId,
    to: "react" as NodeId,
    color: "#EC4899",
    rgb: "236,72,153",
    label: "Context",
    gradStart: "#3B82F6",
    gradStop: "#EC4899",
    pathColor: "#DB2777",
    delay: 2.0,
    curvature: 0,
    curvatureX: -160,
  },
  {
    id: 6,
    from: "react" as NodeId,
    to: "answer" as NodeId,
    color: "#10B981",
    rgb: "16,185,129",
    label: "Generate",
    gradStart: "#EC4899",
    gradStop: "#10B981",
    pathColor: "#10B981",
    delay: 2.5,
    curvature: 0,
    curvatureX: undefined as number | undefined,
  },
] as const;

const FLOW_STEPS = [
  { step: 1, label: "Parse",    color: "#EC4899", rgb: "236,72,153", left: "56%", top: "18%", delay: 0.76 },
  { step: 2, label: "Rewrite",  color: "#7C3AED", rgb: "124,58,237", left: "56%", top: "40%", delay: 0.84 },
  { step: 3, label: "Tool Call",color: "#F59E0B", rgb: "245,158,11", left: "56%", top: "60%", delay: 0.92 },
  { step: 4, label: "Retrieve", color: "#3B82F6", rgb: "59,130,246", left: "56%", top: "80%", delay: 1.0 },
  { step: 5, label: "Context",  color: "#EC4899", rgb: "236,72,153", left: "22%", top: "50%", delay: 1.08 },
  { step: 6, label: "Generate", color: "#10B981", rgb: "16,185,129", left: "80%", top: "25%", delay: 1.16 },
] as const;

function BeamStepTag({
  step,
  label,
  color,
  rgb,
  left,
  top,
  delay,
  isActive,
  isInactive,
}: {
  step: number;
  label: string;
  color: string;
  rgb: string;
  left: string;
  top: string;
  delay: number;
  isActive?: boolean;
  isInactive?: boolean;
}) {
  return (
    <motion.div
      {...fadeIn(delay, { duration: DURATION.base })}
      animate={{
        opacity: isInactive ? 0.15 : 1,
        scale: isActive ? 1.15 : 1,
      }}
      transition={{ duration: 0.22 }}
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
        border: isActive
          ? `1.5px solid ${color}`
          : `1px solid rgba(${rgb},0.16)`,
        background: isActive
          ? `rgba(${rgb},0.12)`
          : "rgba(255,255,255,0.9)",
        boxShadow: isActive
          ? `0 0 0 3px rgba(${rgb},0.18), 0 8px 24px rgba(${rgb},0.25)`
          : `0 8px 18px rgba(${rgb},0.08)`,
        backdropFilter: "blur(4px)",
        pointerEvents: "none",
        whiteSpace: "nowrap",
        zIndex: isActive ? 5 : 2,
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
          boxShadow: isActive
            ? `0 0 10px ${color}, 0 4px 10px rgba(${rgb},0.4)`
            : `0 4px 10px rgba(${rgb},0.22)`,
        }}
      >
        {step}
      </div>
      <span
        style={{
          fontSize: 8.5,
          fontWeight: 800,
          color: isActive ? color : "#374151",
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
  query:     { color: "#06B6D4", rgb: "6,182,212",   grad: ["#06B6D4","#3B82F6"]  as [string,string], label: "User Query",      sub: "NestJS → SSE"           },
  hyde:      { color: "#7C3AED", rgb: "124,58,237",  grad: ["#7C3AED","#A855F7"]  as [string,string], label: "HyDE Expansion",  sub: "LLM rewrite"            },
  retrieval: { color: "#3B82F6", rgb: "59,130,246",  grad: ["#3B82F6","#06B6D4"]  as [string,string], label: "Qdrant Retrieval",sub: "k=8 · HNSW"             },
  react:     { color: "#EC4899", rgb: "236,72,153",  grad: ["#EC4899","#7C3AED"]  as [string,string], label: "ReAct Agent",     sub: "CrewAI · Reason→Act"    },
  tools:     { color: "#F59E0B", rgb: "245,158,11",  grad: ["#F59E0B","#F97316"]  as [string,string], label: "MCP Tools",       sub: "web · doc search"       },
  answer:    { color: "#10B981", rgb: "16,185,129",  grad: ["#10B981","#059669"]  as [string,string], label: "Answer + Cites",  sub: "streamed via SSE"       },
};

const ICONS: Record<NodeId, () => ReactElement> = {
  query:     QueryIcon,
  hyde:      () => <HydeIcon />,
  retrieval: RetIcon,
  react:     ReactAgentIcon,
  tools:     ToolIcon,
  answer:    AnswerIcon,
};

function FlowNode({
  id,
  anchorRef,
  isCenter = false,
  delay = 0,
  isActive = false,
  isDimmed = false,
}: {
  id: NodeId;
  anchorRef: React.RefObject<HTMLDivElement | null>;
  isCenter?: boolean;
  delay?: number;
  isActive?: boolean;
  isDimmed?: boolean;
}) {
  const s = NS[id];
  const Icon = ICONS[id];
  return (
    <motion.div
      {...fadeIn(delay, { duration: DURATION.med })}
      animate={{
        opacity: isDimmed ? 0.25 : 1,
        scale: isActive ? 1.08 : 1,
      }}
      transition={{ duration: 0.22 }}
      style={{
        width: isCenter ? 108 : 82,
        height: isCenter ? 108 : 82,
        borderRadius: isCenter ? 26 : 20,
        border: isActive
          ? `2px solid ${s.color}`
          : `1.5px solid rgba(${s.rgb},${isCenter ? 0.4 : 0.28})`,
        background: isCenter
          ? `linear-gradient(135deg, rgba(${s.rgb},0.18), rgba(${s.rgb},0.06))`
          : `rgba(${s.rgb},0.06)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isCenter ? 7 : 5,
        boxShadow: isActive
          ? `0 0 0 5px rgba(${s.rgb},0.18), 0 8px 32px rgba(${s.rgb},0.35)`
          : isCenter
          ? `0 0 0 4px rgba(${s.rgb},0.12), 0 8px 32px rgba(${s.rgb},0.2)`
          : `0 4px 16px rgba(${s.rgb},0.1)`,
        flexShrink: 0,
        position: "relative",
        zIndex: isActive ? 4 : 1,
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
export function ReActFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const queryRef    = useRef<HTMLDivElement>(null);
  const hydeRef     = useRef<HTMLDivElement>(null);
  const retRef      = useRef<HTMLDivElement>(null);
  const reactRef    = useRef<HTMLDivElement>(null);
  const toolsRef    = useRef<HTMLDivElement>(null);
  const answerRef   = useRef<HTMLDivElement>(null);

  const { activeStep, setActiveStep, advance, retreat } = useStepNav(STEP_CONFIG.length);

  const nodeRefMap: Record<NodeId, React.RefObject<HTMLDivElement | null>> = {
    query:     queryRef,
    hyde:      hydeRef,
    retrieval: retRef,
    react:     reactRef,
    tools:     toolsRef,
    answer:    answerRef,
  };

  const currentStep = activeStep > 0 ? STEP_CONFIG[activeStep - 1] : null;

  function isNodeActive(id: NodeId) {
    return !!currentStep && (currentStep.from === id || currentStep.to === id);
  }
  function isNodeDimmed(id: NodeId) {
    return !!currentStep && !isNodeActive(id);
  }

  // Per-beam: path/gradient opacity based on step
  function beamVisual(stepId: number) {
    if (!currentStep) {
      // overview — all beams animate normally
      return {
        pathOpacity: BEAM_STYLE.opacity,
        gradientOpacity: BEAM_STYLE.highlightOpacity,
      };
    }
    if (currentStep.id === stepId) {
      return { pathOpacity: 0.06, gradientOpacity: 0.9 };
    }
    return { pathOpacity: 0.04, gradientOpacity: 0 };
  }

  return (
    <SlideShell glows={GLOWS}>
      <SlideHeader
        label="Aingo"
        title="Search Flow Service"
        highlight="ReAct Flow."
        tagline="Linear Grid Pipeline · Reason→Act loop · HyDE query expansion · MCP tool calling"
        marginBottom={18}
      />

      <div style={{ flex: 1, display: "flex", gap: 28, minHeight: 0 }}>
        {/* ── Left: beam diagram ── */}
        <div
          ref={containerRef}
          onClick={advance}
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
            cursor: "pointer",
          }}
        >
          <div style={{ gridColumn: 2, gridRow: 1 }}>
            <FlowNode id="query" anchorRef={queryRef} delay={0.2}
              isActive={isNodeActive("query")} isDimmed={isNodeDimmed("query")} />
          </div>
          <div style={{ gridColumn: 2, gridRow: 2, zIndex: 10 }}>
            <FlowNode id="react" anchorRef={reactRef} isCenter delay={0.28}
              isActive={isNodeActive("react")} isDimmed={isNodeDimmed("react")} />
          </div>
          <div style={{ gridColumn: 3, gridRow: 2 }}>
            <FlowNode id="answer" anchorRef={answerRef} delay={0.34}
              isActive={isNodeActive("answer")} isDimmed={isNodeDimmed("answer")} />
          </div>
          <div style={{ gridColumn: 2, gridRow: 3 }}>
            <FlowNode id="hyde" anchorRef={hydeRef} delay={0.4}
              isActive={isNodeActive("hyde")} isDimmed={isNodeDimmed("hyde")} />
          </div>
          <div style={{ gridColumn: 2, gridRow: 4 }}>
            <FlowNode id="tools" anchorRef={toolsRef} delay={0.46}
              isActive={isNodeActive("tools")} isDimmed={isNodeDimmed("tools")} />
          </div>
          <div style={{ gridColumn: 2, gridRow: 5 }}>
            <FlowNode id="retrieval" anchorRef={retRef} delay={0.52}
              isActive={isNodeActive("retrieval")} isDimmed={isNodeDimmed("retrieval")} />
          </div>

          {/* ── Beams ── */}
          {STEP_CONFIG.map((s) => (
            <AnimatedBeam
              key={`beam-${s.id}`}
              containerRef={containerRef}
              fromRef={nodeRefMap[s.from]}
              toRef={nodeRefMap[s.to]}
              curvature={s.curvature}
              curvatureX={s.curvatureX}
              gradientStartColor={s.gradStart}
              gradientStopColor={s.gradStop}
              pathColor={s.pathColor}
              pathWidth={BEAM_STYLE.width}
              duration={BEAM_TIMING.duration}
              delay={activeStep === 0 ? s.delay : 0}
              repeatDelay={activeStep === 0 ? BEAM_TIMING.repeatDelay : 0.4}
              showArrow
              {...beamVisual(s.id)}
            />
          ))}

          {/* ── BeamStepTags ── */}
          {FLOW_STEPS.map((fs) => (
            <BeamStepTag
              key={fs.step}
              {...fs}
              isActive={activeStep === fs.step}
              isInactive={activeStep !== 0 && activeStep !== fs.step}
            />
          ))}

          {/* Loop label */}
          <motion.div
            {...fadeIn(0.7, { duration: 0.6 })}
            animate={{ opacity: currentStep && currentStep.id !== 5 ? 0.15 : 1 }}
            transition={{ duration: 0.2 }}
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

          {/* ── Step nav bar ── */}
          <StepNavBar
            activeStep={activeStep}
            steps={[...STEP_CONFIG]}
            onAdvance={advance}
            onRetreat={retreat}
            onJump={setActiveStep}
          />
        </div>

        {/* ── Right: info cards ── */}
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
        </div>
      </div>
    </SlideShell>
  );
}
