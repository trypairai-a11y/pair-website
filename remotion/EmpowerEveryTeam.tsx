import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

const AVATARS = [
  staticFile("photos/headshots/spiral-1.png"),
  staticFile("photos/headshots/spiral-2.png"),
  staticFile("photos/headshots/spiral-3.png"),
  staticFile("photos/headshots/spiral-4.png"),
  staticFile("photos/headshots/spiral-5.png"),
  staticFile("photos/headshots/hf_20260410_172518_83b9acad-9ba2-4b0c-b63c-9484cc90980b.png"),
];

const COUNT       = AVATARS.length;
const RING_SMALL  = 95;   // closer to logo
const RING_FULL   = 138;  // expands when images appear
const AVATAR_SIZE = 70;   // circle size at full bloom
const CENTER_SIZE = 108;

const easeInOut = Easing.bezier(0.37, 0, 0.63, 1);  // easeInOutSine

// ─── Phase timing ────────────────────────────────────────────────────────────
// Reference: 400-frame full cycle analysis
// Frames 1-75: empty spinning (pre-spin)
// Frames 75-120: images appearing & expanding (bloom)
// Frames 120-300: full visible spinning
// Frames 300-360: contracting & fading
// Frames 360-400: pause/rest

const PRE_SPIN_START = 0;
const PRE_SPIN_DUR   = 150;  // empty circles spinning before images appear

const BLOOM_START    = PRE_SPIN_START + PRE_SPIN_DUR; // 150
const BLOOM_STAGGER  = 10;  // stagger images by 10 frames each (smooth domino)
const BLOOM_DUR      = 90;  // appearance transition
const LAST_BLOOM_END = BLOOM_START + (COUNT - 1) * BLOOM_STAGGER + BLOOM_DUR; // 310

const SPIN_DUR       = 290; // spin at full expansion
const CONTRACT_START = LAST_BLOOM_END + SPIN_DUR; // 600
const CONTRACT_DUR   = 120; // contract and fade
const LAST_CONTRACT_END = CONTRACT_START + CONTRACT_DUR; // 720

const PAUSE_DUR = 80;
const CYCLE     = LAST_CONTRACT_END + PAUSE_DUR; // 800

// ─── Ring rotation ────────────────────────────────────────────────────────────
// Trapezoidal velocity: smooth ramp-up, constant speed through the main phase,
// smooth ramp-down. Velocity = 0 at both ends → blends into the pause.
// The constant middle section avoids the accel/decel wobble of a single ease.
function getRingRotation(f: number, cycleOffset: number): number {
  const fc = f % CYCLE;
  if (fc >= LAST_CONTRACT_END) return cycleOffset + 360;
  if (fc < PRE_SPIN_START) return cycleOffset;

  const total = LAST_CONTRACT_END - PRE_SPIN_START;
  const t = (fc - PRE_SPIN_START) / total;
  const rampFrac = 0.18;
  const vMax = 1 / (1 - rampFrac);

  let progress: number;
  if (t < rampFrac) {
    const u = t / rampFrac;
    progress = vMax * rampFrac * u * u * u * (1 - 0.5 * u);
  } else if (t < 1 - rampFrac) {
    progress = vMax * rampFrac * 0.5 + vMax * (t - rampFrac);
  } else {
    const u = (1 - t) / rampFrac;
    progress = 1 - vMax * rampFrac * u * u * u * (1 - 0.5 * u);
  }

  return cycleOffset + progress * 360;
}

// ─── Image opacity ─────────────────────────────────────────────────────────────
// Images fade in with stagger; fade out with stagger on contract
function getOpacity(fc: number, i: number): number {
  const bloomStart = BLOOM_START + i * BLOOM_STAGGER;
  const contractStart = CONTRACT_START + i * BLOOM_STAGGER;
  const contractEnd   = contractStart + CONTRACT_DUR;

  // Smooth ease-in for appearance (slow start, fast end)
  const fadeIn  = interpolate(fc, [bloomStart, bloomStart + BLOOM_DUR], [0, 1], {
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94), // ease-out (natural fade in)
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  // Smooth ease-out for disappearance (fast start, slow end - buttery)
  const fadeOut = interpolate(fc, [contractStart, contractEnd], [1, 0], {
    easing: Easing.bezier(0.25, 0.1, 0.82, 0.9), // ease-in (natural fade out)
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return Math.min(fadeIn, fadeOut);
}

// ─── Component ────────────────────────────────────────────────────────────────
export const EmpowerEveryTeam: React.FC = () => {
  const frame = useCurrentFrame();

  const cycleIndex         = Math.floor(frame / CYCLE);
  const prevCyclesRotation = cycleIndex * 360;
  const ringDeg = getRingRotation(frame, prevCyclesRotation);
  const ringRad = (ringDeg * Math.PI) / 180;
  const fc = frame % CYCLE;

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(180deg, #6ab8e8 0%, #4a96d4 45%, #2a6bbf 100%)",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 35%, rgba(255,255,255,0.13) 0%, transparent 65%)",
      }} />

      <div style={{ position: "absolute", top: "50%", left: "50%" }}>
        {/* Pair logo — always upright */}
        <div style={{
          position: "absolute",
          width: CENTER_SIZE, height: CENTER_SIZE,
          top: -CENTER_SIZE / 2, left: -CENTER_SIZE / 2,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.22)",
          border: "2px solid rgba(255,255,255,0.45)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Img src={staticFile("branding/pair-icon-white.png")}
            style={{ width: 52, height: 52, objectFit: "contain" }} />
        </div>

        {AVATARS.map((src, i) => {
          const bloomStart    = BLOOM_START;
          const contractStart = CONTRACT_START;
          const contractEnd   = contractStart + CONTRACT_DUR;

          // Symmetric ease-in-out glide, no overshoot, no ripple
          let radius: number;
          if (fc < bloomStart) {
            radius = RING_SMALL;
          } else if (fc < contractStart) {
            radius = interpolate(fc, [bloomStart, bloomStart + BLOOM_DUR], [RING_SMALL, RING_FULL], {
              easing: easeInOut,
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
            });
          } else {
            radius = interpolate(fc, [contractStart, contractEnd], [RING_FULL, RING_SMALL], {
              easing: easeInOut,
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
            });
          }

          const scale = interpolate(radius, [RING_SMALL, RING_FULL], [0.62, 1.0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          });
          const opacity = getOpacity(fc, i);
          const angle   = (i / COUNT) * 2 * Math.PI - Math.PI / 2 + ringRad;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const size = AVATAR_SIZE * scale;

          return (
            <div key={i} style={{
              position: "absolute",
              width: size, height: size,
              top: y - size / 2, left: x - size / 2,
              borderRadius: "50%", overflow: "hidden",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}>
              <div style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                background: "rgba(255,255,255,0.22)",
                border: `${1 + scale}px solid rgba(255,255,255,0.45)`,
              }} />
              <Img src={src} style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover", borderRadius: "50%",
                opacity,
              }} />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
