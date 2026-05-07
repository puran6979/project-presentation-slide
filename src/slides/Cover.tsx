import { motion } from "framer-motion";
import { AccentLine, GradientText, SlideShell } from "../components/index.ts";
import { bodyText, bottomStrip, heroTitle, topBar } from "../lib/motion.ts";

const GLOWS = [
  { top: -320, right: -180, size: 960, color: "124,58,237", opacity: 0.18 },
  { bottom: -200, left: -120, size: 640, color: "168,85,247", opacity: 0.09 },
];

export function Cover() {
  return (
    <SlideShell glows={GLOWS}>
      {/* Top bar */}
      <motion.div
        {...topBar()}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #7C3AED, #A855F7)",
              boxShadow: "0 0 8px rgba(124,58,237,0.6)",
            }}
          />
          <span
            style={{
              fontSize: 17,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#7C3AED",
              fontWeight: 700,
            }}
          >
            Project AiQ
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span
            style={{
              fontSize: 16,
              color: "#C4B5FD",
              letterSpacing: "0.08em",
              fontWeight: 500,
            }}
          >
            Knowledge Management
          </span>
          <div style={{ width: 1, height: 14, background: "#E5E7EB" }} />
          <span
            style={{ fontSize: 16, color: "#9CA3AF", letterSpacing: "0.06em" }}
          >
            2026
          </span>
        </div>
      </motion.div>

      {/* Hero */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <motion.h1
          {...heroTitle()}
          style={{
            fontSize: 150,
            fontWeight: 900,
            letterSpacing: "-4px",
            lineHeight: 1.0,
            margin: "0 0 48px",
            color: "#0A0A0A",
            userSelect: "none",
            paddingTop: 8,
          }}
        >
          Intelligence
          <br />
          That Drives
          <br />
          <GradientText>Execution.</GradientText>
        </motion.h1>

        <AccentLine delay={0.55} width={140} style={{ marginBottom: 36 }} />

        <motion.p
          {...bodyText()}
          style={{
            fontSize: 34,
            color: "#6B7280",
            margin: 0,
            fontWeight: 400,
            letterSpacing: "-0.3px",
            lineHeight: 1.5,
          }}
        >
          An AI-driven Knowledge Management Platform
        </motion.p>
      </div>

      {/* Bottom strip */}
      <motion.div
        {...bottomStrip()}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: 28 }}>
          {(["Intelligence", "Knowledge", "Execution"] as const).map(
            (tag, i) => (
              <span
                key={tag}
                style={{
                  fontSize: 14,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: i === 0 ? "#7C3AED" : "#D1D5DB",
                  fontWeight: 600,
                }}
              >
                {tag}
              </span>
            ),
          )}
        </div>
        <span
          style={{ fontSize: 14, color: "#E5E7EB", letterSpacing: "0.08em" }}
        >
          AiQ — v1.0
        </span>
      </motion.div>
    </SlideShell>
  );
}
