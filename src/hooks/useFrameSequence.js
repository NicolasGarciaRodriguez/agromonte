import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { drawContain } from "../utils/drawContain.js";

gsap.registerPlugin(ScrollTrigger);

function frameUrl(folder, index) {
  const padded = String(index).padStart(6, "0");
  return `/img/${folder}/frame_${padded}.webp`;
}

/**
 * Drives a <canvas> image sequence from scroll position across a tall
 * wrapper element. The wrapper should contain a position:sticky viewport
 * child holding the <canvas>; scroll progress across the wrapper's height
 * maps 1:1 to the sticky range, so no GSAP pinning is needed.
 *
 * Frames are drawn with a "contain" fit (the full, uncropped frame is
 * always visible) — the sequences already sit on the same black backdrop
 * as the intro video, so the letterboxing blends seamlessly into the
 * section background instead of showing as bars.
 */
export default function useFrameSequence({ folder, frameCount, eager = false, onProgress }) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const frameRef = useRef(0);
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;
  const [ready, setReady] = useState(false);
  const [progressLoaded, setProgressLoaded] = useState(0);

  // Preload once the section is within ~1.5 viewports of the user.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return undefined;

    let cancelled = false;
    let started = eager;

    const loadAll = () => {
      if (started) return;
      started = true;
      let loaded = 0;
      const imgs = new Array(frameCount);
      for (let i = 0; i < frameCount; i += 1) {
        const img = new Image();
        img.src = frameUrl(folder, i);
        img.decoding = "async";
        img.onload = () => {
          loaded += 1;
          if (!cancelled) setProgressLoaded(loaded / frameCount);
          if (loaded === 1 && !cancelled) {
            setReady(true);
            drawFrame(0);
          }
        };
        imgs[i] = img;
      }
      imagesRef.current = imgs;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadAll();
            observer.disconnect();
          }
        });
      },
      { rootMargin: "150% 0px" }
    );
    observer.observe(wrapper);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folder, frameCount, eager]);

  function drawFrame(index) {
    drawContain(canvasRef.current, imagesRef.current[index]);
  }

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return undefined;

    const trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.35,
      onUpdate: (self) => {
        const idx = Math.min(
          frameCount - 1,
          Math.round(self.progress * (frameCount - 1))
        );
        frameRef.current = idx;
        drawFrame(idx);
        onProgressRef.current?.(self.progress);
      },
    });

    const onResize = () => drawFrame(frameRef.current);
    window.addEventListener("resize", onResize);

    return () => {
      trigger.kill();
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount, ready]);

  return { wrapperRef, canvasRef, ready, progressLoaded };
}
