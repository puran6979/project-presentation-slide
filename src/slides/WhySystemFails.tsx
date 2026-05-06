import { motion } from "framer-motion";
import {
  BigGhostNumber,
  Callout,
  Pill,
  SlideHeader,
  SlideShell,
  ThaiText,
  VerticalDivider,
} from "../components/index.ts";
import {
  DISTANCE,
  DURATION,
  fadeInLeft,
  fadeInRight,
  stagger,
} from "../lib/motion.ts";
import messyBox from "../assets/images/problems/messy-box.png";

const GLOWS = [
  { top: -300, right: -160, size: 800, color: "124,58,237", opacity: 0.13 },
  { bottom: -200, left: -80, size: 640, color: "239,68,68", opacity: 0.07 },
];

const GAPS = [
  {
    num: "01",
    en: "The Ingestion Gap",
    th: "ข้อมูลไม่เป็นระเบียบ",
    desc: "ขาด data pipeline ที่ดีพอจะจัดการกับ Messy Data จากแหล่งข้อมูลองค์กร ส่งผลต่อความแม่นยำของ RAG",
    accent: "#EF4444",
    accentRgb: "239,68,68",
  },
  {
    num: "02",
    en: "The Contextual Gap",
    th: "การแตกส่วนของบริบท",
    desc: "Generic RAG ใช้การแบ่งแบบ Naive Chunking ไม่สนใจโครงสร้างและความหมายของเอกสาร",
    accent: "#F59E0B",
    accentRgb: "245,158,11",
  },
  {
    num: "03",
    en: "The Synchronization Gap",
    th: "ไม่มีการติดตามการเปลี่ยนแปลง",
    desc: "RAG ทั่วไปมองฐานความรู้เป็น Static Dataset ขาด Event-driven architecture ทำให้ข้อมูลไม่อัปเดท",
    accent: "#7C3AED",
    accentRgb: "124,58,237",
  },
];

