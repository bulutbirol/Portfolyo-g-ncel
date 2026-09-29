import { createContext, useContext } from "react";
import { translations } from "./i18n";

export const LanguageContext = createContext({
  language: "en",
  setLanguage: () => {},
  copy: translations.en,
});

export function useLanguage() {
  return useContext(LanguageContext);
}
