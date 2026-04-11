"use client";

import { useEffect } from "react";
import { GlassCalendar } from "@/components/ui/GlassCalendar";

function UserBubble({ name, avatar, text }: { name: string; avatar: string; text: string }) {
  return (
    <div className="place-self-end">
      <div className="rounded-3xl p-4 bg-black/40 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col gap-2 w-full max-w-[334px]">
        <div className="flex items-center gap-2 text-[12px] font-medium text-white/80">
          <figure className="relative aspect-square size-4 overflow-hidden rounded-full">
            <img src={avatar} alt={name} className="absolute inset-0 h-full w-full object-cover" />
          </figure>
          <span>{name}</span>
        </div>
        <div className="text-[14px] font-normal text-white leading-snug">{text}</div>
      </div>
    </div>
  );
}

function AgentBubble({ text }: { text: string }) {
  return (
    <div className="place-self-start">
      <div className="rounded-3xl p-4 bg-black/40 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col gap-2 w-full max-w-[334px]">
        <div className="flex items-center gap-2 text-[12px] font-medium text-white/80">
          <figure className="relative aspect-square size-4 overflow-hidden">
            <img src="/branding/pair-icon-white.png" alt="Pair" className="block h-auto w-full object-cover" />
          </figure>
          <span>Pair Agent</span>
        </div>
        <div className="text-[14px] font-normal text-white leading-snug">{text}</div>
      </div>
    </div>
  );
}

function ConfirmBubble({ text }: { text: string }) {
  return (
    <div className="place-self-start">
      <div className="rounded-3xl px-4 py-3 bg-black/40 backdrop-blur-2xl border border-white/15 shadow-2xl flex items-center justify-between w-full max-w-[334px]">
        <span className="text-[13px] font-medium text-white">{text}</span>
        <svg viewBox="0 0 16 16" fill="none" className="size-4 text-[#C8A24E]">
          <circle cx="8" cy="8" r="7" fill="currentColor"/>
          <path d="M5.5 8l2 2 3-3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

function PickerBubble() {
  return (
    <div className="place-self-start">
      <div className="rounded-3xl p-4 bg-black/40 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col gap-3 w-full max-w-[334px]">
        <div className="flex items-center justify-between text-[12px] text-white">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5"><path d="M15 18l-6-6 6-6"/></svg>
          <span className="font-medium">May 13</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5"><path d="M9 18l6-6-6-6"/></svg>
        </div>
        <div className="flex gap-2">
          <span className="rounded-full bg-[#C8A24E]/80 px-3 py-1 text-[11px] font-medium text-white">08:00</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white/80">08:30</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white/80">09:30</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white/80">10:00</span>
        </div>
      </div>
    </div>
  );
}

export default function DemoPage() {
  useEffect(() => {
    const main = document.querySelector("main");
    if (main) {
      main.style.background = "transparent";
      return () => { main.style.background = ""; };
    }
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center gap-16 py-[20vh] px-6 pb-[20vh]"
      style={{
        backgroundImage: "url('/photos/stock/green-foliage.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <GlassCalendar />

      {/* Chat messages demo */}
      <div className="flex flex-col gap-3 w-full max-w-[400px]">
        <UserBubble
          name="Othman"
          avatar="/photos/headshots/hf_20260410_172518_83b9acad-9ba2-4b0c-b63c-9484cc90980b.png"
          text="I don't recognize this 29 KD charge. Can you help?"
        />
        <AgentBubble text="I see that charge, Othman. It looks like a duplicate from your last order. I've submitted a refund for you." />
        <ConfirmBubble text="29 KD refund initiated" />
      </div>

      <div className="flex flex-col gap-3 w-full max-w-[400px]">
        <UserBubble
          name="Vanessa"
          avatar="/photos/stock/financial-services-headshot.jpg"
          text="My WiFi keeps dropping."
        />
        <AgentBubble text="Hi Vanessa! That's frustrating. I've reset it remotely. Your WiFi should be steady again within minutes." />
        <ConfirmBubble text="Connection restored" />
      </div>

      <div className="flex flex-col gap-3 w-full max-w-[400px]">
        <AgentBubble text="Yes, we have a few openings this morning." />
        <PickerBubble />
        <ConfirmBubble text="Appointment booked" />
      </div>
    </div>
  );
}
