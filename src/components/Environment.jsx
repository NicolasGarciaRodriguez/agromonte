import Reveal from "./Reveal.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import "./Environment.css";

const GALLERY_IMAGES = [
  "abeja-en-flor-primer-plano.jpeg",
  "granada-primer-plano-floreciendo-2.jpeg",
  "bicho-para-combatir-plagas-primer-plano.jpeg",
  "bichos-para-combatir-plagas-primer-plano.jpeg",
  "granada-primer-plano-floreciendo.jpeg",
];

// Matches the original hand-picked stagger (2, 4, 3) rather than a plain
// sequential reveal.
const STAT_DELAYS = [2, 4, 3];

export default function Environment() {
  const { t } = useLanguage();

  return (
    <section className="section environment">
      <div className="environment-bg">
        <img
          src="/img/fotos/ocas-por-el-campo-plano-medio.jpeg"
          alt=""
          aria-hidden="true"
        />
      </div>
      <div className="environment-overlay" />

      <div className="container environment-content">
        <Reveal as="p" className="eyebrow">
          {t.environment.eyebrow}
        </Reveal>
        <Reveal as="h2" delay={1} className="environment-title">
          {t.environment.title}
        </Reveal>
        <Reveal as="p" delay={2} className="environment-text">
          {t.environment.text}
        </Reveal>

        <div className="environment-stats">
          {t.environment.stats.map((s, i) => (
            <Reveal className="environment-stat" delay={STAT_DELAYS[i]} key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </Reveal>
          ))}
        </div>

        <div className="environment-gallery">
          {GALLERY_IMAGES.map((img, i) => (
            <Reveal as="div" delay={(i % 3) + 2} className="environment-thumb" key={img}>
              <img src={`/img/fotos/${img}`} alt={t.environment.galleryAlt[i]} loading="lazy" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
