import Reveal from "./Reveal.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import "./Technology.css";

export default function Technology() {
  const { t } = useLanguage();

  return (
    <section id="tecnologia" className="section tech">
      <div className="tech-bg">
        <img
          src="/img/fotos/sistema-de-tuneles-granadas-plano-general.jpeg"
          alt=""
          aria-hidden="true"
        />
      </div>
      <div className="tech-overlay" />

      <div className="container tech-content">
        <Reveal as="p" className="eyebrow">
          {t.technology.eyebrow}
        </Reveal>
        <Reveal as="h2" delay={1} className="tech-title">
          {t.technology.title}
        </Reveal>
        <Reveal as="p" delay={2} className="tech-lead">
          {t.technology.lead}
        </Reveal>

        <div className="tech-grid">
          {t.technology.features.map((f, i) => (
            <Reveal
              as="div"
              className="tech-feature"
              delay={(i % 4) + 1}
              key={f.title}
            >
              <span className="tech-feature-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
