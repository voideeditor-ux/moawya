"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SanitySettings } from "@/lib/queries";

const ease = [0.22, 1, 0.36, 1] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease, delay },
  };
}

// Accepts any Vimeo URL format and returns the player embed URL
function toVimeoEmbedUrl(url: string): string {
  const match = url.match(/(?:vimeo\.com\/(?:manage\/videos\/|video\/|))(\d+)/);
  if (!match) return url;
  return `https://player.vimeo.com/video/${match[1]}`;
}

interface Props {
  settings: SanitySettings | null;
}

export default function Hero({ settings }: Props) {
  const [showreel, setShowreel] = useState(false);

  const name = settings?.name || "Moawya";
  const tagline = settings?.tagline || "Video Editor · Motion Designer";
  const rawShowreelUrl = settings?.showreelUrl || null;
  const showreelEmbedUrl = rawShowreelUrl ? toVimeoEmbedUrl(rawShowreelUrl) : null;

  const scrollToWork = () => {
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ background: "#080808" }}
      >
        {/* Film grain overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />

        {/* Radial glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Horizontal rule accents */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #c9a84c44, transparent)" }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #c9a84c44, transparent)" }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.p
            {...fadeUp(0.1)}
            className="text-xs tracking-[0.4em] uppercase mb-8"
            style={{ color: "#c9a84c" }}
          >
            {tagline}
          </motion.p>

          <motion.h1
            {...fadeUp(0.3)}
            className="text-6xl sm:text-8xl md:text-[9rem] leading-none mb-8"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "#f0f0f0",
              letterSpacing: "-0.02em",
            }}
          >
            {name}
          </motion.h1>

          <motion.p
            {...fadeUp(0.5)}
            className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-14"
            style={{ color: "#888888" }}
          >
            Crafting cinematic stories that move people — from brand films and
            documentaries to music videos and social campaigns.
          </motion.p>

          <motion.div
            {...fadeUp(0.7)}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              type="button"
              onClick={scrollToWork}
              className="group relative px-10 py-4 text-sm tracking-[0.2em] uppercase font-medium overflow-hidden transition-all duration-300 cursor-pointer"
              style={{ background: "#c9a84c", color: "#080808" }}
            >
              <span className="relative z-10">View Work</span>
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "#e8c96a" }}
              />
            </button>

            {showreelEmbedUrl ? (
              <button
                type="button"
                onClick={() => setShowreel(true)}
                className="flex items-center gap-3 px-10 py-4 text-sm tracking-[0.2em] uppercase font-medium transition-colors duration-300 cursor-pointer"
                style={{ border: "1px solid #2a2a2a", color: "#888888" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#c9a84c";
                  (e.currentTarget as HTMLElement).style.color = "#c9a84c";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#2a2a2a";
                  (e.currentTarget as HTMLElement).style.color = "#888888";
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
                Watch Showreel
              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-10 py-4 text-sm tracking-[0.2em] uppercase font-medium transition-colors duration-300 cursor-pointer"
                style={{ border: "1px solid #2a2a2a", color: "#888888" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#c9a84c";
                  (e.currentTarget as HTMLElement).style.color = "#c9a84c";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#2a2a2a";
                  (e.currentTarget as HTMLElement).style.color = "#888888";
                }}
              >
                Get in Touch
              </button>
            )}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "#444" }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-10"
            style={{ background: "linear-gradient(to bottom, #c9a84c, transparent)" }}
          />
        </motion.div>
      </section>

      {/* Showreel modal */}
      <AnimatePresence>
        {showreel && showreelEmbedUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10"
            style={{ background: "rgba(0,0,0,0.95)" }}
            onClick={() => setShowreel(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowreel(false)}
                className="absolute -top-12 right-0 flex items-center gap-2 text-xs tracking-widest uppercase cursor-pointer transition-colors duration-200"
                style={{ color: "#555" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#c9a84c")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#555")}
              >
                Close <span className="text-base leading-none">✕</span>
              </button>

              <div className="relative w-full" style={{ aspectRatio: "16/9", background: "#000" }}>
                <iframe
                  src={`${showreelEmbedUrl}?autoplay=1&color=c9a84c&title=0&byline=0&portrait=0`}
                  title="Showreel"
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
