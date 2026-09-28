import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  title: "Launch your SaaS with an AI team | AI Swarm",
  description:
    "Validate your SaaS idea, write the spec, build the app and prepare your launch with an AI product team, all in one workspace.",
  keywords: [
    "SaaS launch",
    "validate SaaS idea",
    "AI product team",
    "SaaS market research",
    "competitor analysis",
    "PRD generator",
    "AI for indie hackers",
    "AI for solo founders",
    "Product Hunt launch kit",
    "Next.js SaaS",
  ],
  openGraph: {
    title: "Launch your SaaS with an AI team",
    description:
      "Give your SaaS idea an AI product team: research, spec, code, marketing and launch, with every step approved by you.",
    type: "website",
  },
};

export default function Home() {
  return <LandingPage />;
}
