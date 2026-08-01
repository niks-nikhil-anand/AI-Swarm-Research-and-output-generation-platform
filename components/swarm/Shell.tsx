"use client";
/* ============================================================
   SWARM — App shell (Sidebar + TopBar)
   ============================================================ */
import { useState, useEffect, type CSSProperties, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { Logo, Icon, IconBtn, Btn, StatusDot, Stepper, type Stage } from "./ui";

export interface CurrentUser { id: string; email: string; name: string | null }
interface RecentProject { id: string; title: string; status: string; accent: string }

const PROJECT_STATUS_MAP: Record<string, string> = { Draft: "running", Running: "running", Complete: "complete", Failed: "failed" };
const COFFEE_AMOUNTS = [99, 199, 499, 999, 1999, 2999, 3999, 4999];

const coffeeInputStyle: CSSProperties = {
  width: "100%",
  height: 38,
  borderRadius: "var(--r-sm)",
  border: "1px solid var(--border)",
  background: "var(--surface)",
  color: "var(--text)",
  padding: "0 12px",
  fontFamily: "var(--font)",
  fontSize: 13,
  outline: "none",
};

function useRecentProjects(): RecentProject[] {
  const [projects, setProjects] = useState<RecentProject[]>([]);
  useEffect(() => {
    let cancelled = false;
    async function refresh() {
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        const rows: { id: string; title: string; status: string }[] = res.ok ? await res.json() : [];
        if (!cancelled) {
          setProjects(rows.map((r) => ({ id: r.id, title: r.title, status: PROJECT_STATUS_MAP[r.status] || "running", accent: "var(--accent)" })));
        }
      } catch {
        if (!cancelled) setProjects([]);
      }
    }
    refresh();
    const timer = setInterval(refresh, 5000);
    return () => { cancelled = true; clearInterval(timer); };
  }, []);
  return projects;
}

export function initialsOf(user: CurrentUser): string {
  if (user.name?.trim()) {
    const parts = user.name.trim().split(/\s+/);
    return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
  }
  return user.email[0]?.toUpperCase() || "?";
}

export function useCurrentUser(): CurrentUser | null {
  const [user, setUser] = useState<CurrentUser | null>(null);
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);
  return user;
}

function NavItem({ icon, label, active, onClick, count, badge, compact }: {
  icon: string; label: string; active?: boolean; onClick?: () => void; count?: number; badge?: boolean; compact?: boolean;
}) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: compact ? "center" : "flex-start", gap: 10, width: "100%", height: 36, padding: compact ? 0 : "0 10px",
        border: "none", cursor: "pointer", borderRadius: "var(--r-sm)", textAlign: "left",
        fontFamily: "var(--font)", fontSize: 13.5, fontWeight: 500,
        background: active ? "var(--accent-soft)" : h ? "var(--elevated)" : "transparent",
        color: active ? "var(--accent-2)" : h ? "var(--text)" : "var(--muted)",
        transition: "background 130ms, color 130ms",
      }}>
      <Icon name={icon} size={16} />
      {!compact && <span style={{ flex: 1 }}>{label}</span>}
      {!compact && count != null && <span className="mono" style={{ fontSize: 11, color: "var(--faint)" }}>{count}</span>}
      {badge && <StatusDot status="working" size={7} />}
    </button>
  );
}

