import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import "./Hero.css";

export default function Hero() {
  // The source clip is a one-way drone flythrough, not a seamless loop: a
  // hard restart would jump-cut back to the start position. Instead we
  // ping-pong between the clip and a pre-rendered reverse of itself, so the
  // flythrough glides forward then backward with no visible seam.
  const [reversed, setReversed] = useState(false);
  const { t } = useLanguage();

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
        <p className="eyebrow hero-eyebrow">{t.hero.eyebrow}</p>
        <h1 className="hero-title">AGROMONTE</h1>
        <p className="hero-tagline">{t.hero.tagline}</p>
        <p className="hero-desc">{t.hero.desc}</p>
        <div className="hero-actions">
          <a href="#proyecto" className="btn btn-primary">
            {t.hero.ctaPrimary}
          </a>
          <a href="#contacto" className="btn btn-outline">
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>

      <a
        href="#proyecto"
        className="hero-scroll"
        aria-label={t.hero.scroll}
      >
        <span className="hero-scroll-mouse">
          <span />
        </span>
        {t.hero.scroll}
      </a>
    </section>
  );
}
