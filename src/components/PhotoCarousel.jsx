import { useEffect, useRef, useState } from "react";
import useScrollLock from "../hooks/useScrollLock.js";
import "./PhotoCarousel.css";

export default function PhotoCarousel({ photos, accent }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const rafPending = useRef(false);
  const scrollAnimRef = useRef(null);

  // Derived straight from scroll position / step size rather than "closest
  // slide to the viewport's center": with 2-3 slides visible at once on
  // desktop, the geometric center doesn't line up with the first slide
  // the way it does on mobile's near-full-bleed single-slide view, so a
  // center-distance heuristic was picking the wrong index.
  function updateActiveFromScroll() {
    const track = trackRef.current;
    if (!track) return;
    const step = getStepAmount(track) || 1;
    const idx = Math.round(track.scrollLeft / step);
    setActive(Math.max(0, Math.min(photos.length - 1, idx)));
  }

  function handleScroll() {
    if (rafPending.current) return;
    rafPending.current = true;
    requestAnimationFrame(() => {
      updateActiveFromScroll();
      rafPending.current = false;
    });
  }

  // Native `scrollTo`/`scrollIntoView` with behavior:"smooth" fights the
  // track's `scroll-snap-type: x mandatory` in several browsers — the snap
  // logic can yank the scroll position straight back to wherever it
  // started mid-animation, which looks exactly like the click did nothing.
  // Driving the scroll by hand with rAF sidesteps that interaction
  // entirely while still animating smoothly.
  function animateScrollTo(track, target) {
    if (scrollAnimRef.current) cancelAnimationFrame(scrollAnimRef.current);
    const start = track.scrollLeft;
    const duration = 420;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      track.scrollLeft = start + (target - start) * eased;
      scrollAnimRef.current = progress < 1 ? requestAnimationFrame(step) : null;
    }

    scrollAnimRef.current = requestAnimationFrame(step);
  }

  // One "step" is exactly one slide's width (+ the gap between slides).
  // Early attempts tried to center the target slide in the viewport, but
  // with 2-3 slides visible at once that math can ask the track to scroll
  // to a *negative* offset right at the start of the list — which clamps
  // to 0, i.e. no movement at all, which is exactly the "the arrow does
  // nothing" symptom reported from the very first slide.
  function getStepAmount(track) {
    const firstChild = track.children[0];
    if (!firstChild) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return firstChild.getBoundingClientRect().width + gap;
  }

  // Button/dot navigation already knows exactly which slide it's aiming
  // for, so it sets `active` directly instead of waiting to infer it back
  // from a native "scroll" event — our own rAF-driven scrollLeft writes
  // below aren't guaranteed to dispatch one on every browser/tab state,
  // and even when they do it's an unnecessary round trip for a value we
  // already know. `updateActiveFromScroll`/`handleScroll` stay in place
  // for real user-driven drag/swipe scrolling, where the target slide
  // isn't known ahead of time.
  function scrollByStep(direction) {
    const track = trackRef.current;
    if (!track) return;
    const targetIndex = Math.max(0, Math.min(photos.length - 1, active + direction));
    const maxScroll = track.scrollWidth - track.clientWidth;
    const target = Math.max(0, Math.min(maxScroll, track.scrollLeft + getStepAmount(track) * direction));
    setActive(targetIndex);
    animateScrollTo(track, target);
  }

  function scrollToIndex(i) {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const target = Math.max(0, Math.min(maxScroll, track.scrollLeft + getStepAmount(track) * (i - active)));
    setActive(i);
    animateScrollTo(track, target);
  }

  useEffect(() => () => {
    if (scrollAnimRef.current) cancelAnimationFrame(scrollAnimRef.current);
  }, []);

  // Lightbox: lock scroll (including touch-drag on mobile) + keyboard nav.
  useScrollLock(lightboxIndex !== null);

  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % photos.length);
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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
        onClick={() => scrollByStep(-1)}
        aria-label="Foto anterior"
        disabled={active === 0}
      >
        ‹
      </button>
      <button
        type="button"
        className="carousel-arrow carousel-arrow--next"
        onClick={() => scrollByStep(1)}
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
                onClick={() => scrollToIndex(i)}
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