export function Sidebar({ view, activeSession, onNew, onGo, onOpenSession }: {
  view: string; activeSession: string | null; onNew: () => void;
  onGo: (a: { view: string }) => void; onOpenSession: (id: string) => void;
}) {
  const user = useCurrentUser();
  const projects = useRecentProjects();
  const [accountOpen, setAccountOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [coffeeModal, setCoffeeModal] = useState(false);
  const [coffeeAmount, setCoffeeAmount] = useState(COFFEE_AMOUNTS[1]);
  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    window.location.href = "/login";
  }
  function openCoffee(amount = coffeeAmount) {
    setCoffeeAmount(amount);
    setCoffeeModal(true);
  }
  return (
    <>
      <aside style={{
        width: collapsed ? 72 : "var(--nav-w)", flexShrink: 0, height: "100%", boxSizing: "border-box",
        background: "var(--bg-2)", borderRight: "1px solid var(--border)",
        display: "flex", flexDirection: "column", padding: "14px 12px",
        transition: "width 180ms cubic-bezier(0.22,1,0.36,1)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "2px 6px 14px" }}>
          <Logo collapsed={collapsed} />
          {!collapsed && <IconBtn name="layers" size={30} title="Collapse sidebar" onClick={() => setCollapsed(true)} />}
        </div>

        {collapsed ? (
          <IconBtn name="menu" size={36} title="Expand sidebar" onClick={() => setCollapsed(false)} style={{ margin: "0 auto 14px" }} />
        ) : (
          <Btn kind="primary" icon="plus" full onClick={onNew} style={{ marginBottom: 14 }}>New project</Btn>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 14 }}>
          <NavItem icon="dashboard" label="Dashboard" active={view === "dashboard"} onClick={() => onGo({ view: "dashboard" })} compact={collapsed} />
          <NavItem icon="message-square" label="Chat" active={view === "chat"} onClick={() => onGo({ view: "chat" })} badge compact={collapsed} />
          <NavItem icon="history" label="All projects" active={view === "history"} onClick={() => onGo({ view: "history" })} count={projects.length} compact={collapsed} />
          <NavItem icon="tools" label="Skills" active={view === "skills"} onClick={() => onGo({ view: "skills" })} compact={collapsed} />
        </div>

        {!collapsed && <div className="eyebrow" style={{ padding: "0 8px 8px" }}>Recent sessions</div>}
        <div style={{ display: "flex", flexDirection: "column", gap: 2, overflow: "auto", flex: 1, margin: "0 -4px", padding: "0 4px" }}>
          {!collapsed && projects.length === 0 && <p className="faint" style={{ fontSize: 12, padding: "6px 8px" }}>No projects yet.</p>}
          {projects.slice(0, 6).map((p) => {
            const active = view === "session" && activeSession === p.id;
            if (collapsed) return null;
            return (
              <button key={p.id} onClick={() => onOpenSession(p.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "8px 10px",
                  border: "none", cursor: "pointer", borderRadius: "var(--r-sm)", textAlign: "left",
                  background: active ? "var(--elevated)" : "transparent", transition: "background 130ms",
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--elevated)"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}>
                <span style={{ width: 8, height: 8, borderRadius: 3, background: p.accent, flexShrink: 0, boxShadow: active ? `0 0 8px ${p.accent}` : "none" }} />
                <span style={{ flex: 1, minWidth: 0, fontSize: 12.5, fontWeight: 500, color: active ? "var(--text)" : "var(--muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</span>
                {p.status === "running" && <StatusDot status="working" size={6} />}
              </button>
            );
          })}
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 8, marginTop: 8, display: "flex", flexDirection: "column", gap: 2 }}>
          {collapsed ? (
            <IconBtn name="dollar-sign" size={36} title="Buy me a coffee" onClick={() => openCoffee()} style={{ margin: "0 auto 6px" }} />
          ) : (
            <CoffeeCard onOpen={openCoffee} />
          )}
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 10, padding: "8px 8px 4px", marginTop: 4 }}>
            <div style={{ width: 30, height: 30, borderRadius: "var(--r-pill)", background: "linear-gradient(135deg, var(--accent-2), var(--accent))", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{user ? initialsOf(user) : ""}</div>
            {!collapsed && <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user?.name || (user ? "Swarm user" : "Loading…")}</div>
              <div style={{ fontSize: 11, color: "var(--faint)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user?.email || ""}</div>
            </div>}
            {!collapsed && <IconBtn name="more-horizontal" size={28} title="Account menu" active={accountOpen} onClick={() => setAccountOpen((value) => !value)} />}
            {accountOpen && (
              <div
                style={{
                  position: "absolute", right: 6, bottom: 46, width: 178, padding: 6, zIndex: 40,
                  borderRadius: "var(--r-sm)", border: "1px solid var(--border)", background: "var(--surface)",
                  boxShadow: "var(--shadow-pop)",
                }}
              >
                <AccountMenuItem icon="user" label="Profile" onClick={() => { setAccountOpen(false); onGo({ view: "profile" }); }} />
                <AccountMenuItem icon="settings" label="Settings" onClick={() => { setAccountOpen(false); onGo({ view: "settings" }); }} />
                <div style={{ height: 1, background: "var(--border)", margin: "5px 4px" }} />
                <AccountMenuItem icon="lock" label="Logout" danger onClick={signOut} />
              </div>
            )}
          </div>
        </div>
      </aside>
      {coffeeModal && (
        <CoffeeModal
          amount={coffeeAmount}
          onAmountChange={setCoffeeAmount}
          onClose={() => setCoffeeModal(false)}
        />
      )}
    </>
  );
}

function CoffeeCard({ onOpen }: {
  onOpen: (count?: number) => void;
}) {
  return (
    <div
      style={{
        marginBottom: 8,
        padding: 12,
        borderRadius: "var(--r-sm)",
        border: "1px solid var(--border)",
        background: "var(--surface)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <button
        type="button"
        onClick={() => onOpen()}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: 0,
          border: "none",
          background: "transparent",
          color: "var(--text)",
          cursor: "pointer",
          textAlign: "left",
          fontFamily: "var(--font)",
        }}
      >
        <span style={{ width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <img src="/social-icon/starbucks.png" alt="" width={38} height={38} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: "block", fontSize: 13.5, fontWeight: 700 }}>Buy Me a Coffee</span>
          <span style={{ display: "block", marginTop: 2, color: "var(--muted)", fontSize: 11.5 }}>Fuel up the AI Swarm</span>
        </span>
        <Icon name="chevron-right" size={14} style={{ color: "var(--faint)" }} />
      </button>
    </div>
  );
}

function CoffeeModal({ amount, onAmountChange, onClose }: {
  amount: number; onAmountChange: (amount: number) => void; onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPaid(true);
  }

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "var(--scrim)", backdropFilter: "blur(5px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
      <form
        onSubmit={submit}
        onClick={(event) => event.stopPropagation()}
        className="glass-strong rise"
        style={{
          width: 560,
          maxWidth: "94vw",
          maxHeight: "90vh",
          overflow: "auto",
          borderRadius: "var(--r-xl)",
          padding: 0,
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <div style={{ padding: 24, borderBottom: "1px solid var(--border-soft)", background: "linear-gradient(135deg, var(--accent-soft), transparent 56%)" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 46, height: 46, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <img src="/social-icon/starbucks.png" alt="" width={46} height={46} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <div>
                <div className="h3">Buy Me a Coffee</div>
                <p className="muted" style={{ fontSize: 13, marginTop: 3 }}>Fuel up the AI Swarm</p>
              </div>
            </div>
            <IconBtn name="x" size={30} title="Close" onClick={onClose} />
          </div>
        </div>

        {paid ? (
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ borderRadius: "var(--r-md)", border: "1px solid var(--st-done)", background: "var(--st-done-soft)", padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--st-done)", fontWeight: 700 }}>
                <Icon name="check-circle" size={18} />
                Thanks{name.trim() ? `, ${name.trim()}` : ""}.
              </div>
              <p className="muted" style={{ fontSize: 13, marginTop: 8 }}>Your ₹{amount.toLocaleString("en-IN")} coffee is queued. A real payment provider can be connected here when checkout is ready.</p>
            </div>
            <Btn kind="primary" full onClick={onClose}>Done</Btn>
          </div>
        ) : (
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-2)", marginBottom: 8 }}>Quick select amount</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(86px, 1fr))", gap: 8 }}>
                {COFFEE_AMOUNTS.map((value) => {
                  const active = value === amount;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => onAmountChange(value)}
                      style={{
                        height: 38,
                        borderRadius: "var(--r-sm)",
                        border: `1px solid ${active ? "var(--accent-line)" : "var(--border)"}`,
                        background: active ? "var(--accent-soft)" : "var(--elevated)",
                        color: active ? "var(--accent-2)" : "var(--text)",
                        cursor: "pointer",
                        fontFamily: "var(--mono)",
                        fontWeight: 700,
                      }}
                    >
                      ₹{value.toLocaleString("en-IN")}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <label style={{ display: "block" }}>
                <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--text-2)", marginBottom: 6 }}>Name</span>
                <input required value={name} onChange={(event) => setName(event.target.value)} autoFocus placeholder="Your name" style={coffeeInputStyle} />
              </label>
              <label style={{ display: "block" }}>
                <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--text-2)", marginBottom: 6 }}>Email</span>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" style={coffeeInputStyle} />
              </label>
            </div>

            <label style={{ display: "block" }}>
              <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--text-2)", marginBottom: 6 }}>Message</span>
              <textarea value={note} onChange={(event) => setNote(event.target.value)} rows={3} placeholder="Leave a note with your coffee..." style={{ ...coffeeInputStyle, height: "auto", minHeight: 86, padding: "10px 12px", resize: "vertical", lineHeight: 1.5 }} />
            </label>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: 14, borderRadius: "var(--r-md)", background: "var(--surface)", border: "1px solid var(--border)" }}>
              <div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>Total support</div>
                <div className="mono" style={{ fontSize: 24, fontWeight: 700, color: "var(--text)", lineHeight: 1.15 }}>₹{amount.toLocaleString("en-IN")}</div>
              </div>
              <Btn kind="primary" size="lg" icon="dollar-sign" type="submit">Pay now</Btn>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

function AccountMenuItem({ icon, label, onClick, danger }: { icon: string; label: string; onClick: () => void; danger?: boolean }) {
  const [h, setH] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        width: "100%", height: 34, display: "flex", alignItems: "center", gap: 9, padding: "0 9px",
        border: "none", borderRadius: "var(--r-xs)", background: h ? "var(--elevated)" : "transparent",
        color: danger ? "var(--st-error)" : "var(--text-2)", cursor: "pointer", fontFamily: "var(--font)",
        fontSize: 13, fontWeight: 600, textAlign: "left",
      }}
    >
      <Icon name={icon} size={14} />
      {label}
    </button>
  );
}

export function StatusChip({ status }: { status: string }) {
  const map: Record<string, { label: string; dot: string }> = {
    drafting:  { label: "Drafting", dot: "idle" },
    awaiting:  { label: "Awaiting approval", dot: "blocked" },
    running:   { label: "Running", dot: "working" },
    complete:  { label: "Complete", dot: "done" },
    failed:    { label: "Failed", dot: "error" },
  };
  const m = map[status] || map.drafting;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 7, height: 26, padding: "0 11px",
      borderRadius: "var(--r-pill)", fontSize: 12, fontWeight: 600,
      background: "var(--elevated)", border: "1px solid var(--border)", color: "var(--text-2)",
    }}>
      <StatusDot status={m.dot} size={7} />
      {m.label}
    </span>
  );
}

