import { useEffect } from "react";

// `overflow: hidden` on <body> alone does not reliably block touch-driven
// scrolling on mobile browsers (iOS Safari in particular still lets the
// page pan behind a fixed overlay). Pinning the body with `position: fixed`
// — and restoring the exact scroll position on unlock — is the technique
// that actually holds on touch devices too.
let lockCount = 0;
let savedScrollY = 0;

export default function useScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined;

    if (lockCount === 0) {
      savedScrollY = window.scrollY;
      document.body.classList.add("lock-scroll");
      document.body.style.top = `-${savedScrollY}px`;
    }
    lockCount += 1;

    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        document.body.classList.remove("lock-scroll");
        document.body.style.top = "";
        window.scrollTo(0, savedScrollY);
      }
    };
  }, [active]);
}
