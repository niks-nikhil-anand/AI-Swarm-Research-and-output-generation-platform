import type { InputHTMLAttributes, ReactNode } from "react";

export const inputClass =
  "h-11 w-full rounded-xl border border-line bg-panel px-3.5 font-body text-sm text-fg outline-none transition-colors hover:border-white/15 focus:border-brand/60 focus:shadow-[0_0_0_4px_rgba(124,111,247,0.15)]";

export const labelClass = "text-[13px] font-medium text-fg-2";

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "className"> & {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Optional element shown at the right of the label row (e.g. "Forgot?"). */
  aside?: ReactNode;
  hint?: ReactNode;
};

export function TextField({ id, label, value, onChange, aside, hint, ...inputProps }: TextFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
        {aside}
      </div>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
        {...inputProps}
      />
      {hint}
    </div>
  );
}
