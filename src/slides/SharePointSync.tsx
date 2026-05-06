import { motion, AnimatePresence } from "framer-motion";
import { useRef, type ReactElement } from "react";
import {
  AnimatedBeam,
  IconBadge,
  SlideHeader,
  SlideShell,
  ThaiText,
  useStepNav,
  StepNavBar,
  WebhookIcon,
  StorageIcon,
  BackendIcon,
} from "../components/index.ts";
import { DURATION, fadeIn, fadeInUp } from "../lib/motion.ts";

// ── Glows ──────────────────────────────────────────────────────────────────────
const GLOWS = [
  { top: -160, left: -80, size: 680, color: "14,165,233", opacity: 0.1 },
  { bottom: -140, right: -80, size: 580, color: "99,102,241", opacity: 0.09 },
  { top: "40%", right: "28%", size: 400, color: "168,85,247", opacity: 0.06 },
];

const BEAM_W = 1.8;

// ── Types / config ─────────────────────────────────────────────────────────────
type NodeId = "sp" | "webhook" | "fss" | "backend" | "mq";

const STEP_CONFIG = [
  {
    id: 1,
    from: "sp" as NodeId,
    to: "webhook" as NodeId,
    label: "Change Notification",
    color: "#0EA5E9",
    rgb: "14,165,233",
    gradStart: "#38BDF8",
    gradStop: "#0EA5E9",
    startYOffset: 0,
    endYOffset: 0,
    delay: 0,
  },
  {
    id: 2,
    from: "webhook" as NodeId,
    to: "fss" as NodeId,
    label: "Delta Query",
    color: "#6366F1",
    rgb: "99,102,241",
    gradStart: "#0EA5E9",
    gradStop: "#6366F1",
    startYOffset: -14,
    endYOffset: -14,
    delay: 1.0,
  },
  {
    id: 3,
    from: "webhook" as NodeId,
    to: "fss" as NodeId,
    label: "Delegate Upload",
    color: "#A855F7",
    rgb: "168,85,247",
    gradStart: "#6366F1",
    gradStop: "#A855F7",
    startYOffset: 14,
    endYOffset: 14,
    delay: 2.0,
  },
  {
    id: 4,
    from: "fss" as NodeId,
    to: "backend" as NodeId,
    label: "Status Webhook",
    color: "#F59E0B",
    rgb: "245,158,11",
    gradStart: "#A855F7",
    gradStop: "#F59E0B",
    startYOffset: 0,
    endYOffset: 0,
    delay: 3.0,
  },
  {
    id: 5,
    from: "fss" as NodeId,
    to: "mq" as NodeId,
    label: "file_ready Event",
    color: "#10B981",
    rgb: "16,185,129",
    gradStart: "#F59E0B",
    gradStop: "#10B981",
    startYOffset: 0,
    endYOffset: 0,
    delay: 4.0,
  },
] as const;

const BEAM_TAGS = [
  {
    step: 1,
    label: "Change Notification",
    left: "16%",
    top: "21%",
    color: "#0EA5E9",
    rgb: "14,165,233",
    delay: 0.65,
  },
  {
    step: 2,
    label: "Delta Query",
    left: "44%",
    top: "12%",
    color: "#6366F1",
    rgb: "99,102,241",
    delay: 0.73,
  },
  {
    step: 3,
    label: "Delegate Upload",
    left: "44%",
    top: "39%",
    color: "#A855F7",
    rgb: "168,85,247",
    delay: 0.81,
  },
  {
    step: 4,
    label: "Status Webhook",
    left: "67%",
    top: "68%",
    color: "#F59E0B",
    rgb: "245,158,11",
    delay: 0.89,
  },
  {
    step: 5,
    label: "file_ready",
    left: "79%",
    top: "20%",
    color: "#10B981",
    rgb: "16,185,129",
    delay: 0.97,
  },
] as const;

