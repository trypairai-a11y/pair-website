"use client";

export default function AgentDisputeCard() {
  return (
    <div
      className="relative w-[280px] rounded-[28px] overflow-hidden shadow-2xl"
      style={{ aspectRatio: "9/14" }}
    >
      {/* Blurred background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=400&q=80')`,
          filter: "blur(4px) brightness(0.55)",
          transform: "scale(1.08)",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-5 pt-10 pb-6">
        {/* Faded top text (partially visible) */}
        <div className="text-white/60 text-[13px] leading-snug text-center px-2 mb-2 line-clamp-2">
          ...the settings. Can you also?
        </div>

        {/* Agent message bubble */}
        <div className="flex-1 flex items-center">
          <div
            className="w-full rounded-2xl px-4 py-3.5"
            style={{
              background: "rgba(30, 30, 30, 0.72)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Agent label */}
            <div className="flex items-center gap-2 mb-2.5">
              <div className="h-5 w-5 rounded-full bg-[#4d98e2]/90 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <circle cx="5" cy="3.5" r="2" fill="white" />
                  <path d="M1 9c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                </svg>
              </div>
              <span className="text-white/80 text-[11px] font-medium tracking-wide">
                Sierra Agent
              </span>
            </div>

            {/* Message */}
            <p className="text-white text-[13px] leading-[1.55]">
              I understand your concern, Othman. I've opened a dispute on that
              charge and will update you as soon as it's resolved.
            </p>
          </div>
        </div>

        {/* Unrecognized charge card */}
        <div
          className="mt-4 rounded-xl px-4 py-3"
          style={{
            background: "rgba(245, 249, 253, 0.95)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-2">
            Unrecognized charge
          </p>
          <div className="flex items-center gap-3">
            {/* Card icon */}
            <div className="h-8 w-8 rounded-lg bg-[#4d98e2]/15 flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="3.5" width="14" height="9" rx="1.5" stroke="#4d98e2" strokeWidth="1.3" />
                <path d="M1 6.5h14" stroke="#4d98e2" strokeWidth="1.3" />
                <rect x="3" y="9" width="4" height="1.5" rx="0.5" fill="#4d98e2" />
              </svg>
            </div>

            {/* Label + status */}
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-gray-800 leading-tight">
                Payment
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">Pending dispute...</p>
            </div>

            {/* Amount */}
            <span className="text-[13px] font-semibold text-gray-800 flex-shrink-0">
              29 KD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
