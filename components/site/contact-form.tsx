"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "box-sm w-full px-3.5 py-3 text-[14.5px] text-ink outline-none transition-colors duration-300 placeholder:text-zinc-400 focus:border-accent";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="eyebrow mb-2 block text-zinc-400"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            value={form.name}
            onChange={update("name")}
            placeholder="Your name"
            className={field}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="eyebrow mb-2 block text-zinc-400"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            placeholder="you@example.com"
            className={field}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="eyebrow mb-2 block text-zinc-400"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={update("message")}
          placeholder="What are you building?"
          className={`${field} resize-none`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={status === "sending" || status === "sent"}
          className="press group inline-flex items-center gap-2 rounded-xs bg-ink px-6 py-3 text-[14px] font-medium text-white transition-colors duration-300 hover:bg-accent disabled:opacity-60"
        >
          {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
          {status === "sent" && <Check className="h-4 w-4" />}
          {status === "sending"
            ? "Sending"
            : status === "sent"
              ? "Message sent"
              : "Send message"}
          {status === "idle" && (
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          )}
        </button>

        <AnimatePresence mode="wait">
          {status === "sent" && (
            <motion.p
              key="sent"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[13.5px] text-emerald-600"
            >
              Thanks — I&apos;ll get back to you shortly.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[13.5px] text-accent"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
