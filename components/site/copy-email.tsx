"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { profile } from "@/lib/data";

/** Copies the email to the clipboard and confirms inline for two seconds. */
export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      // Clipboard blocked (insecure context or denied) — the mailto link
      // next to this button still works, so fail quietly.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Email copied" : `Copy ${profile.email}`}
      className="press box-sm inline-flex items-center gap-2 px-4 py-2.5 font-mono text-[13px] text-zinc-600 transition-colors duration-300 hover:text-ink"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-emerald-500" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
      {copied ? "Copied" : profile.email}
    </button>
  );
}
