import Link from "next/link";
import { icons } from "../data/icons";
import { Icon } from "./Icon";

export function LogoMark() {
  return (
    <span className="flex size-7 items-center justify-center rounded-lg bg-brand text-white">
      <Icon d={icons.logo} strokeWidth={1.8} />
    </span>
  );
}

export function Logo({ byline = false, href = "/" }: { byline?: boolean; href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5 text-fg">
      <LogoMark />
      <span className="text-[15px] font-medium">AI Swarm</span>
      {byline && (
        <span className="hidden font-code text-[10px] text-dim sm:inline">by DevKit Market</span>
      )}
    </Link>
  );
}
