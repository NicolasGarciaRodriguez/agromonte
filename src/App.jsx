import Hero from "./components/Hero.jsx";
import StatsBar from "./components/StatsBar.jsx";
import About from "./components/About.jsx";
import FruitSection from "./components/FruitSection.jsx";
import FruitGallery from "./components/FruitGallery.jsx";
import Technology from "./components/Technology.jsx";
import Certifications from "./components/Certifications.jsx";
import Environment from "./components/Environment.jsx";
import ContactForm from "./components/ContactForm.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <main>
        <Hero />
        <StatsBar />
        <About />

        <FruitSection
          id="granada"
          folder="granada"
          accent="pomegranate"
          eyebrow="Producto estratégico"
          title="Granada ecológica"
          lead="Más de 25.000 granados en producción ecológica. Referente nacional, con exportación a distintos países europeos."
          paragraphs={[
            "Rica en compuestos fenólicos y polifenoles —entre ellos antocianinas— además de vitamina C y fibra, la granada despierta un interés creciente del consumidor por sus propiedades antioxidantes.",
            "Trabajamos dos variedades complementarias: Acco, de maduración temprana, piel roja intensa y sabor equilibrado; y Wonderful, de reconocimiento internacional, gran tamaño, jugosidad y abundancia de compuestos fenólicos.",
            "Nuestro sistema de túneles controla la radiación solar y crea un microclima estable, reduciendo el estrés térmico: menos agua, menos quemaduras en la piel y una maduración más uniforme.",
          ]}
          stats={[
            { value: "25.000+", label: "granados ecológicos" },
            { value: "Acco · Wonderful", label: "dos variedades complementarias" },
            { value: "100%", label: "sistema de túneles propio" },
          ]}
        />

        <FruitGallery
          eyebrow="En imágenes"
          title="La granada, de la flor al túnel de cultivo"
          accent="pomegranate"
          photos={[
            { src: "granadas-primer-plano.jpeg", alt: "Granadas ecológicas en primer plano" },
            { src: "granadas-primer-plano-2.jpeg", alt: "Detalle de granadas maduras en el árbol" },
            { src: "granadas-plano-medio.jpeg", alt: "Granados en plano medio" },
            { src: "granadas-plano-medio-v2.jpeg", alt: "Granados ecológicos en la finca" },
            { src: "granadas-plano-medio-v3.jpeg", alt: "Hilera de granados en producción" },
            { src: "una-granada-primer-plano.jpeg", alt: "Granada entera en primer plano" },
            { src: "una-granada-abierta-primer-plano.jpeg", alt: "Granada abierta mostrando sus granos" },
            { src: "una-granada-abierta-primer-plano-v2.jpeg", alt: "Detalle de los granos de la granada" },
            { src: "una-granada-abierta-primer-plano-v3.jpeg", alt: "Granada abierta, primer plano" },
            { src: "sistema-de-tuneles-granadas-plano-general.jpeg", alt: "Sistema de túneles sobre los granados, plano general" },
            { src: "sistema-de-tuneles-granadas-plano-medio.jpeg", alt: "Sistema de túneles sobre los granados, plano medio" },
          ]}
        />

        <FruitSection
          id="mandarina"
          folder="mandarina"
          accent="mandarin"
          reverse
          eyebrow="Exclusividad y calidad"
          title="Mandarina Nadorcott"
          lead="Más de 20.000 árboles de una variedad protegida, de maduración tardía y altísima demanda en Europa."
          paragraphs={[
            "Equilibrio entre dulzor y acidez, elevada calidad organoléptica y buen rendimiento en zumo definen a la Nadorcott.",
            "Su maduración tardía permite disponer de fruta en una ventana comercial clave, cuando la oferta de otras variedades disminuye: una ventaja estratégica para Agromonte.",
            "Se cultiva con el mismo sistema tecnológico que optimiza agua, nutrición y recursos, sin renunciar al compromiso ecológico de la explotación.",
          ]}
          stats={[
            { value: "20.000+", label: "mandarinos Nadorcott" },
            { value: "Tardía", label: "ventana de maduración" },
            { value: "Europa", label: "principal mercado de exportación" },
          ]}
        />

        <FruitGallery
          eyebrow="En imágenes"
          title="Mandarina Nadorcott en la finca"
          accent="mandarin"
          photos={[
            { src: "mandarinas-primer-plano.jpeg", alt: "Mandarinas Nadorcott en primer plano" },
            { src: "mandarinas-primer-plano-2.jpeg", alt: "Detalle de mandarinas en el árbol" },
            { src: "mandarinas-primer-plano-3.jpeg", alt: "Mandarinas Nadorcott maduras" },
            { src: "mandarinas-primer-plano-v2.jpeg", alt: "Racimo de mandarinas en primer plano" },
            { src: "mandarinas-plano-medio.jpeg", alt: "Mandarinos en plano medio" },
            { src: "mandarinas-plano-medio-v2.jpeg", alt: "Plantación de mandarinos" },
            { src: "mandarinas-plano-aereo.jpeg", alt: "Plantación de mandarinos vista aérea" },
          ]}
        />

        <FruitSection
          id="oliva"
          folder="oliva"
          accent="olive"
          eyebrow="Tradición y posicionamiento gourmet"
          title="Oliva Manzanilla"
          lead="Cerca de 5.000 olivos de una de las variedades de aceituna de mesa más relevantes de España."
          paragraphs={[
            "Fruto de forma redondeada, calibre apreciado y textura firme, especialmente adecuado para aceituna de mesa, con un perfil organoléptico equilibrado y gran versatilidad.",
            "La Manzanilla representa cerca del 36% de la producción nacional de aceituna de mesa, solo por detrás de la Hojiblanca. España es, además, líder mundial en producción y exportación de esta categoría.",
            "En Agromonte el olivar conecta tradición e innovación: una variedad histórica cultivada con trazabilidad, eficiencia y agricultura regenerativa.",
          ]}
          stats={[
            { value: "5.000", label: "olivos Manzanilla" },
            { value: "~36%", label: "de la producción española de aceituna de mesa" },
            { value: "España", label: "líder mundial en exportación" },
          ]}
        />

        <FruitGallery
          eyebrow="En imágenes"
          title="La oliva Manzanilla"
          accent="olive"
          photos={[
            { src: "olivos-primer-plano.jpeg", alt: "Aceitunas Manzanilla en primer plano" },
            { src: "olivos-plano-general.jpeg", alt: "Olivar Manzanilla, plano general" },
            { src: "olivos-plano-general-v2.jpeg", alt: "Hileras del olivar Manzanilla" },
            { src: "olivos-plano-general-v3.jpeg", alt: "Olivar Manzanilla visto en profundidad" },
          ]}
        />

        <Technology />
        <Certifications />
        <Environment />
        <ContactForm />
      </main>

      <Footer />
    </>
  );
}
