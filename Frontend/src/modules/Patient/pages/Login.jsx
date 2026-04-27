import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import { AlertCircle, Building2, CheckCircle2, KeyRound, Mail, ShieldCheck, Stethoscope, X } from "lucide-react";

import { loginUser } from "../../../services/authService";
import { syncHospitalSnapshot } from "../../hospitalAdmin/services/hospitalSnapshotService";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.registeredEmail || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(Boolean(location.state?.successMessage));
  const [alertMsg, setAlertMsg] = useState(location.state?.successMessage || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fromPath = location.state?.from?.pathname || "/";
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

  const resolveDestination = (userRole) => {
    if (userRole === "patient") {
      return fromPath === "/" ? "/patient-dashboard" : fromPath;
    }

    if (userRole === "admin") {
      return "/hadmin";
    }

    if (userRole === "master_admin") {
      return "/admin/dashboard";
    }

    return "/";
  };

  const handleLogin = async () => {
    setError("");

    if (!email.trim() || !password) {
      setError("Email and password are required");
      return;
    }

    setIsSubmitting(true);

    try {
      const { token, user } = await loginUser({
        email: email.trim(),
        password,
      });

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        await syncHospitalSnapshot().catch(() => {});
      }

      navigate(resolveDestination(user.role), { replace: true });
    } catch (loginError) {
      setError(loginError.response?.data?.message || "Unable to login right now");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSuccess = () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: "Google User",
        role: "patient",
      }),
    );

    navigate("/patient-dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      <div className="hidden lg:flex flex-1 relative bg-slate-900 border-r border-slate-800 flex-col items-start justify-center p-16 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-blue-900/40 to-transparent z-0"></div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-lg"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-[11px] font-bold uppercase tracking-widest text-blue-400 mb-8">
            <Building2 className="w-3.5 h-3.5" />
            HMS+ Infrastructure
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold leading-[1.1] mb-6 tracking-tight text-white">
            Secure Platform <br /> Access <span className="text-blue-500">Portal.</span>
          </h1>

          <p className="text-base text-slate-400 mb-12 leading-relaxed max-w-md">
            Authenticate to manage patient records, coordinate clinical schedules, and access enterprise health modules.
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4 p-5 rounded-xl border border-slate-800 bg-slate-800/50 backdrop-blur-sm">
              <div className="p-2.5 bg-blue-500/20 rounded-lg border border-blue-500/20 text-blue-400 shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white">End-to-End Encryption</h3>
                <p className="text-sm text-slate-400 mt-1">Enterprise-grade security standards safeguarding clinical data.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-xl border border-slate-800 bg-slate-800/50 backdrop-blur-sm">
              <div className="p-2.5 bg-indigo-500/20 rounded-lg border border-indigo-500/20 text-indigo-400 shrink-0 mt-0.5">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white">Unified Connectivity</h3>
                <p className="text-sm text-slate-400 mt-1">Seamless portal linking providers, physicians, and administrative teams.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[400px]"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">Authentication Log In</h2>
            <p className="text-sm text-slate-500">Provide your registered credentials to securely sign in.</p>
          </div>

          <AnimatePresence mode="popLayout">
            {showAlert && alertMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className={`mb-6 flex items-start gap-3 p-3.5 rounded-lg border ${
                  alertMsg.includes("successfully") || alertMsg.includes("submitted")
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {alertMsg.includes("successfully") || alertMsg.includes("submitted") ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <p className="text-sm font-medium flex-1">{alertMsg}</p>
                <button onClick={() => setShowAlert(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-2 text-red-600 mb-5 text-sm font-semibold bg-red-50 p-3 rounded-lg border border-red-200">
              <AlertCircle className="w-4 h-4" /> {error}
            </motion.div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Registered Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  placeholder="admin@hms.com"
                  className="block w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-sm"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="block w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-sm"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm border border-blue-700 disabled:opacity-60 disabled:pointer-events-none"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </div>

          <div className="mt-8 mb-6 flex items-center justify-center relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">SSO Providers</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="relative flex justify-center overflow-hidden rounded-lg border border-slate-300 bg-white hover:bg-slate-50 transition-colors [&>div]:w-full [&>div>div]:!w-full [&>div>div]:!h-[40px] shadow-sm">
              {googleClientId ? (
                <div className="opacity-0 absolute inset-0 z-10 w-full">
                  <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError("Google sign-in failed")} shape="rectangular" size="large" />
                </div>
              ) : null}
              <div className="w-full h-[40px] flex items-center justify-center gap-2 font-semibold text-slate-700 text-sm pointer-events-none">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  <path fill="none" d="M1 1h22v22H1z" />
                </svg>
                {googleClientId ? "Sign in with Google" : "Google sign-in unavailable"}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-center text-sm">
            <p className="text-slate-500 font-medium">New User? </p>
            <Link to="/register" className="ml-1 font-bold text-blue-600 hover:text-blue-800 transition-colors">
              Initialize Registration
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
