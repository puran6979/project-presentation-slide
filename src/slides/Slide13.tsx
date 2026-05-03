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
  ThaiText,
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
    desc: "หน้าจอแชทแบบเรียลไทม์ การแสดงผลแหล่งอ้างอิง และระบบอัปโหลดเอกสาร",
    tech: ["Next.js", "React", "Tailwind"],
    color: "#06B6D4",
    rgb: "6,182,212",
    Icon: FrontendIcon,
  },
  {
    name: "Backend Orchestrator",
    desc: "ระบบจัดการเซสชัน กำหนดเส้นทางคำขอ และสตรีมความคืบหน้าแบบ SSE",
    tech: ["NestJS", "TypeScript"],
    color: "#7C3AED",
    rgb: "124,58,237",
    Icon: BackendIcon,
  },
  {
    name: "AI Engine",
    desc: "การให้เหตุผลแบบ Multi-agent ReAct ผสานการขยายคำค้นด้วย HyDE และชุดเครื่องมือ MCP",
    tech: ["Python", "CrewAI"],
    color: "#EC4899",
    rgb: "236,72,153",
    Icon: AIEngineIcon,
  },
  {
    name: "Embedding Service",
    desc: "แปลงข้อความเป็นเวกเตอร์หลากภาษาด้วย BGE-M3 และสืบค้นผ่าน Qdrant",
    tech: ["Python", "Qdrant"],
    color: "#F59E0B",
    rgb: "245,158,11",
    Icon: EmbeddingIcon,
  },
  {
    name: "Data Ingestion Service",
    desc: "จำแนกประเภทข้อมูล สกัดโครงสร้างด้วย Docling และจัดการแบ่งข้อมูลด้วย HybridChunker",
    tech: ["Docling", "RabbitMQ"],
    color: "#10B981",
    rgb: "16,185,129",
    Icon: IngestionIcon,
  },
  {
    name: "File Storage Service",
    desc: "ตัวกลางจัดเก็บไฟล์ด้วย MinIO/S3 และสร้าง Presigned URL เพื่อการเข้าถึง",
    tech: ["MinIO/S3"],
    color: "#3B82F6",
    rgb: "59,130,246",
    Icon: StorageIcon,
  },
  {
    name: "SharePoint Webhook",
    desc: "ดักจับเหตุการณ์การเปลี่ยนแปลงไฟล์เพื่อสั่งงานผ่านคิวข้อความ RabbitMQ",
    tech: ["Graph API"],
    color: "#6366F1",
    rgb: "99,102,241",
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
        <p style={{ margin: 0, fontSize: 17, color: "#6B7280", lineHeight: 1.5, position: "relative", zIndex: 1, paddingRight: 20 }}>
          <ThaiText>{svc.desc}</ThaiText>
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

export function Slide13() {
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
