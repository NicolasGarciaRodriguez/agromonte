import { useCallback, useEffect, useRef, useState } from "react";
import { drawContain } from "../utils/drawContain.js";

function frameUrl(folder, index) {
  const padded = String(index).padStart(6, "0");
  return `/img/${folder}/frame_${padded}.webp`;
}

/**
 * Drives a small <canvas> product-preview tile: paints just frame 0 on
 * mount (one cheap request, works fine on mobile where nothing else ever
 * loads), then lets the caller preload the rest of the sequence and play
 * it back as a hover animation once ready. Playback bounces forward/back
 * (like the Hero's forward/reverse video pair) so the loop never jump-cuts.
 */
export default function useHoverFrameSequence({ folder, frameCount, fps = 24, frameOffsets }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const loadingRef = useRef(false);
  const rafRef = useRef(null);
  const frameRef = useRef(0);
  const directionRef = useRef(1);
  const lastTickRef = useRef(0);
  const [ready, setReady] = useState(false);

  const offsetFor = useCallback(
    (index) => {
      if (!frameOffsets) return undefined;
      const [x, y] = frameOffsets[index] || [0, 0];
      return { x, y };
    },
    [frameOffsets]
  );

  const drawFrame = useCallback(
    (index) => {
      const img = imagesRef.current[index];
      if (img) drawContain(canvasRef.current, img, offsetFor(index));
    },
    [offsetFor]
  );

  // Paint the resting thumbnail (frame 0) as soon as the tile mounts.
  useEffect(() => {
    const img = new Image();
    img.src = frameUrl(folder, 0);
    img.decoding = "async";
    img.onload = () => drawContain(canvasRef.current, img, offsetFor(0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folder]);

  const preload = useCallback(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    const imgs = new Array(frameCount);
    let loaded = 0;
    for (let i = 0; i < frameCount; i += 1) {
      const img = new Image();
      img.src = frameUrl(folder, i);
      img.decoding = "async";
      img.onload = () => {
        loaded += 1;
        if (loaded === frameCount) setReady(true);
      };
      imgs[i] = img;
    }
    imagesRef.current = imgs;
  }, [folder, frameCount]);

  const stepMs = 1000 / fps;

  const tick = useCallback(
    (time) => {
      if (!lastTickRef.current) lastTickRef.current = time;
      if (time - lastTickRef.current >= stepMs) {
        lastTickRef.current = time;
        let next = frameRef.current + directionRef.current;
        if (next >= frameCount - 1) {
          next = frameCount - 1;
          directionRef.current = -1;
        } else if (next <= 0) {
          next = 0;
          directionRef.current = 1;
        }
        frameRef.current = next;
        drawFrame(next);
      }
      rafRef.current = requestAnimationFrame(tick);
    },
    [frameCount, drawFrame, stepMs]
  );

  const startLoop = useCallback(() => {
    if (rafRef.current) return;
    lastTickRef.current = 0;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const stopLoop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    frameRef.current = 0;
    directionRef.current = 1;
    drawFrame(0);
  }, [drawFrame]);

  useEffect(() => stopLoop, [stopLoop]);

  return { canvasRef, ready, preload, startLoop, stopLoop };
}
