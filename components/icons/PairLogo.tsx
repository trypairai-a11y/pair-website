import Image from "next/image";

export default function PairLogo({
  className = "",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  const isWhite = color === "white";

  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src={isWhite ? "/branding/pair-white.png" : "/branding/pair-blue.png"}
        alt="Pair"
        width={180}
        height={64}
        className="h-14 w-auto"
        priority
      />
    </div>
  );
}
