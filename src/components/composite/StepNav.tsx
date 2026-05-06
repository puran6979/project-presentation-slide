import { useEffect, useState, type AnimatePresence as _AP } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── useStepNav ─────────────────────────────────────────────────────────────
// Manages activeStep (0 = overview, 1…total = steps).
// Binds , / . keyboard shortcuts.
export function useStepNav(total: number) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === ",") setActiveStep((s) => (s <= 0 ? total : s - 1));
      if (e.key === ".") setActiveStep((s) => (s >= total ? 0 : s + 1));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  function advance() {
    setActiveStep((s) => (s >= total ? 0 : s + 1));
  }
  function retreat() {
    setActiveStep((s) => (s <= 0 ? total : s - 1));
  }

  return { activeStep, setActiveStep, advance, retreat };
}

// ── StepNavBar ─────────────────────────────────────────────────────────────
// Bottom navigation bar: ‹ dots › + step counter.
export function StepNavBar({
  activeStep,
  steps,
  onAdvance,
  onRetreat,
  onJump,
}: {
  activeStep: number;
  steps: { id: number; color: string; rgb: string }[];
  onAdvance: () => void;
  onRetreat: () => void;
  onJump: (step: number) => void;
}) {
  const current = activeStep > 0 ? steps[activeStep - 1] : null;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "absolute",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        gap: 12,
        zIndex: 50,
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 40,
        padding: "8px 20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <button
        onClick={onRetreat}
        style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          border: "1.5px solid rgba(0,0,0,0.12)",
          background: "white",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          color: "#374151",
          flexShrink: 0,
        }}
      >
        ‹
      </button>

      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        {steps.map((s) => (
          <button
            key={s.id}
            onClick={() => onJump(s.id)}
            style={{
              width: activeStep === s.id ? 28 : 10,
              height: 10,
              borderRadius: 5,
              border: "none",
              background: activeStep === s.id ? s.color : "rgba(0,0,0,0.15)",
              cursor: "pointer",
              transition: "all 0.25s ease",
              padding: 0,
              boxShadow:
                activeStep === s.id ? `0 0 8px rgba(${s.rgb},0.6)` : "none",
            }}
          />
        ))}
      </div>

      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: current ? current.color : "#9CA3AF",
          minWidth: 52,
          textAlign: "center",
          transition: "color 0.2s",
        }}
      >
        {activeStep === 0 ? "Overview" : `Step ${activeStep} / ${steps.length}`}
      </div>

      <button
        onClick={onAdvance}
        style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          border: "1.5px solid rgba(0,0,0,0.12)",
          background: "white",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          color: "#374151",
          flexShrink: 0,
        }}
      >
        ›
      </button>
    </div>
  );
}

// ── NodeRing ───────────────────────────────────────────────────────────────
// Animated glow ring around a node when it is part of the active step.
export function NodeRing({
  active,
  color,
  rgb,
}: {
  active: boolean;
  color: string;
  rgb: string;
}) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="ring"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25 }}
          style={{
            position: "absolute",
            inset: -10,
            borderRadius: 38,
            border: `2.5px solid ${color}`,
            boxShadow: `0 0 0 4px ${color}22, 0 0 24px rgba(${rgb},0.5)`,
            pointerEvents: "none",
            zIndex: 5,
          }}
        />
      )}
    </AnimatePresence>
  );
}

// suppress unused import warning — AnimatePresence re-exported for convenience
void (undefined as unknown as typeof _AP);
