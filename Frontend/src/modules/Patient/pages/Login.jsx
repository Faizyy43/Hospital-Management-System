import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fakeUsers } from "../../../data/fakeUsers";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import { AlertCircle, Mail, KeyRound, ArrowRight, ShieldCheck, HeartPulse, Stethoscope, RefreshCcw, CheckCircle2, X, Building2 } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("login");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [lastTriedEmail, setLastTriedEmail] = useState("");

  const navigate = useNavigate();

  // 🔢 SEND OTP (MAIN LOGIN FLOW)
  const sendOtp = async () => {
    setError("");
    setShowAlert(false);

    // ✅ EMPTY EMAIL CHECK
    if (!email) {
      setAlertMsg("Email is required");
      setShowAlert(true);
      return;
    }

    // ✅ EMAIL FORMAT CHECK (professional)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setAlertMsg("Enter a valid email address");
      setShowAlert(true);
      return;
    }

    const user = fakeUsers.find((u) => u.email === email);

    if (!user) {
      if (!lastTriedEmail) {
        // ✅ FIRST TIME
        setLastTriedEmail(email);

        setAlertMsg("User not found. Please check your email.");
        setShowAlert(true);
      } else if (email !== lastTriedEmail) {
        // ✅ SECOND TIME (DIFFERENT EMAIL)
        setAlertMsg("Email not registered. Redirecting to signup...");
        setShowAlert(true);

        setTimeout(() => {
          navigate("/register");
        }, 1000);
      } else {
        // same email again → still first level warning
        setAlertMsg("User not found. Try a different email.");
        setShowAlert(true);
      }

      return;
    }

    // 🔐 REAL OTP API (optional - connect backend)
    /*
  await fetch("/api/send-otp", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  */

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setStep("otp");

    setTimer(30);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Demo OTP
    setAlertMsg("Secure Access Code generated successfully");
    setShowAlert(true);

    console.log("OTP:", newOtp);
  };

  // ✅ VERIFY OTP
  const verifyOtp = () => {
    // ❌ EMPTY OTP
    if (!otp) {
      setError("Provide authorization code");
      return;
    }

    // ❌ INVALID LENGTH
    if (otp.length !== 6) {
      setError("Code must be 6 digits");
      return;
    }

    // ❌ WRONG OTP
    if (otp !== generatedOtp) {
      setError("Invalid authorization code");
      return;
    }

    // ✅ SUCCESS
    const user = fakeUsers.find((u) => u.email === email);

    localStorage.setItem("user", JSON.stringify(user));

    navigate(user.role === "patient" ? "/" : "/hadmin");
  };
  
  // 🔄 GOOGLE LOGIN
  const handleGoogleSuccess = () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: "Google User",
        role: "patient",
      }),
    );

    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      {/* LEFT SIDE - ENTERPRISE BRANDING */}
      <div className="hidden lg:flex flex-1 relative bg-slate-900 border-r border-slate-800 flex-col items-start justify-center p-16 text-white overflow-hidden">
        
        {/* Strict Geometric Grid Decor instead of Blurs */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
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
            Secure Platform <br/> Access <span className="text-blue-500">Portal.</span>
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
                 <p className="text-sm text-slate-400 mt-1">Enterprise-grade security standards safeguarding clinical PHI data.</p>
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

      {/* RIGHT SIDE FORM */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[400px]"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
              Authentication Log In
            </h2>
            <p className="text-sm text-slate-500">
              Provide your registered credentials to securely sign in.
            </p>
          </div>

          <AnimatePresence mode="popLayout">
            {showAlert && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className={`mb-6 flex items-start gap-3 p-3.5 rounded-lg border ${
                  alertMsg.includes("successfully") 
                    ? "bg-green-50 border-green-200 text-green-800" 
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {alertMsg.includes("successfully") ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <p className="text-sm font-medium flex-1">
                  {alertMsg}
                </p>
                <button
                  onClick={() => {
                    setShowAlert(false);
                    if (!alertMsg.includes("successfully")) {
                      setEmail(""); 
                    }
                  }}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
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

          {/* STEP 1 → EMAIL */}
          <AnimatePresence mode="wait">
             {step === "login" && (
                <motion.div
                  key="login-step"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Registered Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        placeholder="admin@hms.com"
                        className={`block w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-sm ${
                          showAlert && !alertMsg.includes("successfully") ? "border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50" : ""
                        }`}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setShowAlert(false);
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && sendOtp()}
                      />
                    </div>
                  </div>

                  <button 
                    onClick={sendOtp} 
                    className="w-full flex items-center justify-center py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm border border-blue-700"
                  >
                    Send One-Time Code
                  </button>
                </motion.div>
             )}

             {/* STEP 2 → OTP */}
             {step === "otp" && generatedOtp && (
                <motion.div
                  key="otp-step"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Authorization Target</p>
                    <p className="text-sm font-bold text-slate-900">{email}</p>
                    <button 
                      onClick={() => { setStep("login"); setOtp(""); setError(""); setShowAlert(false); }}
                      className="text-xs text-blue-600 font-semibold hover:underline mt-2 inline-block transition-colors"
                    >
                      Modify Email Address
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Secure Code Input</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <KeyRound className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="000000"
                        className="block w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-300 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-center tracking-[0.5em] font-bold text-lg shadow-sm"
                        value={otp}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          setOtp(val);
                          setError(""); 
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && verifyOtp()}
                        autoFocus
                      />
                    </div>
                  </div>

                  <button
                    onClick={verifyOtp}
                    disabled={otp.length !== 6}
                    className="w-full flex items-center justify-center py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm border border-blue-700 disabled:opacity-50 disabled:pointer-events-none disabled:bg-slate-300 disabled:border-slate-300"
                  >
                    Authenticate Session
                  </button>

                  <div className="text-center pt-2">
                    {timer > 0 ? (
                      <p className="text-xs font-semibold text-slate-500 flex items-center justify-center gap-1.5">
                        <RefreshCcw className="w-3.5 h-3.5 animate-spin text-slate-400" />
                        Code expires in <span className="text-slate-700">{timer}s</span>
                      </p>
                    ) : (
                      <button
                        onClick={sendOtp}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Request New Code
                      </button>
                    )}
                  </div>
                </motion.div>
             )}
          </AnimatePresence>

          {/* Social Divider */}
          <div className="mt-8 mb-6 flex items-center justify-center relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">SSO Providers</span>
            </div>
          </div>

          <div className="space-y-3">
            {/* Google */}
            <div className="relative flex justify-center overflow-hidden rounded-lg border border-slate-300 bg-white hover:bg-slate-50 transition-colors [&>div]:w-full [&>div>div]:!w-full [&>div>div]:!h-[40px] shadow-sm">
                <div className="opacity-0 absolute inset-0 z-10 w-full">
                   <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={() => alert("Error")}
                      shape="rectangular"
                      size="large"
                      width="100%"
                    />
                </div>
                <div className="w-full h-[40px] flex items-center justify-center gap-2 font-semibold text-slate-700 text-sm pointer-events-none">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    <path fill="none" d="M1 1h22v22H1z" />
                  </svg>
                  Sign in with Google
                </div>
            </div>

            {/* Apple */}
            <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-300 bg-white font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm text-sm">
              <svg className="w-4 h-4 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.82 3.59-.87 1.48-.05 2.75.64 3.48 1.7-3.01 1.73-2.52 5.86.34 6.96-.65 1.59-1.57 3.33-2.49 4.38zm-1.87-14.73c.7-1.02.93-2.14.74-3.3-1.06.07-2.31.76-3.06 1.7-.63.78-.96 1.88-.73 3 1.12.13 2.37-.41 3.05-1.4z" />
              </svg>
              Sign in with Apple
            </button>
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
