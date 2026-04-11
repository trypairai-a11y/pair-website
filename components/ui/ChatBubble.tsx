export default function ChatBubble({
  sender,
  message,
  isAgent = false,
}: {
  sender: string;
  message: string;
  isAgent?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-1 ${isAgent ? "items-end" : "items-start"}`}
    >
      <div className="flex items-center gap-2">
        <div
          className={`h-5 w-5 rounded-full flex items-center justify-center text-[8px] font-medium ${
            isAgent
              ? "bg-sierra-green/20 text-sierra-green"
              : "bg-sierra-text-dark text-white"
          }`}
        >
          {isAgent ? "S" : sender[0]}
        </div>
        <span className="text-[11px] text-sierra-gray">{sender}</span>
      </div>
      <div
        className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed max-w-[260px] ${
          isAgent
            ? "bg-white/60 text-sierra-text-dark"
            : "bg-white/80 text-sierra-text-dark"
        }`}
        style={{ backdropFilter: "blur(12px)" }}
      >
        {message}
      </div>
    </div>
  );
}
