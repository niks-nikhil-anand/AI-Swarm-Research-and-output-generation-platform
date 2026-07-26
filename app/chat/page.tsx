"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { Badge, Btn, Icon, IconBtn } from "../../components/swarm/ui";
import { Sidebar, TopBar } from "../../components/swarm/Shell";

const SIDEBAR_ROUTES: Record<string, string> = {
  settings: "/settings",
  dashboard: "/dashboard",
  history: "/projects",
  skills: "/skills",
  profile: "/profile",
  chat: "/chat",
};

const MODELS = [
  { id: "deepseek-v4-flash", label: "DeepSeek V4 Flash", provider: "NVIDIA", tone: "success" as const },
  { id: "llama-3.3-70b", label: "Llama 3.3 70B", provider: "OpenRouter", tone: "accent" as const },
  { id: "gpt-oss-120b", label: "GPT-OSS 120B", provider: "OpenRouter", tone: "cyan" as const },
];

const COMPOSER_MODES = ["Research", "Draft", "Verify"];

type ChatMessage = { id: string; role: "user" | "assistant"; content: string; time: Date };
type Conversation = { id: string; title: string; updated: string; messages: ChatMessage[] };

const seedConversations: Conversation[] = [
  {
    id: "c1",
    title: "AI market research brief",
    updated: "Today",
    messages: [
      { id: "m1", role: "assistant", content: "Welcome to AI Nexus Chat. Ask anything, refine a research direction, or turn a prompt into a swarm-ready plan.", time: new Date() },
    ],
  },
  {
    id: "c2",
    title: "Deck outline ideas",
    updated: "Yesterday",
    messages: [
      { id: "m2", role: "assistant", content: "I can help structure your verified findings into a slide narrative, executive summary, or content package.", time: new Date() },
    ],
  },
];

