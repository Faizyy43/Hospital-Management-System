import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarCheck, ArrowRight, Building, Lock } from "lucide-react";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Hero />

      {/* Features Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-blue-600 font-bold tracking-widest uppercase text-[11px] mb-2">Core Platform</h2>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">Enterprise Healthcare Infrastructure</h3>
            <p className="text-base text-slate-500 leading-relaxed">
              Experience a unified digital platform where booking, managing, and tracking your medical journey is completely structured and frictionless.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Building className="w-5 h-5 text-blue-600" />}
              bg="bg-blue-50 border-blue-100"
              title="Verified Network"
              desc="Access a vast directory of certified, premium healthcare facilities equipped with modern clinical technology."
            />
            <FeatureCard
              icon={<CalendarCheck className="w-5 h-5 text-indigo-600" />}
              bg="bg-indigo-50 border-indigo-100"
              title="Instant Scheduling"
              desc="Bypass the waiting rooms. Request, reschedule, or manage your outpatient appointments digitally."
            />
            <FeatureCard
              icon={<Lock className="w-5 h-5 text-emerald-600" />}
              bg="bg-emerald-50 border-emerald-100"
              title="Secure Records"
              desc="Your clinical history, prescriptions, and diagnostics are encrypted and stored safely for 24/7 access."
            />
          </div>
        </div>
      </section>

      {/* Action Banner */}
      <section className="py-20 mt-auto">
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl shadow-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between p-8 md:p-12">

            {/* Minimalist Graphic Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10 max-w-xl text-center md:text-left mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">Ready to digitize your healthcare?</h2>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Join thousands of patients and leading providers leveraging our smart clinical infrastructure today. Registration is secure and instantly accessible.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <Link
                to="/hospitals"
                className="w-full sm:w-auto bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 px-6 py-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center text-center shadow-sm"
              >
                Browse Network
              </Link>
              <Link
                to="/register"
                className="w-full sm:w-auto bg-blue-600 border border-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 text-center shadow-sm"
              >
                Create Account
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
}

function FeatureCard({ icon, bg, title, desc }) {
  return (
    <div className="p-6 md:p-8 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 flex flex-col h-full group">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center border mb-6 ${bg}`}>
        {icon}
      </div>
      <h4 className="text-lg font-bold text-slate-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed flex-1">{desc}</p>
    </div>
  );
}
