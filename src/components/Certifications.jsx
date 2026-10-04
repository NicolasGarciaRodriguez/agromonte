import Reveal from "./Reveal.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import "./Certifications.css";

export default function Certifications() {
  const { t } = useLanguage();

  return (
    <section className="section certs">
      <div className="container">
        <Reveal as="p" className="eyebrow">{t.certifications.eyebrow}</Reveal>
        <Reveal as="h2" delay={1} className="certs-title">
          {t.certifications.title}
        </Reveal>

        <div className="certs-grid">
          {t.certifications.certs.map((c, i) => (
            <Reveal as="div" className="cert-card" delay={(i % 4) + 1} key={c.name}>
              <div className="cert-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2l2.4 4.86 5.37.78-3.88 3.78.92 5.35L12 14.27l-4.81 2.5.92-5.35-3.88-3.78 5.37-.78L12 2z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>{c.name}</h3>
              <p>{c.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
