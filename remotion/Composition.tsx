import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const StarterComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const slideUp = interpolate(frame, [0, 30], [40, 0], {
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          opacity: opacity * fadeOut,
          transform: `translateY(${slideUp}px)`,
          textAlign: "center",
          color: "white",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -2 }}>
          Hello, Remotion
        </div>
        <div style={{ fontSize: 28, marginTop: 16, opacity: 0.6 }}>
          Edit remotion/Composition.tsx to get started
        </div>
      </div>
    </AbsoluteFill>
  );
};
