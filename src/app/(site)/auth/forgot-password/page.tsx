'use client';

import { useMemo, useState, useCallback, memo, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Loader2, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import dynamic from "next/dynamic";

const DotLottieReact = dynamic(() => import("@lottiefiles/dotlottie-react").then(mod => ({ default: mod.DotLottieReact })), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black/20 animate-pulse" />
});

const PARTICLE_COUNT = 28;

const createParticles = () =>
  Array.from({ length: PARTICLE_COUNT }).map((_, idx) => ({
    id: idx,
    size: Math.random() * 2 + 1,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 4}s`,
    duration: `${2 + Math.random() * 4}s`,
  }));

const ParticlesBackground = memo(() => {
  const [particles, setParticles] = useState<ReturnType<typeof createParticles>>([]);

  useEffect(() => {
    // Only generate particles on client side to avoid hydration mismatch
    setParticles(createParticles());
  }, []);

  return (
    <div className="absolute inset-0 opacity-70">
      {particles.map((particle) => (
        <span
          key={particle.id}
          style={{
            top: particle.top,
            left: particle.left,
            width: particle.size,
            height: particle.size,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
          className="absolute rounded-full bg-white/70 blur-[0.5px] animate-[pulse_3s_ease-in-out_infinite]"
        />
      ))}
    </div>
  );
});

ParticlesBackground.displayName = 'ParticlesBackground';

export default function ForgotPasswordPage() {
  const { sendPasswordReset } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendPasswordReset(email);
      setSent(true);
      toast({
        title: "Email Sent",
        description: "Please check your email for password reset instructions",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send password reset email",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [email, sendPasswordReset, toast]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handleResetForm = useCallback(() => {
    setSent(false);
    setEmail("");
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050915] px-4 py-10 text-white sm:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(120,80,255,0.35),_transparent_45%),radial-gradient(circle_at_bottom,_rgba(0,212,255,0.2),_transparent_50%)]" />
      <ParticlesBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-10 lg:flex-row lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-7/12"
        >
          <div className="space-y-4 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
              Secure Reset
            </span>
            <h1 className="text-4xl font-bold sm:text-5xl">
              Forgot <span className="text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 bg-clip-text">Password?</span>
            </h1>
            <p className="text-sm text-white/70 sm:text-base">
              Enter your registered email and our automated vault will send you a one-time reset link. Your credentials stay encrypted end-to-end.
            </p>
          </div>

          <div className="mt-8 rounded-3xl p-[1.5px] bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 bg-[length:200%_200%] animate-border-glow">
            <div className="rounded-[calc(1.5rem-2px)] bg-black/40 p-8 backdrop-blur-2xl border border-white/10 shadow-[0_0_45px_rgba(93,76,211,0.35)]">
              {!sent ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold">Reset Password</h2>
                    <p className="text-sm text-white/70">
                      We’ll send a secure link to help you choose a new password.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={email}
                          onChange={handleEmailChange}
                          className="h-12 rounded-xl border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/40"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="h-12 w-full rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 text-base font-semibold shadow-[0_10px_30px_rgba(79,70,229,0.4)] hover:brightness-110"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Reset Link"
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <Link
                      href="/auth/login"
                      className="inline-flex items-center gap-2 text-sm text-indigo-300 transition hover:text-white"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to login
                    </Link>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-semibold">Check your inbox</h2>
                  <p className="mt-2 text-sm text-white/70">
                    We’ve sent a password reset link to <span className="font-semibold text-white">{email}</span>
                  </p>
                  <p className="mt-1 text-xs text-white/60">
                    Didn’t get it? It might be hiding in spam or promotions.
                  </p>
                  <div className="mt-6 space-y-3">
                    <Button
                      variant="outline"
                      className="h-11 w-full rounded-xl border-white/20 text-white hover:bg-white/5"
                      onClick={handleResetForm}
                    >
                      Try another email
                    </Button>
                    <Link href="/auth/login">
                      <Button variant="ghost" className="h-11 w-full rounded-xl text-white/80 hover:text-white">
                        Back to login
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="relative w-full rounded-3xl border border-white/5 bg-white/5 bg-gradient-to-b from-white/10 to-transparent p-6 backdrop-blur-2xl lg:w-5/12"
        >
          <div className="absolute inset-0 rounded-3xl border border-white/10 shadow-[0_0_80px_rgba(59,130,246,0.25)]" />
          <div className="relative space-y-6">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-black/40 border border-white/10 shadow-[0_0_35px_rgba(66,153,225,0.25)]">
              <DotLottieReact
                autoplay
                loop
                src="/lottie/Forgot Password.lottie"
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-center text-sm text-white/80">
              <p className="font-medium text-white">Need help?</p>
              <p className="mt-1 text-xs text-white/70">
                You can contact us by visiting the Contact Page and tell us what difficulties you are facing.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 mt-12 text-center text-xs sm:text-sm text-white/60 space-y-1">
        <p>EncryptArx • enterprise-grade identity recovery with zero compromise.</p>
        <p>Forgotten credentials deserve the same cryptographic rigor as everything else.</p>
      </div>
    </div>
  );
}

