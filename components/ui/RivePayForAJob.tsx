"use client";

import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";

export default function RivePayForAJob({ paused = false }: { paused?: boolean }) {
  const { RiveComponent, rive } = useRive({
    src: "/pay-for-a-job.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  if (rive) {
    if (paused) {
      rive.pause();
    } else {
      rive.play();
    }
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <RiveComponent className="w-full h-full" />
    </div>
  );
}
