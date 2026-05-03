import type { CSSProperties, ReactNode } from "react";

export function GradientText({
  children,
  from = "#7C3AED",
  to = "#EC4899",
  via,
  style,
}: {
  children: ReactNode;
  from?: string;
  to?: string;
  via?: string;
  style?: CSSProperties;
}) {
  const gradient = via
    ? `linear-gradient(120deg, ${from} 0%, ${via} 50%, ${to} 100%)`
    : `linear-gradient(120deg, ${from} 0%, ${to} 100%)`;

  return (
    <span
      style={{
        background: gradient,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        display: "inline-block",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
