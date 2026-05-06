import { motion } from "framer-motion";
import { useRef } from "react";
import {
  SlideHeader,
  SlideShell,
  AnimatedBeam,
  IconBadge,
  ThaiText,
} from "../components/index.ts";
import {
  BackendIcon,
  SearchFlowServiceIcon,
  EmbeddingIcon,
} from "../components/index.ts";
import { fadeInUp } from "../lib/motion.ts";

const GLOWS = [
  { top: "10%", right: "10%", size: 600, color: "249,115,22", opacity: 0.08 }, // Orange (Embedding)
  { bottom: "10%", right: "10%", size: 600, color: "16,185,129", opacity: 0.08 }, // Green (AI)
  { top: "50%", left: "5%", size: 600, color: "239,68,68", opacity: 0.05 }, // Red (Web)
];

function FloatingLabel({ 
  top, left, right, bottom, transform, title, desc, color 
}: { 
  top?: number | string, left?: number | string, right?: number | string, bottom?: number | string, 
  transform?: string, title: string, desc: React.ReactNode, color: string 
}) {
  return (
    <motion.div 
      {...fadeInUp(0.6)}
      style={{
        position: "absolute",
        top, left, right, bottom, transform,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${color}40`,
        borderRadius: 16,
        padding: "12px 20px",
        boxShadow: `0 12px 32px ${color}20`,
        zIndex: 30,
        width: 260,
        pointerEvents: "none"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}` }} />
        <div style={{ fontSize: 13, fontWeight: 800, color: color, textTransform: "uppercase", letterSpacing: 0.5 }}>{title}</div>
      </div>
      <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.5, fontWeight: 500 }}>
        {desc}
      </div>
    </motion.div>
  );
}

