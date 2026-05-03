import type { CSSProperties, ReactNode } from "react";

interface DotPointProps {
  children: ReactNode;
  gradient: [string, string];
  style?: CSSProperties;
}

export function DotPoint({ children, gradient, style }: DotPointProps) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", ...style }}>
      <div
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
          flexShrink: 0,
        }}
      />
      <p
        style={{
          fontSize: "var(--slide-body)",
          color: "#4B5563",
          margin: 0,
          lineHeight: 1.55,
        }}
      >
        {children}
      </p>
    </div>
  );
}
