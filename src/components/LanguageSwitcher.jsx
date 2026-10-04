import { useLanguage } from "../i18n/LanguageContext.jsx";
import { LANGUAGES } from "../i18n/translations.js";
import "./LanguageSwitcher.css";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="lang-switcher" role="group" aria-label="Idioma / Language / Langue">
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          className={l.code === lang ? "is-active" : ""}
          onClick={() => setLang(l.code)}
          aria-pressed={l.code === lang}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
