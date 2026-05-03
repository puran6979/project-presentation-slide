import { motion } from "framer-motion";
import {
  BeforeAfterRow,
  BenefitItem,
  IconBadge,
  SlideHeader,
  SlideShell,
  ThaiText,
} from "../components/index.ts";
import { DISTANCE, DURATION, fadeInUp, scaleIn } from "../lib/motion.ts";
import relaxImg from "../assets/images/results/relax.png";
import frustImg from "../assets/images/results/frust.png";

const GLOWS = [
  { top: -220, right: -100, size: 680, color: "16,185,129", opacity: 0.09 },
  { bottom: -160, left: -80, size: 540, color: "124,58,237", opacity: 0.08 },
];

const ACADEMIC = [
  { label: "Validated Architecture", color: "#7C3AED", rgb: "124,58,237" },
  { label: "Data Pipeline Expertise", color: "#7C3AED", rgb: "124,58,237" },
  { label: "RAG Optimization", color: "#7C3AED", rgb: "124,58,237" },
];

const INDUSTRIAL = [
  { label: "Efficiency", color: "#10B981", rgb: "16,185,129" },
  { label: "Knowledge Consolidation", color: "#10B981", rgb: "16,185,129" },
  { label: "Streamlined Onboarding", color: "#10B981", rgb: "16,185,129" },
];

const CHECK = (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path
      d="M2 6.5L5.2 9.5L11 3.5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Slide10() {
  return (
    <SlideShell glows={GLOWS}>
      <SlideHeader
        label="Aingo"
        title="Expected"
        highlight="Results."
        titleSize={64}
        tagline="ผลที่ได้จากการพัฒนา"
        thaiTagline
        paddingBottom={20}
        marginBottom={24}
      />

      {/* ── Body ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          minHeight: 0,
        }}
      >
        {/* ── Image row ── */}
        <motion.div
          {...fadeInUp(0.28, {
            distance: DISTANCE.sm,
            duration: DURATION.base,
          })}
          style={{ display: "flex", gap: 14, flex: 1, minHeight: 0 }}
        >
          <div style={{ flex: 1, overflow: "hidden" }}>
            <img src={frustImg} alt="Frustrated User" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <img src={relaxImg} alt="Relaxed User" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
        </motion.div>

        {/* ── Before / After ── */}
        <motion.div
          {...fadeInUp(0.38, { distance: DISTANCE.sm, duration: DURATION.med })}
          style={{ display: "flex", gap: 14 }}
        >
          <BeforeAfterRow
            before={{
              eyebrow: "Before",
              body: (
                <ThaiText>
                  <strong>Atom</strong> ใช้เวลาหลายชั่วโมงในการค้นหาและประเมินเอกสารที่กระจัดกระจายหลายฉบับ
                </ThaiText>
              ),
              color: "#EF4444",
              borderColor: "#FECACA",
              bg: "rgba(254,226,226,0.35)",
              glyph: (
                <span
                  style={{
                    color: "white",
                    fontWeight: 700,
                    fontSize: 13,
                    lineHeight: 1,
                  }}
                >
                  ✕
                </span>
              ),
            }}
            after={{
              eyebrow: "After",
              body: (
                <ThaiText>
                  <strong>Atom</strong> ถามคำถามและได้รับคำตอบที่ถูกต้องสมบูรณ์
                  พร้อมอ้างอิงแหล่งที่มา ทันที
                </ThaiText>
              ),
              color: "#10B981",
              borderColor: "#A7F3D0",
              bg: "rgba(209,250,229,0.35)",
              glyph: CHECK,
            }}
            arrow={
              <motion.span {...scaleIn(0.5)} style={{ display: "block" }}>
                →
              </motion.span>
            }
          />
        </motion.div>

        {/* ── Benefits columns ── */}
        <div style={{ display: "flex", gap: 18 }}>
          {/* Academic / Technical */}
          <motion.div
            {...fadeInUp(0.42, { distance: 18, duration: DURATION.base })}
            style={{
              flex: 1,
              borderRadius: 16,
              border: "1px solid rgba(124,58,237,0.15)",
              background: "rgba(124,58,237,0.04)",
              padding: "18px 20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 14,
              }}
            >
              <IconBadge gradient={["#7C3AED", "#A855F7"]} size={30} radius={8}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 1L9 5H13L10 8L11 12L7 10L3 12L4 8L1 5H5L7 1Z"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                    fill="rgba(255,255,255,0.2)"
                  />
                </svg>
              </IconBadge>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  color: "#7C3AED",
                }}
              >
                Academic / Technical Benefits
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {ACADEMIC.map((item, i) => (
                <BenefitItem
                  key={item.label}
                  color={item.color}
                  rgb={item.rgb}
                  delay={0.55 + i * 0.1}
                >
                  {item.label}
                </BenefitItem>
              ))}
            </div>
          </motion.div>

          {/* Industrial / Professional */}
          <motion.div
            {...fadeInUp(0.52, { distance: 18, duration: DURATION.base })}
            style={{
              flex: 1,
              borderRadius: 16,
              border: "1px solid rgba(16,185,129,0.15)",
              background: "rgba(16,185,129,0.04)",
              padding: "18px 20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 14,
              }}
            >
              <IconBadge gradient={["#10B981", "#059669"]} size={30} radius={8}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect
                    x="1.5"
                    y="6"
                    width="3"
                    height="6.5"
                    rx="1"
                    stroke="white"
                    strokeWidth="1.2"
                    fill="rgba(255,255,255,0.2)"
                  />
                  <rect
                    x="5.5"
                    y="3.5"
                    width="3"
                    height="9"
                    rx="1"
                    stroke="white"
                    strokeWidth="1.2"
                    fill="rgba(255,255,255,0.2)"
                  />
                  <rect
                    x="9.5"
                    y="1.5"
                    width="3"
                    height="11"
                    rx="1"
                    stroke="white"
                    strokeWidth="1.2"
                    fill="rgba(255,255,255,0.2)"
                  />
                </svg>
              </IconBadge>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  color: "#10B981",
                }}
              >
                Industrial / Professional Benefit
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {INDUSTRIAL.map((item, i) => (
                <BenefitItem
                  key={item.label}
                  color={item.color}
                  rgb={item.rgb}
                  delay={0.65 + i * 0.1}
                >
                  {item.label}
                </BenefitItem>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SlideShell>
  );
}
