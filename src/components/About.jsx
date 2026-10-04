import Reveal from "./Reveal.jsx";
import "./About.css";

const PILLARS = [
  {
    img: "sistema-de-tuneles-granadas-plano-medio.jpeg",
    title: "Suelo vivo, activo productivo",
    text: "El suelo deja de ser un simple soporte: cuidamos su estructura y actividad biológica, conservamos la materia orgánica y favorecemos sistemas capaces de almacenar carbono. Un suelo equilibrado retiene más agua y hace los cultivos más resilientes.",
  },
  {
    img: "sistema-de-tuneles-plano-general.jpeg",
    title: "Agua de precisión",
    text: "Sensores, automatización y el sistema de túneles desarrollado para el granado ajustan el riego a la necesidad real de cada cultivo, reducen el estrés térmico y evitan consumos innecesarios de un recurso estratégico en el Mediterráneo.",
  },
  {
    img: "abeja-en-flor-primer-plano.jpeg",
    title: "Biodiversidad y entorno",
    text: "Más de 50.000 árboles en masa forestal y una gestión que promueve la vida silvestre convierten la finca en un ecosistema productivo, donde actividad agrícola y conservación ambiental avanzan juntas.",
  },
];

export default function About() {
  return (
    <section id="proyecto" className="section about">
      <div className="container about-intro">
        <Reveal as="p" className="eyebrow">El proyecto</Reveal>
        <Reveal as="h2" delay={1} className="about-title">
          Una nueva forma de entender la agricultura
        </Reveal>
        <div className="about-body">
          <Reveal as="p" delay={2} className="about-lead">
            Agromonte combina cultivos leñosos de alto valor, nuevas superficies
            hortícolas ecológicas, automatización y sensorización con una
            estrategia activa de conservación ambiental.
          </Reveal>
          <Reveal as="p" delay={3} className="about-text">
            No se trata solo de producir bajo criterios ecológicos: desarrollamos
            un modelo integral de agricultura regenerativa en el que el suelo, el
            agua, la biodiversidad y la eficiencia de los recursos forman parte
            del propio sistema productivo. La sostenibilidad no es un añadido;
            es el eje sobre el que diseñamos toda la explotación. Así, Agromonte
            se posiciona como un proyecto de referencia dentro de la agricultura
            ecológica española, con vocación internacional.
          </Reveal>
        </div>
      </div>

      <div className="container about-pillars">
        {PILLARS.map((p, i) => (
          <Reveal as="article" className="pillar-card" delay={(i % 3) + 1} key={p.title}>
            <div className="pillar-img">
              <img src={`/img/fotos/${p.img}`} alt="" loading="lazy" />
            </div>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
