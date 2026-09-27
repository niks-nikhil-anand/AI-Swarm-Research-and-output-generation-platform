"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getPasswordRules } from "./passwordRules";
import { FormError } from "./ui/FormError";
import { PasswordField } from "./ui/PasswordField";
import { PasswordRules } from "./ui/PasswordRules";
import { OrDivider, SocialButtons } from "./ui/SocialButtons";
import { SubmitButton } from "./ui/SubmitButton";
import { TextField } from "./ui/TextField";

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showRules, setShowRules] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      setError("Fill in every field to continue.");
      return;
    }
    if (getPasswordRules(password).some((rule) => !rule.valid)) {
      setShowRules(true);
      setError("Password must be stronger. Check the requirements below.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error || "Something went wrong. Try again.");
        setLoading(false);
        return;
      }
      router.push("/new-swarm");
    } catch {
      setError("Couldn't reach the server. Try again.");
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={submit} noValidate className="flex flex-col gap-4">
        <TextField
          id="name"
          label="Full name"
          autoComplete="name"
          autoFocus
          placeholder="Your full name"
          value={name}
          onChange={setName}
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={setEmail}
        />
        <PasswordField
          id="password"
          label="Password"
          autoComplete="new-password"
          placeholder="Create a strong password"
          value={password}
          onChange={(value) => {
            setPassword(value);
            if (value) setShowRules(true);
          }}
        >
          {showRules ? (
            <PasswordRules password={password} />
          ) : (
            <p className="m-0 font-code text-[11px] text-dim">
              Use letters, a number and a symbol.
            </p>
          )}
        </PasswordField>
        <PasswordField
          id="confirm-password"
          label="Confirm password"
          autoComplete="new-password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
        <FormError message={error} />
        <SubmitButton loading={loading} loadingLabel="Creating account…">
          Create account
        </SubmitButton>
      </form>
      <OrDivider />
      <SocialButtons />
    </>
  );
}
