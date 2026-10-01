import { LanguageContext } from "./LanguageContext";
import { translations } from "./i18n";

export function LanguageProvider({ children, initialLanguage = "en" }) {
  const language = initialLanguage === "tr" ? "tr" : "en";
  const setLanguage = (nextLanguage) => {
    if (nextLanguage === language || typeof window === "undefined") return;
    window.location.assign(`${nextLanguage === "tr" ? "/tr/" : "/"}${window.location.hash}`);
  };

  const value = { language, setLanguage, copy: translations[language] };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
