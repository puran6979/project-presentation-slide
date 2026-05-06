import { motion } from "framer-motion";
import {
  AccentLine,
  GradientText,
  Pill,
  ParadoxIcon,
  SlideLabel,
  SlideShell,
  ThaiText,
  VerticalDivider,
  ZapIcon,
} from "../components/index.ts";
import { DISTANCE, fadeInRight, heroTitle } from "../lib/motion.ts";

const GLOWS = [
  { top: -280, right: -160, size: 800, color: "124,58,237", opacity: 0.12 },
];

const cardStyle = {
  padding: "32px 36px",
  background: "#FAFAFA",
  borderRadius: 20,
  border: "1px solid #F3F4F6",
} as const;

const cardBodyStyle = {
  fontSize: "var(--slide-body)",
  color: "#374151",
  lineHeight: 1.7,
  margin: 0,
} as const;

export function ProblemOverview() {
  return (
    <SlideShell glows={GLOWS}>
      <SlideLabel label="Section" style={{ marginBottom: 40 }} />

      <div style={{ flex: 1, display: "flex", gap: 72, alignItems: "stretch" }}>
        {/* Left: Title */}
        <div
          style={{
            width: "34%",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <motion.h1
            {...heroTitle(0.12, DISTANCE.xl)}
            style={{
              fontSize: 100,
              fontWeight: 900,
              letterSpacing: "-3px",
              lineHeight: 1.0,
              margin: "0 0 40px",
              color: "#0A0A0A",
              userSelect: "none",
              paddingTop: 6,
            }}
          >
            Back
            <br />
            <GradientText>grounds.</GradientText>
          </motion.h1>

          <AccentLine delay={0.45} width={72} />
        </div>

        <VerticalDivider animated delay={0.38} />

        {/* Right: Cards */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 24,
            justifyContent: "center",
          }}
        >
          {/* Card 1 — Speed & Adaptability */}
          <motion.div {...fadeInRight(0.5, { distance: 28 })} style={cardStyle}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
              <ZapIcon />
              <div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#7C3AED",
                    letterSpacing: "-0.3px",
                    marginBottom: 12,
                  }}
                >
                  Speed &amp; Adaptability
                </div>
                <p style={cardBodyStyle}>
                  <ThaiText>
                    ในปัจจุบัน
                    การที่ธุรกิจจะอยู่รอดในโลกที่เปลี่ยนแปลงย่างรวดเร็วได้
                    ตัวธุระกิจเองก็ต้องสามารถที่จะปรับตัวได้อย่างรวดเร็ว
                    ส่งมอบผลิตภัณฑ์ได้ทันต่อการเปลี่ยนแปลง
                  </ThaiText>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2 — The Paradox */}
          <motion.div {...fadeInRight(0.65, { distance: 28 })} style={cardStyle}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
              <ParadoxIcon />
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: "#EC4899",
                      letterSpacing: "-0.3px",
                    }}
                  >
                    The Paradox
                  </span>
                  <Pill
                    color="#EC4899"
                    rgb="236,72,153"
                    fontSize={13}
                    letterSpacing="0.04em"
                    uppercase={false}
                  >
                    Core Problem
                  </Pill>
                </div>
                <p style={cardBodyStyle}>
                  <ThaiText>
                    เมื่อเวลาผ่านไปบริษัทเติบโตขึ้น
                    มีประสบการณ์และความรู้มากขึ้น
                    เราก็คาดหวังว่าประสบการณ์และความรู้เหล่านี้จะช่วยพลักดันบริษัทไปข้างหน้าได้เร็วขึ้น
                    แต่มันกลับช้าลงเพราะความไม่เป็นระเบียบและความกระจัดกระจาย
                    ขององค์ความรู้เหล่านั้น
                  </ThaiText>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SlideShell>
  );
}
