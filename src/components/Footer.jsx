import { Link } from "react-router-dom";
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
          <Link to="/#proyecto">{links.proyecto}</Link>
          <Link to="/productos#granada">{links.granada}</Link>
          <Link to="/productos#mandarina">{links.mandarina}</Link>
          <Link to="/productos#oliva">{links.oliva}</Link>
          <Link to="/#horticola">{links.horticola}</Link>
          <Link to="/#tecnologia">{links.tecnologia}</Link>
          <Link to="/#contacto">{links.contacto}</Link>
        </nav>

        <p className="footer-copy">{t.footer.copy(new Date().getFullYear())}</p>
      </div>
    </footer>
  );
}
