import type { ReactNode, CSSProperties } from "react";
import { useLanguage } from "../../hooks/useLanguage.ts";

interface ThaiTextProps {
  children: ReactNode;
  en?: ReactNode;
  style?: CSSProperties;
}

export function ThaiText({ children, en, style }: ThaiTextProps) {
  const { language } = useLanguage();

  if (language === "en" && en !== undefined) {
    return <span style={style}>{en}</span>;
  }

  return (
    <span style={{ fontFamily: '"Noto Sans Thai", sans-serif', ...style }}>
      {children}
    </span>
  );
}
