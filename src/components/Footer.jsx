import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <span className="footer-brand">AGROMONTE</span>
          <p className="footer-tagline">Producir hoy, cuidando el mañana.</p>
        </div>

        <nav className="footer-links">
          <a href="#proyecto">Proyecto</a>
          <a href="#granada">Granada</a>
          <a href="#mandarina">Mandarina</a>
          <a href="#oliva">Olivar</a>
          <a href="#tecnologia">Tecnología</a>
          <a href="#contacto">Contacto</a>
        </nav>

        <p className="footer-copy">
          © {new Date().getFullYear()} Agromonte · Agricultura regenerativa, ecológica y tecnológica.
        </p>
      </div>
    </footer>
  );
}
