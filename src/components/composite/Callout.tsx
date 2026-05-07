import type { CSSProperties, ReactNode } from "react";

interface CalloutProps {
  children: ReactNode;
  /** Eyebrow label rendered above the body in the accent color. */
  eyebrow?: ReactNode;
  /** Hex accent color used for the left border + eyebrow text. */
  color?: string;
  /** Same color as `r,g,b` for translucent bg/border. */
  rgb?: string;
  /** Background opacity. Defaults to 0.04. */
  bgOpacity?: number;
  /** Override padding. Defaults to "12px 16px". */
  padding?: string;
  style?: CSSProperties;
}

/**
 * Soft callout box with a colored left border and optional eyebrow label.
 * Used for "Requirements" (Slide04) and the right-column caption (Slide05).
 */
export function Callout({
  children,
  eyebrow,
  color = "#7C3AED",
  rgb = "124,58,237",
  bgOpacity = 0.04,
  padding = "12px 16px",
  style,
}: CalloutProps) {
  return (
    <div
      style={{
        padding,
        background: `rgba(${rgb}, ${bgOpacity})`,
        borderRadius: 12,
        border: `1px solid rgba(${rgb}, 0.12)`,
        borderLeft: `3px solid ${color}`,
        ...style,
      }}
    >
      {eyebrow && (
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 5,
          }}
        >
          {eyebrow}
        </div>
      )}
      {children}
    </div>
  );
}
