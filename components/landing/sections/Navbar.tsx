"use client";

import { useState } from "react";
import { navLinks, routes } from "../data/content";
import { icons } from "../data/icons";
import { Icon } from "../ui/Icon";
import { Logo } from "../ui/Logo";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/80 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-5 lg:h-[60px] lg:px-8">
        <Logo byline />

        <nav aria-label="Primary" className="hidden gap-7 text-[13.5px] lg:flex">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className={`transition-colors hover:text-fg ${i === 0 ? "text-fg" : "text-muted"}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a href={routes.signIn} className="text-[13.5px] text-muted transition-colors hover:text-fg">
            Sign in
          </a>
          <a
            href={routes.start}
            className="rounded-[10px] bg-brand-strong px-4 py-[9px] text-[13.5px] font-medium text-white shadow-[0_10px_15px_-3px_rgba(124,111,247,0.2)] transition-colors hover:bg-brand"
          >
            Start Free
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="flex size-11 items-center justify-center rounded-xl border border-line bg-transparent text-fg lg:hidden"
        >
          <Icon d={open ? icons.close : icons.menu} size={18} />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="flex flex-col gap-1 border-t border-line px-5 pt-3 pb-5 lg:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-[15px] text-muted hover:bg-panel hover:text-fg"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 flex flex-col gap-2.5">
            <a
              href={routes.signIn}
              className="flex h-12 items-center justify-center rounded-xl border border-line text-[15px] text-fg-2"
            >
              Sign in
            </a>
            <a
              href={routes.start}
              className="flex h-12 items-center justify-center rounded-xl bg-brand-strong text-[15px] font-medium text-white"
            >
              Start Free
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
