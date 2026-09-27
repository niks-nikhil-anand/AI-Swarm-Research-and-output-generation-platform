"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FormError } from "./ui/FormError";
import { PasswordField } from "./ui/PasswordField";
import { OrDivider, SocialButtons } from "./ui/SocialButtons";
import { SubmitButton } from "./ui/SubmitButton";
import { TextField } from "./ui/TextField";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
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
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={setPassword}
          aside={
            <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-brand-soft hover:text-fg">
              Forgot?
            </a>
          }
        />
        <FormError message={error} />
        <SubmitButton loading={loading} loadingLabel="Signing in…">
          Sign in
        </SubmitButton>
      </form>
      <OrDivider />
      <SocialButtons />
    </>
  );
}
