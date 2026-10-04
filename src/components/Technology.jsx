import Reveal from "./Reveal.jsx";
import "./Technology.css";

const FEATURES = [
  {
    title: "Monitorización en tiempo real",
    text: "Sensores que miden las necesidades reales de cada cultivo, parcela a parcela.",
  },
  {
    title: "Riego automatizado",
    text: "Ajuste continuo del riego para optimizar cada litro de agua empleado.",
  },
  {
    title: "Nutrición de precisión",
    text: "Control y ajuste de la nutrición vegetal según el estado de cada planta.",
  },
  {
    title: "Respuesta ante el estrés",
    text: "Seguimiento de variables ambientales y reacción temprana ante situaciones críticas.",
  },
  {
    title: "Decisiones basadas en datos",
    text: "Menos errores operativos gracias a una gestión guiada por información real.",
  },
];

export default function Technology() {
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
        <Reveal as="p" className="eyebrow">Tecnología &amp; domotización</Reveal>
        <Reveal as="h2" delay={1} className="tech-title">
          Agricultura de precisión al servicio del cultivo
        </Reveal>
        <Reveal as="p" delay={2} className="tech-lead">
          La domotización permite gestionar de forma coordinada el riego, la
          nutrición y las condiciones ambientales de toda la explotación. La
          tecnología no sustituye al conocimiento agrícola: lo potencia.
        </Reveal>

        <div className="tech-grid">
          {FEATURES.map((f, i) => (
            <Reveal as="div" className="tech-feature" delay={(i % 4) + 1} key={f.title}>
              <span className="tech-feature-index">{String(i + 1).padStart(2, "0")}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
