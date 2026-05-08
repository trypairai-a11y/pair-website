import Link from "next/link";

export default function FeatureCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
}) {
  const content = (
    <div className="card-glass rounded-xl p-6 h-full">
      <div className="w-10 h-10 rounded-lg bg-sierra-green/10 flex items-center justify-center text-sierra-green mb-4">
        {icon}
      </div>
      <h3 className="text-base font-medium text-sierra-text-dark mb-2">
        {title}
      </h3>
      <p className="text-sm text-sierra-gray leading-relaxed">{description}</p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }
  return content;
}
