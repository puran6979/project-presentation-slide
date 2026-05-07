import { useContext } from "react";
import { LanguageContext, type Language } from "../context/LanguageContext.tsx";

export function useLanguage() {
  return useContext(LanguageContext);
}

export type { Language };
