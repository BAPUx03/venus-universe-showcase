import { useEffect, useRef, useState } from "react";
import { Loader2, ShieldCheck, X, Phone, RotateCw } from "lucide-react";

type Props = {
  open: boolean;
  phone: string; // full international e.g. +919876543210
  onClose: () => void;
  onVerified: () => void;
};

export function OtpModal({ open, phone, onClose, onVerified }: Props) {
  const [stage, setStage] = useState<"sending" | "enter" | "verifying" | "done" | "error">("sending");
  const [sessionId, setSessionId] = useState("");
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");
  const [resendIn, setResendIn] = useState(30);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (!open) return;
    setOtp("");
    setErr("");
    setStage("sending");
    setResendIn(30);
    void sendOtp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, phone]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (stage !== "enter") return;
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [stage, resendIn]);

  const sendOtp = async () => {
    setStage("sending");
    setErr("");
    try {
      const r = await fetch("/api/public/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send", phone }),
      });
      const data = await r.json();
      if (!data.ok) throw new Error(data.error || "Failed to send OTP");
      setSessionId(data.sessionId);
      setStage("enter");
      setResendIn(30);
      setTimeout(() => inputsRef.current[0]?.focus(), 60);
    } catch (e) {
      setErr((e as Error).message);
      setStage("error");
    }
  };

  const setDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(-1);
    const next = otp.padEnd(6, " ").split("");
    next[i] = d || " ";
    const joined = next.join("").trimEnd();
    setOtp(joined);
    if (d && i < 5) inputsRef.current[i + 1]?.focus();
    if (joined.replace(/\s/g, "").length === 6) {
      void verify(joined.replace(/\s/g, ""));
    }
  };

  const onPaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    e.preventDefault();
    setOtp(text);
    text.split("").forEach((ch, idx) => {
      const el = inputsRef.current[idx];
      if (el) el.value = ch;
    });
    if (text.length === 6) void verify(text);
    else inputsRef.current[text.length]?.focus();
  };

  const verify = async (code: string) => {
    setStage("verifying");
    setErr("");
    try {
      const r = await fetch("/api/public/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify", sessionId, otp: code }),
      });
      const data = await r.json();
      if (!data.ok || !data.verified) throw new Error(data.error || "Invalid OTP");
      setStage("done");
      setTimeout(() => onVerified(), 600);
    } catch (e) {
      setErr((e as Error).message);
      setStage("enter");
      setOtp("");
      inputsRef.current.forEach((el) => el && (el.value = ""));
      inputsRef.current[0]?.focus();
    }
  };

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4">
      <div className="absolute inset-0 bg-black/65 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-[440px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-[oklch(0.92_0.02_25)]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 inline-flex items-center justify-center rounded-full hover:bg-black/5 text-foreground/60"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <div className="px-7 pt-8 pb-7 text-center">
          <div
            className="mx-auto w-14 h-14 rounded-full inline-flex items-center justify-center mb-4"
            style={{ background: "linear-gradient(135deg, var(--accent-red), var(--accent-red-deep))" }}
          >
            <ShieldCheck className="text-white" size={26} />
          </div>
          <h3 className="font-display text-xl font-bold text-foreground">Verify your mobile</h3>
          <p className="mt-1.5 text-[13px] text-foreground/60 inline-flex items-center justify-center gap-1.5">
            <Phone size={12} /> OTP sent to <span className="font-semibold text-foreground">{phone}</span>
          </p>

          {stage === "sending" && (
            <div className="mt-7 inline-flex items-center gap-2 text-[13px] text-foreground/65">
              <Loader2 size={16} className="animate-spin" /> Sending OTP…
            </div>
          )}

          {(stage === "enter" || stage === "verifying") && (
            <>
              <div className="mt-6 flex justify-center gap-2" onPaste={onPaste}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputsRef.current[i] = el;
                    }}
                    inputMode="numeric"
                    maxLength={1}
                    disabled={stage === "verifying"}
                    onChange={(e) => setDigit(i, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !(e.target as HTMLInputElement).value && i > 0) {
                        inputsRef.current[i - 1]?.focus();
                      }
                    }}
                    className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-semibold border-2 border-[oklch(0.9_0.02_25)] rounded-lg focus:outline-none focus:border-[var(--accent-red)] focus:ring-2 focus:ring-[oklch(0.65_0.21_25/0.2)] transition disabled:opacity-60"
                  />
                ))}
              </div>

              {err && <div className="mt-3 text-[12.5px] text-destructive">{err}</div>}

              {stage === "verifying" ? (
                <div className="mt-5 inline-flex items-center gap-2 text-[13px] text-foreground/70">
                  <Loader2 size={14} className="animate-spin" /> Verifying…
                </div>
              ) : (
                <div className="mt-5 text-[12px] text-foreground/55">
                  Didn't receive code?{" "}
                  {resendIn > 0 ? (
                    <span className="font-medium text-foreground/70">Resend in {resendIn}s</span>
                  ) : (
                    <button
                      onClick={sendOtp}
                      className="inline-flex items-center gap-1 font-semibold underline"
                      style={{ color: "var(--accent-red)" }}
                    >
                      <RotateCw size={11} /> Resend OTP
                    </button>
                  )}
                </div>
              )}
            </>
          )}

          {stage === "done" && (
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-700 text-[13px] font-semibold">
              <ShieldCheck size={14} /> Verified successfully
            </div>
          )}

          {stage === "error" && (
            <div className="mt-6">
              <div className="text-[13px] text-destructive">{err}</div>
              <button
                onClick={sendOtp}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-white text-[12.5px] font-semibold uppercase tracking-[0.14em]"
                style={{ background: "var(--accent-red)" }}
              >
                <RotateCw size={13} /> Try Again
              </button>
            </div>
          )}

          <p className="mt-6 text-[10.5px] text-foreground/45 leading-relaxed">
            By verifying, you confirm this is your number and agree to receive property updates via call/SMS.
          </p>
        </div>
      </div>
    </div>
  );
}
