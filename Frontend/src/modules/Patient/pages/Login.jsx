import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fakeUsers } from "../../../data/fakeUsers";
import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // kept (not used)
  const [step, setStep] = useState("login");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);

  const navigate = useNavigate();

  // 🔢 SEND OTP (MAIN LOGIN FLOW)
  const sendOtp = () => {
    setError("");

    const user = fakeUsers.find((u) => u.email === email);
    if (!user) return setError("User not found");

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setStep("otp");

    // ⏳ resend timer
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

    alert("OTP (demo): " + newOtp);
  };

  // ✅ VERIFY OTP
  const verifyOtp = () => {
    if (otp !== generatedOtp) {
      setError("Invalid OTP");
      return;
    }

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

          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

          {/* STEP 1 → EMAIL */}
          {step === "login" && (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button onClick={sendOtp} className="btn mt-4">
                Send OTP
              </button>
            </>
          )}

          {/* STEP 2 → OTP */}
          {step === "otp" && (
            <>
              <p className="text-sm text-gray-500 mb-3">
                OTP sent to <span className="font-medium">{email}</span>
              </p>

              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                className="input text-center tracking-widest text-lg"
                onChange={(e) => setOtp(e.target.value)}
              />

              <button onClick={verifyOtp} className="btn mt-4">
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
            border-radius: 8px;
            outline: none;
          }
          .input:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 2px rgba(37,99,235,0.2);
          }
          .btn {
            width: 100%;
            background: linear-gradient(to right, #2563eb, #1d4ed8);
            color: white;
            padding: 12px;
            border-radius: 8px;
            font-weight: 500;
          }
        `}
      </style>
    </div>
  );
}
