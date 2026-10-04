import Reveal from "./Reveal.jsx";
import PhotoCarousel from "./PhotoCarousel.jsx";
import "./FruitGallery.css";

export default function FruitGallery({ eyebrow, title, accent, photos }) {
  return (
    <section
      className="fruit-gallery"
      style={{ "--accent": `var(--c-${accent})`, "--accent-light": `var(--c-${accent}-light)` }}
    >
      <div className="container fruit-gallery-head">
        <Reveal as="p" className="eyebrow">{eyebrow}</Reveal>
        <Reveal as="h3" delay={1} className="fruit-gallery-title">{title}</Reveal>
      </div>
      <Reveal delay={2}>
        <PhotoCarousel photos={photos} accent={accent} />
      </Reveal>
    </section>
  );
}
