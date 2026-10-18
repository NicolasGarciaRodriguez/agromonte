import Reveal from "../components/Reveal.jsx";
import ProductsExplorer from "../components/ProductsExplorer.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import "./Products.css";

export default function Products() {
  const { t } = useLanguage();

  return (
    <>
      <section className="section products-intro">
        <div className="products-intro-bg">
          <img src="/img/fotos/sistema-de-tuneles-plano-general.jpeg" alt="" aria-hidden="true" />
        </div>
        <div className="products-intro-overlay" />
        <div className="container products-intro-content">
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

      <ProductsExplorer />
    </>
  );
}
