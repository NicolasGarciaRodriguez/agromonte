import { useLanguage } from "../i18n/LanguageContext.jsx";
import "./Footer.css";

export default function Footer() {
  const { t } = useLanguage();
  const { links } = t.footer;

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <span className="footer-brand">AGROMONTE</span>
          <p className="footer-tagline">{t.footer.tagline}</p>
        </div>

        <nav className="footer-links">
          <a href="#proyecto">{links.proyecto}</a>
          <a href="#granada">{links.granada}</a>
          <a href="#mandarina">{links.mandarina}</a>
          <a href="#oliva">{links.oliva}</a>
          <a href="#tecnologia">{links.tecnologia}</a>
          <a href="#contacto">{links.contacto}</a>
        </nav>

        <p className="footer-copy">{t.footer.copy(new Date().getFullYear())}</p>
      </div>
    </footer>
  );
}
