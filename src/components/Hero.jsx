import { useState } from "react";
import "./Hero.css";

export default function Hero() {
  // The source clip is a one-way drone flythrough, not a seamless loop: a
  // hard restart would jump-cut back to the start position. Instead we
  // ping-pong between the clip and a pre-rendered reverse of itself, so the
  // flythrough glides forward then backward with no visible seam.
  const [reversed, setReversed] = useState(false);

  return (
    <section id="top" className="hero">
      <div className="hero-bg">
        <video
          key={reversed ? "rev" : "fwd"}
          className="hero-bg-video"
          src={reversed ? "/video/hero-bg-rev.mp4" : "/video/hero-bg.mp4"}
          poster="/video/hero-poster.jpg"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={() => setReversed((r) => !r)}
        />
        <div className="hero-bg-overlay" />
      </div>

      <div className="hero-content container">
        <p className="eyebrow hero-eyebrow">
          Agricultura regenerativa · Ecológica · Tecnológica
        </p>
        <h1 className="hero-title">AGROMONTE</h1>
        <p className="hero-tagline">Producir hoy, cuidando el mañana.</p>
        <p className="hero-desc">
          Más de 160 hectáreas en las que la granada, la mandarina Nadorcott y la
          aceituna Manzanilla crecen bajo un mismo principio: la rentabilidad y la
          regeneración del territorio se refuerzan, no compiten.
        </p>
        <div className="hero-actions">
          <a href="#proyecto" className="btn btn-primary">
            Descubre el proyecto
          </a>
          <a href="#contacto" className="btn btn-outline">
            Contacta con nosotros
          </a>
        </div>
      </div>

      <a href="#proyecto" className="hero-scroll" aria-label="Desplázate para descubrir más">
        <span className="hero-scroll-mouse">
          <span />
        </span>
        Desliza
      </a>
    </section>
  );
}
