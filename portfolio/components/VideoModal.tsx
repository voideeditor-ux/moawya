"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SanityProject } from "@/lib/queries";

interface Props {
  project: SanityProject | null;
  onClose: () => void;
}

export default function VideoModal({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          style={{ background: "rgba(0,0,0,0.92)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute -top-12 right-0 flex items-center gap-2 text-xs tracking-widest uppercase cursor-pointer transition-colors duration-200"
              style={{ color: "#555" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#c9a84c")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#555")}
            >
              Close
              <span className="text-base leading-none">✕</span>
            </button>

            {/* Video embed */}
            <div
              className="relative w-full"
              style={{ aspectRatio: "16/9", background: "#000" }}
            >
              <iframe
                src={`${project.videoUrl}?autoplay=1&color=c9a84c&title=0&byline=0&portrait=0`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Info bar */}
            <div
              className="flex items-start justify-between gap-6 px-6 py-5"
              style={{ background: "#111111", border: "1px solid #2a2a2a", borderTop: "none" }}
            >
              <div>
                <h3
                  className="text-lg font-medium mb-1"
                  style={{ fontFamily: "var(--font-playfair)", color: "#f0f0f0" }}
                >
                  {project.title}
                </h3>
                <p className="text-sm" style={{ color: "#555" }}>
                  {project.client} · {project.year} · {project.duration}
                </p>
              </div>
              <span
                className="shrink-0 text-xs px-3 py-1 tracking-widest uppercase mt-1"
                style={{ border: "1px solid #2a2a2a", color: "#c9a84c" }}
              >
                {project.category}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
