import Reveal from "./Reveal.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import "./About.css";

const PILLAR_IMAGES = [
  "sistema-de-tuneles-granadas-plano-medio.jpeg",
  "sistema-de-tuneles-plano-general.jpeg",
  "abeja-en-flor-primer-plano.jpeg",
];

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="proyecto" className="section about">
      <div className="container about-intro">
        <Reveal as="p" className="eyebrow">
          {t.about.eyebrow}
        </Reveal>
        <Reveal as="h2" delay={1} className="about-title">
          {t.about.title}
        </Reveal>
        <div className="about-body">
          <Reveal as="p" delay={2} className="about-lead">
            {t.about.lead}
          </Reveal>
          <Reveal as="p" delay={3} className="about-text">
            {t.about.text}
          </Reveal>
        </div>
      </div>

      <div className="container about-pillars">
        {t.about.pillars.map((p, i) => (
          <Reveal
            as="article"
            className="pillar-card"
            delay={(i % 3) + 1}
            key={p.title}
          >
            <div className="pillar-img">
              <img src={`/img/fotos/${PILLAR_IMAGES[i]}`} alt="" loading="lazy" />
            </div>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
