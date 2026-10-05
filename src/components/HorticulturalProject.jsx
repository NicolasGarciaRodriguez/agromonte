import Reveal from "./Reveal.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import "./HorticulturalProject.css";

export default function HorticulturalProject() {
  const { t } = useLanguage();
  const h = t.horticultural;

  return (
    <section id="horticola" className="section horticultural">
      <div className="horticultural-bg">
        <img src="/img/fotos/proyecto_horticola.jpeg" alt="" aria-hidden="true" />
      </div>
      <div className="horticultural-overlay" />

      <div className="container horticultural-content">
        <Reveal as="p" className="eyebrow">
          {h.eyebrow}
        </Reveal>
        <Reveal as="h2" delay={1} className="horticultural-title">
          {h.title}
        </Reveal>
        <Reveal as="p" delay={2} className="horticultural-lead">
          {h.lead}
        </Reveal>

        <Reveal delay={2} className="horticultural-crops">
          {h.crops.map((crop) => (
            <span key={crop}>{crop}</span>
          ))}
        </Reveal>

        <div className="horticultural-blocks">
          {h.blocks.map((b, i) => (
            <Reveal as="div" className="horticultural-block" delay={(i % 4) + 1} key={b.title}>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={3} className="horticultural-stats">
          {h.stats.map((s) => (
            <div className="horticultural-stat" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </Reveal>

        <Reveal as="p" delay={4} className="horticultural-tagline">
          {h.tagline}
        </Reveal>
      </div>
    </section>
  );
}
