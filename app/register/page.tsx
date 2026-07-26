"use client";
/* ============================================================
   SWARM — Register (JWT) with animated swarm backdrop, standalone route
   ============================================================ */
import { useState, useEffect, useRef, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import googleIcon from "../../public/social-icon/google.png";
import githubIcon from "../../public/social-icon/github.png";
import { SwarmMark, Btn, Icon } from "../../components/swarm/ui";

function SwarmBackdrop({ density = 128 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0, w = 0, h = 0, dpr = 1;
    const cursor = { x: 0, y: 0, tx: 0, ty: 0, active: false };
    const pts: { x: number; y: number; vx: number; vy: number; r: number; depth: number }[] = [];
    function accentRGB(): [number, number, number] {
      const v = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#3B82F6";
      const el = document.createElement("div"); el.style.color = v; document.body.appendChild(el);
      const c = getComputedStyle(el).color; document.body.removeChild(el);
      const m = c.match(/\d+/g); return m ? [Number(m[0]), Number(m[1]), Number(m[2])] : [59, 130, 246];
    }
    let rgb = accentRGB();
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas!.clientWidth; h = canvas!.clientHeight;
      canvas!.width = w * dpr; canvas!.height = h * dpr; ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    for (let i = 0; i < density; i++) {
      const depth = Math.random() * 0.8 + 0.35;
      pts.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        r: Math.random() * 1.7 + 0.7,
        depth,
      });
    }
    function drawGlow(x: number, y: number, radius: number, alpha: number, colors: [number, number, number]) {
      const [R, G, B] = colors;
      const g = ctx!.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(0, `rgba(${R},${G},${B},${alpha})`);
      g.addColorStop(0.42, `rgba(${R},${G},${B},${alpha * 0.42})`);
      g.addColorStop(1, `rgba(${R},${G},${B},0)`);
      ctx!.fillStyle = g;
      ctx!.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }
    function moveCursor(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      cursor.tx = e.clientX - rect.left;
      cursor.ty = e.clientY - rect.top;
      cursor.active = true;
    }
    function leaveCursor() {
      cursor.active = false;
    }
    function frame() {
      ctx!.clearRect(0, 0, w, h);
      const [R, G, B] = rgb;
      cursor.x += (cursor.tx - cursor.x) * 0.12;
      cursor.y += (cursor.ty - cursor.y) * 0.12;
      drawGlow(w * 0.18, h * 0.18, Math.min(w, h) * 0.42, 0.08, [R, G, B]);
      drawGlow(w * 0.82, h * 0.78, Math.min(w, h) * 0.36, 0.055, [34, 211, 238]);
      drawGlow(w * 0.68, h * 0.24, Math.min(w, h) * 0.30, 0.045, [168, 85, 247]);
      if (cursor.active) drawGlow(cursor.x, cursor.y, 190, 0.16, [R, G, B]);

      for (const p of pts) {
        if (!reduce) {
          if (cursor.active) {
            const dx = cursor.x - p.x;
            const dy = cursor.y - p.y;
            const d = Math.max(Math.hypot(dx, dy), 1);
            if (d < 180) {
              const pull = (1 - d / 180) * 0.028 * p.depth;
              p.vx += (dx / d) * pull;
              p.vy += (dy / d) * pull;
            }
          }
          p.vx *= 0.992;
          p.vy *= 0.992;
          p.x += p.vx * p.depth;
          p.y += p.vy * p.depth;
        }
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        p.x = Math.max(0, Math.min(w, p.x));
        p.y = Math.max(0, Math.min(h, p.y));
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y; const d = Math.hypot(dx, dy);
          if (d < 118) {
            ctx!.strokeStyle = `rgba(${R},${G},${B},${(1 - d / 118) * 0.14})`;
            ctx!.lineWidth = 1; ctx!.beginPath(); ctx!.moveTo(a.x, a.y); ctx!.lineTo(b.x, b.y); ctx!.stroke();
          }
        }
      }
      if (cursor.active) {
        for (const p of pts) {
          const d = Math.hypot(cursor.x - p.x, cursor.y - p.y);
          if (d < 170) {
            ctx!.strokeStyle = `rgba(${R},${G},${B},${(1 - d / 170) * 0.24})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(cursor.x, cursor.y);
            ctx!.lineTo(p.x, p.y);
            ctx!.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx!.fillStyle = `rgba(${R},${G},${B},${0.42 + p.depth * 0.28})`;
        ctx!.beginPath(); ctx!.arc(p.x, p.y, p.r, 0, 7); ctx!.fill();
      }
      if (!reduce) raf = requestAnimationFrame(frame);
    }
    frame();
    const ro = new ResizeObserver(resize); ro.observe(canvas);
    const t = setInterval(() => { rgb = accentRGB(); }, 1200);
    window.addEventListener("pointermove", moveCursor);
    window.addEventListener("pointerleave", leaveCursor);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      clearInterval(t);
      window.removeEventListener("pointermove", moveCursor);
      window.removeEventListener("pointerleave", leaveCursor);
    };
  }, [density]);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

function PasswordField({ value, onChange, placeholder, field }: {
  value: string; onChange: (v: string) => void; placeholder?: string; field: CSSProperties;
}) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={{ ...field, paddingRight: 40 }} type={show ? "text" : "password"} />
      <button type="button" onClick={() => setShow((s) => !s)} title={show ? "Hide password" : "Show password"} aria-label={show ? "Hide password" : "Show password"} style={{
        position: "absolute", right: 4, top: 0, height: "100%", width: 34, display: "flex", alignItems: "center", justifyContent: "center",
        background: "none", border: "none", cursor: "pointer", color: show ? "var(--accent-2)" : "var(--faint)", padding: 0,
      }}>
        <Icon name="eye" size={16} />
      </button>
    </div>
  );
}

function SocialLoginButton({ icon, label }: { icon: "google" | "github"; label: string }) {
  const iconSrc = icon === "google" ? googleIcon : githubIcon;
  return (
    <button
      type="button"
      style={{
        height: 44, flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9,
        borderRadius: "var(--r-sm)", border: "1px solid var(--border)", background: "var(--surface)",
        color: "var(--text)", fontFamily: "var(--font)", fontSize: 13.5, fontWeight: 600, cursor: "pointer",
      }}
    >
      <span style={{ width: 24, height: 24, borderRadius: 999, background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Image src={iconSrc} alt="" width={18} height={18} style={{ display: "block", objectFit: "contain" }} />
      </span>
      {label}
    </button>
  );
}

function getPasswordRules(password: string) {
  return [
    { id: "length", label: "At least 8 characters", valid: password.length >= 8 },
    { id: "upper", label: "One uppercase letter", valid: /[A-Z]/.test(password) },
    { id: "lower", label: "One lowercase letter", valid: /[a-z]/.test(password) },
    { id: "number", label: "One number", valid: /\d/.test(password) },
    { id: "symbol", label: "One symbol", valid: /[^A-Za-z0-9]/.test(password) },
  ];
}

function PasswordRules({ password }: { password: string }) {
  const rules = getPasswordRules(password);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px 10px", marginTop: 9 }}>
      {rules.map((rule) => (
        <div
          key={rule.id}
          style={{
            display: "flex", alignItems: "center", gap: 6, minWidth: 0,
            color: rule.valid ? "var(--st-done)" : "var(--faint)", fontSize: 11.5,
          }}
        >
          <span
            style={{
              width: 16, height: 16, borderRadius: 999, flexShrink: 0, display: "inline-flex",
              alignItems: "center", justifyContent: "center",
              background: rule.valid ? "var(--st-done-soft)" : "var(--elevated)",
              border: `1px solid ${rule.valid ? "color-mix(in oklab, var(--st-done) 42%, transparent)" : "var(--border)"}`,
            }}
          >
            <Icon name={rule.valid ? "check" : "x"} size={10} />
          </span>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{rule.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPasswordRules, setShowPasswordRules] = useState(false);

  async function submit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!name.trim() || !email.trim() || !pw) { setError("Fill in every field to continue."); return; }
    const failedPasswordRule = getPasswordRules(pw).find((rule) => !rule.valid);
    if (failedPasswordRule) {
      setShowPasswordRules(true);
      setError("Password must be stronger. Check the requirements below.");
      return;
    }
    if (pw !== confirmPw) { setError("Passwords don't match."); return; }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, password: pw }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error || "Something went wrong. Try again.");
        setLoading(false);
        return;
      }
      router.push("/new-swarm");
    } catch {
      setError("Couldn't reach the server. Try again.");
      setLoading(false);
    }
  }
  const field: CSSProperties = {
    height: 44, width: "100%", padding: "0 14px", borderRadius: "var(--r-sm)",
    background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)",
    fontFamily: "var(--font)", fontSize: 14, outline: "none",
  };
  return (
    <div style={{ position: "fixed", inset: 0, background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <SwarmBackdrop density={128} />
      <div style={{ position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", width: 720, height: 720, borderRadius: "50%", background: "radial-gradient(circle, var(--accent-soft), transparent 62%)", filter: "blur(20px)", pointerEvents: "none" }} />

      <div className="rise" style={{ position: "relative", width: 392, maxWidth: "92vw" }}>
        <div className="glass-strong" style={{ borderRadius: "var(--r-xl)", padding: 32, boxShadow: "var(--shadow-lg)" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, marginBottom: 26 }}>
            <div style={{ width: 72, height: 72, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <SwarmMark size={52} glow={false} />
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px" }}>Create your AI Swarm account</div>
              <p className="muted" style={{ fontSize: 13.5, marginTop: 6, lineHeight: 1.45 }}>
                Build a workspace where coordinated AI agents research, verify sources, and generate polished outputs.
              </p>
            </div>
          </div>

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <label className="eyebrow" style={{ display: "block", marginBottom: 6, textTransform: "none", letterSpacing: 0, fontSize: 12.5, fontWeight: 600, color: "var(--text-2)" }}>Full name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} autoFocus placeholder="Your full name" style={field} type="text" />
            </div>
            <div>
              <label className="eyebrow" style={{ display: "block", marginBottom: 6, textTransform: "none", letterSpacing: 0, fontSize: 12.5, fontWeight: 600, color: "var(--text-2)" }}>Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={field} type="email" />
            </div>
            <div>
              <label className="eyebrow" style={{ display: "block", marginBottom: 6, textTransform: "none", letterSpacing: 0, fontSize: 12.5, fontWeight: 600, color: "var(--text-2)" }}>Password</label>
              <PasswordField value={pw} onChange={(value) => { setPw(value); if (value) setShowPasswordRules(true); }} placeholder="Create a strong password" field={field} />
              {showPasswordRules ? (
                <PasswordRules password={pw} />
              ) : (
                <p className="faint" style={{ fontSize: 11.5, marginTop: 7 }}>Use a strong password with letters, number, and symbol.</p>
              )}
            </div>
            <div>
              <label className="eyebrow" style={{ display: "block", marginBottom: 6, textTransform: "none", letterSpacing: 0, fontSize: 12.5, fontWeight: 600, color: "var(--text-2)" }}>Confirm password</label>
              <PasswordField value={confirmPw} onChange={setConfirmPw} placeholder="Confirm your password" field={field} />
            </div>

            {error && (
              <div style={{ fontSize: 12.5, color: "var(--st-error)", background: "var(--st-error-soft)", border: "1px solid color-mix(in oklab, var(--st-error) 36%, transparent)", borderRadius: "var(--r-sm)", padding: "8px 12px" }}>
                {error}
              </div>
            )}

            <Btn kind="primary" size="lg" full type="submit" disabled={loading} iconRight={loading ? undefined : "arrow-right"} style={{ marginTop: 6 }}>
              {loading ? <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><span style={{ width: 15, height: 15, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: 999, animation: "swarm-spin 0.7s linear infinite" }} /> Creating account…</span> : "Create account"}
            </Btn>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "20px 0" }}>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            <span style={{ fontSize: 11, color: "var(--faint)" }}>or</span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <SocialLoginButton icon="google" label="Google" />
            <SocialLoginButton icon="github" label="GitHub" />
          </div>

          <p className="faint" style={{ textAlign: "center", fontSize: 12, marginTop: 20 }}>
            Already have an account? <Link href="/login" style={{ color: "var(--accent-2)", fontWeight: 600 }}>Sign in</Link>
          </p>
          <p className="faint" style={{ textAlign: "center", fontSize: 11.5, marginTop: 10, lineHeight: 1.5 }}>
            Secured with JWT · sessions expire after 24h.<br />By continuing you agree to the acceptable-use policy.
          </p>
        </div>
      </div>
    </div>
  );
}
