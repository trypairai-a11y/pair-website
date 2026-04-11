import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const AVATARS = [
  staticFile("photos/headshots/hf_20260410_181355_553370dd-f7c2-45cf-a5bf-41e0ad1ca131.png"),
  staticFile("photos/headshots/hf_20260410_174702_3fb869ce-1e28-46c7-b468-86aa04522920.png"),
  staticFile("photos/headshots/hf_20260410_172518_83b9acad-9ba2-4b0c-b63c-9484cc90980b.png"),
  staticFile("photos/headshots/hf_20260410_170726_823d5230-c5d5-46c1-aae9-a15b92e2d078.png"),
  staticFile("photos/headshots/hf_20260410_181821_d712243b-b0ed-46aa-b73b-4b8ab7fcad70.png"),
  staticFile("photos/headshots/hf_20260410_174203_18cb8da3-fd6a-40a1-b5ab-1cc0205355d1.png"),
  staticFile("photos/headshots/hf_20260410_172548_85b65cae-485b-4406-83dc-1f100b8c17fd.png"),
  staticFile("photos/headshots/hf_20260410_170644_e195688d-1dd9-4338-ba16-a6566c27cc36.png"),
];

const COUNT       = AVATARS.length;
const RING_SMALL  = 95;   // closer to logo
const RING_FULL   = 135;  // expands when images appear
const AVATAR_SIZE = 80;   // bigger circles
const CENTER_SIZE = 108;

const easeIn    = Easing.bezier(0.12, 0, 0.39, 0);  // easeInSine
const easeInOut = Easing.bezier(0.37, 0, 0.63, 1);  // easeInOutSine

// ─── Phase timing ────────────────────────────────────────────────────────────
// Reference: 400-frame full cycle analysis
// Frames 1-75: empty spinning (pre-spin)
// Frames 75-120: images appearing & expanding (bloom)
// Frames 120-300: full visible spinning
// Frames 300-360: contracting & fading
// Frames 360-400: pause/rest

const PRE_SPIN_START = 0;
const PRE_SPIN_DUR   = 75;  // empty circles spinning before images appear

const BLOOM_START    = PRE_SPIN_START + PRE_SPIN_DUR; // 75 - images start appearing
const BLOOM_STAGGER  = 5;   // stagger images by 5 frames each (smooth domino)
const BLOOM_DUR      = 45;  // appearance transition over 45 frames
const LAST_BLOOM_END = BLOOM_START + (COUNT - 1) * BLOOM_STAGGER + BLOOM_DUR; // 75 + 35 + 45 = 155

const SPIN_DUR       = 145;  // spin at full expansion (300 - 155)
const CONTRACT_START = LAST_BLOOM_END + SPIN_DUR; // 300 - start contracting
const CONTRACT_DUR   = 60;  // contract and fade over 60 frames
const LAST_CONTRACT_END = CONTRACT_START + CONTRACT_DUR; // 360

const PAUSE_DUR = 40;  // pause before next cycle
const CYCLE     = LAST_CONTRACT_END + PAUSE_DUR; // 400

// ─── Ring rotation ────────────────────────────────────────────────────────────
// easeInOutSine over the full active phase (pre-spin + bloom + contract) = 360°
// Velocity is 0 at both ends → blends seamlessly into the pause on both sides.
function getRingRotation(f: number, cycleOffset: number): number {
  const fc = f % CYCLE;
  if (fc >= LAST_CONTRACT_END) return cycleOffset + 360;
  if (fc < PRE_SPIN_START) return cycleOffset;
  return cycleOffset + interpolate(fc, [PRE_SPIN_START, LAST_CONTRACT_END], [0, 360], {
    easing: easeInOut, extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
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
  const { fps } = useVideoConfig();

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
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Img src={staticFile("branding/pair-icon-white.png")}
            style={{ width: 52, height: 52, objectFit: "contain" }} />
        </div>

        {AVATARS.map((src, i) => {
          const bloomStart    = BLOOM_START;  // all expand at same time
          const contractStart = CONTRACT_START + i * 3;  // stagger contraction (3 frames apart)
          const contractEnd   = contractStart + CONTRACT_DUR;

          // Spring pop-out with overshoot punch effect, ripple on contract
          let radius: number;
          if (fc < bloomStart) {
            radius = RING_SMALL;
          } else if (fc < contractStart) {
            const progress = spring({
              frame: fc - bloomStart,
              fps,
              config: { damping: 12, stiffness: 280, mass: 0.6 },
            });
            radius = RING_SMALL + (RING_FULL - RING_SMALL) * progress;
          } else {
            const contractProgress = interpolate(fc, [contractStart, contractEnd], [0, 1], {
              easing: Easing.bezier(0.25, 0.46, 0.45, 0.94), // ease-out for smooth contraction
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
            });
            // Smooth ripple punch effect - outward kick then smooth return
            const ripple = Math.sin(contractProgress * Math.PI) * 0.18;
            radius = RING_FULL - (RING_FULL - RING_SMALL) * contractProgress + ripple * (RING_FULL - RING_SMALL);
          }

          const scale = interpolate(radius, [RING_SMALL, RING_FULL], [0.42, 1.0], {
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
            }}>
              <div style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                background: "rgba(255,255,255,0.22)",
                border: `${Math.max(1, 2 * scale)}px solid rgba(255,255,255,0.45)`,
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
