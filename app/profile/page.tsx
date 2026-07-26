"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import { Badge, Btn, Card, Icon } from "../../components/swarm/ui";
import { Sidebar, TopBar, initialsOf, type CurrentUser } from "../../components/swarm/Shell";

const SIDEBAR_ROUTES: Record<string, string> = {
  settings: "/settings",
  dashboard: "/dashboard",
  history: "/projects",
  skills: "/skills",
  profile: "/profile",
  chat: "/chat",
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data))
      .finally(() => setLoading(false));
  }, []);

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    router.push("/login");
  }

  const openProject = (id: string) => router.push(`/projects/${id}`);
  const go = (view: string) => router.push(SIDEBAR_ROUTES[view] || "/new-swarm");

  return (
    <div style={{ height: "100vh", display: "flex", background: "var(--bg)", color: "var(--text)" } as CSSProperties}>
      <Sidebar view="profile" activeSession={null} onNew={() => router.push("/new-swarm")} onGo={({ view }) => go(view)} onOpenSession={openProject} />
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        <TopBar stages={null} stage="profile" reached={["profile"]} onJump={() => {}} status={null} title="Profile" theme={theme} onTheme={() => setTheme((value) => value === "dark" ? "light" : "dark")} />
        <div style={{ overflow: "auto", height: "100%", padding: "32px 24px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <h1 className="h1" style={{ marginBottom: 4 }}>Profile</h1>
            <p className="muted" style={{ fontSize: 14.5, marginBottom: 24 }}>Manage your AI Swarm account and session.</p>

            <Card style={{ padding: 24, marginBottom: 18 }}>
              {loading ? (
                <p className="muted">Loading profile...</p>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 58, height: 58, borderRadius: "var(--r-pill)", background: "linear-gradient(135deg, var(--accent-2), var(--accent))", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 750, flexShrink: 0 }}>
                    {user ? initialsOf(user) : "?"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <h2 className="h2">{user?.name || "Swarm user"}</h2>
                      <Badge tone="success" icon="check">Active</Badge>
                    </div>
                    <p className="muted" style={{ fontSize: 14, marginTop: 5 }}>{user?.email || "No email available"}</p>
                  </div>
                </div>
              )}
            </Card>

            <Card style={{ padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 38, height: 38, borderRadius: 10, display: "grid", placeItems: "center", background: "var(--st-error-soft)", color: "var(--st-error)" }}>
                    <Icon name="lock" size={17} />
                  </span>
                  <div>
                    <div className="h4">Sign out</div>
                    <p className="muted" style={{ fontSize: 13, marginTop: 3 }}>End this session and return to the login page.</p>
                  </div>
                </div>
                <Btn kind="danger" icon="lock" onClick={signOut}>Logout</Btn>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
