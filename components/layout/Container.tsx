export default function Container({
  children,
  className = "",
  narrow = false,
}: {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  const widthClasses = narrow
    ? "max-w-[1160px] px-7 lg:px-10"
    : "max-w-7xl px-6 lg:px-8";
  return (
    <div className={`mx-auto ${widthClasses} ${className}`}>
      {children}
    </div>
  );
}
