import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  SlideHeader,
  SlideShell,
  AnimatedBeam,
  IconBadge,
  ThaiText,
  useStepNav,
  StepNavBar,
  NodeRing,
} from "../components/index.ts";
import {
  BackendIcon,
  SearchFlowServiceIcon,
  EmbeddingIcon,
} from "../components/index.ts";
import { fadeInUp } from "../lib/motion.ts";

const GLOWS = [
  { top: "10%", right: "10%", size: 600, color: "249,115,22", opacity: 0.08 },
  {
    bottom: "10%",
    right: "10%",
    size: 600,
    color: "16,185,129",
    opacity: 0.08,
  },
  { top: "50%", left: "5%", size: 600, color: "239,68,68", opacity: 0.05 },
];

const STORAGE_KEY = (key: string) => `system09-label-${key}`;

const DEFAULT_POSITIONS: Record<string, { top: number; left: number }> = {
  step1: { top: 446.328125, left: 322.76171875 },
  step2: { top: 297.8515625, left: 1419.82421875 },
  step3: { top: 298.80078125, left: 1062.609375 },
  step4: { top: 298.109375, left: 705.46484375 },
  step5: { top: 54.109375, left: 1006.90625 },
  step6: { top: 548.921875, left: 960.81640625 },
};

function getSavedPos(key: string): { top: number; left: number } {
  try {
    return (
      JSON.parse(localStorage.getItem(STORAGE_KEY(key)) ?? "null") ??
      DEFAULT_POSITIONS[key]
    );
  } catch {
    return DEFAULT_POSITIONS[key];
  }
}

// ── Step configuration ─────────────────────────────────────────────────────
type NodeKey = "backend" | "ai" | "embed";

const STEP_CONFIG = [
  {
    id: 1,
    from: "backend" as NodeKey,
    to: "ai" as NodeKey,
    color: "#10B981",
    rgb: "16,185,129",
    labelKey: "step1",
    beamProps: {
      startYOffset: 15,
      endYOffset: 15,
    },
  },
  {
    id: 2,
    from: "ai" as NodeKey,
    to: "embed" as NodeKey,
    color: "#8B5CF6",
    rgb: "139,92,246",
    labelKey: "step2",
    beamProps: {
      startXOffset: 15,
      endXOffset: 15,
      reverseY: true,
    },
  },
  {
    id: 3,
    from: "embed" as NodeKey,
    to: "ai" as NodeKey,
    color: "#3B82F6",
    rgb: "59,130,246",
    labelKey: "step3",
    beamProps: {
      startXOffset: -15,
      endXOffset: -15,
    },
  },
  {
    id: 4,
    from: "ai" as NodeKey,
    to: "backend" as NodeKey,
    color: "#EF4444",
    rgb: "239,68,68",
    labelKey: "step4",
    beamProps: {
      startYOffset: -15,
      endYOffset: -15,
      reverse: true,
      reverseY: true,
    },
  },
  {
    id: 5,
    from: "embed" as NodeKey,
    to: "backend" as NodeKey,
    color: "#F97316",
    rgb: "249,115,22",
    labelKey: "step5",
    beamProps: {
      startYOffset: -15,
      endYOffset: -15,
    },
  },
  {
    id: 6,
    from: "backend" as NodeKey,
    to: "ai" as NodeKey,
    color: "#10B981",
    rgb: "16,185,129",
    labelKey: "step6",
    beamProps: {
      startYOffset: 15,
      endYOffset: 15,
    },
  },
] as const;

