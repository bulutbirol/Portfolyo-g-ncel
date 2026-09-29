import { useEffect, useMemo, useState } from "react";
import { LanguageContext } from "./LanguageContext";
import { getLanguage, translations } from "./i18n";

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      return getLanguage(typeof window === "undefined" ? null : window.localStorage);
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === "tr"
      ? "Birol Bulut | Full Stack Geliştirici"
      : "Birol Bulut | Full-Stack Developer";
    try {
      window.localStorage.setItem("birolweb-language", language);
    } catch {
      // The language still works when storage is unavailable.
    }
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage, copy: translations[language] }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
