import { motion } from "framer-motion";
import {
  AlertCircleIcon,
  Callout,
  ClockIcon,
  CostIcon,
  HorizontalDivider,
  IconCard,
  IconTile,
  Lanyard,
  Pill,
  ScatterIcon,
  SearchFailIcon,
  SectionTitle,
  SlideHeader,
  SlideShell,
  ThaiText,
} from "../components/index.ts";
import { fadeIn, fadeInRight } from "../lib/motion.ts";
import atomProfile from "../assets/images/profile/atom-close.jpeg";

const GLOWS = [
  { bottom: -260, left: -140, size: 680, color: "239,68,68", opacity: 0.07 },
  { top: -180, right: -100, size: 560, color: "124,58,237", opacity: 0.1 },
];

export function Slide04() {
  return (
    <SlideShell glows={GLOWS}>
      <SlideHeader label="Problems" title="The" highlight="Problem." />

      <div style={{ flex: 1, display: "flex", gap: 24, minHeight: 0 }}>
        {/* Lanyard — left column */}
        <motion.div 
          {...fadeIn(0.3)} 
          style={{ 
            flex: 1.1, 
            minHeight: 0, 
            display: "flex", 
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <div style={{ flex: 1, width: "100%", position: "relative" }}>
            <Lanyard
              position={[0, 0, 11]}
              gravity={[0, -40, 0]}
              fov={22}
              transparent
              name="Atom"
              profileImage={atomProfile}
            />
          </div>
          
          <motion.div
            {...fadeIn(0.6)}
            style={{
              padding: "24px 28px",
              background: "rgba(124, 58, 237, 0.03)",
              borderRadius: "20px",
              border: "1px solid rgba(124, 58, 237, 0.1)",
              marginTop: "12px",
              width: "100%",
              maxWidth: "520px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              alignItems: "center"
            }}
          >
            <Pill color="#7C3AED">Scenario</Pill>
            
            <p style={{ 
              margin: 0, 
              fontSize: "1.05rem", 
              lineHeight: 1.65, 
              color: "#4B5563",
              textAlign: "center" 
            }}>
              <ThaiText>
                พบกับ <strong>Atom</strong> ซึ่ง Project Manager หน้าใหม่ เข้ามาทำงานที่บริษัท <strong>AINGO</strong> และต้องการหา Technical Specifications ของโครงการที่เปิดตัวไปเมื่อไตรมาสที่แล้ว
              </ThaiText>
            </p>
          </motion.div>
        </motion.div>

        {/* Content — right column */}
        <motion.div
          {...fadeInRight(0.42)}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            minHeight: 0,
          }}
        >
          <SectionTitle
            icon={
              <IconTile size={30} radius={8} rgb="124,58,237" bgOpacity={0.1} borderOpacity={0.2}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#7C3AED" strokeWidth="2" />
                  <circle cx="12" cy="12" r="6" stroke="#7C3AED" strokeWidth="2" />
                  <circle cx="12" cy="12" r="2" fill="#7C3AED" />
                </svg>
              </IconTile>
            }
          >
            <ThaiText>ความเป็นจริงที่ต้องเจอ</ThaiText>
          </SectionTitle>

          <Callout eyebrow={<ThaiText>ความต้องการ</ThaiText>} color="#7C3AED" rgb="124,58,237">
            <p style={{ fontSize: "var(--slide-body)", color: "#374151", margin: 0, lineHeight: 1.6 }}>
              <ThaiText>
                หา Technical Specifications
                ของโครงการที่เปิดตัวไปเมื่อไตรมาสที่แล้ว
              </ThaiText>
            </p>
          </Callout>

          <IconCard
            icon={<SearchFailIcon />}
            title={<ThaiText>การค้นหาไร้ประสิทธิภาพ</ThaiText>}
            titleColor="#EF4444"
          >
            <ThaiText>
              Keyword-Search แบบเดิมให้ผลลัพธ์เป็นรายการไฟล์นับร้อย
              โดยไม่เกี่ยวกับความต้องการจริง
            </ThaiText>
          </IconCard>

          <IconCard
            icon={<ScatterIcon />}
            title={<ThaiText>ข้อมูลกระจัดกระจาย</ThaiText>}
            titleColor="#EF4444"
          >
            <ThaiText>
              ข้อมูลสำคัญของโครงการถูกแยกส่วนและซ่อนอยู่ตามระบบต่าง ๆ เช่น
              SharePoint, ไดรฟ์, และอีเมล
              ซึ่งไม่สามารถให้ภาพรวมที่สมบูรณ์ได้
            </ThaiText>
          </IconCard>

          <HorizontalDivider />

          <SectionTitle
            icon={
              <IconTile size={30} radius={8} rgb="239,68,68" bgOpacity={0.1} borderOpacity={0.2}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <line x1="12" y1="9" x2="12" y2="13" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
                  <line x1="12" y1="17" x2="12.01" y2="17" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </IconTile>
            }
          >
            <ThaiText>ผลกระทบทางธุรกิจ</ThaiText>
          </SectionTitle>

          <IconCard
            icon={<ClockIcon />}
            title={<ThaiText>เวลาสูญเปล่า</ThaiText>}
            titleColor="#F59E0B"
          >
            <ThaiText>เสียเวลาหลายชั่วโมงในการค้นหาข้อมูล</ThaiText>
          </IconCard>

          <IconCard
            icon={<AlertCircleIcon />}
            title={<ThaiText>ความล่าช้า</ThaiText>}
            titleColor="#EF4444"
          >
            <ThaiText>
              เกิดความล่าช้าของโครงการ เสี่ยงที่จะเกิดข้อผิดพลาดซ้ำ
            </ThaiText>
          </IconCard>

          <IconCard
            icon={<CostIcon />}
            title={<ThaiText>ต้นทุนที่ซ่อนอยู่ขององค์กร</ThaiText>}
            titleColor="#F59E0B"
            align="center"
          />
        </motion.div>
      </div>
    </SlideShell>
  );
}
