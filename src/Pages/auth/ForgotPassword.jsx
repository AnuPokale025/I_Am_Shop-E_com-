import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, ChevronDown, ArrowLeft, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import authAPI from "../../api/auth.api";

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Lora:ital,wght@0,600;1,400&display=swap');

  :root {
    --ink:       #1A1209;
    --bark:      #3D2B1A;
    --amber:     #D4853A;
    --amber-lt:  #F5C894;
    --amber-pale:#FEF5E9;
    --sand:      #E8F5EC;
    --mist:      #D4EAD9;
    --white:     #FDFBF8;
    --stone:     #9C8E80;
    --green:     #4A7C59;
    --green-lt:  #EAF2EC;
    --red:       #C0504D;
    --red-lt:    #FDF3F3;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .fp-root {
    min-height: 100vh;
    display: flex;
    font-family: 'Sora', sans-serif;
    color: var(--ink);
    background: var(--sand);
  }

  /* ── Left panel ── */
  .fp-left {
    display: none;
    width: 420px;
    flex-shrink: 0;
    background: #16a34a;
    padding: 52px 44px;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
  }
  @media (min-width: 860px) { .fp-left { display: flex; } }

  .fp-left-glow {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }
  .fp-left-glow-1 {
    width: 380px; height: 380px;
    top: -100px; right: -120px;
    background: radial-gradient(circle, rgba(74,124,89,0.5) 0%, transparent 70%);
  }
  .fp-left-glow-2 {
    width: 280px; height: 280px;
    bottom: -60px; left: -80px;
    background: radial-gradient(circle, rgba(212,133,58,0.25) 0%, transparent 70%);
  }
  .fp-left-grain {
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.5; pointer-events: none;
  }

  .fp-brand {
    position: relative; z-index: 2;
  }
  .fp-brand-name {
    font-family: 'Lora', serif;
    font-size: 28px;
    color: #fff;
    margin-bottom: 8px;
  }
  .fp-brand-tagline {
    font-size: 13px;
    color: rgba(255,255,255,0.5);
    font-weight: 300;
    line-height: 1.5;
  }

  .fp-left-body {
    position: relative; z-index: 2;
  }
  .fp-left-icon {
    width: 64px; height: 64px;
    background: rgba(74,124,89,0.3);
    border: 1px solid rgba(74,124,89,0.5);
    border-radius: 18px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 24px;
  }
  .fp-left-icon svg { width: 30px; height: 30px; color: #9BDFB0; }
  .fp-left-heading {
    font-family: 'Lora', serif;
    font-style: italic;
    font-size: 26px;
    color: #fff;
    line-height: 1.35;
    margin-bottom: 14px;
  }
  .fp-left-desc {
    font-size: 13px;
    color: rgba(255,255,255,0.5);
    font-weight: 300;
    line-height: 1.7;
  }

  .fp-left-steps {
    position: relative; z-index: 2;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .fp-left-step {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  .fp-step-num {
    width: 22px; height: 22px;
    background: rgba(74,124,89,0.35);
    border: 1px solid rgba(74,124,89,0.6);
    border-radius: 50%;
    font-size: 11px;
    font-weight: 700;
    color: #9BDFB0;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .fp-step-text {
    font-size: 12.5px;
    color: rgba(255,255,255,0.55);
    font-weight: 300;
    line-height: 1.5;
  }

  .fp-left-footer {
    position: relative; z-index: 2;
    font-size: 11px;
    color: rgba(255,255,255,0.25);
    font-weight: 300;
  }

  /* ── Right panel ── */
  .fp-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 20px;
    position: relative;
  }

  .fp-card {
    background: var(--white);
    border-radius: 24px;
    box-shadow: 0 8px 48px rgba(26,77,46,0.12);
    padding: 40px 36px;
    width: 100%;
    max-width: 420px;
    animation: slideUp 0.45s cubic-bezier(.22,1,.36,1) both;
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Back link ── */
  .fp-back {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12.5px;
    font-weight: 500;
    color: var(--stone);
    text-decoration: none;
    margin-bottom: 28px;
    transition: color 0.15s;
  }
  .fp-back:hover { color: var(--ink); }
  .fp-back svg { width: 15px; height: 15px; }

  /* ── Card header ── */
  .fp-card-icon {
    width: 52px; height: 52px;
    background: var(--amber-pale);
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 18px;
  }
  .fp-card-icon svg { width: 24px; height: 24px; color: var(--amber); }
  .fp-card-title {
    font-family: 'Lora', serif;
    font-size: 24px;
    font-weight: 600;
    color: var(--ink);
    margin-bottom: 6px;
  }
  .fp-card-sub {
    font-size: 13px;
    color: var(--stone);
    font-weight: 300;
    line-height: 1.55;
    margin-bottom: 28px;
  }

  /* ── Error ── */
  .fp-error {
    background: var(--red-lt);
    border-left: 3px solid var(--red);
    border-radius: 10px;
    padding: 11px 14px;
    font-size: 13px;
    color: var(--red);
    margin-bottom: 20px;
    animation: shake 0.4s ease;
  }
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%,60%  { transform: translateX(-6px); }
    40%,80%  { transform: translateX(6px); }
  }

  /* ── Form ── */
  .fp-form { display: flex; flex-direction: column; gap: 18px; }

  .fp-field {}
  .fp-label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--stone);
    margin-bottom: 7px;
  }

  .fp-input-wrap {
    position: relative;
  }
  .fp-input-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    width: 17px; height: 17px;
    color: var(--stone);
    pointer-events: none;
    transition: color 0.15s;
  }
  .fp-input {
    width: 100%;
    padding: 13px 14px 13px 42px;
    border: 1.5px solid var(--mist);
    border-radius: 13px;
    font-family: 'Sora', sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: var(--ink);
    background: var(--white);
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .fp-input::placeholder { color: #C4BAB0; }
  .fp-input:focus {
    border-color: var(--amber);
    box-shadow: 0 0 0 3px rgba(212,133,58,0.12);
  }
  .fp-input:focus + .fp-input-icon,
  .fp-input-wrap:focus-within .fp-input-icon { color: var(--amber); }

  /* Select */
  .fp-select-wrap {
    position: relative;
  }
  .fp-select {
    width: 100%;
    padding: 13px 40px 13px 16px;
    border: 1.5px solid var(--mist);
    border-radius: 13px;
    font-family: 'Sora', sans-serif;
    font-size: 14px;
    color: var(--ink);
    background: var(--white);
    appearance: none;
    outline: none;
    cursor: pointer;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .fp-select:focus {
    border-color: var(--amber);
    box-shadow: 0 0 0 3px rgba(212,133,58,0.12);
  }
  .fp-select option[value=""] { color: #C4BAB0; }
  .fp-select-arrow {
    position: absolute;
    right: 14px; top: 50%;
    transform: translateY(-50%);
    width: 16px; height: 16px;
    color: var(--stone);
    pointer-events: none;
  }

  /* Role pills */
  .fp-role-pills {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .fp-pill {
    flex: 1;
    min-width: 80px;
    padding: 10px 12px;
    border: 1.5px solid var(--mist);
    border-radius: 12px;
    font-family: 'Sora', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: var(--stone);
    background: var(--white);
    cursor: pointer;
    text-align: center;
    transition: all 0.15s;
  }
  .fp-pill:hover {
    border-color: var(--amber);
    color: var(--amber);
    background: var(--amber-pale);
  }
  .fp-pill.active {
    border-color: var(--amber);
    background: var(--amber-pale);
    color: var(--bark);
    font-weight: 600;
  }

  /* Submit */
  .fp-submit {
    width: 100%;
    padding: 14px;
    background: #16a34a;
    color: var(--white);
    border: none;
    border-radius: 13px;
    font-family: 'Sora', sans-serif;
    font-size: 14.5px;
    font-weight: 600;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(26,18,9,0.2);
    margin-top: 4px;
  }
  .fp-submit:hover:not(:disabled) {
    background: #16a34a;
    transform: translateY(-1px);
    box-shadow: 0 8px 28px rgba(26,18,9,0.28);
  }
  .fp-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  .fp-submit .spin {
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* ── Success state ── */
  .fp-success {
    text-align: center;
    animation: slideUp 0.45s cubic-bezier(.22,1,.36,1) both;
  }
  .fp-success-ring {
    width: 80px; height: 80px;
    margin: 0 auto 22px;
    background: var(--green-lt);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    animation: popIn 0.5s cubic-bezier(.34,1.56,.64,1) both;
  }
  @keyframes popIn {
    from { opacity: 0; transform: scale(0.6); }
    to   { opacity: 1; transform: scale(1); }
  }
  .fp-success-ring svg { width: 36px; height: 36px; color: var(--green); }
  .fp-success-title {
    font-family: 'Lora', serif;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .fp-success-body {
    font-size: 14px;
    color: var(--stone);
    font-weight: 300;
    line-height: 1.65;
    margin-bottom: 6px;
  }
  .fp-success-email {
    display: inline-block;
    font-size: 14px;
    font-weight: 600;
    color: var(--ink);
    background: var(--sand);
    border-radius: 8px;
    padding: 5px 12px;
    margin: 8px 0 24px;
  }
  .fp-success-role {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    font-weight: 600;
    color: var(--green);
    background: var(--green-lt);
    border-radius: 100px;
    padding: 4px 11px;
    margin-bottom: 28px;
    letter-spacing: 0.04em;
  }
  .fp-success-role svg { width: 13px; height: 13px; }
  .fp-success-btn {
    display: block;
    width: 100%;
    padding: 14px;
    background: var(--bark);
    color: var(--white);
    border: none;
    border-radius: 13px;
    font-family: 'Sora', sans-serif;
    font-size: 14.5px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    transition: background 0.2s, transform 0.15s;
    box-shadow: 0 4px 20px rgba(26,18,9,0.2);
  }
  .fp-success-btn:hover {
    background: #2A1D0E;
    transform: translateY(-1px);
  }
  .fp-success-resend {
    font-size: 12.5px;
    color: var(--stone);
    font-weight: 300;
    margin-top: 16px;
  }
  .fp-success-resend button {
    background: none; border: none;
    color: var(--amber);
    font-weight: 600;
    font-family: 'Sora', sans-serif;
    font-size: 12.5px;
    cursor: pointer;
    padding: 0;
    transition: color 0.15s;
  }
  .fp-success-resend button:hover { color: var(--bark); }
`;

/* ─────────────────────────────────────────
   ROLES
───────────────────────────────────────── */
const ROLES = [
  { value: "USER",   label: "User" },
  { value: "VENDOR", label: "Vendor" },
  { value: "ADMIN",  label: "Admin" },
];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
const ForgotPassword = () => {
  const [email, setEmail]     = useState("");
  const [role, setRole]       = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) { setError("Email address is required."); return; }
    if (!role)         { setError("Please select your account role."); return; }

    setLoading(true);
    setError("");

    try {
      await authAPI.forgotPassword({ email: email.trim(), role });
      setSuccess(true);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to send reset link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ── Resend (reuse same API) ── */
  const handleResend = async () => {
    setLoading(true);
    try {
      await authAPI.forgotPassword({ email: email.trim(), role });
    } catch {
      // silent — already on success screen
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="fp-root">

        {/* ── Left branding panel ── */}
        <div className="fp-left">
          <div className="fp-left-glow fp-left-glow-1" />
          <div className="fp-left-glow fp-left-glow-2" />
          <div className="fp-left-grain" />

          <div className="fp-brand">
            <div className="fp-brand-name">IamashoP</div>
            <div className="fp-brand-tagline">
              Groceries delivered<br />in minutes ⚡
            </div>
          </div>

          <div className="fp-left-body">
            <div className="fp-left-icon">
              <ShieldCheck />
            </div>
            <div className="fp-left-heading">
              Recover your<br />account safely
            </div>
            <div className="fp-left-desc">
              We'll send a secure link to your inbox.<br />
              Follow the steps to reset your password.
            </div>
          </div>

          <ul className="fp-left-steps">
            {[
              "Enter your registered email address",
              "Select your account role",
              "Check your inbox for the reset link",
              "Create a strong new password",
            ].map((step, i) => (
              <li key={i} className="fp-left-step">
                <span className="fp-step-num">{i + 1}</span>
                <span className="fp-step-text">{step}</span>
              </li>
            ))}
          </ul>

          <div className="fp-left-footer">© 2026 IamashoP. All rights reserved.</div>
        </div>

        {/* ── Right form panel ── */}
        <div className="fp-right">
          <div className="fp-card">
            {success ? (
              /* ── SUCCESS STATE ── */
              <div className="fp-success">
                <div className="fp-success-ring">
                  <CheckCircle2 />
                </div>
                <div className="fp-success-title">Check your inbox</div>
                <div className="fp-success-body">
                  We've sent a password reset link to:
                </div>
                <div className="fp-success-email">{email}</div>
                <div style={{ marginBottom: "4px" }}>
                  <span className="fp-success-role">
                    <ShieldCheck /> {ROLES.find(r => r.value === role)?.label} account
                  </span>
                </div>
                <Link to="/login" className="fp-success-btn">
                  Back to Login
                </Link>
                <div className="fp-success-resend">
                  Didn't receive it?{" "}
                  <button onClick={handleResend} disabled={loading}>
                    {loading ? "Resending…" : "Resend email"}
                  </button>
                </div>
              </div>
            ) : (
              /* ── FORM STATE ── */
              <>
                <Link to="/login" className="fp-back">
                  <ArrowLeft /> Back to Login
                </Link>

                <div className="fp-card-icon">
                  <Mail />
                </div>
                <div className="fp-card-title">Forgot Password?</div>
                <div className="fp-card-sub">
                  No worries — enter your email and select your role.
                  We'll send a reset link straight to your inbox.
                </div>

                {error && <div className="fp-error">{error}</div>}

                <form className="fp-form" onSubmit={handleSubmit} noValidate>

                  {/* Email */}
                  <div className="fp-field">
                    <label className="fp-label" htmlFor="fp-email">
                      Email address
                    </label>
                    <div className="fp-input-wrap">
                      <input
                        id="fp-email"
                        type="email"
                        className="fp-input"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        autoComplete="email"
                        autoFocus
                      />
                      <Mail className="fp-input-icon" />
                    </div>
                  </div>

                  {/* Role pills */}
                  <div className="fp-field">
                    <label className="fp-label">Account role</label>
                    <div className="fp-role-pills">
                      {ROLES.map((r) => (
                        <button
                          key={r.value}
                          type="button"
                          className={`fp-pill${role === r.value ? " active" : ""}`}
                          onClick={() => { setRole(r.value); setError(""); }}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="fp-submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="spin" size={17} />
                        Sending link…
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </button>

                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;