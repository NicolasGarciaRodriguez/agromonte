import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext.jsx";

const SITE_URL = "https://www.agromonte.es";
const OG_LOCALES = { es: "es_ES", en: "en_US", fr: "fr_FR" };

const PAGE_KEY_BY_PATH = {
  "/": "home",
  "/productos": "products",
};

function setMeta(selector, attr, content) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, content);
}

export default function Seo() {
  const location = useLocation();
  const { t, lang } = useLanguage();

  useEffect(() => {
    const pageKey = PAGE_KEY_BY_PATH[location.pathname] || "home";
    const page = t.seo[pageKey] || t.seo.home;
    const url = `${SITE_URL}${location.pathname === "/" ? "/" : location.pathname}`;

    document.title = page.title;
    setMeta('meta[name="description"]', "content", page.description);
    setMeta('link[rel="canonical"]', "href", url);

    setMeta('meta[property="og:title"]', "content", page.title);
    setMeta('meta[property="og:description"]', "content", page.description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:locale"]', "content", OG_LOCALES[lang] || "es_ES");

    setMeta('meta[name="twitter:title"]', "content", page.title);
    setMeta('meta[name="twitter:description"]', "content", page.description);
  }, [location.pathname, t, lang]);

  return null;
}
