import { motion } from "framer-motion";
import {
  ChatUIIcon,
  DataIngestionIcon,
  EvaluationIcon,
  ImplementationIcon,
  ObjectiveColumnIcon,
  Pill,
  ResearchDesignIcon,
  ScopeColumnIcon,
  SectionTitle,
  SlideHeader,
  SlideShell,
  ThaiText,
  VerticalDivider,
  AISystemIcon,
} from "../components/index.ts";
import {
  DISTANCE,
  DURATION,
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  stagger,
} from "../lib/motion.ts";

const GLOWS = [
  { top: -260, right: -120, size: 720, color: "124,58,237", opacity: 0.11 },
  { bottom: -180, left: -80, size: 580, color: "16,185,129", opacity: 0.08 },
];

const OBJECTIVES = [
  {
    title: "Research & Design",
    th: "สืบค้นและออกแบบวิธีแก้ปัญหา เน้นไปที่ Data Ingestion Pipeline",
    icon: <ResearchDesignIcon />,
  },
  {
    title: "Evaluation",
    th: "กำหนดเมทริกเพื่อวัดคุณภาพของระบบ",
    icon: <EvaluationIcon />,
  },
  {
    title: "Implementation",
    th: "พัฒนาระบบที่มี Performance, Scalability และ Usability ที่เหมาะสม\nคำนึงความปลอดภัยพื้นฐาน",
    icon: <ImplementationIcon />,
  },
];

const SCOPES = [
  {
    title: "Data Ingestion",
    th: "โฟกัสแหล่งข้อมูล SharePoint (Xhive) และรองรับเอกสารเทคนิคภาษาไทยและภาษาอังกฤษเป็นหลัก",
    tag: "SharePoint · Xhive",
    tagRgb: "245,158,11",
    pillColor: "#F59E0B",
    icon: <DataIngestionIcon />,
  },
  {
    title: "AI System",
    th: "พัฒนาระบบ AI Agents และ Search Flow Service เพื่อการค้นหาและประมวลผลคำตอบ",
    tag: "Agents · Search Flow",
    tagRgb: "139,92,246",
    pillColor: "#8B5CF6",
    icon: <AISystemIcon />,
  },
  {
    title: "User Interface",
    th: "พัฒนา Minimal Web Chat MVP พร้อมฟังก์ชันถาม-ตอบ",
    tag: "Web Chat · MVP",
    tagRgb: "6,182,212",
    pillColor: "#06B6D4",
    icon: <ChatUIIcon />,
  },
];

export function Approach02() {
  return (
    <SlideShell glows={GLOWS}>
      <SlideHeader
        label="Aingo"
        title="Objective"
        highlight="& Scope."
        tagline="What we aim to build and where we draw the line"
        marginBottom={28}
      />

      <div style={{ flex: 1, display: "flex", gap: 28, minHeight: 0 }}>
        {/* ── Left: Objective ── */}
        <motion.div
          {...fadeInLeft(0.28)}
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 30 }}
        >
          <SectionTitle
            icon={<ObjectiveColumnIcon />}
            sub={<ThaiText>เป้าหมายของโปรเจค</ThaiText>}
            style={{ marginBottom: 6 }}
          >
            Objective
          </SectionTitle>

          {OBJECTIVES.map((item, i) => (
            <motion.div
              key={item.title}
              {...fadeInUp(stagger(0.38, 0.1, i), {
                distance: DISTANCE.sm,
                duration: DURATION.short,
              })}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                padding: "10px 4px",
                minHeight: 100,
              }}
            >
              {item.icon}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "var(--slide-card-heading)",
                    fontWeight: 800,
                    color: "#0A0A0A",
                    marginBottom: 5,
                  }}
                >
                  {item.title}
                </div>
                <p
                  style={{
                    fontSize: "var(--slide-body)",
                    color: "#6B7280",
                    margin: 0,
                    lineHeight: 1.6,
                    whiteSpace: "pre-line",
                  }}
                >
                  <ThaiText>{item.th}</ThaiText>
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <VerticalDivider />

        {/* ── Right: Scope ── */}
        <motion.div
          {...fadeInRight(0.34)}
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 30 }}
        >
          <SectionTitle
            icon={<ScopeColumnIcon />}
            sub={<ThaiText>ขอบเขตของโปรเจค</ThaiText>}
            style={{ marginBottom: 6 }}
          >
            Scope
          </SectionTitle>

          {SCOPES.map((item, i) => (
            <motion.div
              key={item.title}
              {...fadeInUp(stagger(0.44, 0.1, i), {
                distance: DISTANCE.sm,
                duration: DURATION.short,
              })}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                padding: "10px 4px",
                minHeight: 100,
              }}
            >
              {item.icon}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 5,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: "var(--slide-card-heading)",
                      fontWeight: 800,
                      color: "#0A0A0A",
                    }}
                  >
                    {item.title}
                  </span>
                  <Pill
                    color={item.pillColor}
                    rgb={item.tagRgb}
                    fontSize={10}
                    letterSpacing="0.06em"
                    padding="2px 8px"
                    uppercase={false}
                  >
                    {item.tag}
                  </Pill>
                </div>
                <p
                  style={{
                    fontSize: "var(--slide-body)",
                    color: "#6B7280",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  <ThaiText>{item.th}</ThaiText>
                </p>
              </div>
            </motion.div>
          ))}

          <div style={{ flex: 1 }} />
        </motion.div>
      </div>
    </SlideShell>
  );
}