export function System09() {
  const containerRef = useRef<HTMLDivElement>(null);
  const backendRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const embedRef = useRef<HTMLDivElement>(null);

  // Total animation cycle = 14 seconds
  const TOTAL_CYCLE = 14;

  return (
    <SlideShell glows={GLOWS}>
      <SlideHeader
        label="Architecture"
        title="Context"
        highlight="Attachment Flow."
        tagline="Sequential, user-driven process from search to grounded response"
        marginBottom={20}
      />

      <div style={{ flex: 1, position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <motion.div
          {...fadeInUp(0.3)}
          style={{
            width: "100%",
            height: "100%",
            background: "rgba(255,255,255,0.4)",
            backdropFilter: "blur(40px)",
            borderRadius: 40,
            border: "1px solid rgba(255,255,255,0.6)",
            position: "relative",
            isolation: "isolate",
            boxShadow: "0 20px 60px rgba(0,0,0,0.02), inset 0 0 0 1px rgba(255,255,255,0.8)",
          }}
          ref={containerRef}
        >
          {/* Subtle grid background */}
          <div style={{ 
            position: "absolute", inset: 0, 
            backgroundImage: `radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)`, 
            backgroundSize: "24px 24px", opacity: 0.5, borderRadius: 40, zIndex: -1 
          }} />

          {/* ========================================================================= */}
          {/* BEAMS RENDERED FIRST TO STAY BEHIND NODES */}
          {/* ========================================================================= */}
          
          {/* Web -> AI (Offset Y: 15) */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={backendRef}
            toRef={aiRef}
            gradientOpacity={0}
            pathOpacity={0.1}
            showArrow={false}
            curvature={0}
            startYOffset={15}
            endYOffset={15}
          />
          {/* AI -> Web (Offset Y: -15) */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={aiRef}
            toRef={backendRef}
            gradientOpacity={0}
            pathOpacity={0.1}
            showArrow={false}
            curvature={0}
            startYOffset={-15}
            endYOffset={-15}
          />
          {/* AI -> Embed (Offset X: 15) */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={aiRef}
            toRef={embedRef}
            gradientOpacity={0}
            pathOpacity={0.1}
            showArrow={false}
            curvature={0}
            startXOffset={15}
            endXOffset={15}
          />
          {/* Embed -> AI (Offset X: -15) */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={embedRef}
            toRef={aiRef}
            gradientOpacity={0}
            pathOpacity={0.1}
            showArrow={false}
            curvature={0}
            startXOffset={-15}
            endXOffset={-15}
          />
          {/* Web -> Embed (Offset Y: -15) */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={backendRef}
            toRef={embedRef}
            gradientOpacity={0}
            pathOpacity={0.1}
            showArrow={false}
            curvature={0}
            startYOffset={-15}
            endYOffset={-15}
          />

          {/* Step 1: Web -> AI */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={backendRef}
            toRef={aiRef}
            gradientStartColor="#10B981"
            gradientStopColor="#10B981"
            delay={0}
            duration={2.5}
            repeatDelay={TOTAL_CYCLE - 2.5}
            pathOpacity={0}
            showArrow
            curvature={0}
            startYOffset={15}
            endYOffset={15}
          />

          {/* Step 2: AI -> Embed */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={aiRef}
            toRef={embedRef}
            gradientStartColor="#8B5CF6"
            gradientStopColor="#8B5CF6"
            delay={2.5}
            duration={2}
            repeatDelay={TOTAL_CYCLE - 2}
            pathOpacity={0}
            showArrow
            reverse={false}
            reverseY={true}
            curvature={0}
            startXOffset={15}
            endXOffset={15}
          />

          {/* Step 3: Embed -> AI */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={embedRef}
            toRef={aiRef}
            gradientStartColor="#3B82F6"
            gradientStopColor="#3B82F6"
            delay={4.5}
            duration={2}
            repeatDelay={TOTAL_CYCLE - 2}
            pathOpacity={0}
            showArrow
            reverse={false}
            reverseY={false}
            curvature={0}
            startXOffset={-15}
            endXOffset={-15}
          />

          {/* Step 4: AI -> Web */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={aiRef}
            toRef={backendRef}
            gradientStartColor="#EF4444"
            gradientStopColor="#EF4444"
            delay={6.5}
            duration={2.5}
            repeatDelay={TOTAL_CYCLE - 2.5}
            pathOpacity={0}
            showArrow
            reverse={true}
            reverseY={true}
            curvature={0}
            startYOffset={-15}
            endYOffset={-15}
          />

          {/* Step 5: Embed -> Web */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={embedRef}
            toRef={backendRef}
            gradientStartColor="#F97316"
            gradientStopColor="#F97316"
            delay={9.0}
            duration={2.5}
            repeatDelay={TOTAL_CYCLE - 2.5}
            pathOpacity={0}
            showArrow
            curvature={0}
            startYOffset={-15}
            endYOffset={-15}
          />

          {/* Step 6: Web -> AI */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={backendRef}
            toRef={aiRef}
            gradientStartColor="#10B981"
            gradientStopColor="#10B981"
            delay={11.5}
            duration={2.5}
            repeatDelay={TOTAL_CYCLE - 2.5}
            pathOpacity={0}
            showArrow
            curvature={0}
            startYOffset={15}
            endYOffset={15}
          />

          {/* ========================================================================= */}
          {/* NODES RENDERED AFTER BEAMS TO BE ON TOP */}
          {/* ========================================================================= */}

          {/* Web / Backend (Left Center) */}
          <div style={{ position: "absolute", top: "calc(50% - 90px)", left: "10%", zIndex: 10 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div ref={backendRef} style={{ position: "relative", zIndex: 10, background: "rgba(255,255,255,1)", borderRadius: 28, padding: 4 }}>
                <IconBadge size={100} radius={28} gradient={["#EF4444", "#FCA5A5"]} shadow={"rgba(239,68,68,0.4)"}>
                  <div style={{ color: "white" }}><BackendIcon /></div>
                </IconBadge>
              </div>
              <div style={{ textAlign: "center", marginTop: 20, fontWeight: 800, fontSize: 20, color: "#B91C1C", textShadow: "0 2px 4px rgba(255,255,255,0.8)" }}>Web / Backend</div>
              <div style={{ fontSize: 12, color: "#EF4444", fontWeight: 600, textShadow: "0 2px 4px rgba(255,255,255,0.8)" }}>Client Interface</div>
            </div>
          </div>

          {/* Embedding Service (Top Right) */}
          <div style={{ position: "absolute", top: "15%", right: "15%", zIndex: 10 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div ref={embedRef} style={{ position: "relative", zIndex: 10, background: "rgba(255,255,255,1)", borderRadius: 28, padding: 4 }}>
                <IconBadge size={100} radius={28} gradient={["#F97316", "#FDBA74"]} shadow={"rgba(249,115,22,0.4)"}>
                  <div style={{ color: "white" }}><EmbeddingIcon /></div>
                </IconBadge>
              </div>
              <div style={{ textAlign: "center", marginTop: 20, fontWeight: 800, fontSize: 20, color: "#C2410C", textShadow: "0 2px 4px rgba(255,255,255,0.8)" }}>Embedding Service</div>
              <div style={{ fontSize: 12, color: "#F97316", fontWeight: 600, textShadow: "0 2px 4px rgba(255,255,255,0.8)" }}>Vector DB & Docs</div>
            </div>
          </div>

          {/* AI / Search Flow (Bottom Right) */}
          <div style={{ position: "absolute", bottom: "15%", right: "15%", zIndex: 10 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div ref={aiRef} style={{ position: "relative", zIndex: 10, background: "rgba(255,255,255,1)", borderRadius: 28, padding: 4 }}>
                <IconBadge size={100} radius={28} gradient={["#10B981", "#6EE7B7"]} shadow={"rgba(16,185,129,0.4)"}>
                  <div style={{ color: "white" }}><SearchFlowServiceIcon /></div>
                </IconBadge>
              </div>
              <div style={{ textAlign: "center", marginTop: 20, fontWeight: 800, fontSize: 20, color: "#047857", textShadow: "0 2px 4px rgba(255,255,255,0.8)" }}>Search Flow</div>
              <div style={{ fontSize: 12, color: "#10B981", fontWeight: 600, textShadow: "0 2px 4px rgba(255,255,255,0.8)" }}>AI Agents</div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* STATIC FLOATING LABELS */}
          {/* ========================================================================= */}
          
          <FloatingLabel 
            bottom="18%" left="12%"
            title="STEP 1" color="#10B981"
            desc={<ThaiText><span style={{fontWeight:800}}>1.</span> Web ส่ง Request แจ้งให้ AI ทำการค้นหาข้อมูล</ThaiText>}
          />

          <FloatingLabel 
            bottom="2%" left="12%"
            title="STEP 6" color="#10B981"
            desc={<ThaiText><span style={{fontWeight:800}}>6.</span> Web ส่ง Request กลับไปหา AI พร้อมแนบเอกสารยืนยัน</ThaiText>}
          />

          <FloatingLabel 
            bottom="30%" right="22%"
            title="STEP 2" color="#8B5CF6"
            desc={<ThaiText><span style={{fontWeight:800}}>2.</span> AI Agent สั่งค้นหาข้อมูลไปยัง Embedding Service</ThaiText>}
          />
 
          <FloatingLabel 
            top="38%" left="50%"
            title="STEP 3" color="#3B82F6"
            desc={<ThaiText><span style={{fontWeight:800}}>3.</span> Embedding Service ส่งผลลัพธ์กลับมาให้ AI</ThaiText>}
          />
 
          <FloatingLabel 
            bottom="12%" left="50%" transform="translateX(-50%)"
            title="STEP 4" color="#EF4444"
            desc={<ThaiText><span style={{fontWeight:800}}>4.</span> AI ส่งกลับเฉพาะ IDs ของเอกสารให้ฝั่ง Web</ThaiText>}
          />
 
          <FloatingLabel 
            top="12%" left="32%" transform="translateX(-50%)"
            title="STEP 5" color="#F97316"
            desc={<ThaiText><span style={{fontWeight:800}}>5.</span> Web ดึงเนื้อหาเต็มจาก Embedding Service</ThaiText>}
          />

        </motion.div>
      </div>
    </SlideShell>
  );
}
