/**
 * SURIYA.OS background — a static technical surface.
 * Pure CSS: fixed grid + vignette + faint top glow. No canvas,
 * no per-frame work. Fast on every device.
 */
export default function SystemBackground() {
  return (
    <>
      <div className="os-grid-overlay" aria-hidden="true" />
      <div className="os-vignette" aria-hidden="true" />
    </>
  );
}