export default function ChatPage() {
  const router = useRouter();
  const [theme, setTheme] = useState("dark");
  const [modelId, setModelId] = useState(MODELS[0].id);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatSidebarOpen, setChatSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>(seedConversations);
  const [activeId, setActiveId] = useState(seedConversations[0].id);
  const bottomRef = useRef<HTMLDivElement>(null);
  const active = conversations.find((item) => item.id === activeId) || conversations[0];
  const model = MODELS.find((item) => item.id === modelId) || MODELS[0];

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [active.messages, isGenerating]);

  const tokenEstimate = useMemo(() => active.messages.reduce((sum, message) => sum + Math.max(1, Math.round(message.content.length / 4.2)), 0), [active.messages]);

  function openProject(id: string) {
    router.push(`/projects/${id}`);
  }

  function go(view: string) {
    router.push(SIDEBAR_ROUTES[view] || "/new-swarm");
  }

  function newChat() {
    const next: Conversation = {
      id: `chat-${Date.now()}`,
      title: "New AI Nexus chat",
      updated: "Now",
      messages: [
        { id: `msg-${Date.now()}`, role: "assistant", content: "Start with a question, a research goal, or rough notes. I will help shape it into something useful.", time: new Date() },
      ],
    };
    setConversations((items) => [next, ...items]);
    setActiveId(next.id);
  }

  function sendMessage(text = input) {
    const content = text.trim();
    if (!content || isGenerating) return;
    const userMessage: ChatMessage = { id: `msg-${Date.now()}`, role: "user", content, time: new Date() };
    setInput("");
    setIsGenerating(true);
    setConversations((items) => items.map((chat) => chat.id === active.id ? {
      ...chat,
      title: chat.messages.length <= 1 ? content.slice(0, 46) : chat.title,
      updated: "Now",
      messages: [...chat.messages, userMessage],
    } : chat));

    window.setTimeout(() => {
      const reply: ChatMessage = {
        id: `msg-${Date.now()}-assistant`,
        role: "assistant",
        content: "UI preview response: this chat will connect to streaming model APIs next. From here, AI Nexus Chat can answer questions, draft research plans, summarize project evidence, and launch work into the swarm builder.",
        time: new Date(),
      };
      setConversations((items) => items.map((chat) => chat.id === active.id ? { ...chat, messages: [...chat.messages, reply] } : chat));
      setIsGenerating(false);
    }, 650);
  }

  return (
    <div style={{ height: "100vh", display: "flex", background: "var(--bg)", color: "var(--text)" } as CSSProperties}>
      <Sidebar view="chat" activeSession={null} onNew={() => router.push("/new-swarm")} onGo={({ view }) => go(view)} onOpenSession={openProject} />
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        <TopBar
          stages={null}
          stage="chat"
          reached={["chat"]}
          onJump={() => {}}
          status={isGenerating ? "running" : null}
          title="AI Nexus Chat"
          theme={theme}
          onTheme={() => setTheme((value) => value === "dark" ? "light" : "dark")}
          actions={<Btn kind="secondary" icon="plus" onClick={newChat}>New chat</Btn>}
        />

        <div style={{ flex: 1, display: "grid", gridTemplateColumns: `minmax(0, 1fr) ${chatSidebarOpen ? "300px" : "52px"}`, minHeight: 0, transition: "grid-template-columns 180ms cubic-bezier(0.22,1,0.36,1)" }}>
          <section style={{ position: "relative", display: "flex", flexDirection: "column", minWidth: 0, minHeight: 0, background: "var(--bg)" }}>
            <div style={{ flex: 1, overflow: "auto", padding: "24px 24px 138px" }}>
              <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
                {active.messages.map((message) => <MessageBubble key={message.id} message={message} model={model.label} />)}
                {isGenerating && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--muted)", fontSize: 13 }}>
                    <span style={{ width: 12, height: 12, border: "2px solid var(--accent)", borderTopColor: "transparent", borderRadius: 999, animation: "swarm-spin 0.7s linear infinite" }} />
                    AI Nexus is thinking...
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            </div>

            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "20px 24px 20px", background: "linear-gradient(180deg, transparent, var(--bg) 32%)" }}>
              <div style={{ maxWidth: 860, margin: "0 auto" }}>
                <div style={{
                  border: "1px solid var(--accent-line)", borderRadius: "var(--r-lg)",
                  background: "color-mix(in oklab, var(--glass-strong) 88%, var(--bg))",
                  boxShadow: "var(--shadow-lg), 0 0 0 1px var(--glass-hi) inset",
                  padding: 12,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                    <label style={{
                      height: 34, display: "inline-flex", alignItems: "center", gap: 8, padding: "0 11px",
                      borderRadius: "var(--r-sm)", border: "1px solid var(--border)", background: "var(--surface)",
                      color: "var(--text-2)", fontSize: 12.5, fontWeight: 650,
                    }}>
                      <Icon name="server" size={14} color="var(--accent-2)" />
                      <select value={modelId} onChange={(event) => setModelId(event.target.value)} style={{
                        border: "none", outline: "none", background: "transparent", color: "var(--text)",
                        fontFamily: "var(--font)", fontSize: 12.5, fontWeight: 650, cursor: "pointer", maxWidth: 190,
                      }}>
                        {MODELS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
                      </select>
                    </label>
                    {COMPOSER_MODES.map((mode) => (
                      <button key={mode} type="button" style={{
                        height: 30, padding: "0 10px", borderRadius: "var(--r-pill)", border: "1px solid var(--border)",
                        background: mode === "Research" ? "var(--accent-soft)" : "var(--surface)",
                        color: mode === "Research" ? "var(--accent-2)" : "var(--muted)", fontFamily: "var(--font)",
                        fontSize: 11.5, fontWeight: 650, cursor: "pointer",
                      }}>{mode}</button>
                    ))}
                    <span className="faint mono" style={{ fontSize: 11, marginLeft: "auto" }}>{input.length} chars · {tokenEstimate} est. tokens</span>
                  </div>
                  <textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(); } }}
                    placeholder="Ask AI Nexus Chat to research, verify, summarize, or turn an idea into a swarm-ready project..."
                    rows={2}
                    style={{
                      width: "100%", minHeight: 52, resize: "vertical", border: "none", outline: "none",
                      background: "var(--surface)", color: "var(--text)", fontFamily: "var(--font)", fontSize: 14.5,
                      lineHeight: 1.5, borderRadius: "var(--r-md)", padding: "10px 12px", boxShadow: "var(--shadow-sm) inset",
                    }}
                  />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <IconBtn name="paperclip" size={32} title="Attach files" />
                      <IconBtn name="settings" size={32} title="Parameters" />
                      <span style={{ height: 30, display: "inline-flex", alignItems: "center", gap: 6, padding: "0 10px", borderRadius: "var(--r-pill)", background: "var(--surface)", border: "1px solid var(--border)", color: "var(--muted)", fontSize: 11.5, fontWeight: 650 }}>
                        <Icon name="zap" size={12} /> temp 0.7
                      </span>
                      <span style={{ height: 30, display: "inline-flex", alignItems: "center", gap: 6, padding: "0 10px", borderRadius: "var(--r-pill)", background: "var(--surface)", border: "1px solid var(--border)", color: "var(--muted)", fontSize: 11.5, fontWeight: 650 }}>
                        <Icon name="database" size={12} /> project context
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span className="faint" style={{ fontSize: 11.5 }}>Enter to send · Shift Enter for newline</span>
                      <Btn kind="primary" icon={isGenerating ? "x" : "arrow-up"} onClick={() => isGenerating ? setIsGenerating(false) : sendMessage()} style={{ minWidth: 92 }}>{isGenerating ? "Stop" : "Send"}</Btn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside style={{ borderLeft: "1px solid var(--border)", background: "var(--bg-2)", padding: chatSidebarOpen ? 14 : "14px 8px", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: chatSidebarOpen ? "flex-start" : "center", gap: 8, marginBottom: 12 }}>
              <IconBtn name={chatSidebarOpen ? "chevron-right" : "chevron-left"} size={30} title={chatSidebarOpen ? "Close chat sidebar" : "Open chat sidebar"} onClick={() => setChatSidebarOpen((value) => !value)} />
              {chatSidebarOpen && <Icon name="message-square" size={16} color="var(--accent-2)" />}
              {chatSidebarOpen && <div className="h4">Conversations</div>}
              {chatSidebarOpen && <Badge tone="neutral" style={{ marginLeft: "auto" }}>{conversations.length}</Badge>}
            </div>
            {chatSidebarOpen ? <div style={{ display: "flex", flexDirection: "column", gap: 8, overflow: "auto", height: "calc(100% - 42px)" }}>
              {conversations.map((chat) => {
                const selected = chat.id === active.id;
                return (
                  <button key={chat.id} onClick={() => setActiveId(chat.id)} style={{
                    width: "100%", padding: 12, borderRadius: "var(--r-sm)", border: `1px solid ${selected ? "var(--accent-line)" : "var(--border)"}`,
                    background: selected ? "var(--accent-soft)" : "var(--surface)", color: "var(--text)", cursor: "pointer", textAlign: "left", fontFamily: "var(--font)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Icon name="message-square" size={14} color={selected ? "var(--accent-2)" : "var(--muted)"} />
                      <span style={{ fontSize: 13, fontWeight: 650, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{chat.title}</span>
                    </div>
                    <div className="faint" style={{ fontSize: 11, marginTop: 6 }}>{chat.updated} · {chat.messages.length} messages</div>
                  </button>
                );
              })}
            </div> : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                <IconBtn name="plus" size={34} title="New chat" onClick={newChat} />
                {conversations.slice(0, 5).map((chat) => (
                  <button key={chat.id} onClick={() => setActiveId(chat.id)} title={chat.title} style={{
                    width: 34, height: 34, borderRadius: "var(--r-sm)", border: `1px solid ${chat.id === active.id ? "var(--accent-line)" : "var(--border)"}`,
                    background: chat.id === active.id ? "var(--accent-soft)" : "var(--surface)", color: chat.id === active.id ? "var(--accent-2)" : "var(--muted)",
                    display: "grid", placeItems: "center", cursor: "pointer",
                  }}>
                    <Icon name="message-square" size={15} />
                  </button>
                ))}
              </div>
            )}
          </aside>

        </div>
      </main>
    </div>
  );
}

function MessageBubble({ message, model }: { message: ChatMessage; model: string }) {
  const isUser = message.role === "user";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: isUser ? "flex-end" : "flex-start" }}>
      <div style={{
        maxWidth: isUser ? "72%" : "100%", padding: isUser ? "12px 14px" : "4px 0", borderRadius: "18px 18px 4px 18px",
        background: isUser ? "var(--accent-soft)" : "transparent", border: isUser ? "1px solid var(--accent-line)" : "none",
        color: "var(--text)", fontSize: 14.5, lineHeight: 1.65, whiteSpace: "pre-wrap",
      }}>
        {message.content}
      </div>
      <div className="faint mono" style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 10.5, marginTop: 7 }}>
        <span>{isUser ? "You" : model}</span>
        <span>·</span>
        <span>{message.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
      </div>
    </div>
  );
}