// ── FloatingLabel ──────────────────────────────────────────────────────────
function FloatingLabel({
  labelKey,
  editMode,
  title,
  desc,
  color,
  isActive,
  isInactive,
}: {
  labelKey: string;
  editMode: boolean;
  title: string;
  desc: React.ReactNode;
  color: string;
  isActive?: boolean;
  isInactive?: boolean;
}) {
  const [pos, setPos] = useState(() => getSavedPos(labelKey));
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <motion.div
      {...(editMode ? {} : fadeInUp(0.6))}
      drag={editMode}
      dragMomentum={false}
      onDragEnd={() => {
        const newPos = { top: pos.top + y.get(), left: pos.left + x.get() };
        localStorage.setItem(STORAGE_KEY(labelKey), JSON.stringify(newPos));
        setPos(newPos);
        x.set(0);
        y.set(0);
      }}
      animate={{
        opacity: isInactive ? 0.15 : 1,
        scale: isActive ? 1.05 : 1,
        zIndex: isActive ? 35 : 30,
      }}
      transition={{ duration: 0.25 }}
      style={{
        position: "absolute",
        top: pos.top,
        left: pos.left,
        x,
        y,
        background: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        border: isActive ? `2px solid ${color}` : `1px solid ${color}40`,
        borderRadius: 16,
        padding: "12px 20px",
        boxShadow: isActive
          ? `0 0 0 5px ${color}25, 0 16px 40px ${color}45`
          : editMode
            ? `0 0 0 2px ${color}, 0 12px 32px ${color}40`
            : `0 12px 32px ${color}20`,
        zIndex: isActive ? 35 : 30,
        width: 260,
        pointerEvents: editMode ? "all" : "none",
        cursor: editMode ? "grab" : "default",
      }}
    >
      {editMode && (
        <div
          style={{
            position: "absolute",
            top: -10,
            right: -10,
            background: color,
            color: "#fff",
            fontSize: 10,
            fontWeight: 800,
            borderRadius: 6,
            padding: "2px 7px",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          DRAG
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 6,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: color,
            boxShadow: isActive
              ? `0 0 10px ${color}, 0 0 20px ${color}80`
              : `0 0 8px ${color}`,
          }}
        />
        <div
          style={{
            fontSize: 13,
            fontWeight: 800,
            color: color,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: 14,
          color: "#374151",
          lineHeight: 1.5,
          fontWeight: 500,
        }}
      >
        {desc}
      </div>
    </motion.div>
  );
}

export function AttachmentFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const backendRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const embedRef = useRef<HTMLDivElement>(null);

  const editMode = new URLSearchParams(window.location.search).has("edit");

  const { activeStep, setActiveStep, advance, retreat } = useStepNav(
    STEP_CONFIG.length,
  );

  const nodeRefs: Record<NodeKey, React.RefObject<HTMLDivElement | null>> = {
    backend: backendRef,
    ai: aiRef,
    embed: embedRef,
  };

  const nodeColors: Record<NodeKey, { color: string; rgb: string }> = {
    backend: { color: "#EF4444", rgb: "239,68,68" },
    ai: { color: "#10B981", rgb: "16,185,129" },
    embed: { color: "#F97316", rgb: "249,115,22" },
  };

  function isNodeActive(node: NodeKey): boolean {
    if (activeStep === 0) return false;
    const step = STEP_CONFIG[activeStep - 1];
    return step.from === node || step.to === node;
  }

  function isLabelActive(labelKey: string): boolean {
    if (activeStep === 0) return false;
    return STEP_CONFIG[activeStep - 1].labelKey === labelKey;
  }

  function isLabelInactive(labelKey: string): boolean {
    if (activeStep === 0) return false;
    return STEP_CONFIG[activeStep - 1].labelKey !== labelKey;
  }

  const currentStep = activeStep > 0 ? STEP_CONFIG[activeStep - 1] : null;

  return (
    <SlideShell glows={GLOWS}>
      <SlideHeader
        label="Architecture"
        title="Context"
        highlight="Attachment Flow."
        tagline="Sequential, user-driven process from search to grounded response"
        marginBottom={20}
      />

      <div
        style={{
          flex: 1,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <motion.div
          {...fadeInUp(0.3)}
          onClick={advance}
          style={{
            width: "100%",
            height: "100%",
            background: "rgba(255,255,255,0.4)",
            backdropFilter: "blur(40px)",
            borderRadius: 40,
            border: "1px solid rgba(255,255,255,0.6)",
            position: "relative",
            isolation: "isolate",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.02), inset 0 0 0 1px rgba(255,255,255,0.8)",
            cursor: "pointer",
          }}
          ref={containerRef}
        >
          {/* Subtle grid background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
              opacity: 0.5,
              borderRadius: 40,
              zIndex: -1,
            }}
          />

          {/* ================================================================ */}
          {/* BACKGROUND STATIC PATH TRACKS (always visible) */}
          {/* ================================================================ */}

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={backendRef}
            toRef={aiRef}
            gradientOpacity={0}
            pathOpacity={0.1}
            showArrow={false}
            curvature={0}
            startYOffset={15}
            endYOffset={15}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={aiRef}
            toRef={backendRef}
            gradientOpacity={0}
            pathOpacity={0.1}
            showArrow={false}
            curvature={0}
            startYOffset={-15}
            endYOffset={-15}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={aiRef}
            toRef={embedRef}
            gradientOpacity={0}
            pathOpacity={0.1}
            showArrow={false}
            curvature={0}
            startXOffset={15}
            endXOffset={15}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={embedRef}
            toRef={aiRef}
            gradientOpacity={0}
            pathOpacity={0.1}
            showArrow={false}
            curvature={0}
            startXOffset={-15}
            endXOffset={-15}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={backendRef}
            toRef={embedRef}
            gradientOpacity={0}
            pathOpacity={0.1}
            showArrow={false}
            curvature={0}
            startYOffset={-15}
            endYOffset={-15}
          />

          {/* ================================================================ */}
          {/* OVERVIEW — all 6 steps cycling with staggered delays */}
          {/* ================================================================ */}

          {activeStep === 0 &&
            STEP_CONFIG.map((s, i) => (
              <AnimatedBeam
                key={`overview-beam-${s.id}`}
                containerRef={containerRef}
                fromRef={nodeRefs[s.from]}
                toRef={nodeRefs[s.to]}
                gradientStartColor={s.color}
                gradientStopColor={s.color}
                delay={i * 2.2}
                duration={1.6}
                repeatDelay={6 * 2.2 - 1.6}
                pathOpacity={0}
                showArrow
                curvature={0}
                {...s.beamProps}
              />
            ))}

          {/* ================================================================ */}
          {/* ACTIVE STEP BEAM */}
          {/* ================================================================ */}

          <AnimatePresence>
            {currentStep && (
              <AnimatedBeam
                key={`step-beam-${currentStep.id}`}
                containerRef={containerRef}
                fromRef={nodeRefs[currentStep.from]}
                toRef={nodeRefs[currentStep.to]}
                gradientStartColor={currentStep.color}
                gradientStopColor={currentStep.color}
                delay={0}
                duration={1.4}
                repeatDelay={0.3}
                pathOpacity={0}
                showArrow
                curvature={0}
                {...currentStep.beamProps}
              />
            )}
          </AnimatePresence>

          {/* ================================================================ */}
          {/* NODES */}
          {/* ================================================================ */}

          {/* Web / Backend (Left Center) */}
          <div
            style={{
              position: "absolute",
              top: "calc(50% - 90px)",
              left: "10%",
              zIndex: isNodeActive("backend") ? 15 : 10,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  zIndex: 10,
                  background: "rgba(255,255,255,1)",
                  borderRadius: 28,
                  padding: 4,
                }}
              >
                <NodeRing
                  active={isNodeActive("backend")}
                  color={nodeColors.backend.color}
                  rgb={nodeColors.backend.rgb}
                />
                <div ref={backendRef}>
                  <IconBadge
                    size={100}
                    radius={28}
                    gradient={["#EF4444", "#FCA5A5"]}
                    shadow={"rgba(239,68,68,0.4)"}
                  >
                    <div style={{ color: "white" }}>
                      <BackendIcon />
                    </div>
                  </IconBadge>
                </div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  marginTop: 20,
                  fontWeight: 800,
                  fontSize: 20,
                  color: "#B91C1C",
                  textShadow: "0 2px 4px rgba(255,255,255,0.8)",
                }}
              >
                Web / Backend
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#EF4444",
                  fontWeight: 600,
                  textShadow: "0 2px 4px rgba(255,255,255,0.8)",
                }}
              >
                Client Interface
              </div>
            </div>
          </div>

          {/* Embedding Service (Top Right) */}
          <div
            style={{
              position: "absolute",
              top: "15%",
              right: "15%",
              zIndex: isNodeActive("embed") ? 15 : 10,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  zIndex: 10,
                  background: "rgba(255,255,255,1)",
                  borderRadius: 28,
                  padding: 4,
                }}
              >
                <NodeRing
                  active={isNodeActive("embed")}
                  color={nodeColors.embed.color}
                  rgb={nodeColors.embed.rgb}
                />
                <div ref={embedRef}>
                  <IconBadge
                    size={100}
                    radius={28}
                    gradient={["#F97316", "#FDBA74"]}
                    shadow={"rgba(249,115,22,0.4)"}
                  >
                    <div style={{ color: "white" }}>
                      <EmbeddingIcon />
                    </div>
                  </IconBadge>
                </div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  marginTop: 20,
                  fontWeight: 800,
                  fontSize: 20,
                  color: "#C2410C",
                  textShadow: "0 2px 4px rgba(255,255,255,0.8)",
                }}
              >
                Embedding Service
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#F97316",
                  fontWeight: 600,
                  textShadow: "0 2px 4px rgba(255,255,255,0.8)",
                }}
              >
                Vector DB &amp; Docs
              </div>
            </div>
          </div>

          {/* AI / Search Flow (Bottom Right) */}
          <div
            style={{
              position: "absolute",
              bottom: "15%",
              right: "15%",
              zIndex: isNodeActive("ai") ? 15 : 10,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  zIndex: 10,
                  background: "rgba(255,255,255,1)",
                  borderRadius: 28,
                  padding: 4,
                }}
              >
                <NodeRing
                  active={isNodeActive("ai")}
                  color={nodeColors.ai.color}
                  rgb={nodeColors.ai.rgb}
                />
                <div ref={aiRef}>
                  <IconBadge
                    size={100}
                    radius={28}
                    gradient={["#10B981", "#6EE7B7"]}
                    shadow={"rgba(16,185,129,0.4)"}
                  >
                    <div style={{ color: "white" }}>
                      <SearchFlowServiceIcon />
                    </div>
                  </IconBadge>
                </div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  marginTop: 20,
                  fontWeight: 800,
                  fontSize: 20,
                  color: "#047857",
                  textShadow: "0 2px 4px rgba(255,255,255,0.8)",
                }}
              >
                Search Flow
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#10B981",
                  fontWeight: 600,
                  textShadow: "0 2px 4px rgba(255,255,255,0.8)",
                }}
              >
                AI Agents
              </div>
            </div>
          </div>

          {/* ================================================================ */}
          {/* FLOATING LABELS */}
          {/* ================================================================ */}

          <FloatingLabel
            labelKey="step1"
            editMode={editMode}
            title="STEP 1"
            color="#10B981"
            isActive={isLabelActive("step1")}
            isInactive={isLabelInactive("step1")}
            desc={
              <ThaiText
                en={
                  <>
                    <span style={{ fontWeight: 800 }}>1.</span> The web client
                    sends a request asking AI to search for information.
                  </>
                }
              >
                <span style={{ fontWeight: 800 }}>1.</span> Web ส่ง Request
                แจ้งให้ AI ทำการค้นหาข้อมูล
              </ThaiText>
            }
          />
          <FloatingLabel
            labelKey="step2"
            editMode={editMode}
            title="STEP 2"
            color="#8B5CF6"
            isActive={isLabelActive("step2")}
            isInactive={isLabelInactive("step2")}
            desc={
              <ThaiText
                en={
                  <>
                    <span style={{ fontWeight: 800 }}>2.</span> The AI agent
                    asks the Embedding Service to search.
                  </>
                }
              >
                <span style={{ fontWeight: 800 }}>2.</span> AI Agent
                สั่งค้นหาข้อมูลไปยัง Embedding Service
              </ThaiText>
            }
          />
          <FloatingLabel
            labelKey="step3"
            editMode={editMode}
            title="STEP 3"
            color="#3B82F6"
            isActive={isLabelActive("step3")}
            isInactive={isLabelInactive("step3")}
            desc={
              <ThaiText
                en={
                  <>
                    <span style={{ fontWeight: 800 }}>3.</span> The Embedding
                    Service returns results to AI.
                  </>
                }
              >
                <span style={{ fontWeight: 800 }}>3.</span> Embedding Service
                ส่งผลลัพธ์กลับมาให้ AI
              </ThaiText>
            }
          />
          <FloatingLabel
            labelKey="step4"
            editMode={editMode}
            title="STEP 4"
            color="#EF4444"
            isActive={isLabelActive("step4")}
            isInactive={isLabelInactive("step4")}
            desc={
              <ThaiText
                en={
                  <>
                    <span style={{ fontWeight: 800 }}>4.</span> AI returns only
                    document IDs to the web client.
                  </>
                }
              >
                <span style={{ fontWeight: 800 }}>4.</span> AI ส่งกลับเฉพาะ IDs
                ของเอกสารให้ฝั่ง Web
              </ThaiText>
            }
          />
          <FloatingLabel
            labelKey="step5"
            editMode={editMode}
            title="STEP 5"
            color="#F97316"
            isActive={isLabelActive("step5")}
            isInactive={isLabelInactive("step5")}
            desc={
              <ThaiText
                en={
                  <>
                    <span style={{ fontWeight: 800 }}>5.</span> The web client
                    fetches full content from the Embedding Service.
                  </>
                }
              >
                <span style={{ fontWeight: 800 }}>5.</span> Web
                ดึงเนื้อหาเต็มจาก Embedding Service
              </ThaiText>
            }
          />
          <FloatingLabel
            labelKey="step6"
            editMode={editMode}
            title="STEP 6"
            color="#10B981"
            isActive={isLabelActive("step6")}
            isInactive={isLabelInactive("step6")}
            desc={
              <ThaiText
                en={
                  <>
                    <span style={{ fontWeight: 800 }}>6.</span> The web client
                    sends a follow-up request to AI with verified attachments.
                  </>
                }
              >
                <span style={{ fontWeight: 800 }}>6.</span> Web ส่ง Request
                กลับไปหา AI พร้อมแนบเอกสารยืนยัน
              </ThaiText>
            }
          />

          {/* ================================================================ */}
          {/* STEP NAVIGATION */}
          {/* ================================================================ */}
          <StepNavBar
            activeStep={activeStep}
            steps={[...STEP_CONFIG]}
            onAdvance={advance}
            onRetreat={retreat}
            onJump={setActiveStep}
          />
        </motion.div>
      </div>

      {/* Edit-mode HUD */}
      {editMode && (
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 12,
            alignItems: "center",
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(8px)",
            borderRadius: 12,
            padding: "10px 20px",
            zIndex: 200,
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          <span style={{ opacity: 0.7 }}>
            ✦ LAYOUT EDIT MODE — drag labels to reposition
          </span>
          <button
            onClick={() => {
              ["step1", "step2", "step3", "step4", "step5", "step6"].forEach(
                (k) => localStorage.removeItem(`system09-label-${k}`),
              );
              window.location.reload();
            }}
            style={{
              background: "#EF4444",
              border: "none",
              borderRadius: 8,
              color: "#fff",
              fontSize: 12,
              fontWeight: 800,
              padding: "4px 12px",
              cursor: "pointer",
            }}
          >
            Reset positions
          </button>
        </div>
      )}
    </SlideShell>
  );
}
