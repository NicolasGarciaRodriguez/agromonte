import { useLanguage } from "./i18n/LanguageContext.jsx";
import LanguageSwitcher from "./components/LanguageSwitcher.jsx";
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
  const { t } = useLanguage();

  return (
    <>
      <LanguageSwitcher />

      <main>
        <Hero />
        <StatsBar />
        <About />

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

        <Technology />
        <Certifications />
        <Environment />
        <ContactForm />
      </main>

      <Footer />
    </>
  );
}
