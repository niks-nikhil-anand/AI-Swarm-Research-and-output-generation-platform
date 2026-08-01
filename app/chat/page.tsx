"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
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
  { id: "openai/gpt-oss-20b:free", label: "GPT-OSS 20B", provider: "OpenRouter", tone: "cyan" as const },
  { id: "meta-llama/llama-3.3-70b-instruct:free", label: "Llama 3.3 70B", provider: "OpenRouter", tone: "accent" as const },
  { id: "openai/gpt-oss-120b:free", label: "GPT-OSS 120B", provider: "OpenRouter", tone: "success" as const },
];

const COMPOSER_MODES = ["Research", "Draft", "Verify"];

type ChatMessage = { id: string; role: "user" | "assistant"; content: string; time: Date; model?: string | null };
type Conversation = { id: string; title: string; updated: string; model?: string | null; messages: ChatMessage[] };
type ApiChatMessage = { id: string; role: string; content: string; model: string | null; tokens: number | null; createdAt: string };
type ApiChat = { id: string; title: string; model: string | null; pinned: boolean; createdAt: string; updatedAt: string; messageCount?: number; messages: ApiChatMessage[] };

async function readJson<T>(response: Response): Promise<T | null> {
  const text = await response.text();
  if (!text.trim()) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

function responseError(data: unknown, fallback: string) {
  if (data && typeof data === "object" && "error" in data && typeof data.error === "string") return data.error;
  return fallback;
}

function formatUpdated(value: string) {
  const date = new Date(value);
  const diff = Date.now() - date.getTime();
  if (diff < 60_000) return "Now";
  if (diff < 3_600_000) return `${Math.max(1, Math.round(diff / 60_000))}m ago`;
  if (diff < 86_400_000) return `${Math.round(diff / 3_600_000)}h ago`;
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

function toConversation(chat: ApiChat): Conversation {
  return {
    id: chat.id,
    title: chat.title,
    updated: formatUpdated(chat.updatedAt),
    model: chat.model,
    messages: chat.messages.map((message) => ({
      id: message.id,
      role: message.role === "user" ? "user" : "assistant",
      content: message.content,
      model: message.model,
      time: new Date(message.createdAt),
    })),
  };
}

function messageFromApi(message: ApiChatMessage): ChatMessage {
  return {
    id: message.id,
    role: message.role === "user" ? "user" : "assistant",
    content: message.content,
    model: message.model,
    time: new Date(message.createdAt),
  };
}

export default function ChatPage() {
  const router = useRouter();
  const [theme, setTheme] = useState("dark");
  const [modelId, setModelId] = useState(MODELS[0].id);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatSidebarOpen, setChatSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const active = conversations.find((item) => item.id === activeId) || null;
  const model = MODELS.find((item) => item.id === modelId) || MODELS[0];

  const loadChats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/chats", { cache: "no-store" });
      const data = await readJson<{ chats: ApiChat[]; error?: string }>(response);
      if (!response.ok || !data) throw new Error(responseError(data, "Could not load chats"));
      const nextChats = (data.chats as ApiChat[]).map(toConversation);
      setConversations(nextChats);
      setActiveId((current) => current && nextChats.some((chat) => chat.id === current) ? current : nextChats[0]?.id || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load chats");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadChats();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [loadChats]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [active?.messages, isGenerating]);

  const tokenEstimate = useMemo(() => (active?.messages || []).reduce((sum, message) => sum + Math.max(1, Math.round(message.content.length / 4.2)), 0), [active?.messages]);

  function openProject(id: string) {
    router.push(`/projects/${id}`);
  }

  function go(view: string) {
    router.push(SIDEBAR_ROUTES[view] || "/new-swarm");
  }

  async function createChat(title = "New AI Nexus chat") {
    const response = await fetch("/api/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, model: modelId }),
    });
    const data = await readJson<{ chat: ApiChat; error?: string }>(response);
    if (!response.ok || !data) throw new Error(responseError(data, "Could not create chat"));
    const chat = toConversation(data.chat as ApiChat);
    setConversations((items) => [chat, ...items]);
    setActiveId(chat.id);
    return chat;
  }

  async function newChat() {
    if (isGenerating) return;
    setError(null);
    try {
      await createChat();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create chat");
    }
  }

  async function sendMessage(text = input) {
    const content = text.trim();
    if (!content || isGenerating) return;

    setInput("");
    setError(null);
    setIsGenerating(true);

    let chat = active;
    try {
      if (!chat) chat = await createChat(content.slice(0, 52) || "New AI Nexus chat");

      const chatId = chat.id;
      const userMessage: ChatMessage = { id: `local-${Date.now()}`, role: "user", content, model: modelId, time: new Date() };
      const nextMessages = [...chat.messages, userMessage];
      setConversations((items) => items.map((item) => item.id === chatId ? {
        ...item,
        title: item.messages.length === 0 || item.title === "New AI Nexus chat" ? content.slice(0, 52) : item.title,
        updated: "Now",
        model: modelId,
        messages: nextMessages,
      } : item));

      const controller = new AbortController();
      abortRef.current = controller;
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          chatId,
          model: modelId,
          messages: nextMessages.map((message) => ({ role: message.role, content: message.content })),
          temperature: 0.7,
          top_p: 0.95,
          max_tokens: 2048,
        }),
      });
      const data = await readJson<{ message: ApiChatMessage; error?: string }>(response);
      if (!response.ok || !data) throw new Error(responseError(data, "Chat request failed"));

      const assistantMessage = messageFromApi(data.message as ApiChatMessage);
      setConversations((items) => items.map((item) => item.id === chatId ? {
        ...item,
        updated: "Now",
        messages: [...nextMessages, assistantMessage],
      } : item));
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setError("Response stopped.");
      } else {
        setError(err instanceof Error ? err.message : "Chat request failed");
      }
    } finally {
      abortRef.current = null;
      setIsGenerating(false);
    }
  }

  function stopGeneration() {
    abortRef.current?.abort();
    setIsGenerating(false);
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
                {loading && <EmptyState icon="loader" title="Loading conversations" text="Getting your saved AI Nexus chats ready." />}
                {!loading && !active && <EmptyState icon="message-square" title="Start a real chat" text="Ask AI Nexus to research, verify, summarize, or turn an idea into a swarm-ready project." />}
                {active?.messages.map((message) => <MessageBubble key={message.id} message={message} model={model.label} />)}
                {isGenerating && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--muted)", fontSize: 13 }}>
                    <span style={{ width: 12, height: 12, border: "2px solid var(--accent)", borderTopColor: "transparent", borderRadius: 999, animation: "swarm-spin 0.7s linear infinite" }} />
                    AI Nexus is thinking...
                  </div>
                )}
                {error && (
                  <div style={{ border: "1px solid color-mix(in oklab, #ff6b6b 38%, var(--border))", background: "color-mix(in oklab, #ff6b6b 10%, var(--surface))", color: "var(--text)", borderRadius: "var(--r-sm)", padding: "10px 12px", fontSize: 13 }}>
                    {error}
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
                      <Btn kind="primary" icon={isGenerating ? "x" : "arrow-up"} onClick={() => isGenerating ? stopGeneration() : sendMessage()} style={{ minWidth: 92 }}>{isGenerating ? "Stop" : "Send"}</Btn>
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
              {!loading && conversations.length === 0 && <div className="faint" style={{ fontSize: 12, padding: 10 }}>No conversations yet.</div>}
              {conversations.map((chat) => {
                const selected = chat.id === active?.id;
                return (
                  <button key={chat.id} onClick={() => {
                    setActiveId(chat.id);
                    if (chat.model && MODELS.some((item) => item.id === chat.model)) setModelId(chat.model);
                  }} style={{
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
                  <button key={chat.id} onClick={() => {
                    setActiveId(chat.id);
                    if (chat.model && MODELS.some((item) => item.id === chat.model)) setModelId(chat.model);
                  }} title={chat.title} style={{
                    width: 34, height: 34, borderRadius: "var(--r-sm)", border: `1px solid ${chat.id === active?.id ? "var(--accent-line)" : "var(--border)"}`,
                    background: chat.id === active?.id ? "var(--accent-soft)" : "var(--surface)", color: chat.id === active?.id ? "var(--accent-2)" : "var(--muted)",
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

function EmptyState({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div style={{ minHeight: 260, display: "grid", placeItems: "center", textAlign: "center", color: "var(--muted)" }}>
      <div>
        <div style={{ width: 44, height: 44, borderRadius: "var(--r-md)", display: "grid", placeItems: "center", margin: "0 auto 14px", background: "var(--surface)", border: "1px solid var(--border)" }}>
          <Icon name={icon} size={18} color="var(--accent-2)" />
        </div>
        <div className="h3" style={{ color: "var(--text)", marginBottom: 7 }}>{title}</div>
        <div style={{ maxWidth: 430, fontSize: 13.5, lineHeight: 1.6 }}>{text}</div>
      </div>
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
