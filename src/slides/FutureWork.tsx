import { motion } from "framer-motion";
import {
  SlideShell,
  SlideHeader,
  Pill,
  GradientText,
  ThaiText,
} from "../components/index.ts";
import { fadeInUp, fadeIn, stagger, DURATION } from "../lib/motion.ts";

/* ── SVG Icons ── */
function PipelineIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
function ChartIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}
function GearIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

const ACHIEVEMENTS = [
  {
    Icon: PipelineIcon,
    title: "Robust Ingestion Pipeline",
    desc: "ระบบ HybridChunker + Docling ช่วยให้การสกัดข้อมูลรักษาโครงสร้างดั้งเดิมไว้ได้ ช่วยลดการแตกกระจายของบริบทข้อมูลได้อย่างมาก",
    color: "#10B981",
    rgb: "16,185,129",
  },
  {
    Icon: ChartIcon,
    title: "Validated Performance",
    desc: "ความเที่ยงตรง 77% ความสำเร็จของงาน 97% ความถูกต้องของเครื่องมือ 99% — มีประสิทธิภาพเหนือกว่า RAG พื้นฐาน",
    color: "#7C3AED",
    rgb: "124,58,237",
  },
  {
    Icon: GearIcon,
    title: "Production-Grade Architecture",
    desc: "สถาปัตยกรรม Microservices ทั้ง 7 ระบบพร้อมระบบยืนยันตัวตน JWT, การสตรีมแบบ SSE, ซิงก์ผ่าน RabbitMQ และรองรับหลายภาษาด้วย BGE-M3",
    color: "#3B82F6",
    rgb: "59,130,246",
  },
];

const FUTURE_WORK = [
  { title: "Neo4j Graph-Vector Hybrid Retrieval", desc: "เพิ่มการสืบค้นโครงข่ายความสัมพันธ์เพื่อใช้งานร่วมกับความคล้ายคลึงของความหมาย ยกระดับการค้นพบองค์ความรู้ภายในองค์กร", color: "#8B5CF6", rgb: "139,92,246" },
  { title: "Full Azure AD SSO Integration", desc: "ทำระบบ Single Sign-On แบบ OIDC ผ่าน Passport-Azure-AD ให้สมบูรณ์ (ออกแบบสถาปัตยกรรมไว้แล้วรอการติดตั้ง)", color: "#3B82F6", rgb: "59,130,246" },
  { title: "AI Guardrails Layer", desc: "ป้องกันการถูกโจมตีด้วย Prompt Injection และตัวกรองคัดกรองคำตอบที่ไม่เหมาะสม", color: "#F59E0B", rgb: "245,158,11" },
  { title: "Multi-channel Integration", desc: "เชื่อมต่อกับแอปพลิเคชันสนทนา เช่น LINE หรือ Microsoft Teams", color: "#10B981", rgb: "16,185,129" },
];

const LIMITATIONS = [
  "กระบวนการ Multi-agent ReAct ทำให้ได้โทเคนแรกช้าลง (Time-to-first-token)",
  "การวางแผนแบบ Multi-agent เพิ่มต้นทุนการใช้โทเคนต่อหนึ่งคำถาม",
];

