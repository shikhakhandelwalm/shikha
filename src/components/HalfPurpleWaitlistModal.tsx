"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function HalfPurpleWaitlistModal({ open, onClose }: Props) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [email, setEmail] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, onClose]);

  async function joinWaitlist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website: form.get("website") }),
      });
      if (!response.ok) throw new Error("Unable to join");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function closeModal() {
    onClose();
    window.setTimeout(() => {
      setStatus("idle");
      setEmail("");
    }, 250);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#17131F]/70 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="halfpurple-waitlist-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="relative w-full max-w-xl overflow-hidden rounded-[32px] border border-white/20 bg-[#F8F5FF] p-7 text-[#25202E] shadow-[0_30px_100px_rgba(20,10,35,0.45)] md:p-10"
          >
            <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#D8CEFF] blur-2xl" />
            <button
              type="button"
              aria-label="Close waitlist"
              onClick={closeModal}
              className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/70 text-xl text-[#4F4858] transition hover:bg-white"
            >
              ×
            </button>

            {status === "success" ? (
              <div className="relative py-4">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-[#7C6FE8] text-2xl font-bold text-white">✓</div>
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#7C6FE8]">Welcome, early tester</p>
                <h2 id="halfpurple-waitlist-title" className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.035em] md:text-4xl">
                  Congratulations—you’re on the HalfPurple early beta list. 💜
                </h2>
                <p className="mt-5 text-base leading-7 text-[#625B6B]">
                  Early access begins Friday, October 16, 2026, at 12:00 p.m. Pacific. We’ll email you with access details. You’ll be able to explore the app, try the early experience and report anything that feels unclear, broken or missing.
                </p>
                <p className="mt-5 font-semibold text-[#3D3547]">Your feedback will help shape HalfPurple.</p>
              </div>
            ) : (
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-full bg-[linear-gradient(90deg,#FFFFFF_50%,#7C6FE8_50%)] shadow-md" />
                  <span className="font-bold">HalfPurple</span>
                </div>
                <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#7C6FE8]">Private launch waitlist</p>
                <h2 id="halfpurple-waitlist-title" className="mt-3 text-4xl font-semibold leading-[1.05] tracking-[-0.045em]">
                  Be among the first to experience HalfPurple.
                </h2>
                <p className="mt-5 text-base leading-7 text-[#625B6B]">
                  Join the early beta, explore the first experience and help shape a warmer kind of everyday epilepsy support.
                </p>

                <form onSubmit={joinWaitlist} className="mt-7">
                  <label htmlFor="waitlist-email" className="text-sm font-semibold">Your email address</label>
                  <input
                    ref={inputRef}
                    id="waitlist-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="mt-2 h-14 w-full rounded-2xl border border-[#D9D1E6] bg-white px-4 text-base outline-none transition placeholder:text-[#A49CAB] focus:border-[#7C6FE8] focus:ring-4 focus:ring-[#7C6FE8]/10"
                  />
                  <input name="website" tabIndex={-1} autoComplete="off" className="absolute -left-[10000px] opacity-0" aria-hidden="true" />
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="mt-3 h-14 w-full rounded-2xl bg-[#7C6FE8] px-5 font-semibold text-white transition hover:bg-[#6E60DF] disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === "submitting" ? "Adding you…" : "Join the waitlist"}
                  </button>
                  <p className="mt-3 text-center text-xs text-[#847B8E]">One click. No activation step. No spam.</p>
                  {status === "error" && (
                    <p role="alert" className="mt-3 text-center text-sm font-medium text-red-700">We couldn’t add you just now. Please try again.</p>
                  )}
                </form>
              </div>
            )}
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
