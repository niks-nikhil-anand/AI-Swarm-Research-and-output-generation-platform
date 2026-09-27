import Image from "next/image";
import githubIcon from "@/public/social-icon/github.png";
import googleIcon from "@/public/social-icon/google.png";

const providers = [
  { id: "google", label: "Google", icon: googleIcon },
  { id: "github", label: "GitHub", icon: githubIcon },
];

export function OrDivider() {
  return (
    <div className="my-6 flex items-center gap-3" aria-hidden="true">
      <span className="h-px grow bg-line" />
      <span className="font-code text-[11px] tracking-[0.12em] text-dim">OR</span>
      <span className="h-px grow bg-line" />
    </div>
  );
}

export function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {providers.map((p) => (
        <button
          key={p.id}
          type="button"
          className="flex h-11 items-center justify-center gap-2.5 rounded-xl border border-line bg-panel text-sm font-medium text-fg-2 transition-colors hover:border-white/15 hover:text-fg"
        >
          <span className="flex size-6 items-center justify-center rounded-full bg-white">
            <Image src={p.icon} alt="" width={16} height={16} className="block object-contain" />
          </span>
          {p.label}
        </button>
      ))}
    </div>
  );
}
