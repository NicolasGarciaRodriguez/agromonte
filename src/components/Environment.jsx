import Reveal from "./Reveal.jsx";
import "./Environment.css";

export default function Environment() {
  return (
    <section className="section environment">
      <div className="environment-bg">
        <img src="/img/fotos/ocas-por-el-campo-plano-medio.jpeg" alt="" aria-hidden="true" />
      </div>
      <div className="environment-overlay" />

      <div className="container environment-content">
        <Reveal as="p" className="eyebrow">Huella hídrica &amp; huella de carbono</Reveal>
        <Reveal as="h2" delay={1} className="environment-title">
          Cuidar el entorno no es un añadido: es el método
        </Reveal>
        <Reveal as="p" delay={2} className="environment-text">
          Riego tecnificado, sensorización y sistemas de protección del cultivo
          reducen el consumo de agua hasta niveles técnicamente optimizados. La
          agricultura regenerativa mejora, además, la salud del suelo y favorece
          el almacenamiento de carbono en el propio ecosistema agrícola. Nuestro
          compromiso no se limita a «contaminar menos»: perseguimos conservar los
          recursos, regenerar el suelo y aumentar la biodiversidad mientras
          producimos alimentos de calidad.
        </Reveal>

        <div className="environment-stats">
          <Reveal className="environment-stat" delay={2}>
            <strong>50.000+</strong>
            <span>árboles en masa forestal, fijando CO₂</span>
          </Reveal>
          <Reveal className="environment-stat" delay={3}>
            <strong>Control biológico</strong>
            <span>fauna auxiliar para el manejo natural de plagas</span>
          </Reveal>
          <Reveal className="environment-stat" delay={4}>
            <strong>Riego de precisión</strong>
            <span>sensorización que ajusta el agua a la necesidad real</span>
          </Reveal>
        </div>

        <div className="environment-gallery">
          <Reveal as="div" delay={2} className="environment-thumb">
            <img src="/img/fotos/abeja-en-flor-primer-plano.jpeg" alt="Abeja polinizando una flor en la finca" loading="lazy" />
          </Reveal>
          <Reveal as="div" delay={3} className="environment-thumb">
            <img src="/img/fotos/bicho-para-combatir-plagas-primer-plano.jpeg" alt="Insecto auxiliar para el control biológico de plagas" loading="lazy" />
          </Reveal>
          <Reveal as="div" delay={4} className="environment-thumb">
            <img src="/img/fotos/bichos-para-combatir-plagas-primer-plano.jpeg" alt="Fauna auxiliar utilizada en el control biológico" loading="lazy" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
