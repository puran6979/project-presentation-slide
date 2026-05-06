import { motion } from "framer-motion";
import { SlideShell, SlideHeader } from "../components/index.ts";
import { stagger, cardRise } from "../lib/motion.ts";
import { useGoTo } from "../context/SlideContext.tsx";

export interface TOCItem {
  id: string;
  title: string;
  subtitle?: string;
  page: string;
}

export interface TOCSlideProps {
  items?: TOCItem[];
}

const DEFAULT_ITEMS: TOCItem[] = [
  { id: "01", title: "Problem Definition", subtitle: "Identifying the limitations in our legacy systems.", page: "03" },
  { id: "02", title: "Proposed Approach", subtitle: "A modern, agentic approach to knowledge retrieval.", page: "09" },
  { id: "03", title: "System Design & Implementation", subtitle: "Architecture, microservices, and AI pipelines.", page: "13" },
  { id: "04", title: "Testing & Evaluation", subtitle: "Validation metrics and performance results.", page: "23" },
  { id: "05", title: "Team & Timeline", subtitle: "Project roadmap and execution plan.", page: "25" },
];

export function TableOfContents({ items = DEFAULT_ITEMS }: TOCSlideProps) {
  const goTo = useGoTo();
  return (
    <SlideShell>
      <SlideHeader 
        label="Aingo"
        title="Table of" 
        highlight="Contents." 
        tagline="Presentation Agenda" 
      />
      
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 40, maxWidth: 1200, paddingLeft: 40 }}>
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            {...cardRise(stagger(0.2, 0.1, index))}
            whileHover={{ 
              x: 20, 
              backgroundColor: "rgba(217,70,239,0.04)",
              transition: { duration: 0.2, ease: "easeOut" } 
            }}
            whileTap={{ scale: 0.99, transition: { duration: 0.1 } }}
            onClick={() => goTo(parseInt(item.page, 10) - 1)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 32,
              padding: "16px 32px",
              borderRadius: 24,
              cursor: "pointer",
            }}
          >
            {/* Section ID */}
            <div style={{ 
              fontSize: 36, 
              fontWeight: 800, 
              color: "#D946EF",
              opacity: 0.8,
              fontVariantNumeric: "tabular-nums"
            }}>
              {item.id}
            </div>
            
            {/* Text Content */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#111", marginBottom: 6, letterSpacing: "-0.5px" }}>
                {item.title}
              </div>
              {item.subtitle && (
                <div style={{ fontSize: 18, color: "#666", fontWeight: 500 }}>
                  {item.subtitle}
                </div>
              )}
            </div>
            
            {/* Page Number & Arrow */}
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <div style={{ 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "flex-end",
                justifyContent: "center" 
              }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: 1 }}>Page</span>
                <span style={{ fontSize: 24, fontWeight: 800, color: "#444", fontVariantNumeric: "tabular-nums" }}>{item.page}</span>
              </div>
              
              <div style={{ 
                width: 48, 
                height: 48, 
                borderRadius: 24, 
                background: "rgba(217, 70, 239, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#D946EF",
                boxShadow: "0 4px 12px rgba(217, 70, 239, 0.1)"
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  );
}
