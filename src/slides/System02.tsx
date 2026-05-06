import { motion } from "framer-motion";
import { useRef } from "react";
import {
  SlideHeader,
  SlideShell,
  AnimatedBeam,
  IconBadge,
} from "../components/index.ts";
import { DISTANCE, DURATION, fadeInUp, EASE } from "../lib/motion.ts";

const GLOWS = [
  { top: -200, right: -100, size: 640, color: "124,58,237", opacity: 0.08 },
  { bottom: -150, left: -80, size: 500, color: "16,185,129", opacity: 0.07 },
];

function SVGWrap({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

const FrontendIcon = () => (
  <SVGWrap>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </SVGWrap>
);
const WebhookIcon = () => (
  <SVGWrap>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </SVGWrap>
);
const StorageIcon = () => (
  <SVGWrap>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </SVGWrap>
);
const MqIcon = () => (
  <SVGWrap>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 10h8" />
    <path d="M8 14h4" />
  </SVGWrap>
);
const IngestIcon = () => (
  <SVGWrap>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </SVGWrap>
);
const EmbeddingIcon = () => (
  <SVGWrap>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </SVGWrap>
);
const AiIcon = () => (
  <SVGWrap>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </SVGWrap>
);
const SharepointIcon = () => (
  <SVGWrap>
    <path d="M4 4h16v16H4z" />
    <circle cx="12" cy="12" r="4" />
  </SVGWrap>
);
const S3Icon = () => (
  <SVGWrap>
    <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
    <path d="M2 12h20" />
    <path d="M12 2v20" />
  </SVGWrap>
);
const QdrantIcon = () => (
  <SVGWrap>
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </SVGWrap>
);

const NS = {
  frontend: {
    color: "#D946EF",
    rgb: "217,70,239",
    grad: ["#C084FC", "#E879F9"] as [string, string],
    label: "Frontend | Backend",
    icon: FrontendIcon,
  },
  webhook: {
    color: "#F87171",
    rgb: "248,113,113",
    grad: ["#F87171", "#FCA5A5"] as [string, string],
    label: "SharePoint Webhook",
    icon: WebhookIcon,
  },
  storage: {
    color: "#818CF8",
    rgb: "129,140,248",
    grad: ["#818CF8", "#A5B4FC"] as [string, string],
    label: "File Storage Service",
    icon: StorageIcon,
  },
  mq: {
    color: "#FB7185",
    rgb: "251,113,133",
    grad: ["#FB7185", "#FDA4AF"] as [string, string],
    label: "Message Queues",
    icon: MqIcon,
  },
  ingestion: {
    color: "#34D399",
    rgb: "52,211,153",
    grad: ["#34D399", "#6EE7B7"] as [string, string],
    label: "Data Ingestion Service",
    icon: IngestIcon,
  },
  embedding: {
    color: "#FBBF24",
    rgb: "251,191,36",
    grad: ["#FBBF24", "#FCD34D"] as [string, string],
    label: "Embedding Service",
    icon: EmbeddingIcon,
  },
  ai: {
    color: "#38BDF8",
    rgb: "56,189,248",
    grad: ["#38BDF8", "#F472B6"] as [string, string],
    label: "Search Flow Service",
    icon: AiIcon,
  },
  sharepoint: {
    color: "#2DD4BF",
    rgb: "45,212,191",
    grad: ["#2DD4BF", "#5EEAD4"] as [string, string],
    label: "SharePoint",
    icon: SharepointIcon,
  },
  s3: {
    color: "#38BDF8",
    rgb: "56,189,248",
    grad: ["#38BDF8", "#7DD3FC"] as [string, string],
    label: "Internal S3 Storage",
    icon: S3Icon,
  },
  qdrant: {
    color: "#A3E635",
    rgb: "163,230,53",
    grad: ["#A3E635", "#BEF264"] as [string, string],
    label: "Vector Database",
    icon: QdrantIcon,
  },
};

function FlowNode({
  id,
  anchorRef,
  delay = 0,
}: {
  id: keyof typeof NS;
  anchorRef: React.RefObject<HTMLDivElement | null>;
  delay?: number;
}) {
  const s = NS[id];
  const Icon = s.icon;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{
        scale: 1.05,
        y: -4,
        boxShadow: `0 16px 40px rgba(${s.rgb},0.4)`,
        zIndex: 20,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 },
      }}
      transition={{
        duration: 0.2, // Default fast return for unhover
        opacity: { delay, duration: DURATION.med, ease: EASE }, // Initial entrance
      }}
      style={{
        width: 188,
        height: 188,
        borderRadius: 34,
        border: `1.5px solid rgba(${s.rgb},0.25)`,
        background: `linear-gradient(135deg, rgba(255,255,255,1), rgba(250,250,250,0.9))`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        boxShadow: `0 8px 24px rgba(${s.rgb},0.12)`,
        flexShrink: 0,
        position: "relative",
        zIndex: 10,
        cursor: "pointer",
      }}
    >
      <div ref={anchorRef}>
        <IconBadge
          gradient={s.grad}
          shadow={`rgba(${s.rgb},0.4)`}
          size={72}
          radius={20}
        >
          <Icon />
        </IconBadge>
      </div>
      <div style={{ textAlign: "center", paddingLeft: 8, paddingRight: 8 }}>
        <div
          style={{
            fontSize: 15,
            fontWeight: 800,
            color: s.color,
            lineHeight: 1.2,
          }}
        >
          {s.label}
        </div>
      </div>
    </motion.div>
  );
}

