import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { CSSProperties } from "react";

export type TrackerVariant = "bars" | "dots" | "line";

export interface TrackerSection {
  label: string;
  count: number;
}

export interface ProgressTrackerProps {
  /** Provide either total OR sections */
  total?: number;
  sections?: TrackerSection[];
  /** Current step/slide (1-indexed) */
  current: number;
  /** Visual variant */
  variant?: TrackerVariant;
  /** Color of inactive/upcoming steps */
  baseColor?: string;
  /** Color of active/completed steps */
  activeColor?: string;
  /** Overall width of the tracker */
  width?: number | string;
  /** Height or thickness of the tracker */
  thickness?: number;
  /** Gap between individual segments */
  gap?: number;
  /** Called with the 1-indexed slide number when a dot/bar is clicked */
  onDotClick?: (slideNum: number) => void;
  style?: CSSProperties;
}

export function ProgressTracker({
  total,
  sections,
  current,
  variant = "bars",
  baseColor = "rgba(0,0,0,0.15)",
  activeColor = "#0A0A0A",
  width = "100%",
  thickness = 4,
  gap = 4,
  onDotClick,
  style,
}: ProgressTrackerProps) {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const resolvedTotal = sections
    ? sections.reduce((acc, s) => acc + s.count, 0)
    : total || 1;
  const safeCurrent = Math.max(1, Math.min(current, resolvedTotal));
  const sectionList = sections || [{ label: "", count: resolvedTotal }];
  const clickable = !!onDotClick;

  // ── Line variant ──────────────────────────────────────────────────────────
  if (variant === "line") {
    let acc = 0;
    let activeLabel = "";
    for (const s of sectionList) {
      acc += s.count;
      if (safeCurrent <= acc) { activeLabel = s.label; break; }
    }
    const progressPercent = (safeCurrent / resolvedTotal) * 100;
    return (
      <div style={{ width, ...style }}>
        <AnimatePresence mode="wait">
          {activeLabel && (
            <motion.div
              key={activeLabel}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              style={{
                fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: 1, color: activeColor, marginBottom: 8, textAlign: "right",
              }}
            >
              {activeLabel}
            </motion.div>
          )}
        </AnimatePresence>
        <div style={{ height: thickness, backgroundColor: baseColor, borderRadius: thickness / 2, overflow: "hidden", position: "relative" }}>
          <motion.div
            initial={false}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ position: "absolute", left: 0, top: 0, bottom: 0, backgroundColor: activeColor, borderRadius: thickness / 2 }}
          />
        </div>
      </div>
    );
  }

  // ── Bars / Dots variant ───────────────────────────────────────────────────
  const isDots = variant === "dots";
  let globalStep = 0;

  return (
    <div style={{ display: "flex", width, gap: sections ? gap * 4 : gap, ...style }}>
      {sectionList.map((section, sIdx) => {
        const sectionStart = globalStep + 1;
        const sectionEnd = globalStep + section.count;
        const isActiveSection = safeCurrent >= sectionStart && safeCurrent <= sectionEnd;

        return (
          <div
            key={sIdx}
            style={{ display: "flex", flexDirection: "column", gap: 8, flex: section.count }}
          >
            {/* Section label */}
            {section.label && (
              <div
                style={{
                  fontSize: 10,
                  fontWeight: isActiveSection ? 800 : 600,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  color: isActiveSection ? activeColor : baseColor,
                  opacity: isActiveSection ? 1 : 0.6,
                  transition: "all 0.3s ease",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  userSelect: "none",
                }}
              >
                {section.label}
              </div>
            )}

            {/* Dot / bar items */}
            <div style={{ display: "flex", gap, width: "100%" }}>
              {Array.from({ length: section.count }).map(() => {
                globalStep++;
                const step = globalStep; // capture for closure
                const isActive = step === safeCurrent;
                const isCompleted = step < safeCurrent;
                const isHovered = hoveredStep === step;

                let itemWidth: number | string = isDots ? thickness : "100%";
                if (isDots && (isActive || isHovered)) itemWidth = thickness * 3;

                return (
                  <div
                    key={step}
                    onMouseEnter={() => setHoveredStep(step)}
                    onMouseLeave={() => setHoveredStep(null)}
                    onClick={() => clickable && onDotClick(step)}
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "12px 2px",
                      cursor: clickable ? "pointer" : "default",
                    }}
                  >
                    {/* Hover tooltip (dots only, when clickable) */}
                    <AnimatePresence>
                      {isDots && clickable && isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.85 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.85 }}
                          transition={{ duration: 0.15 }}
                          style={{
                            position: "absolute",
                            bottom: "100%",
                            marginBottom: 4,
                            left: "50%",
                            x: "-50%",
                            background: "rgba(10,10,10,0.88)",
                            color: "#fff",
                            fontSize: 10,
                            fontWeight: 700,
                            padding: "3px 8px",
                            borderRadius: 6,
                            whiteSpace: "nowrap",
                            pointerEvents: "none",
                            backdropFilter: "blur(4px)",
                            zIndex: 200,
                          }}
                        >
                          {step}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.div
                      initial={false}
                      animate={{
                        width: itemWidth,
                        backgroundColor:
                          isActive || isHovered || isCompleted ? activeColor : baseColor,
                        opacity: isActive ? 1 : isHovered ? 0.8 : isCompleted ? 0.45 : 0.3,
                        scaleY: isHovered && !isActive ? 1.4 : 1,
                      }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      style={{
                        height: thickness,
                        borderRadius: thickness / 2,
                        flex: isDots ? "none" : 1,
                        pointerEvents: "none",
                        originY: "center",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
