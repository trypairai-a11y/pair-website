"use client";

import { useRive } from "@rive-app/react-canvas";

export default function RiveEmpowerTeam({ paused = false }: { paused?: boolean }) {
  const { RiveComponent, rive } = useRive({
    src: "/empower-every-team.riv",
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
    <div className="relative w-full h-full min-h-[400px]">
      <RiveComponent className="w-full h-full" />
      {/* Overlay Pair icon on top of the Rive center logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[60px] h-[60px] rounded-full bg-[rgb(61,120,182)]/60 backdrop-blur-sm flex items-center justify-center">
          <img
            src="/branding/pair-icon-white.png"
            alt="Pair"
            className="w-7 h-7 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
