import type { ReactNode } from "react";
import Link from "next/link";
import { landingFontVariables } from "@/components/landing/fonts";
import { Logo } from "@/components/landing/ui/Logo";
import { AuthShowcase } from "./AuthShowcase";

type AuthShellProps = {
  mode: "login" | "register";
  eyebrow: string;
  title: ReactNode;
  description: string;
  children: ReactNode;
  footer: ReactNode;
};

/**
 * Split-screen auth layout in the landing page's visual language.
 * The root layout locks <body> scrolling, so this owns its scroll container.
 */
export function AuthShell({ mode, eyebrow, title, description, children, footer }: AuthShellProps) {
  return (
    <div
      className={`landing ${landingFontVariables} h-dvh overflow-y-auto bg-ink bg-grid font-body text-fg antialiased`}
    >
      <div className="grid min-h-full grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div className="relative flex flex-col overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center_top,rgba(124,111,247,0.14),transparent_70%)] lg:hidden"
          />
          <header className="relative flex h-14 items-center justify-between px-5 sm:px-8 lg:h-[60px]">
            <Logo />
            <Link href="/" className="font-code text-xs text-muted transition-colors hover:text-fg">
              ← Back to home
            </Link>
          </header>

          <main className="relative flex grow items-center justify-center px-5 py-10 sm:px-8">
            <div className="w-full max-w-[400px]">
              <div className="font-code text-[11px] tracking-[0.12em] text-brand">{eyebrow}</div>
              <h1 className="mt-3 font-display text-[32px] leading-[1.15] font-normal tracking-[-0.01em] text-fg sm:text-[36px]">
                {title}
              </h1>
              <p className="mt-3 text-[15px] leading-[1.65] text-muted">{description}</p>

              <div className="mt-8">{children}</div>

              <div className="mt-8 text-center text-[13px] text-muted">{footer}</div>
            </div>
          </main>

          <p className="relative px-5 pb-6 text-center font-code text-[11px] leading-normal text-dim sm:px-8">
            Secured with JWT · sessions expire after 24h · By continuing you agree to the acceptable-use policy.
          </p>
        </div>

        <aside className="hidden lg:block">
          <AuthShowcase mode={mode} />
        </aside>
      </div>
    </div>
  );
}
