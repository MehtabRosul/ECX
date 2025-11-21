'use client';

import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Loader2, Mail, Lock, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Eye, EyeOff } from "lucide-react";
import dynamic from "next/dynamic";
import { AboutShootingStars } from "@/components/about-shooting-stars";
import { setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "@/lib/firebase";

const DotLottieReact = dynamic(() => import("@lottiefiles/dotlottie-react").then(mod => ({ default: mod.DotLottieReact })), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black/20 animate-pulse" />
});

interface GrecaptchaEnterprise {
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
}

interface Grecaptcha {
  enterprise: GrecaptchaEnterprise;
}

const DEFAULT_RECAPTCHA_SITE_KEY = "6LePWw4sAAAAAC1uN1p2WdvuYR8APIg13cyGFrya";

const HeroPanel = memo(({
  compact = false,
  animationKey,
}: {
  compact?: boolean;
  animationKey: number;
}) => (
  <div
    className={`relative isolate overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1b1f42]/90 via-[#232a60]/70 to-[#481a63]/70 shadow-[0_0_120px_rgba(76,29,149,0.45)] ${
      compact ? "px-5 py-6" : "px-10 py-12 h-full flex flex-col"
    }`}
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(137,180,255,0.35),transparent_55%)] animate-gradient opacity-80" />
    <div className={`relative z-10 flex flex-col ${compact ? "gap-5" : "gap-8"}`}>
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-[11px] uppercase tracking-[0.3em] text-white/70">
          <Sparkles className="h-3 w-3" />
          Secure Gateway
        </span>
        <h1 className={`mt-4 font-headline font-semibold text-white ${compact ? "text-3xl" : "text-5xl"}`}>
          Welcome Back
        </h1>
        <p className={`mt-3 text-base text-white/70 ${compact ? "text-sm" : ""}`}>
          Sign in to access your encrypted workspace and continue your journey with EncryptArx.
        </p>
      </div>
      <div className={`relative ${compact ? "mt-4 h-52" : "mt-4 h-80"} w-full`}>
        <DotLottieReact
          key={animationKey}
          autoplay
          loop
          src="/lottie/Login.lottie"
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
        <p className="text-sm font-semibold text-white">Human-grade security</p>
        <p className="text-xs text-white/70">
          EncryptArx authenticates every session with adaptive checks so your research, models, and IP stay locked down.
        </p>
        <p className="mt-3 text-xs text-white/60">
          Trusted by global cryptography teams powering finance, aerospace, and national defense workloads.
        </p>
      </div>
    </div>
  </div>
));

HeroPanel.displayName = 'HeroPanel';

