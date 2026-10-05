import Reveal from "../components/Reveal.jsx";
import FruitSection from "../components/FruitSection.jsx";
import FruitGallery from "../components/FruitGallery.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import "./Products.css";

export default function Products() {
  const { t } = useLanguage();

  return (
    <>
      <section className="section products-intro">
        <div className="container">
          <Reveal as="p" className="eyebrow">
            {t.products.eyebrow}
          </Reveal>
          <Reveal as="h1" delay={1} className="products-title">
            {t.products.title}
          </Reveal>
          <Reveal as="p" delay={2} className="products-lead">
            {t.products.lead}
          </Reveal>
        </div>
      </section>

      <FruitSection
        id="granada"
        folder="granada"
        accent="pomegranate"
        eyebrow={t.granada.eyebrow}
        title={t.granada.title}
        lead={t.granada.lead}
        paragraphs={t.granada.paragraphs}
        varieties={t.granada.varieties}
        stats={t.granada.stats}
      />

      <FruitGallery
        eyebrow={t.granada.gallery.eyebrow}
        title={t.granada.gallery.title}
        accent="pomegranate"
        photos={t.granada.gallery.photos}
      />

      <FruitSection
        id="mandarina"
        folder="mandarina"
        accent="mandarin"
        reverse
        eyebrow={t.mandarina.eyebrow}
        title={t.mandarina.title}
        lead={t.mandarina.lead}
        paragraphs={t.mandarina.paragraphs}
        stats={t.mandarina.stats}
      />

      <FruitGallery
        eyebrow={t.mandarina.gallery.eyebrow}
        title={t.mandarina.gallery.title}
        accent="mandarin"
        photos={t.mandarina.gallery.photos}
      />

      <FruitSection
        id="oliva"
        folder="oliva"
        accent="olive"
        eyebrow={t.oliva.eyebrow}
        title={t.oliva.title}
        lead={t.oliva.lead}
        paragraphs={t.oliva.paragraphs}
        stats={t.oliva.stats}
      />

      <FruitGallery
        eyebrow={t.oliva.gallery.eyebrow}
        title={t.oliva.gallery.title}
        accent="olive"
        photos={t.oliva.gallery.photos}
      />
    </>
  );
}
