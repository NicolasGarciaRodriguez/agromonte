import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import useHoverFrameSequence from "../hooks/useHoverFrameSequence.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import Counter from "./Counter.jsx";
import FruitGallery from "./FruitGallery.jsx";
import HorticulturalProject from "./HorticulturalProject.jsx";
import oliveFrameOffsets from "../data/oliveFrameOffsets.json";
import "./ProductsExplorer.css";

// tileZoom is tuned per fruit from each sequence's actual pixel bounds (how
// much of the square tile the fruit's silhouette fills at its largest pose
// across all frames) so every fruit crops in roughly as tight as the others
// instead of sharing one scale that over-zooms small fruits like olive and
// under-zooms round ones like the pomegranate.
//
// frameOffsets (olive only): unlike the other two, the olive sequence drifts
// across its own frame instead of just rotating in place — it sits visibly
// higher at frame 0 and drifts down by the end. Each entry is the [x, y]
// offset (as a fraction of the drawn frame's width) of that frame's own
// fruit from center, measured once from the actual pixel data; drawContain
// uses it to counter-shift the frame so the olive stays put in the circle
// instead of drifting with it.
const FRUITS = [
  {
    key: "granada",
    folder: "granada",
    frameCount: 108,
    accent: "pomegranate",
    tileZoom: 1.9,
    coverPhoto: "sistema-de-tuneles-granadas-plano-general.jpeg",
  },
  {
    key: "mandarina",
    folder: "mandarina",
    frameCount: 107,
    accent: "mandarin",
    tileZoom: 1.55,
    coverPhoto: "mandarinas-plano-aereo.jpeg",
  },
  {
    key: "oliva",
    folder: "oliva",
    frameCount: 107,
    accent: "olive",
    tileZoom: 2.5,
    frameOffsets: oliveFrameOffsets,
    coverPhoto: "olivos-plano-general.jpeg",
  },
];

// A stat value either counts up ("25.000+", "100%", "~36%", "5.000") or is
// plain text ("Acco · Wonderful", "Tardía", "España") — only the former
// gets the animated Counter treatment.
function parseStatValue(value) {
  const prefix = value.startsWith("~") ? "~" : "";
  const rest = value.slice(prefix.length).trim();
  const suffixMatch = /\s*(\+|%)$/.exec(rest);
  const suffix = suffixMatch ? suffixMatch[1] : "";
  const numPart = suffixMatch ? rest.slice(0, suffixMatch.index) : rest;
  const digits = numPart.replace(/\D/g, "");
  if (!digits) return null;
  return { to: Number(digits), prefix, suffix };
}

const TAB_KEYS = ["granada", "mandarina", "oliva", "horticola"];

function FruitTile({ fruit, label, active, onSelect }) {
  const { canvasRef, ready, preload, startLoop, stopLoop } = useHoverFrameSequence({
    folder: fruit.folder,
    frameCount: fruit.frameCount,
    frameOffsets: fruit.frameOffsets,
  });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (hovering) preload();
  }, [hovering, preload]);

  useEffect(() => {
    if (hovering && ready) {
      startLoop();
      return stopLoop;
    }
    return undefined;
  }, [hovering, ready, startLoop, stopLoop]);

  return (
    <button
      type="button"
      id={fruit.key}
      className={`product-tile${active ? " is-active" : ""}`}
      style={{
        "--accent": `var(--c-${fruit.accent})`,
        "--accent-light": `var(--c-${fruit.accent}-light)`,
        "--tile-zoom": fruit.tileZoom,
      }}
      onClick={() => onSelect(fruit.key)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
    >
      <span className="product-tile-visual">
        <canvas ref={canvasRef} aria-hidden="true" />
      </span>
      <span className="product-tile-label">{label}</span>
    </button>
  );
}

function HorticolaTile({ active, onSelect, label }) {
  return (
    <button
      type="button"
      id="horticola"
      className={`product-tile${active ? " is-active" : ""}`}
      style={{ "--accent": "var(--c-horticultural)", "--accent-light": "var(--c-horticultural-light)" }}
      onClick={() => onSelect("horticola")}
    >
      <span className="product-tile-visual">
        <img src="/img/fotos/proyecto_horticola.jpeg" alt="" loading="lazy" />
      </span>
      <span className="product-tile-label">{label}</span>
    </button>
  );
}

function FruitDetail({ data, accent, coverPhoto, locale }) {
  return (
    <div
      className="product-detail-fruit"
      style={{ "--accent": `var(--c-${accent})`, "--accent-light": `var(--c-${accent}-light)` }}
    >
      <div className="product-detail-bg">
        <img src={`/img/fotos/${coverPhoto}`} alt="" aria-hidden="true" loading="lazy" />
      </div>
      <div className="product-detail-overlay" />
      <div className="container product-detail-content">
      <div className="product-detail-grid">
        <div className="product-detail-main">
          <p className="eyebrow">{data.eyebrow}</p>
          <h2 className="fruit-title">{data.title}</h2>
          <p className="fruit-lead">{data.lead}</p>

          <div className="fruit-paragraphs">
            {data.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          {data.varieties && (
            <div className="fruit-varieties">
              {data.varieties.map((v) => (
                <div className="fruit-variety" key={v.name}>
                  <span className="fruit-variety-name">{v.name}:</span>
                  <span className="fruit-variety-text">{v.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="fruit-stats">
          {data.stats.map((s) => {
            const counted = parseStatValue(s.value);
            return (
              <div className="fruit-stat" key={s.label}>
                <span className="fruit-stat-value">
                  {counted ? (
                    <Counter to={counted.to} prefix={counted.prefix} suffix={counted.suffix} locale={locale} />
                  ) : (
                    s.value
                  )}
                </span>
                <span className="fruit-stat-label">{s.label}</span>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
}

export default function ProductsExplorer() {
  const { t, locale } = useLanguage();
  const location = useLocation();

  const [activeKey, setActiveKey] = useState(() => {
    const hash = location.hash.replace("#", "");
    return TAB_KEYS.includes(hash) ? hash : "granada";
  });

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (TAB_KEYS.includes(hash)) setActiveKey(hash);
  }, [location.hash]);

  const activeFruit = FRUITS.find((f) => f.key === activeKey);

  return (
    <div className="products-explorer">
      <div className="container product-tiles">
        {FRUITS.map((fruit) => (
          <FruitTile
            key={fruit.key}
            fruit={fruit}
            label={t.footer.links[fruit.key]}
            active={activeKey === fruit.key}
            onSelect={setActiveKey}
          />
        ))}
        <HorticolaTile
          active={activeKey === "horticola"}
          onSelect={setActiveKey}
          label={t.footer.links.horticola}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          className="product-detail-panel"
          key={activeKey}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {activeFruit ? (
            <>
              <FruitDetail
                data={t[activeKey]}
                accent={activeFruit.accent}
                coverPhoto={activeFruit.coverPhoto}
                locale={locale}
              />
              <FruitGallery
                eyebrow={t[activeKey].gallery.eyebrow}
                title={t[activeKey].gallery.title}
                accent={activeFruit.accent}
                photos={t[activeKey].gallery.photos}
              />
            </>
          ) : (
            <HorticulturalProject />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
