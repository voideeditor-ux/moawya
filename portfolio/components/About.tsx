"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import type { SanitySettings } from "@/lib/queries";

const DEFAULT_TOOLS = [
  "Adobe Premiere Pro", "After Effects", "DaVinci Resolve",
  "Final Cut Pro", "Adobe Audition", "Photoshop", "Cinema 4D", "Frame.io",
];

const DEFAULT_STATS = [
  { value: "6+", label: "Years of Experience" },
  { value: "120+", label: "Projects Delivered" },
  { value: "40+", label: "Clients Worldwide" },
];

interface Props {
  settings: SanitySettings | null;
}

export default function About({ settings }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const tools = settings?.tools?.length ? settings.tools : DEFAULT_TOOLS;
  const stats = settings?.stats?.length ? settings.stats : DEFAULT_STATS;
  const photoUrl = settings?.photo
    ? urlFor(settings.photo).width(600).height(750).url()
    : null;

  return (
    <section id="about" ref={ref} className="py-32 px-6" style={{ background: "#080808" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-6 mb-20"
        >
          <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "#c9a84c" }}>
            02 / About
          </span>
          <div className="flex-1 h-px" style={{ background: "#2a2a2a" }} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left — text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-4xl sm:text-5xl leading-tight mb-8"
              style={{ fontFamily: "var(--font-playfair)", color: "#f0f0f0" }}
            >
              Telling stories
              <br />
              <span style={{ color: "#c9a84c" }}>frame by frame</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="space-y-5 text-base leading-relaxed"
              style={{ color: "#888888" }}
            >
              {settings?.bio ? (
                // Render Sanity portable text as plain paragraphs
                (settings.bio as Array<{ _type: string; children?: Array<{ text: string }> }>)
                  .filter((b) => b._type === "block")
                  .map((block, i) => (
                    <p key={i}>{block.children?.map((c) => c.text).join("")}</p>
                  ))
              ) : (
                <>
                  <p>
                    I&apos;m a video editor and motion designer with over six years of experience
                    turning raw footage into compelling narratives.
                  </p>
                  <p>
                    I specialize in commercial films, long-form documentaries, and music videos —
                    working closely with directors, brands, and musicians to shape the emotional
                    arc of every cut.
                  </p>
                  <p>Every transition, every color grade, every sound design choice serves the story.</p>
                </>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="grid grid-cols-3 gap-6 mt-14 pt-10"
              style={{ borderTop: "1px solid #2a2a2a" }}
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <p
                    className="text-3xl font-semibold mb-1"
                    style={{ fontFamily: "var(--font-playfair)", color: "#c9a84c" }}
                  >
                    {s.value}
                  </p>
                  <p className="text-xs tracking-wide" style={{ color: "#555" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — photo + tools */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative aspect-[4/5] w-full max-w-sm"
              style={{ border: "1px solid #2a2a2a" }}
            >
              {photoUrl ? (
                <Image
                  src={photoUrl}
                  alt="Profile photo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 400px"
                />
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: "#111111" }}
                >
                  <div className="text-center space-y-2">
                    <div
                      className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
                      style={{ border: "1px solid #2a2a2a" }}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <p className="text-xs tracking-widest uppercase" style={{ color: "#333" }}>Photo</p>
                  </div>
                </div>
              )}
              <div
                className="absolute -bottom-3 -right-3 w-20 h-20 pointer-events-none"
                style={{ border: "1px solid #c9a84c44" }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.4 }}
            >
              <p className="text-xs tracking-[0.3em] uppercase mb-5" style={{ color: "#555" }}>
                Tools &amp; Software
              </p>
              <div className="flex flex-wrap gap-3">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs px-4 py-2 tracking-wide"
                    style={{ border: "1px solid #2a2a2a", color: "#888888" }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
