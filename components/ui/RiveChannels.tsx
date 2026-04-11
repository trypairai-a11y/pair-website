"use client";

import { useRive } from "@rive-app/react-canvas";

export default function RiveChannels({ paused = false }: { paused?: boolean }) {
  const { RiveComponent, rive } = useRive({
    src: "/channels.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });

  // Sync pause/play state
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
