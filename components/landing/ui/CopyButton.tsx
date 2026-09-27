"use client";

import { useState } from "react";
import { icons } from "../data/icons";
import { Icon } from "./Icon";

export function CopyButton({ text, label = "Copy code" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable (insecure context); nothing to do.
    }
  }

  return (
    <button
      type="button"
      aria-label={copied ? "Copied" : label}
      onClick={copy}
      className="flex size-[30px] items-center justify-center rounded-lg border border-white/10 bg-transparent text-fg-2 hover:border-white/25"
    >
      <Icon d={copied ? icons.check : icons.copy} size={14} strokeWidth={copied ? 2 : 1.6} className={copied ? "text-mint" : ""} />
    </button>
  );
}
