import Reveal from "./Reveal.jsx";
import "./Certifications.css";

const CERTS = [
  {
    name: "Sohiscert",
    text: "Respaldo al cumplimiento de los requisitos de la producción ecológica.",
  },
  {
    name: "GLOBALG.A.P.",
    text: "Referencia internacional en buenas prácticas agrícolas, seguridad alimentaria y gestión de la explotación.",
  },
  {
    name: "GRASP",
    text: "Integración de criterios sociales y laborales dentro de la gestión de la finca.",
  },
  {
    name: "SPRING",
    text: "Atención especial a la gestión responsable y eficiente del agua.",
  },
];

export default function Certifications() {
  return (
    <section className="section certs">
      <div className="container">
        <Reveal as="p" className="eyebrow">Garantías</Reveal>
        <Reveal as="h2" delay={1} className="certs-title">
          Certificaciones que avalan cada hectárea
        </Reveal>

        <div className="certs-grid">
          {CERTS.map((c, i) => (
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
