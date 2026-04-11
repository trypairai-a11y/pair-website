"use client";

import { Player } from "@remotion/player";
import { EmpowerEveryTeam } from "@/remotion/EmpowerEveryTeam";

export default function RemotionEmpowerTeam() {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Player
        component={EmpowerEveryTeam}
        durationInFrames={400}
        compositionWidth={590}
        compositionHeight={744}
        fps={30}
        autoPlay
        loop
        acknowledgeRemotionLicense
        style={{
          width: 590,
          height: 744,
        }}
      />
    </div>
  );
}