const STEP_DETAILS = [
  {
    id: 1,
    title: "Change Notification",
    subtitle: "Microsoft Graph → Webhook Service",
    thai: "เมื่อไฟล์ถูกเพิ่มหรือแก้ไขใน SharePoint drive, MS Graph จะส่ง HTTP POST พร้อม payload รายการเปลี่ยนแปลงไปยัง Webhook URL ที่ลงทะเบียนไว้ล่วงหน้า ระบบตรวจสอบ validationToken เมื่อมีการลงทะเบียน subscription ใหม่",
    tags: ["MS Graph Subscription", "HTTP POST", "validationToken"],
    color: "#0EA5E9",
    rgb: "14,165,233",
  },
  {
    id: 2,
    title: "Delta Query",
    subtitle: "Webhook Service → Graph API delta endpoint",
    thai: "Webhook Service เรียก Graph API delta endpoint เพื่อดึงเฉพาะรายการที่เปลี่ยนแปลงตั้งแต่ครั้งก่อน โดยใช้ deltaLink ที่บันทึกไว้ใน DB จากนั้นเปรียบเทียบ eTag กับ record ใน FSS เพื่อตัดสินใจ Skip หรือ Sync",
    tags: ["GET /root/delta", "deltaLink", "eTag Compare"],
    color: "#6366F1",
    rgb: "99,102,241",
  },
  {
    id: 3,
    title: "Delegate Upload",
    subtitle: "Webhook Service → File Storage Service",
    thai: "Webhook Service ส่ง source URL และ Bearer token ไปให้ FSS จัดการดาวน์โหลดเองในเบื้องหลัง ทำให้สามารถตอบ 202 กลับไปยัง Microsoft ได้ทันทีโดยไม่บล็อก ระบบจะลองใหม่ได้ถึง 3 ครั้งแบบ exponential back-off",
    tags: ["POST /upload-from-url", "Bearer Token", "202 Accepted"],
    color: "#A855F7",
    rgb: "168,85,247",
  },
  {
    id: 4,
    title: "Status Webhook",
    subtitle: "File Storage Service → Backend (NestJS)",
    thai: "FSS แจ้ง Backend เมื่อสถานะเปลี่ยนจาก PROCESSING เป็น COMPLETED พร้อม file_id และ s3_key เพื่อให้ระบบอัปเดตข้อมูลและเตรียมรับ ingestion event ในขั้นตอนถัดไป ไฟล์ถูกจัดเก็บใน MinIO (S3) เรียบร้อยแล้ว",
    tags: ["PROCESSING → COMPLETED", "NestJS Webhook", "s3_key"],
    color: "#F59E0B",
    rgb: "245,158,11",
  },
  {
    id: 5,
    title: "file_ready Event",
    subtitle: "File Storage Service → RabbitMQ",
    thai: "เมื่อจัดเก็บไฟล์ใน MinIO เรียบร้อยแล้ว FSS ส่ง file_ready event ไปยัง RabbitMQ เพื่อให้ Data Ingestion Service เริ่มกระบวนการ ETL — ตรวจจับ modality, สกัดเนื้อหา, แบ่ง Chunk และ vectorize",
    tags: ["file_ready", "RabbitMQ publish", "→ Ingestion Pipeline"],
    color: "#10B981",
    rgb: "16,185,129",
  },
] as const;

// ── Custom icons ───────────────────────────────────────────────────────────────
function SharePointIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="3"
        stroke="white"
        strokeWidth="1.8"
      />
      <path
        d="M7 9h5a2.5 2.5 0 010 5H7"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M10 14v3"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RabbitMQIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect
        x="2"
        y="5"
        width="8"
        height="5"
        rx="1.5"
        stroke="white"
        strokeWidth="1.7"
      />
      <rect
        x="2"
        y="13"
        width="8"
        height="5"
        rx="1.5"
        stroke="white"
        strokeWidth="1.7"
      />
      <rect
        x="14"
        y="9"
        width="8"
        height="5"
        rx="1.5"
        stroke="white"
        strokeWidth="1.7"
      />
      <path
        d="M10 7.5H13V11.5M10 15.5H13V11.5"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Node data ──────────────────────────────────────────────────────────────────
const NS: Record<
  NodeId,
  {
    color: string;
    rgb: string;
    grad: [string, string];
    label: string;
    sub: string;
  }
> = {
  sp: {
    color: "#0EA5E9",
    rgb: "14,165,233",
    grad: ["#38BDF8", "#0EA5E9"],
    label: "SharePoint",
    sub: "MS Graph Source",
  },
  webhook: {
    color: "#6366F1",
    rgb: "99,102,241",
    grad: ["#818CF8", "#6366F1"],
    label: "Webhook Service",
    sub: "Delta · Validate",
  },
  fss: {
    color: "#A855F7",
    rgb: "168,85,247",
    grad: ["#C084FC", "#A855F7"],
    label: "File Storage Svc",
    sub: "Stream · MinIO",
  },
  backend: {
    color: "#F59E0B",
    rgb: "245,158,11",
    grad: ["#FCD34D", "#F59E0B"],
    label: "Backend Service",
    sub: "NestJS · SSE",
  },
  mq: {
    color: "#10B981",
    rgb: "16,185,129",
    grad: ["#34D399", "#10B981"],
    label: "RabbitMQ",
    sub: "file_ready Event",
  },
};

