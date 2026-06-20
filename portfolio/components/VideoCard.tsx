"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import type { SanityProject } from "@/lib/queries";

interface Props {
  project: SanityProject;
  index: number;
  onClick?: () => void;
}

export default function VideoCard({ project, index, onClick }: Props) {
  const [hovered, setHovered] = useState(false);

  const thumbnailUrl = project.thumbnail
    ? urlFor(project.thumbnail).width(800).height(450).url()
    : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={onClick ? "group cursor-pointer" : "group cursor-default"}
    >
      {/* Thumbnail */}
      <div
        className="relative w-full overflow-hidden mb-5"
        style={{
          aspectRatio: "16/9",
          background: "#111111",
          border: "1px solid #2a2a2a",
        }}
      >
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700"
            style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div
            className="absolute inset-0 transition-colors duration-500"
            style={{ background: hovered ? "#1a1a1a" : "#111111" }}
          />
        )}

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ opacity: hovered && onClick ? 1 : 0, scale: hovered && onClick ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center w-16 h-16 rounded-full"
            style={{
              background: "rgba(201,168,76,0.15)",
              border: "1px solid #c9a84c",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#c9a84c">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </motion.div>
        </div>

        {/* Category pill */}
        <div className="absolute top-4 left-4">
          <span
            className="text-xs px-3 py-1 tracking-widest uppercase"
            style={{
              background: "rgba(8,8,8,0.85)",
              border: "1px solid #2a2a2a",
              color: "#c9a84c",
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Duration */}
        {project.duration && (
          <div className="absolute bottom-4 right-4">
            <span
              className="text-xs px-2 py-1 font-mono"
              style={{ background: "rgba(8,8,8,0.85)", color: "#555" }}
            >
              {project.duration}
            </span>
          </div>
        )}

        {/* Gold border on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 pointer-events-none"
          style={{ border: "1px solid #c9a84c44" }}
        />
      </div>

      {/* Info */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3
            className="text-base font-medium mb-1 transition-colors duration-300"
            style={{
              fontFamily: "var(--font-playfair)",
              color: hovered ? "#c9a84c" : "#f0f0f0",
            }}
          >
            {project.title}
          </h3>
          <p className="text-sm" style={{ color: "#555" }}>
            {project.client} · {project.year}
          </p>
        </div>
        <motion.div
          animate={{ x: hovered ? 4 : 0, opacity: hovered && onClick ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="mt-1 shrink-0"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </motion.div>
      </div>
    </motion.article>
  );
}
