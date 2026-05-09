"use client";

import { useEffect, useRef, useState } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { EmpowerEveryTeam } from "@/remotion/EmpowerEveryTeam";

const COMP_W = 590;
const COMP_H = 744;
const COMP_ASPECT = COMP_W / COMP_H;

export default function RemotionEmpowerTeam({ paused = false }: { paused?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<PlayerRef>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const ready = size.w > 0 && size.h > 0;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!ready) return;
    const player = playerRef.current;
    if (!player) return;
    if (paused) {
      player.pause();
    } else {
      // Player.play() returns a Promise that can reject under autoplay
      // restrictions; swallow it so the next user interaction can recover.
      Promise.resolve(player.play()).catch(() => {});
    }
  }, [paused, ready]);

  let playerW = 0;
  let playerH = 0;
  if (size.w > 0 && size.h > 0) {
    const containerAspect = size.w / size.h;
    if (containerAspect > COMP_ASPECT) {
      playerW = size.w;
      playerH = size.w / COMP_ASPECT;
    } else {
      playerH = size.h;
      playerW = size.h * COMP_ASPECT;
    }
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {playerW > 0 && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: playerW,
            height: playerH,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Player
            ref={playerRef}
            component={EmpowerEveryTeam}
            durationInFrames={800}
            compositionWidth={COMP_W}
            compositionHeight={COMP_H}
            fps={60}
            autoPlay={!paused}
            initiallyMuted
            loop
            acknowledgeRemotionLicense
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      )}
    </div>
  );
}
