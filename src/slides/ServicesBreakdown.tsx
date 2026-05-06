import { motion } from "framer-motion";
import type { ReactElement } from "react";
import {
  Pill,
  SlideHeader,
  SlideShell,
  IconBadge,
  ThaiText,
} from "../components/index.ts";
import { DISTANCE, DURATION, fadeInLeft, stagger } from "../lib/motion.ts";

const GLOWS = [
  { top: -200, right: -120, size: 680, color: "124,58,237", opacity: 0.1 },
  { bottom: -160, left: -80, size: 540, color: "6,182,212", opacity: 0.08 },
];

function SVGWrap({ children }: { children: React.ReactNode }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const FrontendIcon = () => <SVGWrap><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></SVGWrap>;
const WebhookIcon = () => <SVGWrap><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></SVGWrap>;
const StorageIcon = () => <SVGWrap><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></SVGWrap>;
const IngestIcon = () => <SVGWrap><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></SVGWrap>;
const EmbeddingIcon = () => <SVGWrap><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></SVGWrap>;
const AiIcon = () => <SVGWrap><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></SVGWrap>;

const SERVICES: {
  name: string;
  desc: string;
  tech: string[];
  color: string;
  rgb: string;
  grad: [string, string];
  Icon: () => ReactElement;
}[] = [
  {
    name: "Frontend Application",
    desc: "หน้าจอแชทแบบเรียลไทม์ การแสดงผลแหล่งอ้างอิง และระบบอัปโหลดเอกสาร",
    tech: ["Next.js", "React", "Tailwind"],
    color: "#D946EF",
    rgb: "217,70,239",
    grad: ["#C084FC", "#E879F9"],
    Icon: FrontendIcon,
  },
  {
    name: "Backend Orchestrator",
    desc: "ระบบจัดการเซสชัน กำหนดเส้นทางคำขอ และสตรีมความคืบหน้าแบบ SSE",
    tech: ["NestJS", "TypeScript"],
    color: "#D946EF",
    rgb: "217,70,239",
    grad: ["#C084FC", "#E879F9"],
    Icon: FrontendIcon,
  },
  {
    name: "Search Flow Service",
    desc: "การให้เหตุผลแบบ Multi-agent ReAct ผสานการขยายคำค้นด้วย HyDE และชุดเครื่องมือ MCP",
    tech: ["Python", "CrewAI"],
    color: "#38BDF8",
    rgb: "56,189,248",
    grad: ["#38BDF8", "#F472B6"],
    Icon: AiIcon,
  },
  {
    name: "Embedding Service",
    desc: "แปลงข้อความเป็นเวกเตอร์หลากภาษาด้วย BGE-M3 และสืบค้นผ่าน Qdrant",
    tech: ["Python", "Qdrant"],
    color: "#FBBF24",
    rgb: "251,191,36",
    grad: ["#FBBF24", "#FCD34D"],
    Icon: EmbeddingIcon,
  },
  {
    name: "Data Ingestion Service",
    desc: "จำแนกประเภทข้อมูล สกัดโครงสร้างด้วย Docling และจัดการแบ่งข้อมูลด้วย HybridChunker",
    tech: ["Docling", "RabbitMQ"],
    color: "#34D399",
    rgb: "52,211,153",
    grad: ["#34D399", "#6EE7B7"],
    Icon: IngestIcon,
  },
  {
    name: "File Storage Service",
    desc: "ตัวกลางจัดเก็บไฟล์ด้วย MinIO/S3 และสร้าง Presigned URL เพื่อการเข้าถึง",
    tech: ["MinIO/S3"],
    color: "#818CF8",
    rgb: "129,140,248",
    grad: ["#818CF8", "#A5B4FC"],
    Icon: StorageIcon,
  },
  {
    name: "SharePoint Webhook",
    desc: "ดักจับเหตุการณ์การเปลี่ยนแปลงไฟล์เพื่อสั่งงานผ่านคิวข้อความ RabbitMQ",
    tech: ["Graph API"],
    color: "#F87171",
    rgb: "248,113,113",
    grad: ["#F87171", "#FCA5A5"],
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
      {/* Icon Box */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 14,
          border: `1.5px solid rgba(${svc.rgb},0.25)`,
          background: `linear-gradient(135deg, rgba(255,255,255,1), rgba(250,250,250,0.9))`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 4px 16px rgba(${svc.rgb},0.12)`,
          flexShrink: 0,
        }}
      >
        <IconBadge
          gradient={svc.grad}
          shadow={`rgba(${svc.rgb},0.4)`}
          size={36}
          radius={10}
        >
          <svc.Icon />
        </IconBadge>
      </div>

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

export function ServicesBreakdown() {
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
