"use client";

import Image from "next/image";
import RiveChannels from "@/components/ui/RiveChannels";
import RiveEmpowerTeam from "@/components/ui/RiveEmpowerTeam";
import RivePayForAJob from "@/components/ui/RivePayForAJob";
import type { Media } from "@/app/product/_data";

export default function FeatureMedia({ media }: { media: Media }) {
  if (media.type === "image") {
    const fit = media.fit ?? "cover";
    if (fit === "contain") {
      return (
        <div className="absolute inset-0 flex items-center justify-center p-8 md:p-10 xl:p-14">
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 42vw, 100vw"
            className="object-contain"
          />
        </div>
      );
    }
    return (
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 42vw, 100vw"
        className="object-cover"
      />
    );
  }

  if (media.type === "video") {
    const fit = media.fit ?? "cover";
    return (
      <video
        src={media.src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className={`absolute inset-0 h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
        suppressHydrationWarning
      />
    );
  }

  if (media.type === "rive") {
    if (media.key === "channels") return <RiveChannels />;
    if (media.key === "empowerTeam") return <RiveEmpowerTeam />;
    if (media.key === "payForJob") return <RivePayForAJob />;
    return null;
  }

  return (
    <span className="text-sm text-sierra-gray font-medium tracking-wide">
      {media.text}
    </span>
  );
}
