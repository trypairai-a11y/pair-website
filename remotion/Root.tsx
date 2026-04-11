import { Composition } from "remotion";
import { StarterComposition } from "./Composition";
import { EmpowerEveryTeam } from "./EmpowerEveryTeam";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Starter"
        component={StarterComposition}
        durationInFrames={90}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="EmpowerEveryTeam"
        component={EmpowerEveryTeam}
        durationInFrames={400}
        fps={30}
        width={590}
        height={744}
      />
    </>
  );
};
