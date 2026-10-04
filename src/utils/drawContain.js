/**
 * Draws an image onto a canvas with "contain" fitting: the whole image is
 * always visible, letterboxed on the canvas's own background rather than
 * cropped. Shared by every frame-sequence renderer in the app so the "never
 * crop the fruit animations" rule lives in exactly one place.
 */
export function drawContain(canvas, img) {
  if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  const w = rect.width * dpr;
  const h = rect.height * dpr;
  if (w === 0 || h === 0) return;

  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }

  const canvasRatio = w / h;
  const imgRatio = img.naturalWidth / img.naturalHeight;
  let drawW;
  let drawH;
  if (imgRatio > canvasRatio) {
    drawW = w;
    drawH = w / imgRatio;
  } else {
    drawH = h;
    drawW = h * imgRatio;
  }
  const dx = (w - drawW) / 2;
  const dy = (h - drawH) / 2;

  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(img, dx, dy, drawW, drawH);
}
