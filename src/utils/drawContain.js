/**
 * Draws an image onto a canvas with "contain" fitting: the whole image is
 * always visible, letterboxed on the canvas's own background rather than
 * cropped. Shared by every frame-sequence renderer in the app so the "never
 * crop the fruit animations" rule lives in exactly one place.
 *
 * `offset` (optional) re-centers a subject that isn't centered within its
 * own frame — some sequences drift across the shot rather than just
 * rotating in place. It's {x, y} as a fraction of the drawn image's own
 * width, applied as a counter-shift, and only ever moves the picture
 * within its existing letterboxed bounds — it never crops anything that
 * "contain" wouldn't already have hidden.
 */
export function drawContain(canvas, img, offset) {
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
  let dx = (w - drawW) / 2;
  let dy = (h - drawH) / 2;

  if (offset) {
    dx -= (offset.x || 0) * drawW;
    dy -= (offset.y || 0) * drawW;
  }

  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(img, dx, dy, drawW, drawH);
}
