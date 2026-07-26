"use client";

import Link from "next/link";
import { Icon, SwarmMark } from "../components/swarm/ui";

const features = [
  {
    icon: "wand",
    title: "AI Swarm Research",
    body: "Turn a goal into a coordinated research run with specialist agents for discovery, analysis, verification, and synthesis.",
  },
  {
    icon: "message-square",
    title: "AI Nexus Chat",
    body: "A central chat workspace for asking questions, refining direction, and moving from conversation to structured project execution.",
  },
  {
    icon: "shield",
    title: "Evidence First",
    body: "Track sources, search results, references, and verified evidence so every final claim can be reviewed.",
  },
  {
    icon: "layers",
    title: "Output Generation",
    body: "Prepare reports, slide outlines, document sections, and campaign drafts from one verified research workspace.",
  },
];

const stats = [
  ["Agents", "Plan, research, verify, write"],
  ["Projects", "History, progress, sources"],
  ["Skills", "Reusable domain expertise"],
];

export default function Home() {
  return (
    <main style={{ minHeight: "100%", overflow: "auto", background: "var(--bg)", color: "var(--text)" }}>
      <section style={{ borderBottom: "1px solid var(--border)", background: "linear-gradient(180deg, var(--bg-2), var(--bg))" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "22px 24px 0" }}>
          <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <SwarmMark size={32} glow={false} />
              <span style={{ fontSize: 17, fontWeight: 700 }}>AI Swarm</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Link href="/dashboard" style={navLinkStyle}>Dashboard</Link>
              <Link href="/chat" style={navLinkStyle}>Chat</Link>
              <Link href="/projects" style={navLinkStyle}>Projects</Link>
              <Link href="/new-swarm" style={primaryLinkStyle}>New Swarm</Link>
            </div>
          </nav>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: 48, alignItems: "center", padding: "82px 0 70px" }}>
            <div>
              <div className="eyebrow" style={{ color: "var(--accent-2)", marginBottom: 14 }}>Research automation workspace</div>
              <h1 style={{ fontSize: "clamp(36px, 7vw, 58px)", lineHeight: 1.02, letterSpacing: 0, margin: 0, maxWidth: 720 }}>
                Coordinate AI agents from idea to verified output.
              </h1>
              <p className="muted" style={{ fontSize: 18, lineHeight: 1.65, marginTop: 22, maxWidth: 650 }}>
                AI Swarm combines multi-agent research, AI Nexus Chat, source tracking, and output generation in one focused workspace for building reliable reports, decks, and content.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 32 }}>
                <Link href="/new-swarm" style={heroButtonStyle}><Icon name="plus" size={16} />Start a new swarm</Link>
                <Link href="/chat" style={secondaryButtonStyle}><Icon name="message-square" size={16} />Open chat</Link>
                <Link href="/projects" style={secondaryButtonStyle}><Icon name="folder" size={16} />View projects</Link>
              </div>
            </div>

            <div style={{ border: "1px solid var(--border)", background: "var(--glass-strong)", borderRadius: "var(--r-lg)", overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
              <div style={{ padding: 18, borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 32, height: 32, borderRadius: 8, display: "grid", placeItems: "center", background: "var(--accent-soft)", color: "var(--accent-2)" }}>
                  <Icon name="message-square" size={16} />
                </span>
                <div>
                  <div style={{ fontWeight: 700 }}>AI Nexus Chat</div>
                  <div className="faint" style={{ fontSize: 12 }}>Ask, refine, launch</div>
                </div>
              </div>
              <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 12 }}>
                <ChatBubble text="Research the fastest growing AI automation markets and prepare a board-ready summary." />
                <ChatBubble text="I can create a swarm with market research, source verification, data analysis, and output design agents." accent />
                <div style={{ marginTop: 8, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                  {stats.map(([title, body]) => (
                    <div key={title} style={{ padding: 12, border: "1px solid var(--border)", background: "var(--surface)", borderRadius: "var(--r-sm)" }}>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{title}</div>
                      <div className="faint" style={{ fontSize: 11.5, lineHeight: 1.4, marginTop: 4 }}>{body}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "42px 24px 72px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))", gap: 14 }}>
          {features.map((feature) => (
            <article key={feature.title} style={{ padding: 18, border: "1px solid var(--border)", borderRadius: "var(--r-md)", background: "var(--surface)" }}>
              <span style={{ width: 36, height: 36, borderRadius: 9, display: "grid", placeItems: "center", background: "var(--elevated)", color: "var(--accent-2)", marginBottom: 14 }}>
                <Icon name={feature.icon} size={17} />
              </span>
              <h2 style={{ fontSize: 15, margin: 0, letterSpacing: 0 }}>{feature.title}</h2>
              <p className="muted" style={{ fontSize: 13, lineHeight: 1.55, marginTop: 8 }}>{feature.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function ChatBubble({ text, accent }: { text: string; accent?: boolean }) {
  return (
    <div style={{
      alignSelf: accent ? "flex-end" : "flex-start", maxWidth: "88%", padding: "12px 14px",
      borderRadius: "var(--r-md)", border: `1px solid ${accent ? "var(--accent-line)" : "var(--border)"}`,
      background: accent ? "var(--accent-soft)" : "var(--surface)", color: accent ? "var(--text)" : "var(--text-2)",
      fontSize: 13.5, lineHeight: 1.55,
    }}>
      {text}
    </div>
  );
}

const navLinkStyle = {
  color: "var(--muted)",
  fontSize: 13.5,
  fontWeight: 600,
} as const;

const primaryLinkStyle = {
  height: 36,
  display: "inline-flex",
  alignItems: "center",
  padding: "0 14px",
  borderRadius: "var(--r-sm)",
  background: "var(--accent)",
  color: "#fff",
  fontSize: 13.5,
  fontWeight: 700,
} as const;

const heroButtonStyle = {
  height: 44,
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "0 16px",
  borderRadius: "var(--r-sm)",
  background: "var(--accent)",
  color: "#fff",
  fontSize: 14,
  fontWeight: 700,
} as const;

const secondaryButtonStyle = {
  ...heroButtonStyle,
  background: "var(--elevated)",
  color: "var(--text)",
  border: "1px solid var(--border)",
} as const;
