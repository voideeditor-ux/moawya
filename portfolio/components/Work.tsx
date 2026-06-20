"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";
import { categories, type Category } from "@/data/projects";
import type { SanityProject } from "@/lib/queries";

interface Props {
  projects: SanityProject[];
}

export default function Work({ projects }: Props) {
  const [active, setActive] = useState<Category>("All");
  const [selected, setSelected] = useState<SanityProject | null>(null);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <section
        id="work"
        ref={ref}
        className="py-32 px-6"
        style={{ background: "#080808" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-6 mb-16"
          >
            <span
              className="text-xs tracking-[0.4em] uppercase"
              style={{ color: "#c9a84c" }}
            >
              01 / Work
            </span>
            <div className="flex-1 h-px" style={{ background: "#2a2a2a" }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-4xl sm:text-5xl mb-14"
            style={{ fontFamily: "var(--font-playfair)", color: "#f0f0f0" }}
          >
            Selected Projects
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-16"
          >
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActive(cat)}
                className="px-5 py-2 text-xs tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer"
                style={
                  active === cat
                    ? { background: "#c9a84c", color: "#080808", border: "1px solid #c9a84c" }
                    : { background: "transparent", color: "#555", border: "1px solid #2a2a2a" }
                }
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <VideoCard
                  key={project._id}
                  project={project}
                  index={i}
                  onClick={project.videoUrl ? () => setSelected(project) : undefined}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center py-20 text-sm" style={{ color: "#444" }}>
              {projects.length === 0
                ? "No projects yet — add some in the Sanity Studio."
                : "No projects in this category yet."}
            </p>
          )}
        </div>
      </section>

      <VideoModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
