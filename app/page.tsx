import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  title: "AI Swarm — One goal. A team of AI agents.",
  description:
    "AI Swarm plans, delegates, executes and reviews complex tasks with specialized AI agents that work together toward one finished result.",
  keywords: [
    "AI Swarm",
    "AI research platform",
    "open-source AI chat platform",
    "AI agent workflow",
    "AI Nexus Chat",
    "long-context AI chat",
    "AI research assistant",
    "AI output generation",
    "AI tools for developers",
    "Next.js AI platform",
  ],
  openGraph: {
    title: "AI Swarm Research Platform",
    description:
      "Multiple AI agents, one goal, one finished result. Plan, delegate, execute and review complex work with an AI swarm.",
    type: "website",
  },
};

export default function Home() {
  return <LandingPage />;
}