export function FutureWork() {
  return (
    <SlideShell glows={[{ top: -200, right: -100, size: 800, color: "124,58,237", opacity: 0.05 }, { bottom: -150, left: -80, size: 600, color: "16,185,129", opacity: 0.05 }]}>
      <SlideHeader
        label="Aingo"
        title="Conclusion &"
        highlight="Future Work."
        tagline="Intelligence That Drives Execution"
      />

      <div style={{ display: "flex", gap: 28, flex: 1, marginTop: 20 }}>

        {/* ── Left Column: Achievements ── */}
        <div style={{ flex: 1.1, display: "flex", flexDirection: "column", gap: 16 }}>
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={i}
              {...fadeInUp(stagger(0.28, 0.1, i), { distance: 16, duration: DURATION.med })}
              style={{
                background: "rgba(255,255,255,0.8)",
                borderRadius: 18,
                padding: "22px 24px",
                border: "1px solid rgba(0,0,0,0.05)",
                boxShadow: "0 6px 24px rgba(0,0,0,0.03)",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
              }}
            >
              {/* Left accent bar */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 4,
                bottom: 0,
                background: `linear-gradient(180deg, ${a.color}, ${a.color}44)`,
                borderRadius: "18px 0 0 18px",
              }} />

              {/* Icon */}
              <div style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: `rgba(${a.rgb}, 0.08)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginLeft: 8,
              }}>
                <a.Icon color={a.color} />
              </div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#111827", marginBottom: 6 }}>
                  {a.title}
                </div>
                <p style={{ margin: 0, fontSize: 18, color: "#6B7280", lineHeight: 1.6 }}>
                  <ThaiText>{a.desc}</ThaiText>
                </p>
              </div>
            </motion.div>
          ))}

          {/* Limitations (below achievements) */}
          <motion.div
            {...fadeInUp(0.6, { distance: 16, duration: DURATION.med })}
            style={{
              background: "linear-gradient(135deg, rgba(245,158,11,0.05) 0%, rgba(245,158,11,0.02) 100%)",
              borderRadius: 18,
              padding: "20px 24px",
              border: "1px solid rgba(245,158,11,0.15)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <Pill color="#F59E0B" rgb="245,158,11" fontSize={15} padding="5px 14px">
                Known Limitations
              </Pill>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {LIMITATIONS.map((lim, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#F59E0B",
                    marginTop: 8,
                    flexShrink: 0,
                  }} />
                  <div style={{ fontSize: 18, color: "#78716C", lineHeight: 1.6, fontWeight: 500 }}>
                    <ThaiText>{lim}</ThaiText>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Right Column: Future Work ── */}
        <motion.div
          {...fadeInUp(0.4, { distance: 20, duration: DURATION.slow })}
          style={{
            flex: 1.1,
            background: "linear-gradient(135deg, rgba(124,58,237,0.04) 0%, rgba(168,85,247,0.02) 100%)",
            borderRadius: 20,
            padding: "28px 32px",
            border: "1px solid rgba(124,58,237,0.12)",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 10px 40px rgba(124,58,237,0.05)",
          }}
        >
          <h3 style={{ margin: "0 0 24px 0", fontSize: 30, fontWeight: 800 }}>
            <GradientText from="#7C3AED" to="#EC4899">What's Next</GradientText>
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {FUTURE_WORK.map((fw, i) => (
              <motion.div
                key={i}
                {...fadeInUp(stagger(0.55, 0.1, i), { distance: 10, duration: DURATION.quick })}
                style={{ display: "flex", gap: 14, alignItems: "flex-start" }}
              >
                <div style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: fw.color,
                  flexShrink: 0,
                  marginTop: 7,
                  boxShadow: `0 0 10px rgba(${fw.rgb}, 0.4)`,
                }} />
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 4 }}>
                    {fw.title}
                  </div>
                  <div style={{ fontSize: 18, color: "#6B7280", lineHeight: 1.6 }}>
                    <ThaiText>{fw.desc}</ThaiText>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* ── Bottom Strip ── */}
      <motion.div
        {...fadeIn(0.8, { duration: DURATION.slow })}
        style={{
          marginTop: "auto",
          paddingTop: 20,
          textAlign: "center",
          fontSize: 14,
          color: "#9CA3AF",
          fontWeight: 600,
          letterSpacing: "0.05em",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 6,
        }}
      >
        Project <GradientText from="#7C3AED" to="#A855F7" style={{ fontWeight: 800 }}>AiQ</GradientText> · Intelligence That Drives Execution · Chulalongkorn University 2026
      </motion.div>

    </SlideShell>
  );
}
