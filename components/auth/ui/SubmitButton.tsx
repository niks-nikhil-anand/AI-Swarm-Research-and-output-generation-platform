import type { ReactNode } from "react";
import { icons } from "@/components/landing/data/icons";
import { Icon } from "@/components/landing/ui/Icon";

export function SubmitButton({
  loading,
  loadingLabel,
  children,
}: {
  loading: boolean;
  loadingLabel: string;
  children: ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="mt-1.5 flex h-12 w-full items-center justify-center gap-2 rounded-xl border-0 bg-brand-strong text-[15px] font-medium text-white shadow-[0_8px_24px_rgba(124,111,247,0.3)] transition-colors hover:bg-brand disabled:cursor-wait disabled:opacity-80"
    >
      {loading ? (
        <>
          <span className="size-[15px] animate-spin rounded-full border-2 border-white/40 border-t-white" />
          {loadingLabel}
        </>
      ) : (
        <>
          {children}
          <Icon d={icons.arrowRight} size={15} strokeWidth={1.8} />
        </>
      )}
    </button>
  );
}