function GridBeam({
  fromRef,
  toRef,
  delay,
  gradientStartColor = "#3B82F6",
  gradientStopColor = "#8B5CF6",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
  containerRef,
}: {
  fromRef: React.RefObject<HTMLDivElement | null>;
  toRef: React.RefObject<HTMLDivElement | null>;
  delay: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <AnimatedBeam
      containerRef={containerRef}
      fromRef={fromRef}
      toRef={toRef}
      curvature={0}
      startXOffset={startXOffset}
      startYOffset={startYOffset}
      endXOffset={endXOffset}
      endYOffset={endYOffset}
      gradientStartColor={gradientStartColor}
      gradientStopColor={gradientStopColor}
      pathColor={gradientStartColor}
      pathOpacity={0.25}
      gradientOpacity={0.9}
      pathWidth={3}
      duration={2.8}
      delay={delay}
      repeatDelay={3}
      arrowColor={gradientStartColor}
      showArrow
    />
  );
}

export function System02() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frontendRef = useRef<HTMLDivElement>(null);
  const webhookRef = useRef<HTMLDivElement>(null);
  const storageRef = useRef<HTMLDivElement>(null);
  const mqRef = useRef<HTMLDivElement>(null);
  const ingestRef = useRef<HTMLDivElement>(null);
  const embedRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const sharepointRef = useRef<HTMLDivElement>(null);
  const s3Ref = useRef<HTMLDivElement>(null);
  const qdrantRef = useRef<HTMLDivElement>(null);

  return (
    <SlideShell glows={GLOWS}>
      <SlideHeader
        label="Aingo"
        title="Solution"
        highlight="Overview."
        titleSize={64}
        paddingBottom={10}
      />

      <motion.div
        {...fadeInUp(0.2, { distance: DISTANCE.sm, duration: DURATION.med })}
        ref={containerRef}
        style={{
          flex: 1,
          width: "100%",
          position: "relative",
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          gap: "24px 16px",
          padding: "10px 0 30px",
          alignItems: "center",
          justifyItems: "center",
          isolation: "isolate",
        }}
      >
        {/* Bounding Boxes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          style={{
            gridColumn: "1 / span 6",
            gridRow: 2,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(90deg, rgba(254,243,199,0.3), rgba(254,226,226,0.3))",
            borderRadius: 24,
            border: "1px solid rgba(245,158,11,0.2)",
            position: "relative",
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -18,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: 10,
              fontWeight: 800,
              color: "#D97706",
            }}
          >
            Service Layer
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            gridColumn: "1 / span 5",
            gridRow: 3,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(90deg, rgba(204,251,241,0.4), rgba(220,252,231,0.4))",
            borderRadius: 24,
            border: "1px solid rgba(16,185,129,0.2)",
            position: "relative",
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: -18,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: 10,
              fontWeight: 800,
              color: "#059669",
            }}
          >
            Storage Layer
          </div>
        </motion.div>

        {/* Row 1 */}
        <div style={{ gridColumn: 6, gridRow: 1, zIndex: 10 }}>
          <FlowNode id="frontend" anchorRef={frontendRef} delay={0.3} />
        </div>

        {/* Row 2 */}
        <div style={{ gridColumn: 1, gridRow: 2, zIndex: 10 }}>
          <FlowNode id="webhook" anchorRef={webhookRef} delay={0.4} />
        </div>
        <div style={{ gridColumn: 2, gridRow: 2, zIndex: 10 }}>
          <FlowNode id="storage" anchorRef={storageRef} delay={0.5} />
        </div>
        <div style={{ gridColumn: 3, gridRow: 2, zIndex: 10 }}>
          <FlowNode id="mq" anchorRef={mqRef} delay={0.6} />
        </div>
        <div style={{ gridColumn: 4, gridRow: 2, zIndex: 10 }}>
          <FlowNode id="ingestion" anchorRef={ingestRef} delay={0.7} />
        </div>
        <div style={{ gridColumn: 5, gridRow: 2, zIndex: 10 }}>
          <FlowNode id="embedding" anchorRef={embedRef} delay={0.8} />
        </div>
        <div style={{ gridColumn: 6, gridRow: 2, zIndex: 10 }}>
          <FlowNode id="ai" anchorRef={aiRef} delay={0.9} />
        </div>

        {/* Row 3 */}
        <div style={{ gridColumn: 1, gridRow: 3, zIndex: 10 }}>
          <FlowNode id="sharepoint" anchorRef={sharepointRef} delay={0.45} />
        </div>
        <div style={{ gridColumn: 3, gridRow: 3, zIndex: 10 }}>
          <FlowNode id="s3" anchorRef={s3Ref} delay={0.65} />
        </div>
        <div style={{ gridColumn: 5, gridRow: 3, zIndex: 10 }}>
          <FlowNode id="qdrant" anchorRef={qdrantRef} delay={0.85} />
        </div>

        {/* Beams */}
        <GridBeam
          containerRef={containerRef}
          fromRef={sharepointRef}
          toRef={webhookRef}
          gradientStartColor={NS.sharepoint.color}
          gradientStopColor={NS.webhook.color}
          delay={1.0}
        />
        <GridBeam
          containerRef={containerRef}
          fromRef={webhookRef}
          toRef={storageRef}
          gradientStartColor={NS.webhook.color}
          gradientStopColor={NS.storage.color}
          delay={1.2}
        />
        <GridBeam
          containerRef={containerRef}
          fromRef={storageRef}
          toRef={mqRef}
          gradientStartColor={NS.storage.color}
          gradientStopColor={NS.mq.color}
          delay={1.4}
        />
        <GridBeam
          containerRef={containerRef}
          fromRef={mqRef}
          toRef={ingestRef}
          gradientStartColor={NS.mq.color}
          gradientStopColor={NS.ingestion.color}
          delay={1.6}
        />
        <GridBeam
          containerRef={containerRef}
          fromRef={ingestRef}
          toRef={embedRef}
          gradientStartColor={NS.ingestion.color}
          gradientStopColor={NS.embedding.color}
          delay={1.8}
        />

        {/* Diagonals */}
        <GridBeam
          containerRef={containerRef}
          fromRef={storageRef}
          toRef={s3Ref}
          gradientStartColor={NS.storage.color}
          gradientStopColor={NS.s3.color}
          delay={2.0}
        />
        <GridBeam
          containerRef={containerRef}
          fromRef={s3Ref}
          toRef={ingestRef}
          gradientStartColor={NS.s3.color}
          gradientStopColor={NS.ingestion.color}
          delay={2.2}
        />

        {/* Bidirectional Beams */}
        <GridBeam
          containerRef={containerRef}
          fromRef={embedRef}
          toRef={aiRef}
          gradientStartColor={NS.embedding.color}
          gradientStopColor={NS.ai.color}
          delay={2.4}
          startYOffset={-16}
          endYOffset={-16}
        />
        <GridBeam
          containerRef={containerRef}
          fromRef={aiRef}
          toRef={embedRef}
          gradientStartColor={NS.ai.color}
          gradientStopColor={NS.embedding.color}
          delay={2.6}
          startYOffset={16}
          endYOffset={16}
        />

        <GridBeam
          containerRef={containerRef}
          fromRef={aiRef}
          toRef={frontendRef}
          gradientStartColor={NS.ai.color}
          gradientStopColor={NS.frontend.color}
          delay={2.8}
          startXOffset={-16}
          endXOffset={-16}
        />
        <GridBeam
          containerRef={containerRef}
          fromRef={frontendRef}
          toRef={aiRef}
          gradientStartColor={NS.frontend.color}
          gradientStopColor={NS.ai.color}
          delay={3.0}
          startXOffset={16}
          endXOffset={16}
        />

        <GridBeam
          containerRef={containerRef}
          fromRef={embedRef}
          toRef={qdrantRef}
          gradientStartColor={NS.embedding.color}
          gradientStopColor={NS.qdrant.color}
          delay={3.2}
          startXOffset={-16}
          endXOffset={-16}
        />
        <GridBeam
          containerRef={containerRef}
          fromRef={qdrantRef}
          toRef={embedRef}
          gradientStartColor={NS.qdrant.color}
          gradientStopColor={NS.embedding.color}
          delay={3.4}
          startXOffset={16}
          endXOffset={16}
        />
      </motion.div>
    </SlideShell>
  );
}
