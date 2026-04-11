"use client";

import { useRive } from "@rive-app/react-canvas";

export default function RivePayForAJob({ paused = false }: { paused?: boolean }) {
  const { RiveComponent, rive } = useRive({
    src: "/pay-for-a-job.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });

  if (rive) {
    if (paused) {
      rive.pause();
    } else {
      rive.play();
    }
  }

  return (
    <div className="w-full h-full min-h-[400px]">
      <RiveComponent className="w-full h-full" />
    </div>
  );
}
