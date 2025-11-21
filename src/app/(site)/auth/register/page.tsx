'use client';

import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Loader2, Mail, Lock, User, Phone, MapPin, ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AboutShootingStars } from "@/components/about-shooting-stars";
import { setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "@/lib/firebase";

type Particle = {
  id: number;
  size: number;
  top: string;
  left: string;
  delay: string;
  duration: string;
};

const PARTICLE_COUNT = 60;

const createParticles = (): Particle[] =>
  Array.from({ length: PARTICLE_COUNT }).map((_, idx) => ({
    id: idx,
    size: Math.random() * 3 + 1,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    duration: `${4 + Math.random() * 6}s`,
  }));

const ParticleField = memo(() => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Only generate particles on client side to avoid hydration mismatch
    setParticles(createParticles());
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0">
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
          className="absolute rounded-full bg-white/60 blur-[1px] animate-pulse"
        />
      ))}
    </div>
  );
});

ParticleField.displayName = 'ParticleField';

// reCAPTCHA types
interface GrecaptchaEnterprise {
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
  ready: (callback: () => void) => void;
}

interface Grecaptcha {
  enterprise: GrecaptchaEnterprise;
}

type FormData = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  countryCode: string;
  address: {
    country: string;
    state: string;
    city: string;
    street: string;
  };
  gender: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const { signUpWithEmail, signInWithGoogle, user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('rememberMe') === 'true';
    }
    return false;
  });
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    countryCode: "+1",
    address: {
      country: "",
      state: "",
      city: "",
      street: "",
    },
    gender: "",
  });

  // Password requirements validation
  const passwordRequirements = useMemo(() => ({
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password),
    numeric: /[0-9]/.test(formData.password),
    minLength: formData.password.length >= 8,
  }), [formData.password]);

  const allRequirementsMet = useMemo(() => Object.values(passwordRequirements).every(Boolean), [passwordRequirements]);
  const passwordsMatch = useMemo(() => formData.password === formData.confirmPassword, [formData.password, formData.confirmPassword]);
  const showPasswordMismatch = useMemo(() => formData.confirmPassword.length > 0 && !passwordsMatch, [formData.confirmPassword.length, passwordsMatch]);

  useEffect(() => {
    if (user) {
      router.push("/account");
    }
  }, [user, router]);

  useEffect(() => {
    // Set up reCAPTCHA callback function
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LePWw4sAAAAAC1uN1p2WdvuYR8APIg13cyGFrya';
    
    // Define the callback function that will be called by reCAPTCHA
    // This must be on window object for reCAPTCHA to access it
    (window as any).onSubmitRecaptcha = (token: string) => {
      console.log('reCAPTCHA token received:', !!token);
      if (token) {
        setRecaptchaToken(token);
        setRecaptchaVerified(true);
      }
    };
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!privacyPolicyAccepted) {
      toast({
        title: "Privacy Policy Required",
        description: "You must accept the Privacy Policy to create an account.",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "The passwords you entered don't match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    // Check password requirements
    if (!allRequirementsMet) {
      toast({
        title: "Password Requirements",
        description: "Your password must meet all the security requirements listed above.",
        variant: "destructive",
      });
      return;
    }

    if (!recaptchaVerified) {
      toast({
        title: "Verification Required",
        description: "Please complete the reCAPTCHA verification to prove you're human.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Get reCAPTCHA token from checkbox
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LePWw4sAAAAAC1uN1p2WdvuYR8APIg13cyGFrya';

      // Token should already be verified when user clicked the button
      // But double-check it exists
      if (!recaptchaToken || !recaptchaVerified) {
        throw new Error("Please complete the reCAPTCHA verification");
      }

      // Set persistence based on Remember Me checkbox
      if (rememberMe) {
        await setPersistence(auth, browserLocalPersistence);
        localStorage.setItem('rememberMe', 'true');
      } else {
        await setPersistence(auth, browserSessionPersistence);
        localStorage.setItem('rememberMe', 'false');
      }

      // Create account
      await signUpWithEmail({
        email: formData.email,
        password: formData.password,
        displayName: formData.displayName,
        phone: formData.phone,
        countryCode: formData.countryCode,
        address: formData.address,
        gender: formData.gender,
      });

      toast({
        title: "Account Created Successfully",
        description: "Your account has been created. Redirecting to your account page...",
        variant: "success",
      });

      router.push("/account");
    } catch (error: any) {
      // Handle specific Firebase authentication errors with creative messages
      let title = "Registration Failed";
      let description = error.message || "Failed to create account. Please try again.";
      let variant: "destructive" | "success" | "info" | "default" = "destructive";
      
      // Check for email already in use
      if (error.code === "auth/email-already-in-use") {
        title = "Email Already Registered";
        description = "This email address is already associated with an account. Please sign in instead.";
        variant = "info";
      } else if (error.code === "auth/invalid-email") {
        title = "Invalid Email";
        description = "Please enter a valid email address.";
      } else if (error.code === "auth/weak-password") {
        title = "Password Too Weak";
        description = "Please choose a stronger password with at least 6 characters.";
      } else if (error.code === "auth/operation-not-allowed") {
        title = "Registration Disabled";
        description = "Email/password registration is currently disabled. Please try another method.";
      } else if (error.message?.includes("reCAPTCHA")) {
        title = "Verification Failed";
        description = "reCAPTCHA verification failed. Please try again.";
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
  }, [formData, allRequirementsMet, recaptchaVerified, recaptchaToken, rememberMe, privacyPolicyAccepted, signUpWithEmail, toast, router]);

  const handleGoogleSignUp = useCallback(async () => {
    if (!privacyPolicyAccepted) {
      toast({
        title: "Privacy Policy Required",
        description: "You must accept the Privacy Policy to create an account.",
        variant: "destructive",
      });
      return;
    }

    // Check if reCAPTCHA is verified before proceeding
    if (!recaptchaVerified || !recaptchaToken) {
      toast({
        title: "Security Check Required",
        description: "Please verify the reCAPTCHA challenge before signing up with Google.",
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
        title: "Account Created Successfully",
        description: "Your account has been created with Google. Redirecting to your account page...",
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
        title = "Account Already Exists";
        description = "An account already exists with this email. Please sign in with your existing credentials.";
        variant = "info";
      } else if (error.code === "auth/popup-blocked") {
        title = "Popup Blocked";
        description = "The sign-in popup was blocked by your browser. Please allow popups and try again.";
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

  const updateFormField = useCallback((field: 'displayName' | 'email' | 'password' | 'confirmPassword' | 'phone' | 'countryCode' | 'gender', value: any) => {
    setFormData((prev: FormData) => ({ ...prev, [field]: value }));
  }, []);

  const updateAddressField = useCallback((field: 'country' | 'state' | 'city' | 'street', value: string) => {
    setFormData((prev: FormData): FormData => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  }, []);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleShowConfirmPassword = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  const handleRecaptchaClick = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LePWw4sAAAAAC1uN1p2WdvuYR8APIg13cyGFrya';
    const grecaptcha = (window as any).grecaptcha as Grecaptcha | undefined;
    if (grecaptcha && grecaptcha.enterprise) {
      try {
        setLoading(true);
        const token = await grecaptcha.enterprise.execute(siteKey, { action: 'SIGNUP' });
        console.log('reCAPTCHA token generated:', !!token);
        
        if (token) {
          const verifyResponse = await fetch("/api/verify-recaptcha", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, action: "SIGNUP" }),
          });

          const verifyData = await verifyResponse.json();
          console.log('reCAPTCHA verification result:', verifyData);

          if (verifyData.success) {
            setRecaptchaToken(token);
            setRecaptchaVerified(true);
            toast({
              title: "Success",
              description: "reCAPTCHA verified successfully!",
            });
          } else {
            console.error('reCAPTCHA verification failed:', verifyData);
            toast({
              title: "Error",
              description: verifyData.error || "reCAPTCHA verification failed. Please try again.",
              variant: "destructive",
            });
          }
        }
      } catch (error: any) {
        console.error('reCAPTCHA execute error:', error);
        if (error?.message?.includes('localhost') || error?.message?.includes('domain')) {
          toast({
            title: "Development Mode",
            description: "Please add localhost to allowed domains in Google Cloud Console, or test on a deployed domain.",
            variant: "default",
          });
        } else {
          toast({
            title: "Error",
            description: error?.message || "Failed to verify reCAPTCHA. Please try again.",
            variant: "destructive",
          });
        }
      } finally {
        setLoading(false);
      }
    } else {
      toast({
        title: "Error",
        description: "reCAPTCHA is not loaded. Please refresh the page.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const countryCodes = useMemo(() => [
    { value: "+1", label: "+1 (US/CA)" },
    { value: "+44", label: "+44 (UK)" },
    { value: "+91", label: "+91 (India)" },
    { value: "+86", label: "+86 (China)" },
    { value: "+81", label: "+81 (Japan)" },
    { value: "+49", label: "+49 (Germany)" },
    { value: "+33", label: "+33 (France)" },
    { value: "+61", label: "+61 (Australia)" },
  ], []);

  const countries = useMemo(() => [
    "United States", "Canada", "United Kingdom", "India", "China", "Japan",
    "Germany", "France", "Australia", "Brazil", "Mexico", "Spain", "Italy",
  ], []);

	return (
    <div className="relative min-h-screen overflow-hidden bg-[#05050b] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(120,64,255,0.35),transparent_45%),radial-gradient(circle_at_bottom,_rgba(0,200,255,0.25),transparent_55%)]" />
      <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml,%3Csvg width%3D%27100%27 height%3D%27100%27 viewBox%3D%270 0 100 100%27 fill%3D%27none%27 xmlns%3D%27http://www.w3.org/2000/svg%27%3E%3Cpath d%3D%27M0 50 H100 M50 0 V100%27 stroke%3D%27rgba(255,255,255,0.05)%27 stroke-width%3D%270.5%27/%3E%3C/svg%3E')] [mask-image:radial-gradient(circle at center, white, transparent)]" />
      <AboutShootingStars className="opacity-70" />

      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-8">
          <ParticleField />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative z-10 mb-8 text-center"
          >
            <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">EncryptArx</span>
            </h1>
            <p className="mt-4 text-lg text-white/80 sm:text-xl">
              Join thousands of security professionals building the future of cryptography
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative z-10 w-full max-w-3xl rounded-xl border border-white/5 bg-black/70 p-6 sm:p-8 lg:p-10 backdrop-blur-3xl shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
          >
            <div className="mb-6 flex flex-col gap-3 text-white/80 sm:mb-8">
              <div className="flex items-center gap-3 text-sm text-white/60">
                <ShieldCheck className="h-5 w-5 text-indigo-300" />
                <p>Multi-Level Security is needed while your account is being created</p>
              </div>
              <div>
                <h2 className="text-3xl font-semibold text-white">Create Account</h2>
                <p className="mt-1 text-sm text-white/70">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-indigo-300 underline-offset-4 hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="displayName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.displayName}
                  onChange={(e) => updateFormField('displayName', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => updateFormField('email', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="countryCode">Country Code</Label>
                <Select
                  value={formData.countryCode}
                  onValueChange={(value) => updateFormField('countryCode', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((code) => (
                      <SelectItem key={code.value} value={code.value}>
                        {code.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="1234567890"
                    value={formData.phone}
                    onChange={(e) => updateFormField('phone', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={formData.address.country}
                onValueChange={(value) => updateAddressField('country', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => updateFormField('gender', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => updateFormField('password', e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {/* Password Requirements */}
              <div className="mt-2 space-y-1.5 text-xs">
                <div className={`flex items-center gap-2 ${passwordRequirements.uppercase ? 'text-green-500' : 'text-muted-foreground'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${passwordRequirements.uppercase ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                  <span>Require uppercase character</span>
                </div>
                <div className={`flex items-center gap-2 ${passwordRequirements.lowercase ? 'text-green-500' : 'text-muted-foreground'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${passwordRequirements.lowercase ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                  <span>Require lowercase character</span>
                </div>
                <div className={`flex items-center gap-2 ${passwordRequirements.special ? 'text-green-500' : 'text-muted-foreground'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${passwordRequirements.special ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                  <span>Require special character</span>
                </div>
                <div className={`flex items-center gap-2 ${passwordRequirements.numeric ? 'text-green-500' : 'text-muted-foreground'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${passwordRequirements.numeric ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                  <span>Require numeric character</span>
                </div>
                <div className={`flex items-center gap-2 ${passwordRequirements.minLength ? 'text-green-500' : 'text-muted-foreground'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${passwordRequirements.minLength ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                  <span>Minimum 8 characters</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormField('confirmPassword', e.target.value)}
                  className={`pl-10 pr-10 ${showPasswordMismatch ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  required
                />
                <button
                  type="button"
                  onClick={toggleShowConfirmPassword}
                  className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {showPasswordMismatch && (
                <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Passwords do not match
                </p>
              )}
            </div>

            {/* Remember Me Checkbox */}
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

            {/* reCAPTCHA Checkbox */}
            <div className="flex flex-col items-center py-4">
              <div className="flex justify-center min-h-[78px] items-center" id="recaptcha-container">
                {(() => {
                  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LePWw4sAAAAAC1uN1p2WdvuYR8APIg13cyGFrya';
                  
                  if (recaptchaVerified) {
                    return (
                      <div className="flex items-center gap-2 text-emerald-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm font-medium text-white">reCAPTCHA Verified</span>
                      </div>
                    );
                  }
                  
                  return (
                    <button
                      type="button"
                      className="w-full rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 transition-all hover:border-white/40 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleRecaptchaClick}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="inline-block mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        'Verify you\'re human'
                      )}
                    </button>
                  );
                })()}
              </div>
              {!recaptchaVerified && (
                <p className="mt-3 text-xs text-white/60 text-center">
                  Please click the button above to complete reCAPTCHA verification
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || !recaptchaVerified || !allRequirementsMet || !privacyPolicyAccepted}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
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
			</form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-[0.4em] text-white/50">
              <span className="bg-black/70 px-3">Or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full rounded-xl border-white/20 bg-white/5 py-3 text-white hover:bg-white/10"
            onClick={handleGoogleSignUp}
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
            Sign up with Google
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
