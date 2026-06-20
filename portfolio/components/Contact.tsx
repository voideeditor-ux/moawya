"use client";

import { useState, useRef, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import type { SanitySettings } from "@/lib/queries";

const DEFAULT_SOCIALS = [
  { label: "Instagram", url: "#" },
  { label: "Vimeo", url: "#" },
  { label: "LinkedIn", url: "#" },
  { label: "Behance", url: "#" },
];

interface Props {
  settings: SanitySettings | null;
}

const FORMSPREE = "https://formspree.io/f/mgobbqrl";

export default function Contact({ settings }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const email = settings?.email || "hello@moawya.com";
  const location = settings?.location || "Cairo, Egypt · Available worldwide";
  const socials = settings?.socials?.length ? settings.socials : DEFAULT_SOCIALS;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-32 px-6"
      style={{ background: "#080808", borderTop: "1px solid #2a2a2a" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-6 mb-20"
        >
          <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "#c9a84c" }}>
            03 / Contact
          </span>
          <div className="flex-1 h-px" style={{ background: "#2a2a2a" }} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-4xl sm:text-5xl leading-tight mb-8"
              style={{ fontFamily: "var(--font-playfair)", color: "#f0f0f0" }}
            >
              Let&apos;s create
              <br />
              <span style={{ color: "#c9a84c" }}>something great</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base leading-relaxed mb-12"
              style={{ color: "#888888" }}
            >
              Have a project in mind? Whether it&apos;s a brand film, a documentary,
              or a music video — I&apos;d love to hear about it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4 mb-14"
            >
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 text-sm group"
                style={{ color: "#888888" }}
              >
                <span style={{ color: "#c9a84c" }}>→</span>
                <span className="group-hover:text-[#c9a84c] transition-colors duration-200">
                  {email}
                </span>
              </a>
              <p className="flex items-center gap-3 text-sm" style={{ color: "#888888" }}>
                <span style={{ color: "#c9a84c" }}>→</span>
                {location}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex gap-6 flex-wrap"
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-widest uppercase transition-colors duration-200"
                  style={{ color: "#444" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#c9a84c")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#444")}
                >
                  {s.label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.25 }}
          >
            {status === "sent" ? (
              <div
                className="h-full flex flex-col items-center justify-center text-center py-20"
                style={{ border: "1px solid #2a2a2a" }}
              >
                <div
                  className="text-3xl mb-4"
                  style={{ fontFamily: "var(--font-playfair)", color: "#c9a84c" }}
                >
                  Thank you
                </div>
                <p className="text-sm" style={{ color: "#555" }}>I&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { id: "name", label: "Your Name", type: "text", placeholder: "John Smith" },
                  { id: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block text-xs tracking-widest uppercase mb-3"
                      style={{ color: "#555" }}
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      value={form[field.id as "name" | "email"]}
                      onChange={(e) => setForm((f) => ({ ...f, [field.id]: e.target.value }))}
                      className="w-full px-5 py-4 text-sm outline-none transition-colors duration-200"
                      style={{ background: "#111111", border: "1px solid #2a2a2a", color: "#f0f0f0" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#c9a84c")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#2a2a2a")}
                    />
                  </div>
                ))}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs tracking-widest uppercase mb-3"
                    style={{ color: "#555" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full px-5 py-4 text-sm outline-none resize-none transition-colors duration-200"
                    style={{ background: "#111111", border: "1px solid #2a2a2a", color: "#f0f0f0" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#c9a84c")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#2a2a2a")}
                  />
                </div>
                {status === "error" && (
                  <p className="text-xs text-center" style={{ color: "#c0392b" }}>
                    Something went wrong — please try emailing directly.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-4 text-sm tracking-[0.2em] uppercase font-medium transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "#c9a84c", color: "#080808" }}
                  onMouseEnter={(e) => {
                    if (status !== "sending")
                      (e.currentTarget as HTMLElement).style.background = "#e8c96a";
                  }}
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = "#c9a84c")
                  }
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
