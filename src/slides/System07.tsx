import { motion } from "framer-motion";
import {
  SlideHeader,
  SlideShell,
  IconBadge,
  ThaiText,
} from "../components/index.ts";
import { SearchFlowServiceIcon, NaiveRagIcon } from "../components/index.ts";
import { fadeInUp } from "../lib/motion.ts";

const GLOWS = [
  { top: -200, right: -100, size: 800, color: "59,130,246", opacity: 0.08 },
  { bottom: -150, left: -80, size: 600, color: "239,68,68", opacity: 0.05 },
];

function TimelineNode({
  step,
  title,
  desc,
  color,
  isLast = false,
}: {
  step: string;
  title: string;
  desc?: React.ReactNode;
  color: string;
  isLast?: boolean;
}) {
  return (
    <div style={{ display: "flex", gap: 20, position: "relative" }}>
      {/* Line */}
      {!isLast && (
        <div
          style={{
            position: "absolute",
            top: 36,
            bottom: -16,
            left: 17,
            width: 2,
            background: `linear-gradient(to bottom, ${color}40, ${color}10)`,
            zIndex: 0,
          }}
        />
      )}

      {/* Node */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 12,
          background: `${color}15`,
          border: `2px solid ${color}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: color,
          fontWeight: 800,
          fontSize: 14,
          zIndex: 1,
          flexShrink: 0,
        }}
      >
        {step}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: isLast ? 0 : 32, paddingTop: 4 }}>
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#1F2937",
            marginBottom: 4,
          }}
        >
          {title}
        </div>
        {desc && (
          <div style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.5 }}>
            {desc}
          </div>
        )}
      </div>
    </div>
  );
}

export function System07() {
  return (
    <SlideShell glows={GLOWS}>
      <SlideHeader
        label="Architecture Comparison"
        title="Interactive"
        highlight="RAG."
        tagline="Shifting from automated injection to user-curated context attachment"
        marginBottom={40}
      />

      <div style={{ flex: 1, display: "flex", gap: 32, alignItems: "stretch" }}>
        {/* Left: Standard RAG */}
        <motion.div
          {...fadeInUp(0.1)}
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(20px)",
            borderRadius: 32,
            border: "1px solid rgba(239,68,68,0.1)",
            padding: 40,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
          }}
        >
          <motion.div
            {...fadeInUp(0.2)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 40,
            }}
          >
            <IconBadge
              size={64}
              radius={20}
              gradient={["#F87171", "#FCA5A5"]}
              shadow="rgba(248,113,113,0.2)"
            >
              <NaiveRagIcon />
            </IconBadge>
            <div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#111827",
                  letterSpacing: "-0.02em",
                }}
              >
                Standard RAG
              </div>
              <div style={{ fontSize: 14, color: "#EF4444", fontWeight: 600 }}>
                Automated Context Injection
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeInUp(0.3)} style={{ flex: 1 }}>
            <TimelineNode step="1" title="User Query" color="#9CA3AF" />
            <TimelineNode
              step="2"
              title="Vector DB Search"
              desc={
                <ThaiText>
                  ค้นหาและดึงข้อมูลอัตโนมัติทุกครั้งที่มีคำถามเข้ามา
                </ThaiText>
              }
              color="#F59E0B"
            />
            <TimelineNode
              step="3"
              title="LLM Generation"
              desc={
                <ThaiText>
                  นำ Context ทั้งหมดที่หาได้ ยัดใส่ Prompt เพื่อตอบคำถามทันที
                </ThaiText>
              }
              color="#EF4444"
              isLast
            />
          </motion.div>

          <motion.div
            {...fadeInUp(0.4)}
            style={{
              marginTop: 32,
              background: "rgba(239,68,68,0.05)",
              borderRadius: 20,
              padding: 24,
              border: "1px solid rgba(239,68,68,0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#EF4444",
                }}
              />
              <div
                style={{
                  fontSize: 13,
                  color: "#DC2626",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Limitations
              </div>
            </div>
            <ul
              style={{
                margin: 0,
                paddingLeft: 24,
                fontSize: 16,
                color: "#4B5563",
                lineHeight: 1.6,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <li>
                <ThaiText>
                  สิ้นเปลือง Token จากการค้นหาอัตโนมัติในคำถามที่ไม่จำเป็น
                </ThaiText>
              </li>
              <li>
                <ThaiText>
                  User ไม่มีอำนาจคัดกรอง ข้อมูลผิดพลาดอาจถูกนำไปใช้
                </ThaiText>
              </li>
              <li>
                <ThaiText>
                  ไม่สามารถจำกัดขอบเขต Context สำหรับบทสนทนาต่อเนื่องได้ดี
                </ThaiText>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Right: AINGO System */}
        <motion.div
          {...fadeInUp(0.2)}
          style={{
            flex: 1,
            background: "linear-gradient(145deg, #ffffff 0%, #F0F9FF 100%)",
            borderRadius: 32,
            border: "1px solid rgba(59,130,246,0.2)",
            padding: 40,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 20px 40px rgba(59,130,246,0.1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative blur */}
          <div
            style={{
              position: "absolute",
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              background: "#3B82F6",
              filter: "blur(100px)",
              opacity: 0.1,
              borderRadius: "50%",
            }}
          />

          <motion.div
            {...fadeInUp(0.3)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 40,
              position: "relative",
              zIndex: 1,
            }}
          >
            <IconBadge
              size={64}
              radius={20}
              gradient={["#3B82F6", "#8B5CF6"]}
              shadow="rgba(59,130,246,0.3)"
            >
              <SearchFlowServiceIcon />
            </IconBadge>
            <div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#1E3A8A",
                  letterSpacing: "-0.02em",
                }}
              >
                AINGO Interactive Search
              </div>
              <div style={{ fontSize: 14, color: "#3B82F6", fontWeight: 600 }}>
                Search-as-a-Tool & User Curation
              </div>
            </div>
          </motion.div>

          <motion.div
            {...fadeInUp(0.4)}
            style={{ flex: 1, position: "relative", zIndex: 1 }}
          >
            <TimelineNode
              step="1"
              title="User Query"
              desc={
                <ThaiText>
                  รับคำถามผ่าน Chat Mode หรือให้ Auto Mode วิเคราะห์ความจำเป็น
                </ThaiText>
              }
              color="#9CA3AF"
            />
            <TimelineNode
              step="2"
              title="Search Tool Execution"
              desc={
                <ThaiText>
                  ระบบค้นหาเอกสารและส่งกลับมาเพียงแค่รายการ Citations (IDs)
                </ThaiText>
              }
              color="#8B5CF6"
            />
            <TimelineNode
              step="3"
              title="User Curates Context"
              desc={
                <ThaiText>
                  User เป็นคนตัดสินใจเลือก "แนบ"
                  เฉพาะเนื้อหาที่ตรงกับความต้องการ
                </ThaiText>
              }
              color="#10B981"
            />
            <TimelineNode
              step="4"
              title="Grounded Response"
              desc={
                <ThaiText>
                  AI ประมวลผลคำตอบโดยถูกตีกรอบให้อ้างอิงจาก Context
                  ที่ถูกเลือกไว้เท่านั้น
                </ThaiText>
              }
              color="#3B82F6"
              isLast
            />
          </motion.div>

          <motion.div
            {...fadeInUp(0.5)}
            style={{
              marginTop: 32,
              background: "rgba(59,130,246,0.05)",
              borderRadius: 20,
              padding: 24,
              border: "1px solid rgba(59,130,246,0.2)",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#3B82F6",
                }}
              />
              <div
                style={{
                  fontSize: 13,
                  color: "#2563EB",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Key Advantages
              </div>
            </div>
            <ul
              style={{
                margin: 0,
                paddingLeft: 24,
                fontSize: 16,
                color: "#1F2937",
                lineHeight: 1.6,
                fontWeight: 500,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <li>
                <ThaiText>
                  ประหยัด Token เพราะ Search ถูกเรียกใช้เมื่อจำเป็นจริงๆ
                  เท่านั้น
                </ThaiText>
              </li>
              <li>
                <ThaiText>
                  User มีอำนาจคัดกรอง 100% ขจัดปัญหา AI นำข้อมูลผิดมาอ้างอิง
                  (Hallucination)
                </ThaiText>
              </li>
              <li>
                <ThaiText>
                  สร้างการสนทนาที่ต่อเนื่องบนชุดข้อมูลเดิมที่แนบไว้ได้อย่างแม่นยำ
                </ThaiText>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </SlideShell>
  );
}
