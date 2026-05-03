import { motion } from "framer-motion";
import {
  BigGhostNumber,
  IconTile,
  LegacySearchIcon,
  NaiveRagIcon,
  Pill,
  ProposedSystemIcon,
  SlideHeader,
  SlideShell,
  ThaiText,
} from "../components/index.ts";
import { cardRise, stagger } from "../lib/motion.ts";
import keywordImg from "../assets/images/evolution/keyword.jpeg";
import ragImg from "../assets/images/evolution/rag.jpeg";
import proposeImg from "../assets/images/evolution/propose.jpeg";

const GLOWS = [
  { top: -280, right: -140, size: 760, color: "124,58,237", opacity: 0.11 },
  { bottom: -180, left: -60, size: 560, color: "16,185,129", opacity: 0.07 },
];

interface LevelData {
  num: string;
  label: string;
  accent: string;
  accentRgb: string;
  status: string;
  desc: string;
  icon: React.ReactNode;
  image?: string;
}

const LEVELS: LevelData[] = [
  {
    num: "01",
    label: "Legacy Keyword Search",
    accent: "#EF4444",
    accentRgb: "239,68,68",
    status: "Legacy",
    desc: "ปัญหา: ใช้ Keyword ค้นหาเอกสาร ทำให้ไม่รู้ intent จริงๆ ของผู้ใช้ ได้ผลเป็นเอกสารมากมาย แต่ไม่ตรงกับที่หา",
    icon: <LegacySearchIcon />,
    image: keywordImg,
  },
  {
    num: "02",
    label: "Naive / Generic RAG",
    accent: "#F59E0B",
    accentRgb: "245,158,11",
    status: "Partial",
    desc: "ปัญหา: ตอบคำถามด้วย Natural-Language ได้ แต่ยังขาด Context/Meta ที่ดีของข้อมูล",
    icon: <NaiveRagIcon />,
    image: ragImg,
  },
  {
    num: "03",
    label: "The Proposed System",
    accent: "#7C3AED",
    accentRgb: "124,58,237",
    status: "Aingo",
    desc: "อัปเกรด Data Pipeline ทำให้ได้ Data ที่มีความเที่ยงตรง มี Agent ที่ฉลาดสำหรับการตอบคำถาม",
    icon: <ProposedSystemIcon />,
    image: proposeImg,
  },
];

export function Slide06() {
  return (
    <SlideShell glows={GLOWS}>
      <SlideHeader
        label="Aingo"
        title="System"
        highlight="Evolution."
        tagline="The Core Technical Challenge"
        marginBottom={32}
      />

      {/* ── 3 horizontal cards ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          gap: 20,
          minHeight: 0,
          alignItems: "stretch",
        }}
      >
        {LEVELS.map((lvl, i) => (
          <motion.div
            key={lvl.num}
            {...cardRise(stagger(0.28, 0.12, i))}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              borderRadius: 18,
              border: `1px solid rgba(${lvl.accentRgb},0.15)`,
              overflow: "hidden",
              background: "#FAFAFA",
              boxShadow: `0 2px 24px rgba(${lvl.accentRgb},0.06)`,
            }}
          >
            {/* Image area */}
            <div
              style={{
                flex: "0 0 62%",
                position: "relative",
                background: `rgba(${lvl.accentRgb},0.04)`,
                overflow: "hidden",
              }}
            >
              {lvl.image ? (
                <img
                  src={lvl.image}
                  alt={lvl.label}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `radial-gradient(circle, rgba(${lvl.accentRgb},0.1) 1px, transparent 1px)`,
                      backgroundSize: "22px 22px",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(160deg, rgba(${lvl.accentRgb},0.1) 0%, transparent 65%)`,
                    }}
                  />
                </>
              )}
              
              {/* Watermark number */}
              <BigGhostNumber
                rgb={lvl.accentRgb}
                size={96}
                opacity={0.07}
                style={{
                  position: "absolute",
                  bottom: -8,
                  right: 12,
                  letterSpacing: "-6px",
                  zIndex: 1,
                }}
              >
                {lvl.num}
              </BigGhostNumber>
              
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  zIndex: 2,
                }}
              >
                {!lvl.image && (
                  <IconTile
                    size={60}
                    radius={16}
                    rgb={lvl.accentRgb}
                    bgOpacity={0.1}
                    borderOpacity={0.22}
                    style={{
                      boxShadow: `0 4px 20px rgba(${lvl.accentRgb},0.15)`,
                    }}
                  >
                    {lvl.icon}
                  </IconTile>
                )}
                
                <div
                  style={{
                    position: "absolute",
                    bottom: 16,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: `rgba(${lvl.accentRgb},0.6)`,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      background: `rgba(${lvl.accentRgb}, 0.05)`,
                      padding: "2px 8px",
                      borderRadius: 4,
                    }}
                  >
                    Level {lvl.num}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                padding: "18px 20px",
                gap: 10,
                minHeight: 0,
              }}
            >
              <Pill
                color={lvl.accent}
                rgb={lvl.accentRgb}
                fontSize={10}
                letterSpacing="0.1em"
                dot
                dotGlow
                style={{ alignSelf: "flex-start" }}
              >
                {lvl.status}
              </Pill>

              <div
                style={{
                  fontSize: "var(--slide-card-heading)",
                  fontWeight: 800,
                  color: "#0A0A0A",
                  lineHeight: 1.25,
                  letterSpacing: "-0.3px",
                }}
              >
                {lvl.label}
              </div>

              <div
                style={{
                  width: 32,
                  height: 2,
                  borderRadius: 2,
                  background: `linear-gradient(90deg, ${lvl.accent}, transparent)`,
                }}
              />

              <p
                style={{
                  fontSize: "var(--slide-body)",
                  color: "#6B7280",
                  margin: 0,
                  lineHeight: 1.65,
                  flex: 1,
                }}
              >
                <ThaiText>{lvl.desc}</ThaiText>
              </p>
            </div>

            <div
              style={{
                height: 3,
                background: `linear-gradient(90deg, ${lvl.accent}, rgba(${lvl.accentRgb},0.2))`,
              }}
            />
          </motion.div>
        ))}
      </div>
    </SlideShell>
  );
}
