import { motion } from "framer-motion";
import {
  SlideHeader,
  SlideShell,
  IconBadge,
  ThaiText,
  Pill,
} from "../components/index.ts";
import { FrontendIcon, StorageIcon } from "../components/index.ts";
import { fadeInUp } from "../lib/motion.ts";
import sourceExplorerVid from "../assets/vid/feature/source-explorer.mp4";
import filterVid from "../assets/vid/feature/filter.mp4";

const GLOWS = [
  { top: -200, right: -100, size: 800, color: "139,92,246", opacity: 0.08 },
  { bottom: -150, left: -80, size: 600, color: "16,185,129", opacity: 0.05 },
];

export function WebCapabilities() {
  return (
    <SlideShell glows={GLOWS}>
      <SlideHeader
        label="Client Interface"
        title="Web"
        highlight="Capabilities."
        tagline="Advanced tools for precise context control and search refinement"
        marginBottom={32}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          gap: 32,
          alignItems: "stretch",
          minHeight: 0,
        }}
      >
        {/* Left: Source Explorer */}
        <motion.div
          {...fadeInUp(0.1)}
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(20px)",
            borderRadius: 32,
            border: "1px solid rgba(139,92,246,0.15)",
            padding: "28px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
            position: "relative",
            overflow: "hidden",
            minHeight: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `radial-gradient(rgba(139,92,246,0.03) 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
              pointerEvents: "none",
            }}
          />

          {/* Header */}
          <motion.div
            {...fadeInUp(0.2)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              position: "relative",
              zIndex: 1,
            }}
          >
            <IconBadge
              size={52}
              radius={16}
              gradient={["#8B5CF6", "#C084FC"]}
              shadow="rgba(139,92,246,0.4)"
            >
              <div style={{ color: "white" }}>
                <StorageIcon />
              </div>
            </IconBadge>
            <div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#4C1D95",
                  letterSpacing: "-0.02em",
                }}
              >
                Source Explorer
              </div>
              <div style={{ fontSize: 13, color: "#8B5CF6", fontWeight: 600 }}>
                Direct File Management
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            {...fadeInUp(0.28)}
            style={{
              position: "relative",
              zIndex: 1,
              flex: 1,
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            <div style={{ fontSize: 15, color: "#4B5563", lineHeight: 1.6 }}>
              <ThaiText>
                หากผู้ใช้ทราบอยู่แล้วว่าต้องการอ้างอิงข้อมูลจากเอกสารใด
                สามารถข้ามขั้นตอนการ Search ไปยังการ{" "}
                <span style={{ color: "#7C3AED", fontWeight: 700 }}>
                  "เลือกไฟล์โดยตรง" (Direct Attach)
                </span>{" "}
                เพื่อส่งให้ AI อ้างอิงตอบคำถามได้ทันที รองรับการเลือกระดับ File
                / Page / Chunk และสามารถ Exclude เนื้อหาที่ไม่ต้องการออกจาก
                Context ได้
              </ThaiText>
            </div>
          </motion.div>

          {/* Pill */}
          <motion.div
            {...fadeInUp(0.34)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              position: "relative",
              zIndex: 1,
            }}
          >
            <Pill color="#8B5CF6" rgb="139,92,246">
              Granularity
            </Pill>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#6B7280" }}>
              <ThaiText>File · Page · Chunk Level</ThaiText>
            </span>
          </motion.div>

          {/* Video preview */}
          <motion.div
            {...fadeInUp(0.4)}
            style={{
              flexShrink: 0,
              height: 500,
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(139,92,246,0.18)",
              boxShadow:
                "0 8px 24px rgba(139,92,246,0.12), 0 24px 64px rgba(0,0,0,0.18)",
              position: "relative",
              zIndex: 1,
            }}
          >
            <video
              src={sourceExplorerVid}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
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
            padding: "28px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
            position: "relative",
            overflow: "hidden",
            minHeight: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `radial-gradient(rgba(16,185,129,0.03) 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
              pointerEvents: "none",
            }}
          />

          {/* Header */}
          <motion.div
            {...fadeInUp(0.25)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              position: "relative",
              zIndex: 1,
            }}
          >
            <IconBadge
              size={52}
              radius={16}
              gradient={["#10B981", "#34D399"]}
              shadow="rgba(16,185,129,0.2)"
            >
              <div style={{ color: "white" }}>
                <FrontendIcon />
              </div>
            </IconBadge>
            <div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#064E3B",
                  letterSpacing: "-0.02em",
                }}
              >
                Search Filters
              </div>
              <div style={{ fontSize: 13, color: "#10B981", fontWeight: 600 }}>
                Metadata Targeting
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            {...fadeInUp(0.33)}
            style={{
              position: "relative",
              zIndex: 1,
              flex: 1,
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            <div style={{ fontSize: 15, color: "#4B5563", lineHeight: 1.6 }}>
              <ThaiText>
                ผู้ใช้สามารถระบุ{" "}
                <span style={{ color: "#059669", fontWeight: 700 }}>
                  Metadata
                </span>{" "}
                เพื่อตีกรอบการค้นหาให้เจาะจงและแม่นยำยิ่งขึ้น ช่วยลดผลลัพธ์จาก
                Vector Search ที่ไม่เกี่ยวข้อง รองรับการกรองตาม File type,
                Department, Team, Project และ Tags
              </ThaiText>
            </div>
          </motion.div>

          {/* Pill */}
          <motion.div
            {...fadeInUp(0.39)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              position: "relative",
              zIndex: 1,
            }}
          >
            <Pill color="#10B981" rgb="16,185,129">
              Supported Filters
            </Pill>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#6B7280" }}>
              <ThaiText>File type · Dept · Team · Project · Tags</ThaiText>
            </span>
          </motion.div>

          {/* Video preview */}
          <motion.div
            {...fadeInUp(0.45)}
            style={{
              flexShrink: 0,
              height: 500,
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(16,185,129,0.18)",
              boxShadow:
                "0 8px 24px rgba(16,185,129,0.12), 0 24px 64px rgba(0,0,0,0.18)",
              position: "relative",
              zIndex: 1,
            }}
          >
            <video
              src={filterVid}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </SlideShell>
  );
}
