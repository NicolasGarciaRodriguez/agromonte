import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { LOCALES, translations } from "./translations.js";

const LanguageContext = createContext(null);
const STORAGE_KEY = "agromonte-lang";

function detectInitialLang() {
  if (typeof window === "undefined") return "es";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && translations[stored]) return stored;
  } catch {
    // localStorage can throw in private-browsing contexts; fall through.
  }
  const browserLang = (navigator.language || "es").slice(0, 2).toLowerCase();
  return translations[browserLang] ? browserLang : "es";
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore write failures (private browsing, storage disabled, etc.).
    }
  }, [lang]);

  function setLang(next) {
    if (translations[next]) setLangState(next);
  }

  const value = useMemo(
    () => ({ lang, setLang, t: translations[lang], locale: LOCALES[lang] }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
