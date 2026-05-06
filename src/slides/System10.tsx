import { motion } from "framer-motion";
import {
  SlideHeader,
  SlideShell,
  IconBadge,
  ThaiText,
  Pill,
  Callout,
  DotPoint,
} from "../components/index.ts";
import {
  FrontendIcon,
  StorageIcon,
} from "../components/index.ts";
import { fadeInUp, stagger } from "../lib/motion.ts";

const GLOWS = [
  { top: -200, right: -100, size: 800, color: "139,92,246", opacity: 0.08 }, // Purple
  { bottom: -150, left: -80, size: 600, color: "16,185,129", opacity: 0.05 }, // Green
];

export function System10() {
  return (
    <SlideShell glows={GLOWS}>
      <SlideHeader
        label="Client Interface"
        title="Web"
        highlight="Capabilities."
        tagline="Advanced tools for precise context control and search refinement"
        marginBottom={40}
      />

      <div style={{ flex: 1, display: "flex", gap: 32, alignItems: "stretch" }}>
        
        {/* Left: Source Explorer */}
        <motion.div
          {...fadeInUp(0.1)}
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(20px)",
            borderRadius: 32,
            border: "1px solid rgba(139,92,246,0.15)",
            padding: 40,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Decorative subtle grid */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)`, backgroundSize: "20px 20px", opacity: 0.5, pointerEvents: "none" }} />

          <motion.div {...fadeInUp(0.2)} style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 30, position: "relative", zIndex: 1 }}>
            <IconBadge size={64} radius={20} gradient={["#8B5CF6", "#C084FC"]} shadow="rgba(139,92,246,0.4)">
              <div style={{ color: "white" }}><StorageIcon /></div>
            </IconBadge>
            <div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#4C1D95", letterSpacing: "-0.02em" }}>Source Explorer</div>
              <div style={{ fontSize: 14, color: "#8B5CF6", fontWeight: 600 }}>Direct File Management</div>
            </div>
          </motion.div>

          <motion.div {...fadeInUp(0.3)} style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 24, flex: 1 }}>
            <div style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.6 }}>
              <ThaiText>
                หากผู้ใช้ทราบอยู่แล้วว่าต้องการอ้างอิงข้อมูลจากเอกสารใด สามารถข้ามขั้นตอนการ Search ไปยังการ <span style={{ color: "#7C3AED", fontWeight: 700 }}>"เลือกไฟล์โดยตรง" (Direct Attach)</span> เพื่อส่งให้ AI อ้างอิงตอบคำถามได้ทันที
              </ThaiText>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1F2937", display: "flex", alignItems: "center", gap: 12 }}>
                <Pill color="#8B5CF6" rgb="139,92,246">Granularity</Pill>
                <ThaiText>เลือกระดับความละเอียดของข้อมูล</ThaiText>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingLeft: 8 }}>
                <DotPoint gradient={["#8B5CF6", "#A78BFA"]}>
                  <span style={{ color: "#111827", fontWeight: 600 }}>File Level:</span> <ThaiText style={{ color: "#6B7280" }}>แนบเอกสารทั้งฉบับ</ThaiText>
                </DotPoint>
                <DotPoint gradient={["#8B5CF6", "#A78BFA"]}>
                  <span style={{ color: "#111827", fontWeight: 600 }}>Page Level:</span> <ThaiText style={{ color: "#6B7280" }}>ระบุเจาะจงเฉพาะหน้าที่ต้องการ</ThaiText>
                </DotPoint>
                <DotPoint gradient={["#8B5CF6", "#A78BFA"]}>
                  <span style={{ color: "#111827", fontWeight: 600 }}>Chunk Level:</span> <ThaiText style={{ color: "#6B7280" }}>เลือกเฉพาะบางท่อนข้อความ (Chunk) ในหน้า</ThaiText>
                </DotPoint>
              </div>
            </div>

            <div style={{ flex: 1 }} />

            <Callout eyebrow="Exclude Content" color="#F43F5E" rgb="244,63,94" style={{ marginTop: 10 }}>
              <ThaiText style={{ color: "#4B5563", fontSize: 14, lineHeight: 1.6 }}>
                สามารถเลือก Exclude ไฟล์หรือหน้าที่ไม่เกี่ยวข้อง หรือไม่อยากให้ AI นำมาพิจารณา ให้ออกไปจาก Context ได้อย่างรวดเร็ว
              </ThaiText>
            </Callout>
          </motion.div>
        </motion.div>

        {/* Right: Search Filters */}
        <motion.div
          {...fadeInUp(0.15)}
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(20px)",
            borderRadius: 32,
            border: "1px solid rgba(16,185,129,0.15)",
            padding: 40,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
          }}
        >
          <motion.div {...fadeInUp(0.25)} style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 30 }}>
            <IconBadge size={64} radius={20} gradient={["#10B981", "#34D399"]} shadow="rgba(16,185,129,0.2)">
              <div style={{ color: "white" }}><FrontendIcon /></div>
            </IconBadge>
            <div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#064E3B", letterSpacing: "-0.02em" }}>Search Filters</div>
              <div style={{ fontSize: 14, color: "#10B981", fontWeight: 600 }}>Metadata Targeting</div>
            </div>
          </motion.div>

          <motion.div {...fadeInUp(0.35)} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.6 }}>
              <ThaiText>
                ผู้ใช้สามารถระบุ <span style={{ color: "#059669", fontWeight: 700 }}>Metadata</span> เพื่อตีกรอบการค้นหาให้เจาะจงและแม่นยำยิ่งขึ้น ช่วยลดผลลัพธ์จาก Vector Search ที่ไม่เกี่ยวข้องลงก่อนที่จะส่งให้ AI
              </ThaiText>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 8 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1F2937", display: "flex", alignItems: "center", gap: 12 }}>
                 <Pill color="#10B981" rgb="16,185,129">Supported Filters</Pill>
                 <ThaiText>ระบบรองรับการกรองข้อมูลหลายมิติ</ThaiText>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingLeft: 8 }}>
                {[
                  { label: "File type", desc: "ประเภทไฟล์ (เช่น PDF, DOCX)" },
                  { label: "Department", desc: "แผนกที่เป็นเจ้าของข้อมูล" },
                  { label: "Team", desc: "ข้อมูลระดับทีมย่อย" },
                  { label: "Project", desc: "ค้นหาเฉพาะในโปรเจคที่เกี่ยวข้อง" },
                  { label: "Tags", desc: "ป้ายกำกับ (Tags) ที่กำหนดไว้" }
                ].map((item, i) => (
                  <motion.div key={item.label} {...fadeInUp(stagger(0.45, 0.05, i))}>
                    <DotPoint gradient={["#10B981", "#34D399"]}>
                      <span style={{ color: "#111827", fontWeight: 600, minWidth: 95, display: "inline-block" }}>{item.label}</span> 
                      <span style={{ color: "#6B7280" }}><ThaiText>{item.desc}</ThaiText></span>
                    </DotPoint>
                  </motion.div>
                ))}
              </div>
            </div>

            <div style={{ flex: 1 }} />
            
            <Callout eyebrow="Benefit" color="#10B981" rgb="16,185,129">
              <ThaiText style={{ color: "#4B5563", fontSize: 14, lineHeight: 1.6 }}>
                การกำหนดขอบเขตข้อมูลที่ชัดเจน ช่วยให้ AI สามารถค้นหาข้อมูลได้แม่นยำ และตอบคำถามได้ถูกต้องมากขึ้น
              </ThaiText>
            </Callout>

          </motion.div>
        </motion.div>

      </div>
    </SlideShell>
  );
}
