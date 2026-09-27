"use client";

import { useState, type ReactNode } from "react";
import { icons } from "@/components/landing/data/icons";
import { Icon } from "@/components/landing/ui/Icon";
import { inputClass, labelClass } from "./TextField";

type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete: "current-password" | "new-password";
  aside?: ReactNode;
  children?: ReactNode;
};

export function PasswordField({
  id,
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  aside,
  children,
}: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
        {aside}
      </div>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`${inputClass} pr-11`}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          aria-pressed={show}
          className={`absolute top-1 right-1 flex size-9 items-center justify-center rounded-lg border-0 bg-transparent transition-colors hover:text-fg ${
            show ? "text-brand-soft" : "text-dim"
          }`}
        >
          <Icon d={icons.eye} />
        </button>
      </div>
      {children}
    </div>
  );
}
