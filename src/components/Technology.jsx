import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Reveal from "./Reveal.jsx";
import useScrollLock from "../hooks/useScrollLock.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import "./Technology.css";

// One representative photo per card. 01/02/05 are purpose-picked stock
// photos; 03/04 still use library photos chosen for mood (precision
// nutrition -> a single, closely-tended fruit; stress response -> the
// actual beneficial insect used for pest control).
const FEATURE_IMAGES = [
  "card-01.jpg",
  "card-02.jpg",
  "una-granada-primer-plano.jpeg",
  "bicho-para-combatir-plagas-primer-plano.jpeg",
  "card-05.jpg",
];

function TechModal({ feature, image, onClose }) {
  useScrollLock(true);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="tech-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="tech-modal"
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="tech-modal-close" onClick={onClose} aria-label="Close">
          <span />
          <span />
        </button>
        <div className="tech-modal-visual">
          <img src={`/img/fotos/${image}`} alt="" />
        </div>
        <div className="tech-modal-body">
          <span className="tech-feature-index">{feature.indexLabel}</span>
          <h3>{feature.title}</h3>
          <p>{feature.text}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Technology() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  const openFeature =
    openIndex !== null
      ? { ...t.technology.features[openIndex], indexLabel: String(openIndex + 1).padStart(2, "0") }
      : null;

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
              as="button"
              type="button"
              className="tech-feature"
              delay={(i % 4) + 1}
              key={f.title}
              onClick={() => setOpenIndex(i)}
              style={{ "--tech-feature-bg": `url(/img/fotos/${FEATURE_IMAGES[i]})` }}
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

      <AnimatePresence>
        {openFeature && (
          <TechModal
            feature={openFeature}
            image={FEATURE_IMAGES[openIndex]}
            onClose={() => setOpenIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
