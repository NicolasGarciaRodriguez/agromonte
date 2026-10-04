import { useEffect, useRef, useState } from "react";
import "./PhotoCarousel.css";

export default function PhotoCarousel({ photos, accent }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const rafPending = useRef(false);

  function updateActiveFromScroll() {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const dist = Math.abs(childCenter - center);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActive(closest);
  }

  function handleScroll() {
    if (rafPending.current) return;
    rafPending.current = true;
    requestAnimationFrame(() => {
      updateActiveFromScroll();
      rafPending.current = false;
    });
  }

  function goTo(i) {
    const track = trackRef.current;
    const child = track?.children[i];
    if (!child) return;
    track.scrollTo({ left: child.offsetLeft - (track.clientWidth - child.clientWidth) / 2, behavior: "smooth" });
  }

  // Lightbox: lock scroll + keyboard navigation while open.
  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    document.body.classList.add("lock-scroll");
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % photos.length);
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("lock-scroll");
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, photos.length]);

  const showDots = photos.length <= 8;

  return (
    <div className="carousel" style={{ "--accent": `var(--c-${accent})`, "--accent-light": `var(--c-${accent}-light)` }}>
      <div className="carousel-track" ref={trackRef} onScroll={handleScroll}>
        {photos.map((p, i) => (
          <button
            type="button"
            key={p.src}
            className="carousel-slide"
            onClick={() => setLightboxIndex(i)}
            aria-label={`Ver ${p.alt} en grande`}
          >
            <img src={`/img/fotos/${p.src}`} alt={p.alt} loading="lazy" />
          </button>
        ))}
      </div>

      <button
        type="button"
        className="carousel-arrow carousel-arrow--prev"
        onClick={() => goTo(Math.max(0, active - 1))}
        aria-label="Foto anterior"
        disabled={active === 0}
      >
        ‹
      </button>
      <button
        type="button"
        className="carousel-arrow carousel-arrow--next"
        onClick={() => goTo(Math.min(photos.length - 1, active + 1))}
        aria-label="Foto siguiente"
        disabled={active === photos.length - 1}
      >
        ›
      </button>

      <div className="carousel-foot">
        {showDots ? (
          <div className="carousel-dots">
            {photos.map((p, i) => (
              <button
                type="button"
                key={p.src}
                className={i === active ? "is-active" : ""}
                onClick={() => goTo(i)}
                aria-label={`Ir a la foto ${i + 1}`}
              />
            ))}
          </div>
        ) : (
          <div className="carousel-progress">
            <span style={{ width: `${((active + 1) / photos.length) * 100}%` }} />
          </div>
        )}
        <span className="carousel-count">
          {active + 1} / {photos.length}
        </span>
      </div>

      {lightboxIndex !== null && (
        <div className="lightbox" onClick={() => setLightboxIndex(null)}>
          <button type="button" className="lightbox-close" aria-label="Cerrar" onClick={() => setLightboxIndex(null)}>
            ✕
          </button>

          <button
            type="button"
            className="lightbox-arrow lightbox-arrow--prev"
            aria-label="Foto anterior"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i - 1 + photos.length) % photos.length);
            }}
          >
            ‹
          </button>

          <img
            src={`/img/fotos/${photos[lightboxIndex].src}`}
            alt={photos[lightboxIndex].alt}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            className="lightbox-arrow lightbox-arrow--next"
            aria-label="Foto siguiente"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i + 1) % photos.length);
            }}
          >
            ›
          </button>

          <span className="lightbox-count">
            {lightboxIndex + 1} / {photos.length}
          </span>
        </div>
      )}
    </div>
  );
}