export function WhySystemFails() {
  return (
    <SlideShell glows={GLOWS}>
      <SlideHeader
        label="Aingo"
        title="Why Existing"
        highlight="System Fails."
        tagline="The Core Technical Challenge"
        marginBottom={28}
      />

      {/* ── Body: 2-col asymmetric ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          gap: 48,
          minHeight: 0,
          alignItems: "stretch",
        }}
      >
        {/* Left: numbered gap rows */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {GAPS.map((gap, i) => (
            <motion.div
              key={gap.num}
              {...fadeInLeft(stagger(0.35, 0.12, i), {
                distance: DISTANCE.lg,
                duration: DURATION.base,
              })}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 24,
                borderBottom:
                  i < GAPS.length - 1 ? "1px solid #F3F4F6" : "none",
              }}
            >
              <BigGhostNumber rgb={gap.accentRgb} width={68}>
                {gap.num}
              </BigGhostNumber>

              {/* Accent bar */}
              <div
                style={{
                  width: 3,
                  height: 44,
                  borderRadius: 4,
                  background: gap.accent,
                  flexShrink: 0,
                  opacity: 0.85,
                }}
              />

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 10,
                    marginBottom: 6,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: "var(--slide-card-heading)",
                      fontWeight: 800,
                      color: "#0A0A0A",
                      letterSpacing: "-0.4px",
                    }}
                  >
                    <ThaiText>{gap.th}</ThaiText>
                  </span>
                  <Pill color={gap.accent} rgb={gap.accentRgb} padding="2px 9px">
                    {gap.en}
                  </Pill>
                </div>
                <p
                  style={{
                    fontSize: "var(--slide-body)",
                    color: "#6B7280",
                    margin: 0,
                    lineHeight: 1.65,
                  }}
                >
                  <ThaiText>{gap.desc}</ThaiText>
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <VerticalDivider />

        {/* Right: image card */}
        <motion.div
          {...fadeInRight(0.28, { distance: 24, duration: DURATION.slow })}
          style={{
            width: "30%",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {/* Messy Data Scatter / Particle Stream */}
          <div
            style={{
              position: "relative",
              flex: 1,
              minHeight: 0,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {/* Chaos background grid lines */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }}>
              {[0,1,2,3,4].map(i => (
                <line key={`h${i}`} x1="0" y1={`${i*25}%`} x2="100%" y2={`${i*25}%`} stroke="#7C3AED" strokeWidth="1" strokeDasharray="4 6"/>
              ))}
              {[0,1,2,3,4].map(i => (
                <line key={`v${i}`} x1={`${i*25}%`} y1="0" x2={`${i*25}%`} y2="100%" stroke="#7C3AED" strokeWidth="1" strokeDasharray="4 6"/>
              ))}
            </svg>

            {/* Particle items (flying out from behind) */}
            {[
              { label: "spec_v1.docx",      icon: "📄", left: "10%", delay: 0.0, dur: 4.5, xOff: -40, color: "#3B82F6" },
              { label: "SharePoint",         icon: "🔗", left: "40%", delay: 1.2, dur: 5.2, xOff: 20,  color: "#0EA5E9" },
              { label: "project_2023.xlsx",  icon: "📊", left: "25%", delay: 0.5, dur: 4.8, xOff: -10, color: "#10B981" },
              { label: "Email Thread",       icon: "✉️", left: "60%", delay: 2.1, dur: 4.2, xOff: 50,  color: "#F59E0B" },
              { label: "Drive/Archive",      icon: "🗂️", left: "15%", delay: 3.4, dur: 5.5, xOff: -30, color: "#6366F1" },
              { label: "???.pdf",            icon: "📎", left: "45%", delay: 0.8, dur: 4.0, xOff: 10,  color: "#EF4444" },
              { label: "Teams Chat",         icon: "💬", left: "70%", delay: 1.7, dur: 5.0, xOff: 40,  color: "#8B5CF6" },
              { label: "README.txt",         icon: "📝", left: "35%", delay: 2.8, dur: 4.7, xOff: -20, color: "#64748B" },
              { label: "Jira Ticket",        icon: "🎫", left: "20%", delay: 4.1, dur: 5.3, xOff: -50, color: "#F97316" },
              { label: "Conf. Notes",        icon: "🗒️", left: "55%", delay: 1.5, dur: 4.4, xOff: 30,  color: "#EC4899" },
              { label: "API_docs_OLD.json",  icon: "⚙️", left: "50%", delay: 3.1, dur: 5.1, xOff: 0,   color: "#14B8A6" },
              { label: "backup_FINAL2.zip",  icon: "🗜️", left: "30%", delay: 0.3, dur: 4.6, xOff: -15, color: "#A855F7" },
            ].map(({ label, icon, left, delay, dur, xOff, color }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 120, x: 0, scale: 0.6 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [-30, -350],
                  x: [0, xOff],
                  scale: [0.6, 1, 1, 0.8],
                }}
                transition={{
                  duration: dur,
                  delay: delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  position: "absolute",
                  bottom: "20%",
                  left: left,
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "4px 10px 4px 7px",
                  borderRadius: 999,
                  border: `1px solid ${color}33`,
                  background: "white",
                  boxShadow: `0 4px 12px ${color}15`,
                  fontSize: "0.62rem",
                  fontFamily: "monospace",
                  fontWeight: 600,
                  color,
                  whiteSpace: "nowrap",
                  userSelect: "none",
                }}
              >
                <span style={{ fontSize: "0.8rem", lineHeight: 1 }}>{icon}</span>
                {label}
              </motion.div>
            ))}

            {/* Messy box image at bottom (on top of particles) */}
            <img
              src={messyBox}
              alt=""
              style={{
                position: "absolute",
                bottom: -20,
                left: 0,
                width: "100%",
                height: "60%",
                objectFit: "contain",
                objectPosition: "bottom",
                opacity: 1,
                pointerEvents: "none",
                userSelect: "none",
                zIndex: 2,
              }}
            />
          </div>

          <Callout
            eyebrow={null}
            bgOpacity={0.04}
            style={{ borderLeftColor: "rgba(124,58,237,0.5)" }}
          >
            <div
              style={{
                fontSize: "var(--slide-card-heading)",
                fontWeight: 700,
                color: "#0A0A0A",
                marginBottom: 4,
              }}
            >
              <ThaiText>ลักษณะระบบเดิม</ThaiText>
            </div>
            <p
              style={{
                fontSize: "var(--slide-body)",
                color: "#6B7280",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              <ThaiText>
                ระบบเดิมล้มเหลวไม่ใช่เพราะขาดข้อมูล —
                แต่เพราะขาดสถาปัตยกรรมที่ถูกต้อง
              </ThaiText>
            </p>
          </Callout>
        </motion.div>
      </div>
    </SlideShell>
  );
}
