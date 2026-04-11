"use client";

import dynamic from "next/dynamic";
import Container from "@/components/layout/Container";
import { EmpowerEveryTeam } from "@/remotion/EmpowerEveryTeam";

const RemotionPlayer = dynamic(
  () => import("@remotion/player").then((mod) => mod.Player),
  { ssr: false }
);

export default function AgentStudioSection() {

  return (
    <section className="bg-white py-section">
      <Container>
        {/* Desktop: centered animation */}
        <div className="hidden md:flex justify-center mb-12">
          <div style={{ width: 295, height: 372 }}>
            <RemotionPlayer
              component={EmpowerEveryTeam}
              compositionWidth={295}
              compositionHeight={372}
              durationInFrames={400}
              fps={30}
              controls
              autoPlay
              loop
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </div>

        {/* Mobile: full-height card layout */}
        <div className="md:hidden -mx-6 mb-12">
          <div className="bg-gradient-to-b from-blue-500 to-blue-600 rounded-3xl overflow-hidden mx-6 min-h-[500px]">
            <div className="p-8 h-full flex flex-col justify-center">
              {/* Remotion Animation - Mobile */}
              <div className="flex justify-center">
                <div style={{ width: 260, height: 330 }}>
                  <RemotionPlayer
                    component={EmpowerEveryTeam}
                    compositionWidth={260}
                    compositionHeight={330}
                    durationInFrames={400}
                    fps={30}
                    controls={false}
                    autoPlay
                    loop
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </Container>
    </section>
  );
}
