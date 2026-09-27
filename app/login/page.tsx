import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";
import { Accent } from "@/components/landing/ui/Accent";

export const metadata: Metadata = {
  title: "Sign in · AI Swarm",
  description: "Sign in to AI Swarm and pick up your agent runs where you left them.",
};

export default function LoginPage() {
  return (
    <AuthShell
      mode="login"
      eyebrow="SIGN IN"
      title={
        <>
          Welcome back <Accent>to your swarm.</Accent>
        </>
      }
      description="Sign in to plan, run and review work with your AI agents."
      footer={
        <>
          New to AI Swarm?{" "}
          <Link href="/register" className="font-medium text-brand-soft hover:text-fg">
            Create an account →
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
