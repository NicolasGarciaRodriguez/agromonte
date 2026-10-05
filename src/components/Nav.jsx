import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import "./Nav.css";

export default function Nav() {
  const { t } = useLanguage();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("lock-scroll", open);
    return () => document.body.classList.remove("lock-scroll");
  }, [open]);

  // Close the mobile menu whenever the route (or hash) actually changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  const links = [
    { to: "/", label: t.nav.home, active: location.pathname === "/" && !location.hash },
    { to: "/productos", label: t.nav.products, active: location.pathname.startsWith("/productos") },
    { to: "/#contacto", label: t.nav.contact, active: location.hash === "#contacto" },
  ];

  return (
    <header className={`nav${scrolled ? " nav--scrolled" : ""}${open ? " nav--open" : ""}`}>
      <div className="nav-inner container">
        <Link to="/" className="nav-brand">
          AGROMONTE
        </Link>

        <nav className="nav-links">
          {links.map((l) => (
            <Link key={l.label} to={l.to} className={l.active ? "is-active" : ""}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav-lang-desktop">
          <LanguageSwitcher />
        </div>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className="nav-mobile">
          {links.map((l) => (
            <Link key={l.label} to={l.to} className={l.active ? "is-active" : ""}>
              {l.label}
            </Link>
          ))}
          <div className="nav-mobile-lang">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
