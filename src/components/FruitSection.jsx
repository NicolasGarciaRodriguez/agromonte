import { useRef, useState } from "react";
import useFrameSequence from "../hooks/useFrameSequence.js";
import "./FruitSection.css";

const PHASE_BOUNDARIES = [0.36, 0.7];

export default function FruitSection({
  id,
  folder,
  frameCount = 107,
  eyebrow,
  title,
  lead,
  paragraphs,
  stats,
  accent,
  reverse = false,
}) {
  const [phase, setPhase] = useState(0);
  const phaseRef = useRef(0);

  const { wrapperRef, canvasRef, ready, progressLoaded } = useFrameSequence({
    folder,
    frameCount,
    onProgress: (p) => {
      const next = p < PHASE_BOUNDARIES[0] ? 0 : p < PHASE_BOUNDARIES[1] ? 1 : 2;
      if (next !== phaseRef.current) {
        phaseRef.current = next;
        setPhase(next);
      }
    },
  });

  return (
    <section
      id={id}
      ref={wrapperRef}
      className={`fruit-section${reverse ? " fruit-section--reverse" : ""}`}
      style={{ "--accent": `var(--c-${accent})`, "--accent-light": `var(--c-${accent}-light)` }}
    >
      <div className="fruit-sticky">
        <div className="fruit-stage">
          <div className="fruit-visual">
            <canvas ref={canvasRef} className="fruit-canvas" aria-hidden="true" />
            {!ready && (
              <div className="fruit-canvas-loading">
                <span style={{ transform: `scaleX(${Math.max(progressLoaded, 0.05)})` }} />
              </div>
            )}
            <div className="fruit-phase-dots" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <span key={i} className={i === phase ? "is-active" : ""} />
              ))}
            </div>
          </div>

          <div className="fruit-copy">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="fruit-title">{title}</h2>

            <div className="fruit-copy-stage">
              <div className={`fruit-copy-phase${phase === 0 ? " is-active" : ""}`}>
                <p className="fruit-lead">{lead}</p>
              </div>
              <div className={`fruit-copy-phase${phase === 1 ? " is-active" : ""}`}>
                <div className="fruit-paragraphs">
                  {paragraphs.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
              </div>
              <div className={`fruit-copy-phase${phase === 2 ? " is-active" : ""}`}>
                <div className="fruit-stats">
                  {stats.map((s) => (
                    <div className="fruit-stat" key={s.label}>
                      <span className="fruit-stat-value">{s.value}</span>
                      <span className="fruit-stat-label">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
