import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Mail, Lock, ArrowRight, Activity, Building, Users } from "lucide-react";
import { fakeUsers } from "../../../../data/fakeUsers";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Check against fake users
    const user = fakeUsers.find(
      (u) => u.email === email && u.password === password && u.role === "admin"
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/admin/dashboard");
    } else {
      setError("Invalid administrative credentials or insufficient permissions.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-sky-100/50 to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
           <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center">
              <ShieldCheck className="w-10 h-10 text-sky-600" />
           </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          System Core Portal
        </h2>
        <p className="mt-2 text-center text-sm font-medium text-slate-500">
          Master administrative access only
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          
          <form className="space-y-6" onSubmit={handleLogin}>
            
            {error && (
              <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-md flex items-start gap-3 text-sm text-rose-700 font-medium">
                 {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Administrative ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 flex:border-sky-500 text-sm font-medium text-slate-900 transition-all"
                  placeholder="admin@system.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Security Key
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 flex:border-sky-500 text-sm font-medium text-slate-900 transition-all font-mono"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-slate-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 cursor-pointer">
                  Remember session
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-semibold text-sky-600 hover:text-sky-500">
                  Forgot credentials?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-colors"
               >
                Authenticate & Login <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            {/* Quick Demo Credentials Footer */}
            <div className="mt-6 border-t border-slate-100 pt-6">
                <p className="text-xs text-center text-slate-500 font-medium mb-3">System Metrics Overview</p>
                <div className="flex items-center justify-center gap-4 text-slate-400">
                   <div className="flex flex-col items-center gap-1"><Building className="w-4 h-4"/> <span className="text-[10px]">120 Nodes</span></div>
                   <div className="flex flex-col items-center gap-1"><Users className="w-4 h-4"/> <span className="text-[10px]">4.5k Active</span></div>
                   <div className="flex flex-col items-center gap-1"><Activity className="w-4 h-4"/> <span className="text-[10px]">99.9% Uptime</span></div>
                </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;