import { useState, useEffect } from "react";
import { SlideShell, SlideHeader, ProgressTracker } from "../components/index.ts";

export function TempSlide() {
  const [current, setCurrent] = useState(1);
  
  const sections = [
    { label: "Intro", count: 3 },
    { label: "Problem", count: 4 },
    { label: "Approach", count: 5 },
    { label: "Architecture", count: 6 },
    { label: "Results", count: 4 },
  ];
  const total = 22;

  // Auto play mode
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev >= total ? 1 : prev + 1));
    }, 800); // Fast enough to see the animation loop quickly
    return () => clearInterval(timer);
  }, [total, autoPlay]);

  return (
    <SlideShell>
      <SlideHeader 
        label="Aingo"
        title="Progress Tracker" 
        highlight="Component." 
        tagline="Flexible layout variants for tracking presentation state" 
      />
      
      <div style={{ display: "flex", flexDirection: "column", gap: 60, marginTop: 40, width: "90%", margin: "0 auto", padding: 40 }}>
        
        {/* Line Variant */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontSize: 18, color: "#666", fontWeight: 600 }}>Variant: Line (Continuous)</h3>
            <span style={{ fontSize: 14, color: "#888", fontFamily: "monospace" }}>height: 4px</span>
          </div>
          <ProgressTracker sections={sections} current={current} variant="line" activeColor="#8B5CF6" />
        </div>

        {/* Thick Line Variant */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontSize: 18, color: "#666", fontWeight: 600 }}>Variant: Thick Line</h3>
            <span style={{ fontSize: 14, color: "#888", fontFamily: "monospace" }}>height: 8px</span>
          </div>
          <ProgressTracker sections={sections} current={current} variant="line" thickness={8} activeColor="#10B981" />
        </div>

        {/* Bars Variant */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontSize: 18, color: "#666", fontWeight: 600 }}>Variant: Bars (Segmented)</h3>
            <span style={{ fontSize: 14, color: "#888", fontFamily: "monospace" }}>thickness: 6, gap: 4</span>
          </div>
          <ProgressTracker sections={sections} current={current} variant="bars" thickness={6} gap={4} activeColor="#3B82F6" />
        </div>

        {/* Dots Variant */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontSize: 18, color: "#666", fontWeight: 600 }}>Variant: Dots (Expanding Pill Active State)</h3>
            <span style={{ fontSize: 14, color: "#888", fontFamily: "monospace" }}>thickness: 8, gap: 10</span>
          </div>
          <ProgressTracker sections={sections} current={current} variant="dots" thickness={8} gap={10} activeColor="#F43F5E" />
        </div>

        {/* Interactive Controls */}
        <div style={{ marginTop: 20, padding: 30, background: "rgba(0,0,0,0.02)", borderRadius: 20, border: "1px solid rgba(0,0,0,0.05)" }}>
          <h3 style={{ marginBottom: 20, fontSize: 18, color: "#333", fontWeight: 700 }}>Interactive Controls</h3>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <button 
              onClick={() => { setAutoPlay(false); setCurrent(Math.max(1, current - 1)); }} 
              style={{ padding: "10px 24px", borderRadius: 12, border: "1px solid #ccc", background: "#fff", cursor: "pointer", fontWeight: 600 }}
            >
              ← Prev
            </button>
            <button 
              onClick={() => { setAutoPlay(false); setCurrent(Math.min(total, current + 1)); }} 
              style={{ padding: "10px 24px", borderRadius: 12, border: "1px solid #ccc", background: "#fff", cursor: "pointer", fontWeight: 600 }}
            >
              Next →
            </button>
            
            <div style={{ width: 1, height: 30, background: "#ccc", margin: "0 10px" }} />
            
            <button 
              onClick={() => setAutoPlay(!autoPlay)} 
              style={{ padding: "10px 24px", borderRadius: 12, border: "none", background: autoPlay ? "#EF4444" : "#10B981", color: "white", cursor: "pointer", fontWeight: 600 }}
            >
              {autoPlay ? "Stop Auto-Play" : "Start Auto-Play"}
            </button>

            <span style={{ marginLeft: "auto", fontSize: 24, fontWeight: 800, color: "#0A0A0A" }}>
              {current} <span style={{ color: "#aaa" }}>/ {total}</span>
            </span>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
