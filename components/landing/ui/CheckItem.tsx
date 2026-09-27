import type { ReactNode } from "react";
import { icons } from "../data/icons";
import { Icon } from "./Icon";

export function CheckItem({
  children,
  size = 15,
  className = "gap-2.5",
}: {
  children: ReactNode;
  size?: number;
  className?: string;
}) {
  return (
    <span className={`flex items-center ${className}`}>
      <Icon d={icons.check} size={size} strokeWidth={2} className="text-mint" />
      {children}
    </span>
  );
}
