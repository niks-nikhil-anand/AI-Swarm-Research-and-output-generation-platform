import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Accent } from "@/components/landing/ui/Accent";

export const metadata: Metadata = {
  title: "Create account · AI Swarm",
  description: "Create a free AI Swarm account. No credit card required.",
};

export default function RegisterPage() {
  return (
    <AuthShell
      mode="register"
      eyebrow="CREATE ACCOUNT"
      title={
        <>
          Start free. <Accent>Build your team.</Accent>
        </>
      }
      description="Set up a workspace where specialized agents research, verify and deliver finished work."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-brand-soft hover:text-fg">
            Sign in →
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
