/**
 * HeroVisual — fractal glass gradient backdrop.
 *
 * Full-bleed hero backdrop: vivid multi-colour blooms refracted
 * through vertical fluted-glass slats, framed by a soft vignette.
 * Saturated and dramatic in dark mode, luminous and soft in light.
 * Decorative only — pointer-events-none, behind the type.
 */

const BLOOM_A = [
  "radial-gradient(38% 46% at 21% 26%, rgba(52,229,255,0.85)  0%, transparent 72%)",
  "radial-gradient(44% 52% at 80% 24%, rgba(110,139,255,0.85) 0%, transparent 72%)",
  "radial-gradient(54% 58% at 52% 96%, rgba(124,92,255,0.92)  0%, transparent 74%)",
  "radial-gradient(40% 48% at 92% 84%, rgba(59,108,246,0.82)  0%, transparent 72%)",
].join(",");

const BLOOM_B = [
  "radial-gradient(46% 52% at 73% 58%, rgba(217,70,239,0.80)  0%, transparent 72%)",
  "radial-gradient(40% 46% at 12% 76%, rgba(255,122,77,0.72)  0%, transparent 70%)",
  "radial-gradient(42% 48% at 36% 12%, rgba(139,92,246,0.74)  0%, transparent 72%)",
].join(",");

const FLUTES = [
  "repeating-linear-gradient(90deg,",
  "rgba(255,255,255,0.16) 0px,",
  "rgba(255,255,255,0) 10px,",
  "rgba(0,0,0,0.18) 21px,",
  "rgba(255,255,255,0) 32px,",
  "rgba(255,255,255,0.16) 42px)",
].join("");

export default function HeroVisual() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* base canvas */}
      <div className="absolute inset-0 bg-canvas" />

      {/* ── Colour blooms ──────────────────────────── */}
      <div
        className="absolute -inset-[28%] animate-bloom-drift opacity-[0.62] mix-blend-normal dark:opacity-100 dark:mix-blend-screen"
        style={{ background: BLOOM_A, filter: "blur(46px)" }}
      />
      <div
        className="absolute -inset-[28%] animate-bloom-drift-alt opacity-[0.5] mix-blend-normal dark:opacity-95 dark:mix-blend-screen"
        style={{ background: BLOOM_B, filter: "blur(64px)" }}
      />

      {/* ── Fluted glass slats — vertical refraction ── */}
      <div
        className="absolute inset-0 opacity-[0.55] mix-blend-soft-light dark:opacity-90 dark:mix-blend-overlay"
        style={{ background: FLUTES }}
      />

      {/* ── Specular sweep across the glass ────────── */}
      <div
        className="absolute inset-0 opacity-40 dark:opacity-60"
        style={{
          background:
            "linear-gradient(104deg, transparent 38%, rgba(255,255,255,0.5) 49%, transparent 60%)",
        }}
      />

      {/* ── Legibility scrim behind the type ───────── */}
      <div
        className="absolute inset-0 opacity-[0.86] dark:opacity-[0.52]"
        style={{
          background:
            "radial-gradient(58% 48% at 50% 38%, rgb(var(--canvas)) 0%, rgb(var(--canvas) / 0) 72%)",
        }}
      />

      {/* ── Edge vignette → blends into the page ───── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 122% at 50% 30%, rgb(var(--canvas) / 0) 42%, rgb(var(--canvas)) 100%)",
        }}
      />
    </div>
  );
}
