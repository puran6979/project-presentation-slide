import { motion } from "framer-motion";
import type { ReactElement } from "react";
import {
  AIEngineIcon,
  BackendIcon,
  EmbeddingIcon,
  FrontendIcon,
  IngestionIcon,
  Pill,
  SlideHeader,
  SlideShell,
  StorageIcon,
  WebhookIcon,
  IconTile,
} from "../components/index.ts";
import { DISTANCE, DURATION, fadeInLeft, stagger } from "../lib/motion.ts";

const GLOWS = [
  { top: -200, right: -120, size: 680, color: "124,58,237", opacity: 0.1 },
  { bottom: -160, left: -80, size: 540, color: "6,182,212", opacity: 0.08 },
];

const SERVICES: {
  name: string;
  desc: string;
  tech: string[];
  color: string;
  rgb: string;
  Icon: () => ReactElement;
}[] = [
  {
    name: "Frontend Application",
    desc: "Real-time Chat Interface, Citation display, Document Upload",
    tech: ["Next.js", "React", "Tailwind"],
    color: "#06B6D4",
    rgb: "6,182,212",
    Icon: FrontendIcon,
  },
  {
    name: "Backend Orchestrator",
    desc: "Session management, request routing, SSE progress streaming",
    tech: ["NestJS", "TypeScript"],
    color: "#7C3AED",
    rgb: "124,58,237",
    Icon: BackendIcon,
  },
  {
    name: "AI Engine",
    desc: "Multi-agent ReAct reasoning with HyDE query expansion and MCP tools",
    tech: ["Python", "CrewAI"],
    color: "#EC4899",
    rgb: "236,72,153",
    Icon: AIEngineIcon,
  },
  {
    name: "Embedding Service",
    desc: "Text-to-vector (BGE-M3), cosine similarity search, sole Qdrant manager",
    tech: ["Python", "Qdrant"],
    color: "#3B82F6",
    rgb: "59,130,246",
    Icon: EmbeddingIcon,
  },
  {
    name: "Data Ingestion Service",
    desc: "ETL pipeline — Docling structural extraction, HybridChunker, RabbitMQ worker",
    tech: ["Python", "RabbitMQ", "Docling"],
    color: "#F59E0B",
    rgb: "245,158,11",
    Icon: IngestionIcon,
  },
  {
    name: "File Storage Service",
    desc: "Object storage intermediary (MinIO/S3), presigned URLs, event notifications",
    tech: ["Python", "MinIO/S3"],
    color: "#10B981",
    rgb: "16,185,129",
    Icon: StorageIcon,
  },
  {
    name: "SharePoint Webhook",
    desc: "Listens for file-change triggers from SharePoint, commands ingestion via queue",
    tech: ["Python", "Graph API"],
    color: "#EF4444",
    rgb: "239,68,68",
    Icon: WebhookIcon,
  },
];

const LEFT = SERVICES.slice(0, 4);
const RIGHT = SERVICES.slice(4);

function ServiceRow({
  svc,
  delay,
  last = false,
}: {
  svc: (typeof SERVICES)[number];
  delay: number;
  last?: boolean;
}) {
  return (
    <motion.div
      {...fadeInLeft(delay, { distance: DISTANCE.sm, duration: DURATION.med })}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottom: last ? "none" : "1px solid rgba(0,0,0,0.06)",
        minHeight: 0,
      }}
    >
      {/* Icon */}
      <IconTile
        rgb={svc.rgb}
        size={46}
        radius={12}
        bgOpacity={0.12}
        borderOpacity={0.25}
        style={{
          background: `linear-gradient(135deg, rgba(${svc.rgb},0.2), rgba(${svc.rgb},0.08))`,
        }}
      >
        <svc.Icon />
      </IconTile>

      {/* Name + description */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: "var(--slide-card-heading)",
            fontWeight: 800,
            color: "#0A0A0A",
            lineHeight: 1.2,
            marginBottom: 3,
          }}
        >
          {svc.name}
        </div>
        <p
          style={{
            fontSize: "var(--slide-body)",
            color: "#6B7280",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {svc.desc}
        </p>
      </div>

      {/* Tech pills */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 5,
          justifyContent: "flex-end",
          flexShrink: 0,
          maxWidth: 160,
        }}
      >
        {svc.tech.map((t) => (
          <Pill
            key={t}
            color={svc.color}
            rgb={svc.rgb}
            fontSize={10}
            padding="2px 8px"
            uppercase={false}
          >
            {t}
          </Pill>
        ))}
      </div>
    </motion.div>
  );
}

export function Slide14() {
  return (
    <SlideShell glows={GLOWS}>
      <SlideHeader
        label="Aingo"
        title="Services"
        highlight="Breakdown."
        tagline="7 decoupled microservices — each with a single responsibility"
        marginBottom={20}
      />

      <div style={{ flex: 1, display: "flex", gap: 32, minHeight: 0 }}>
        {/* Left column — services 1–4 */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          {LEFT.map((svc, i) => (
            <ServiceRow
              key={svc.name}
              svc={svc}
              delay={stagger(0.28, 0.09, i)}
              last={i === LEFT.length - 1}
            />
          ))}
        </div>

        {/* Divider */}
        <div
          style={{ width: 1, background: "rgba(0,0,0,0.07)", flexShrink: 0 }}
        />

        {/* Right column — services 5–7 */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          {RIGHT.map((svc, i) => (
            <ServiceRow
              key={svc.name}
              svc={svc}
              delay={stagger(0.28, 0.09, i + 4)}
              last={i === RIGHT.length - 1}
            />
          ))}
        </div>
      </div>
    </SlideShell>
  );
}
