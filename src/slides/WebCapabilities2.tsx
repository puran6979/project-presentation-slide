import { motion } from "framer-motion";
import {
  SlideHeader,
  SlideShell,
  IconBadge,
  ThaiText,
  Pill,
} from "../components/index.ts";
import { ChatIcon, StorageIcon } from "../components/index.ts";
import { fadeInUp } from "../lib/motion.ts";
import branchVid from "../assets/vid/feature/branch.mp4";
import sourceManageVid from "../assets/vid/feature/source-manage.mp4";

const GLOWS = [
  { top: -200, left: -100, size: 760, color: "59,130,246", opacity: 0.08 },
  { bottom: -150, right: -80, size: 620, color: "245,158,11", opacity: 0.06 },
];

export function WebCapabilities2() {
  return (
    <SlideShell glows={GLOWS}>
      <SlideHeader
        label="Client Interface"
        title="Web"
        highlight="Capabilities."
        tagline="Conversation branching and document index management"
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
        {/* Left: Conversation Branch */}
        <motion.div
          {...fadeInUp(0.1)}
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(20px)",
            borderRadius: 32,
            border: "1px solid rgba(59,130,246,0.15)",
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
              backgroundImage: `radial-gradient(rgba(59,130,246,0.03) 1px, transparent 1px)`,
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
              gradient={["#3B82F6", "#60A5FA"]}
              shadow="rgba(59,130,246,0.4)"
            >
              <div style={{ color: "white" }}>
                <ChatIcon />
              </div>
            </IconBadge>
            <div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#1E3A8A",
                  letterSpacing: "-0.02em",
                }}
              >
                Conversation Branch
              </div>
              <div style={{ fontSize: 13, color: "#3B82F6", fontWeight: 600 }}>
                Fork · Navigate · Compare
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
                ฟีเจอร์นี้ช่วยให้ผู้ใช้สามารถ{" "}
                <span style={{ color: "#2563EB", fontWeight: 700 }}>
                  แตกสาขาการสนทนา (Branch)
                </span>{" "}
                จากจุดใดก็ได้ในประวัติการสนทนา เพื่อสำรวจแนวทางคำตอบต่างๆ
                โดยไม่กระทบบทสนทนาหลัก พร้อมสลับไปมาระหว่าง Branch
                ได้อย่างรวดเร็ว
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
            <Pill color="#3B82F6" rgb="59,130,246">
              Use Cases
            </Pill>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#6B7280" }}>
              <ThaiText>
                ทดลองคำถามต่างมุม · เปรียบเทียบคำตอบ · เก็บ Context แยก
              </ThaiText>
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
              border: "1px solid rgba(59,130,246,0.18)",
              boxShadow: "0 8px 24px rgba(59,130,246,0.12)",
              position: "relative",
              zIndex: 1,
            }}
          >
            <video
              src={branchVid}
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

        {/* Right: Source Manager */}
        <motion.div
          {...fadeInUp(0.15)}
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(20px)",
            borderRadius: 32,
            border: "1px solid rgba(245,158,11,0.15)",
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
              backgroundImage: `radial-gradient(rgba(245,158,11,0.03) 1px, transparent 1px)`,
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
              gradient={["#F59E0B", "#FCD34D"]}
              shadow="rgba(245,158,11,0.3)"
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
                  color: "#78350F",
                  letterSpacing: "-0.02em",
                }}
              >
                Source Manager
              </div>
              <div style={{ fontSize: 13, color: "#D97706", fontWeight: 600 }}>
                Index · Unindex · Manage
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
                ผู้ใช้สามารถ{" "}
                <span style={{ color: "#B45309", fontWeight: 700 }}>
                  จัดการเอกสารบน SharePoint
                </span>{" "}
                ได้โดยตรง ทั้งการเลือก Index เพื่อให้ AI เข้าถึง หรือ Unindex
                เอกสารที่ไม่ต้องการให้นำมาใช้งาน
                ช่วยให้ควบคุมขอบเขตความรู้ของระบบได้อย่างแม่นยำ
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
            <Pill color="#F59E0B" rgb="245,158,11">
              Controls
            </Pill>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#6B7280" }}>
              <ThaiText>Index · Unindex · Preview · Sync Status</ThaiText>
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
              border: "1px solid rgba(245,158,11,0.18)",
              boxShadow: "0 8px 24px rgba(245,158,11,0.1)",
              position: "relative",
              zIndex: 1,
            }}
          >
            <video
              src={sourceManageVid}
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
