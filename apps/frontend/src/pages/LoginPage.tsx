import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Key, Smartphone } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { toast } from "sonner";

// Validation schemas
const emailLoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password required"),
  rememberMe: z.boolean().optional(),
});

const otpRequestSchema = z.object({
  phone: z.string().min(1, "Phone number required"),
});

const otpVerifySchema = z.object({
  code: z
    .string()
    .length(4, "OTP must be 4 digits")
    .regex(/^\d+$/, "OTP must be numeric"),
});

type EmailLoginForm = z.infer<typeof emailLoginSchema>;
type OtpRequestForm = z.infer<typeof otpRequestSchema>;
type OtpVerifyForm = z.infer<typeof otpVerifySchema>;
type LoginMode = "email" | "otp" | "google";

export function LoginPage() {
  const [mode, setMode] = useState<LoginMode>("email");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // OTP specific state
  const [otpSent, setOtpSent] = useState(false);
  const [otpPhone, setOtpPhone] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [devOtpCode, setDevOtpCode] = useState<number | null>(null);

  const { login, loginWithOtp, loginWithGoogle } = useAuth();

  // Email/Password form
  const emailForm = useForm<EmailLoginForm>({
    resolver: zodResolver(emailLoginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // OTP request form
  const otpRequestForm = useForm<OtpRequestForm>({
    resolver: zodResolver(otpRequestSchema),
  });

  // OTP verify form
  const otpVerifyForm = useForm<OtpVerifyForm>({
    resolver: zodResolver(otpVerifySchema),
  });

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Email/Password login handler
  const onEmailLogin = async (data: EmailLoginForm) => {
    const toastId = toast.loading("Signing in...");

    try {
      setIsSubmitting(true);
      await login(data.email, data.password);
      toast.success("Logged in successfully!", { id: toastId });
    } catch (err: any) {
      toast.error(
        err.message || "Login failed. Please check your credentials.",
        { id: toastId },
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // OTP request handler
  const onOtpRequest = async (data: OtpRequestForm) => {
    const toastId = toast.loading("Sending OTP...");

    try {
      setIsSubmitting(true);

      const response = await loginWithOtp(data.phone);

      if (response.code) {
        setDevOtpCode(response.code);
        setOtpPhone(data.phone);
        setOtpSent(true);
        setResendTimer(60);
        toast.success("OTP sent successfully!", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to send OTP. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // OTP verify handler
  const onOtpVerify = async (data: OtpVerifyForm) => {
    const toastId = toast.loading("Verifying OTP...");

    try {
      setIsSubmitting(true);

      await loginWithOtp(otpPhone, parseInt(data.code));
      toast.success("Logged in successfully!", { id: toastId });
    } catch (err: any) {
      toast.error(err.message || "Invalid OTP. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resend OTP handler
  const handleResendOtp = async () => {
    if (resendTimer > 0) return;

    const toastId = toast.loading("Resending OTP...");

    try {
      const response = await loginWithOtp(otpPhone);

      if (response.code) {
        setDevOtpCode(response.code);
        setResendTimer(60);
        toast.success("OTP resent successfully!", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to resend OTP.", { id: toastId });
    }
  };

  // Google OAuth handler
  const handleGoogleSuccess = async (credentialResponse: any) => {
    const toastId = toast.loading("Signing in with Google...");

    try {
      await loginWithGoogle(credentialResponse.credential);
      toast.success("Logged in successfully!", { id: toastId });
    } catch (err: any) {
      toast.error(err.message || "Google login failed.", { id: toastId });
    }
  };

  const handleGoogleError = () => {
    toast.error("Google login failed. Please try again.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center">
            Choose your login method
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Mode Switcher */}
          <div className="grid grid-cols-3 gap-2">
            <Button
              type="button"
              variant={mode === "email" ? "default" : "outline"}
              onClick={() => setMode("email")}
              className="gap-2"
            >
              <Mail size={16} />
              <span className="hidden sm:inline">Email</span>
            </Button>
            <Button
              type="button"
              variant={mode === "otp" ? "default" : "outline"}
              onClick={() => {
                setMode("otp");
                setOtpSent(false);
              }}
              className="gap-2"
            >
              <Smartphone size={16} />
              <span className="hidden sm:inline">OTP</span>
            </Button>
            <Button
              type="button"
              variant={mode === "google" ? "default" : "outline"}
              onClick={() => setMode("google")}
              className="gap-2"
            >
              <Key size={16} />
              <span className="hidden sm:inline">Google</span>
            </Button>
          </div>

          {/* Email/Password Mode */}
          {mode === "email" && (
            <form
              onSubmit={emailForm.handleSubmit(onEmailLogin)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...emailForm.register("email")}
                  placeholder="Enter your email address"
                  className={
                    emailForm.formState.errors.email ? "border-destructive" : ""
                  }
                />
                {emailForm.formState.errors.email && (
                  <p className="text-sm text-destructive">
                    {emailForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...emailForm.register("password")}
                    placeholder="Enter your password"
                    className={
                      emailForm.formState.errors.password
                        ? "border-destructive pr-10"
                        : "pr-10"
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {emailForm.formState.errors.password && (
                  <p className="text-sm text-destructive">
                    {emailForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    {...emailForm.register("rememberMe")}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
                {/*<Link to="/forgot-password" className="text-sm text-primary hover:underline">*/}
                {/*  Forgot password?*/}
                {/*</Link>*/}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size={16} className="mr-2" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          )}

          {/* OTP Mode */}
          {mode === "otp" && !otpSent && (
            <form
              onSubmit={otpRequestForm.handleSubmit(onOtpRequest)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  {...otpRequestForm.register("phone")}
                  placeholder="+1234567890"
                  className={
                    otpRequestForm.formState.errors.phone
                      ? "border-destructive"
                      : ""
                  }
                />
                {otpRequestForm.formState.errors.phone && (
                  <p className="text-sm text-destructive">
                    {otpRequestForm.formState.errors.phone.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Enter your phone number to receive a one-time password
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size={16} className="mr-2" />
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP"
                )}
              </Button>
            </form>
          )}

          {/* OTP Verify */}
          {mode === "otp" && otpSent && (
            <form
              onSubmit={otpVerifyForm.handleSubmit(onOtpVerify)}
              className="space-y-4"
            >
              {devOtpCode && (
                <div className="p-3 text-sm bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-md">
                  <p className="font-medium">Development Mode:</p>
                  <p>
                    Your OTP code is:{" "}
                    <span className="font-mono font-bold">{devOtpCode}</span>
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="code">Enter OTP Code</Label>
                <Input
                  id="code"
                  {...otpVerifyForm.register("code")}
                  placeholder="1234"
                  maxLength={4}
                  className={`text-center text-2xl tracking-widest ${otpVerifyForm.formState.errors.code ? "border-destructive" : ""}`}
                />
                {otpVerifyForm.formState.errors.code && (
                  <p className="text-sm text-destructive">
                    {otpVerifyForm.formState.errors.code.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground text-center">
                  OTP sent to {otpPhone}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendTimer > 0}
                  className="text-sm text-primary hover:underline disabled:text-muted-foreground disabled:no-underline"
                >
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false);
                    otpRequestForm.reset();
                    otpVerifyForm.reset();
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Change phone number
                </button>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size={16} className="mr-2" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Sign in"
                )}
              </Button>
            </form>
          )}

          {/* Google OAuth Mode */}
          {mode === "google" && (
            <div className="space-y-4">
              <p className="text-sm text-center text-muted-foreground">
                Sign in with your Google account
              </p>
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap
                />
              </div>
            </div>
          )}

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
