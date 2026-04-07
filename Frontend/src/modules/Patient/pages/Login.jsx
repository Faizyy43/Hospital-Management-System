import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fakeUsers } from "../../../data/fakeUsers";
import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";

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
    setAlertMsg("OTP sent successfully");
    setShowAlert(true);

    console.log("OTP:", newOtp);
  };

  // ✅ VERIFY OTP
  const verifyOtp = () => {
    // ❌ EMPTY OTP
    if (!otp) {
      setError("Please enter OTP");
      return;
    }

    // ❌ INVALID LENGTH
    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    // ❌ WRONG OTP
    if (otp !== generatedOtp) {
      setError("Invalid OTP");
      return;
    }

    // ✅ SUCCESS
    const user = fakeUsers.find((u) => u.email === email);

    localStorage.setItem("user", JSON.stringify(user));

    navigate(user.role === "patient" ? "/patient-dashboard" : "/hadmin");
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

    navigate("/patient-dashboard");
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-sky-100 to-blue-50">
      {/* LEFT SIDE */}
      <div className="hidden md:flex flex-1 items-center justify-center">
        <div className="text-center px-10">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">
            Hospital Management System
          </h1>
          <p className="text-gray-600">
            Smart healthcare solutions for patients and hospitals.
          </p>
          <div className="text-[120px] opacity-10 mt-10">🏥</div>
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex items-center justify-center w-full md:w-[500px] px-6">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-blue-100"
        >
          <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
            OTP Login
          </h2>

          {showAlert && (
            <div className="mb-5 flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-white shadow-lg animate-slideIn">
              {/* Icon */}
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 text-lg">
                ⚠
              </div>

              {/* Message */}
              <p className="text-sm font-medium text-gray-700 flex-1">
                {alertMsg}
              </p>

              {/* Close */}
              <button
                onClick={() => {
                  setShowAlert(false);
                  setEmail(""); // ✅ clear input
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          )}

          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

          {/* STEP 1 → EMAIL */}
          {step === "login" && (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                className={`input ${
                  showAlert ? "border-red-400 focus:border-red-500" : ""
                }`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setShowAlert(false); // keep this
                }}
              />

              <p className="text-xs text-gray-400 mt-2 pl-2">
                Enter your registered email to receive OTP
              </p>

              <button onClick={sendOtp} className="btn mt-4">
                Send OTP
              </button>
            </>
          )}

          {/* STEP 2 → OTP */}
          {step === "otp" && generatedOtp && (
            <>
              <p className="text-sm text-gray-500 mb-3">
                OTP sent to <span className="font-medium">{email}</span>
              </p>

              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                className="input text-center tracking-widest text-lg"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  setError(""); // clear error while typing
                }}
              />

              <button
                onClick={verifyOtp}
                disabled={!otp}
                className="btn mt-4 disabled:opacity-50"
              >
                Verify & Login
              </button>

              {/* Resend */}
              <div className="text-center mt-3 text-sm">
                {timer > 0 ? (
                  <span className="text-gray-400">Resend OTP in {timer}s</span>
                ) : (
                  <button
                    onClick={sendOtp}
                    className="text-blue-600 hover:underline"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </>
          )}

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google Login */}
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert("Error")}
          />

          {/* Apple */}
          <button className="w-full border mt-3 py-2 rounded-lg hover:bg-gray-50 transition">
            🍎 Continue with Apple
          </button>

          {/* Register */}
          <p className="text-center text-sm mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600">
              Register
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Tailwind helper */}
      <style>
        {`
  .input {
    width: 100%;
    padding: 12px;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    outline: none;
    transition: all 0.2s ease;
  }

  .input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37,99,235,0.15);
  }

  .btn {
    width: 100%;
    background: linear-gradient(to right, #2563eb, #1d4ed8);
    color: white;
    padding: 12px;
    border-radius: 10px;
    font-weight: 500;
    transition: 0.2s;
  }

  .btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 14px rgba(37,99,235,0.25);
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slideIn {
    animation: slideIn 0.25s ease-out;
  }
`}
      </style>
    </div>
  );
}
