import Image from "next/image";

export default function TestimonialCard({
  company,
  logoSrc,
  quote,
  name,
  title,
}: {
  company: string;
  logoSrc: string;
  quote: string;
  name: string;
  title: string;
}) {
  return (
    <div className="flex flex-col items-center text-center px-4 py-4">
      <div className="h-16 flex items-center justify-center mb-4">
        <Image
          src={logoSrc}
          alt={company}
          width={180}
          height={64}
          className="h-16 w-auto max-w-[160px] object-contain"
        />
      </div>
      <blockquote className="text-xs leading-5 text-sierra-text mb-1 max-w-xs">
        {quote}
      </blockquote>
      <p className="text-xs font-semibold text-sierra-text-dark leading-none">{name}</p>
      <p className="text-[10px] font-medium text-sierra-gray mt-0.5 leading-none">{title}</p>
    </div>
  );
}
