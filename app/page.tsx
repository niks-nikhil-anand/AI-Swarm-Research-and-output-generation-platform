import type { Metadata } from "next";
import { HomePage } from "../components/home/HomePage";

export const metadata: Metadata = {
  title: "AI Swarm Research Platform | Open-Source AI Agent Workflow",
  description:
    "AI Swarm is an open-source AI research platform with AI Nexus Chat, agent workflows, source-aware output generation, and long-running research sessions.",
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
      "Research deeper, chat longer, and turn ideas into verified outputs with coordinated AI agents.",
    type: "website",
  },
};

export default function Home() {
  return <HomePage />;
}