export default function LoginPage() {
  const router = useRouter();
  const { signInWithEmail, signInWithGoogle, user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaLoading, setRecaptchaLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('rememberMe') === 'true';
    }
    return false;
  });
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
  const [lottieKey] = useState(() => Math.random());

  useEffect(() => {
    if (user) {
      router.push("/account");
    }
  }, [user, router]);

  const handleRecaptchaVerification = useCallback(async () => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || DEFAULT_RECAPTCHA_SITE_KEY;

    if (typeof window === "undefined") {
      return;
    }

    const grecaptcha = (window as any).grecaptcha as Grecaptcha | undefined;

    if (!grecaptcha?.enterprise) {
      toast({
        title: "Error",
        description: "reCAPTCHA is not ready. Please refresh the page.",
        variant: "destructive",
      });
      return;
    }

    try {
      setRecaptchaLoading(true);
      const token = await grecaptcha.enterprise.execute(siteKey, { action: "LOGIN" });

      if (!token) {
        throw new Error("Failed to verify reCAPTCHA. Please try again.");
      }

      const verifyResponse = await fetch("/api/verify-recaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, action: "LOGIN" }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyData.success) {
        throw new Error(verifyData.error || "reCAPTCHA verification failed. Please try again.");
      }

      setRecaptchaToken(token);
      setRecaptchaVerified(true);
      toast({
        title: "Success",
        description: "reCAPTCHA verified successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to verify reCAPTCHA. Please try again.",
        variant: "destructive",
      });
    } finally {
      setRecaptchaLoading(false);
    }
  }, [toast]);

  const ensureRecaptcha = useCallback(() => {
    if (!recaptchaVerified || !recaptchaToken) {
      toast({
        title: "Security Check Required",
        description: "Please verify the reCAPTCHA challenge before continuing.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  }, [recaptchaVerified, recaptchaToken, toast]);

  const handleEmailLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!privacyPolicyAccepted) {
      toast({
        title: "Privacy Policy Required",
        description: "You must accept the Privacy Policy to continue.",
        variant: "destructive",
      });
      return;
    }

    if (!ensureRecaptcha()) {
      return;
    }

    // Trim email and password to remove any whitespace
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Validate that email and password are not empty after trimming
    if (!trimmedEmail || !trimmedPassword) {
      toast({
        title: "Invalid Input",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Set persistence based on Remember Me checkbox
      if (rememberMe) {
        await setPersistence(auth, browserLocalPersistence);
        localStorage.setItem('rememberMe', 'true');
      } else {
        await setPersistence(auth, browserSessionPersistence);
        localStorage.setItem('rememberMe', 'false');
      }
      
      await signInWithEmail(trimmedEmail, trimmedPassword);

      toast({
        title: "Login Successful",
        description: "You have been successfully signed in. Redirecting to your account...",
        variant: "success",
      });

      router.push("/account");
    } catch (error: any) {
      // Extract error code from various possible locations (Firebase v9+ structure)
      let errorCode: string | null = null;
      let errorMessage: string = "Failed to sign in. Please check your credentials and try again.";
      
      // Try different ways to extract the error code
      if (error?.code) {
        errorCode = error.code;
      } else if (error?.error?.code) {
        errorCode = error.error.code;
      } else if (error?.message) {
        // Try to extract from error message
        const match = error.message.match(/auth\/[a-z-]+/);
        if (match) {
          errorCode = match[0];
        }
      }
      
      // Extract error message
      if (error?.message) {
        errorMessage = error.message;
      } else if (error?.error?.message) {
        errorMessage = error.error.message;
      }
      
      // Handle specific Firebase authentication errors with creative messages
      let title = "Authentication Failed";
      let description = errorMessage;
      let variant: "destructive" | "success" | "info" | "default" = "info";
      
      // Check for invalid-credential (this is the new unified error code in Firebase v9+)
      // This error occurs when user doesn't exist OR password is wrong
      // We'll show a friendly message suggesting to create an account or use Google login
      if (errorCode === "auth/invalid-credential") {
        // Suppress console error for this case - show user-friendly message instead
        // Firebase will still log internally, but we won't add our own console.error
        title = "Account Not Found";
        description = "No account found with these credentials. Please create an account first or sign in with Google.";
        variant = "info";
      } else if (errorCode === "auth/user-not-found") {
        title = "Account Not Found";
        description = "No account exists with this email address. Please create an account first or sign in with Google.";
        variant = "info";
      } else if (errorCode === "auth/wrong-password") {
        title = "Incorrect Password";
        description = "The password you entered is incorrect. Please try again or reset your password.";
        variant = "destructive";
      } else if (errorCode === "auth/invalid-email") {
        title = "Invalid Email Format";
        description = "Please enter a valid email address.";
        variant = "destructive";
      } else if (errorCode === "auth/user-disabled") {
        title = "Account Suspended";
        description = "This account has been disabled. Please contact support for assistance.";
        variant = "destructive";
      } else if (errorCode === "auth/too-many-requests") {
        title = "Too Many Attempts";
        description = "Access temporarily disabled due to too many failed attempts. Please try again later.";
        variant = "destructive";
      } else if (errorCode === "auth/network-request-failed") {
        title = "Network Error";
        description = "Unable to connect to the authentication server. Please check your internet connection and try again.";
        variant = "destructive";
      } else if (errorMessage?.toLowerCase().includes("recaptcha") || errorMessage?.toLowerCase().includes("captcha")) {
        title = "Verification Failed";
        description = "reCAPTCHA verification failed. Please try again.";
        variant = "destructive";
      } else if (errorMessage?.toLowerCase().includes("invalid-credential") || errorMessage?.toLowerCase().includes("invalid credential")) {
        // Fallback: check message content if code extraction failed
        title = "Account Not Found";
        description = "No account found with these credentials. Please create an account first or sign in with Google.";
        variant = "info";
      } else {
        // For other errors, log for debugging but don't show technical details to user
        console.error("Login error (suppressed from user):", errorCode || errorMessage);
      }
      
      // Always show toast notification
      toast({
        title,
        description,
        variant,
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  }, [email, password, rememberMe, privacyPolicyAccepted, ensureRecaptcha, signInWithEmail, toast, router]);

  const handleGoogleSignIn = useCallback(async () => {
    if (!privacyPolicyAccepted) {
      toast({
        title: "Privacy Policy Required",
        description: "You must accept the Privacy Policy to continue.",
        variant: "destructive",
      });
      return;
    }

    // Check if reCAPTCHA is verified before proceeding
    if (!recaptchaVerified || !recaptchaToken) {
      toast({
        title: "Security Check Required",
        description: "Please verify the reCAPTCHA challenge before signing in with Google.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Set persistence based on Remember Me checkbox
      if (rememberMe) {
        await setPersistence(auth, browserLocalPersistence);
        localStorage.setItem('rememberMe', 'true');
      } else {
        await setPersistence(auth, browserSessionPersistence);
        localStorage.setItem('rememberMe', 'false');
      }
      
      await signInWithGoogle();
      toast({
        title: "Login Successful",
        description: "You have been successfully signed in with Google. Redirecting to your account...",
        variant: "success",
      });
      router.push("/account");
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      
      // Handle specific Google authentication errors with creative messages
      let title = "Google Sign-In Failed";
      let description = error.message || "Failed to sign in with Google. Please try again.";
      let variant: "destructive" | "success" | "info" | "default" = "destructive";
      
      if (error.code === "auth/popup-closed-by-user") {
        title = "Sign-In Cancelled";
        description = "The sign-in popup was closed. Please try again and complete the sign-in process.";
      } else if (error.code === "auth/account-exists-with-different-credential") {
        title = "Credential Conflict";
        description = "An account already exists with this email. Try signing in with your existing credentials.";
        // Keep this as default variant, not info, to avoid confusion with "email already in use"
      } else if (error.code === "auth/popup-blocked") {
        title = "Popup Blocked";
        description = "The sign-in popup was blocked by your browser. Please allow popups and try again.";
      } else if (error.code === "auth/user-not-found") {
        title = "Account Not Found";
        description = "No account exists with this Google account. Please create an account first.";
        // Keep this as default variant, not info, to avoid confusion with "email already in use"
      }
      
      toast({
        title,
        description,
        variant,
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  }, [recaptchaVerified, recaptchaToken, rememberMe, privacyPolicyAccepted, signInWithGoogle, toast, router]);

  const renderRecaptchaBlock = useCallback(() => (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-center backdrop-blur">
      {recaptchaVerified ? (
        <div className="flex items-center justify-center gap-2 text-emerald-300">
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-sm font-medium">reCAPTCHA Verified</span>
        </div>
      ) : (
        <>
          <p className="text-sm text-white/70">Complete the human verification to continue.</p>
          <Button
            type="button"
            variant="secondary"
            onClick={handleRecaptchaVerification}
            disabled={recaptchaLoading}
            className="mt-3 w-full bg-white/10 text-white hover:bg-white/20"
          >
            {recaptchaLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify you're human"
            )}
          </Button>
          <p className="mt-2 text-xs text-white/60">
            We use reCAPTCHA Enterprise to keep your account safe.
          </p>
        </>
      )}
    </div>
  ), [recaptchaVerified, recaptchaLoading, handleRecaptchaVerification]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

	return (
    <div className="relative min-h-screen overflow-hidden bg-[#05060c] text-white">
      <AboutShootingStars className="opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(88,63,196,0.25),transparent_45%),radial-gradient(circle_at_80%_0,rgba(14,165,233,0.25),transparent_40%)]" />
      <div className="relative flex min-h-screen flex-col lg:flex-row">
        <div className="hidden flex-col justify-center lg:flex lg:w-5/12 xl:w-1/2">
          <HeroPanel animationKey={lottieKey} />
        </div>

        <div className="relative flex flex-1 items-center justify-center px-4 py-10 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-lg rounded-3xl border border-white/5 bg-black/50 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.35)]"
          >
            <div className="mb-6 space-y-4">
              <div className="flex items-center gap-3 text-white/70">
                <ShieldCheck className="h-5 w-5 text-indigo-300" />
                <p className="text-sm">Multi-factor login with adaptive security</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-semibold">Sign In</h2>
                  <p className="mt-1 text-sm text-white/70">
                    Don't have an account?{" "}
                    <Link href="/auth/register" className="text-indigo-300 underline-offset-4 hover:underline">
                      Create account
                    </Link>
                  </p>
                </div>
              </div>
              <div className="lg:hidden">
                <HeroPanel compact animationKey={lottieKey} />
              </div>
            </div>

            <motion.form
              key="email-only"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleEmailLogin}
              className="space-y-5"
            >
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80">Email</Label>
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

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/80">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={handlePasswordChange}
                    className={`h-12 rounded-xl border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/40 ${password ? "pr-12" : ""}`}
                    required
                  />
                  {password && (
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-black/80 hover:text-black transition"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={rememberMe}
                    onCheckedChange={(checked) => {
                      setRememberMe(checked === true);
                      if (typeof window !== 'undefined') {
                        localStorage.setItem('rememberMe', checked === true ? 'true' : 'false');
                      }
                    }}
                    className="border-white/30 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
                  />
                  <Label
                    htmlFor="rememberMe"
                    className="text-sm font-normal text-white/80 cursor-pointer hover:text-white transition-colors"
                  >
                    Remember me
                  </Label>
                </div>
                <Link
                  href="/auth/forgot-password"
                  className="text-indigo-300 underline-offset-4 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {renderRecaptchaBlock()}

              <Button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-blue-600 to-purple-500 py-3 text-base font-semibold text-white shadow-[0_10px_30px_rgba(79,70,229,0.45)] transition hover:brightness-110"
                disabled={loading || !recaptchaVerified || !privacyPolicyAccepted}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              {/* Privacy Policy Acceptance */}
              <div className="flex items-start space-x-2 pt-2">
                <Checkbox
                  id="privacyPolicy"
                  checked={privacyPolicyAccepted}
                  onCheckedChange={(checked) => setPrivacyPolicyAccepted(checked === true)}
                  className="mt-1 border-white/30 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
                  required
                />
                <Label
                  htmlFor="privacyPolicy"
                  className="text-sm font-normal text-white/80 cursor-pointer hover:text-white transition-colors leading-relaxed"
                >
                  I accept the{" "}
                  <Link
                    href="/legal#privacy"
                    target="_blank"
                    className="text-indigo-300 underline-offset-4 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  {" "}and agree to the terms and conditions
                </Label>
              </div>
            </motion.form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-[0.3em] text-white/50">
                <span className="bg-black/80 px-3">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full rounded-2xl border-white/20 bg-white/5 py-3 text-white hover:bg-white/10"
              onClick={handleGoogleSignIn}
              disabled={loading || !recaptchaVerified || !privacyPolicyAccepted}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </Button>
          </motion.div>
        </div>
      </div>
		</div>
	);
}
