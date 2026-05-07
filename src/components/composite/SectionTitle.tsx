import type { CSSProperties, ReactNode } from "react";

interface SectionTitleProps {
  /** Leading icon (typically `<IconTile>` or `<IconBadge>`). */
  icon?: ReactNode;
  /** Main heading text. */
  children: ReactNode;
  /** Optional sub-label rendered to the right in lighter weight. */
  sub?: ReactNode;
  /** Override heading size. Defaults to 17. */
  size?: number;
  /** Override gap between icon and text. Defaults to 10. */
  gap?: number;
  style?: CSSProperties;
}

/**
 * Small icon + bold heading row. Used as in-column section headers
 * (slide 04 "The reality he runs into"), and pairs nicely with
 * `<IconTile>` (slide 04) or `<IconBadge>` (slides 08, 10).
 */
export function SectionTitle({
  icon,
  children,
  sub,
  size = 17,
  gap = 10,
  style,
}: SectionTitleProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap,
        ...style,
      }}
    >
      {icon}
      <span style={{ fontSize: size, fontWeight: 800, color: "#0A0A0A" }}>
        {children}
      </span>
      {sub && (
        <span style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 500 }}>
          {sub}
        </span>
      )}
    </div>
  );
}