const ICONS: Record<NodeId, () => ReactElement> = {
  sp: SharePointIcon,
  webhook: WebhookIcon as unknown as () => ReactElement,
  fss: StorageIcon as unknown as () => ReactElement,
  backend: BackendIcon as unknown as () => ReactElement,
  mq: RabbitMQIcon,
};

// ── FlowNode: square box style (same as ReActFlow) ────────────────────────────
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
      animate={{ opacity: isDimmed ? 0.25 : 1, scale: isActive ? 1.08 : 1 }}
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
            fontSize: isCenter ? 10 : 8.5,
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
              fontSize: 8,
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

// ── BeamLabel ──────────────────────────────────────────────────────────────────
function BeamLabel({
  step,
  label,
  left,
  top,
  color,
  rgb,
  delay,
  isActive,
  isInactive,
}: {
  step: number;
  label: string;
  left: string;
  top: string;
  color: string;
  rgb: string;
  delay: number;
  isActive?: boolean;
  isInactive?: boolean;
}) {
  return (
    <motion.div
      {...fadeIn(delay)}
      animate={{ opacity: isInactive ? 0.12 : 1, scale: isActive ? 1.12 : 1 }}
      transition={{ duration: 0.22 }}
      style={{
        position: "absolute",
        left,
        top,
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 8px 3px 4px",
        borderRadius: 999,
        border: isActive
          ? `1.5px solid ${color}`
          : `1px solid rgba(${rgb},0.18)`,
        background: isActive ? `rgba(${rgb},0.1)` : "rgba(255,255,255,0.92)",
        boxShadow: isActive
          ? `0 0 0 3px rgba(${rgb},0.18), 0 6px 20px rgba(${rgb},0.25)`
          : `0 4px 12px rgba(${rgb},0.06)`,
        backdropFilter: "blur(4px)",
        pointerEvents: "none",
        whiteSpace: "nowrap",
        zIndex: isActive ? 5 : 2,
      }}
    >
      <div
        style={{
          minWidth: 19,
          height: 19,
          borderRadius: 999,
          background: color,
          color: "#fff",
          fontSize: 9.5,
          fontWeight: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 5,
          paddingRight: 5,
          boxShadow: isActive ? `0 0 8px ${color}` : undefined,
        }}
      >
        {step}
      </div>
      <span
        style={{
          fontSize: 10,
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

// ── Slide ──────────────────────────────────────────────────────────────────────
export function SharePointSync() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spRef = useRef<HTMLDivElement>(null);
  const webhookRef = useRef<HTMLDivElement>(null);
  const fssRef = useRef<HTMLDivElement>(null);
  const backendRef = useRef<HTMLDivElement>(null);
  const mqRef = useRef<HTMLDivElement>(null);

  const { activeStep, setActiveStep, advance, retreat } = useStepNav(
    STEP_CONFIG.length,
  );

  const nodeRefMap: Record<NodeId, React.RefObject<HTMLDivElement | null>> = {
    sp: spRef,
    webhook: webhookRef,
    fss: fssRef,
    backend: backendRef,
    mq: mqRef,
  };

  const currentStep = activeStep > 0 ? STEP_CONFIG[activeStep - 1] : null;

  function isNodeActive(id: NodeId) {
    return !!currentStep && (currentStep.from === id || currentStep.to === id);
  }
  function isNodeDimmed(id: NodeId) {
    return !!currentStep && !isNodeActive(id);
  }

  return (
    <SlideShell glows={GLOWS}>
      <SlideHeader
        label="System"
        title="SharePoint"
        highlight="Sync Pipeline."
        tagline="Event-driven · Delta tracking · Async delegation · Object storage"
        marginBottom={18}
      />

      <div style={{ flex: 1, display: "flex", gap: 28, minHeight: 0 }}>
        {/* ── Left: pipeline diagram ───────────────────────────────────── */}
        <div
          ref={containerRef}
          onClick={advance}
          style={{
            flex: "0 0 57%",
            position: "relative",
            isolation: "isolate",
            borderRadius: 20,
            border: "1px solid rgba(0,0,0,0.07)",
            background: "rgba(250,250,252,0.7)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            alignItems: "center",
            justifyItems: "center",
            padding: "24px 10px",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          {/* Dot grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              borderRadius: 20,
              zIndex: -1,
            }}
          />

          {/* ── Nodes ── */}
          <div style={{ gridColumn: 1, gridRow: 1 }}>
            <FlowNode
              id="sp"
              anchorRef={spRef}
              delay={0.2}
              isActive={isNodeActive("sp")}
              isDimmed={isNodeDimmed("sp")}
            />
          </div>
          <div style={{ gridColumn: 2, gridRow: 1, zIndex: 10 }}>
            <FlowNode
              id="webhook"
              anchorRef={webhookRef}
              delay={0.28}
              isCenter
              isActive={isNodeActive("webhook")}
              isDimmed={isNodeDimmed("webhook")}
            />
          </div>
          <div style={{ gridColumn: 3, gridRow: 1, zIndex: 10 }}>
            <FlowNode
              id="fss"
              anchorRef={fssRef}
              delay={0.36}
              isCenter
              isActive={isNodeActive("fss")}
              isDimmed={isNodeDimmed("fss")}
            />
          </div>
          <div style={{ gridColumn: 4, gridRow: 1 }}>
            <FlowNode
              id="mq"
              anchorRef={mqRef}
              delay={0.44}
              isActive={isNodeActive("mq")}
              isDimmed={isNodeDimmed("mq")}
            />
          </div>
          <div style={{ gridColumn: 3, gridRow: 2 }}>
            <FlowNode
              id="backend"
              anchorRef={backendRef}
              delay={0.52}
              isActive={isNodeActive("backend")}
              isDimmed={isNodeDimmed("backend")}
            />
          </div>

          {/* ── Static track beams ── */}
          {STEP_CONFIG.map((s) => (
            <AnimatedBeam
              key={`track-${s.id}`}
              containerRef={containerRef}
              fromRef={nodeRefMap[s.from]}
              toRef={nodeRefMap[s.to]}
              startYOffset={s.startYOffset}
              endYOffset={s.endYOffset}
              pathColor="#94A3B8"
              pathWidth={BEAM_W}
              gradientOpacity={0}
              pathOpacity={0.1}
              showArrow={false}
              duration={1}
              delay={0}
              repeatDelay={9999}
            />
          ))}

          {/* ── Overview: staggered cycling beams ── */}
          {activeStep === 0 &&
            STEP_CONFIG.map((s, i) => (
              <AnimatedBeam
                key={`overview-${s.id}`}
                containerRef={containerRef}
                fromRef={nodeRefMap[s.from]}
                toRef={nodeRefMap[s.to]}
                startYOffset={s.startYOffset}
                endYOffset={s.endYOffset}
                gradientStartColor={s.gradStart}
                gradientStopColor={s.gradStop}
                pathColor={s.gradStop}
                pathWidth={BEAM_W}
                pathOpacity={0}
                delay={i * 2.2}
                duration={1.6}
                repeatDelay={STEP_CONFIG.length * 2.2 - 1.6}
                showArrow
              />
            ))}

          {/* ── Active step beam ── */}
          <AnimatePresence>
            {currentStep && (
              <AnimatedBeam
                key={`step-beam-${currentStep.id}`}
                containerRef={containerRef}
                fromRef={nodeRefMap[currentStep.from]}
                toRef={nodeRefMap[currentStep.to]}
                startYOffset={currentStep.startYOffset}
                endYOffset={currentStep.endYOffset}
                gradientStartColor={currentStep.gradStart}
                gradientStopColor={currentStep.gradStop}
                pathColor={currentStep.gradStop}
                pathWidth={BEAM_W}
                pathOpacity={0}
                delay={0}
                duration={1.4}
                repeatDelay={0.3}
                showArrow
              />
            )}
          </AnimatePresence>

          {/* ── Beam labels ── */}
          {BEAM_TAGS.map((bt) => (
            <BeamLabel
              key={bt.step}
              step={bt.step}
              label={bt.label}
              left={bt.left}
              top={bt.top}
              color={bt.color}
              rgb={bt.rgb}
              delay={bt.delay}
              isActive={activeStep === bt.step}
              isInactive={activeStep !== 0 && activeStep !== bt.step}
            />
          ))}

          {/* ── Step nav ── */}
          <StepNavBar
            compact
            activeStep={activeStep}
            steps={[...STEP_CONFIG]}
            onAdvance={advance}
            onRetreat={retreat}
            onJump={setActiveStep}
          />
        </div>

        {/* ── Right: all steps always visible ──────────────────────────── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 7,
            minHeight: 0,
          }}
        >
          {STEP_DETAILS.map((sd, i) => {
            const isActive = activeStep === sd.id;
            const isDimmed = activeStep !== 0 && !isActive;
            return (
              <motion.div
                key={sd.id}
                {...fadeInUp(0.16 + i * 0.08, {
                  distance: 12,
                  duration: DURATION.base,
                })}
                animate={{
                  opacity: isDimmed ? 0.55 : 1,
                  scale: isActive ? 1.012 : 1,
                }}
                transition={{ duration: 0.22 }}
                onClick={() => setActiveStep(isActive ? 0 : sd.id)}
                style={{
                  flex: isActive ? 1.6 : 1,
                  borderRadius: 14,
                  border: isActive
                    ? `1.5px solid rgba(${sd.rgb},0.45)`
                    : `1px solid rgba(${sd.rgb},0.18)`,
                  background: isActive
                    ? `linear-gradient(135deg, rgba(${sd.rgb},0.1) 0%, rgba(${sd.rgb},0.04) 100%)`
                    : "rgba(250,250,252,0.8)",
                  boxShadow: isActive
                    ? `0 0 0 4px rgba(${sd.rgb},0.1), 0 6px 20px rgba(${sd.rgb},0.18)`
                    : "0 2px 8px rgba(0,0,0,0.04)",
                  padding: "10px 14px",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  cursor: "pointer",
                  transition: "flex 0.3s ease",
                }}
              >
                {/* Left accent bar */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: isActive ? 3 : 2,
                    background: isActive ? sd.color : `rgba(${sd.rgb},0.35)`,
                    borderRadius: "14px 0 0 14px",
                    transition: "width 0.2s ease",
                  }}
                />

                {/* Header row: badge + title + tags */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    paddingLeft: 6,
                  }}
                >
                  {/* Step badge */}
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 999,
                      background: isActive ? sd.color : `rgba(${sd.rgb},0.15)`,
                      color: isActive ? "#fff" : sd.color,
                      fontSize: 12,
                      fontWeight: 900,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: isActive
                        ? `0 0 8px rgba(${sd.rgb},0.5)`
                        : undefined,
                    }}
                  >
                    {sd.id}
                  </div>

                  {/* Title + subtitle */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 800,
                        color: isActive ? "#111827" : "#374151",
                        lineHeight: 1.2,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {sd.title}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: isActive ? sd.color : "#9CA3AF",
                        fontWeight: 600,
                        marginTop: 1,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {sd.subtitle}
                    </div>
                  </div>

                  {/* Tags */}
                  <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                    {sd.tags.map((tag) => (
                      <div
                        key={tag}
                        style={{
                          padding: "2px 7px",
                          borderRadius: 6,
                          background: `rgba(${sd.rgb},${isActive ? 0.12 : 0.07})`,
                          border: `1px solid rgba(${sd.rgb},${isActive ? 0.3 : 0.18})`,
                          fontSize: 10.5,
                          fontWeight: 800,
                          color: isActive ? sd.color : `rgba(${sd.rgb},0.8)`,
                          fontFamily: "monospace",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Thai description — always visible */}
                <div
                  style={{
                    paddingLeft: 6,
                    flex: 1,
                    minHeight: 0,
                  }}
                >
                  <div
                    style={{
                      fontSize: 15,
                      color: isActive ? "#374151" : "#6B7280",
                      lineHeight: 1.6,
                      padding: "8px 13px",
                      borderRadius: 9,
                      background: isActive
                        ? "rgba(255,255,255,0.7)"
                        : "rgba(255,255,255,0.45)",
                      border: `1px solid rgba(${sd.rgb},${isActive ? 0.14 : 0.08})`,
                      height: "100%",
                      overflow: "hidden",
                    }}
                  >
                    <ThaiText>{sd.thai}</ThaiText>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SlideShell>
  );
}