export function TopBar({ stages, stage, reached, onJump, status, title, theme, onTheme, actions }: {
  stages: Stage[] | null; stage: string; reached: string[]; onJump: (key: string) => void;
  status: string | null; title: string; theme: string; onTheme: () => void; actions?: ReactNode;
}) {
  return (
    <header style={{
      height: 60, flexShrink: 0, display: "flex", alignItems: "center", gap: 16, padding: "0 20px",
      background: "var(--glass-strong)", WebkitBackdropFilter: "blur(20px)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--border)", position: "relative", zIndex: 20,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <h1 style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 320 }}>
              {title}
            </h1>
            {status && <StatusChip status={status} />}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        {stages && <Stepper stages={stages} current={stage} reached={reached} onJump={onJump} />}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {actions}
        <IconBtn name="search" title="Search ⌘K" />
        <IconBtn name="bell" title="Notifications" badge />
        <ThemeToggle theme={theme} onClick={onTheme} />
      </div>
    </header>
  );
}

export function ThemeToggle({ theme, onClick }: { theme: string; onClick: () => void }) {
  const dark = theme === "dark";
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} title="Toggle theme" aria-label="Toggle theme"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        width: 36, height: 36, display: "inline-flex", alignItems: "center", justifyContent: "center",
        borderRadius: "var(--r-sm)", border: "1px solid var(--border)", cursor: "pointer",
        background: h ? "var(--elevated-2)" : "var(--elevated)", color: "var(--muted)", transition: "background 140ms",
      }}>
      {dark ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7Z" fill="currentColor" fillOpacity="0.18" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <circle cx="8" cy="8" r="3.2" fill="currentColor" fillOpacity="0.18" />
          <g><line x1="8" y1="1" x2="8" y2="2.6" /><line x1="8" y1="13.4" x2="8" y2="15" /><line x1="1" y1="8" x2="2.6" y2="8" /><line x1="13.4" y1="8" x2="15" y2="8" /><line x1="3" y1="3" x2="4.1" y2="4.1" /><line x1="11.9" y1="11.9" x2="13" y2="13" /><line x1="13" y1="3" x2="11.9" y2="4.1" /><line x1="4.1" y1="11.9" x2="3" y2="13" /></g>
        </svg>
      )}
    </button>
  );
}
