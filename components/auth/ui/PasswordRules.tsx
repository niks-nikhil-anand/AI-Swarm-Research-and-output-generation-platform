import { icons } from "@/components/landing/data/icons";
import { Icon } from "@/components/landing/ui/Icon";
import { getPasswordRules } from "../passwordRules";

export function PasswordRules({ password }: { password: string }) {
  return (
    <ul className="m-0 mt-1.5 grid list-none grid-cols-1 gap-x-3 gap-y-1.5 p-0 sm:grid-cols-2" aria-label="Password requirements">
      {getPasswordRules(password).map((rule) => (
        <li
          key={rule.id}
          className={`flex min-w-0 items-center gap-1.5 font-code text-[11px] ${rule.valid ? "text-mint" : "text-dim"}`}
        >
          <span
            className={`flex size-4 shrink-0 items-center justify-center rounded-full border ${
              rule.valid ? "border-mint/40 bg-mint/10" : "border-line bg-panel"
            }`}
          >
            <Icon d={rule.valid ? icons.check : icons.close} size={10} strokeWidth={2.2} />
          </span>
          <span className="truncate">{rule.label}</span>
          <span className="sr-only">{rule.valid ? "(met)" : "(not met)"}</span>
        </li>
      ))}
    </ul>
  );
}
