import React from "react";
import { Building } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto bg-white border-t border-slate-200 py-8">
      <div className="max-w-7xl mx-auto px-4 text-center flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-lg">
          <Building className="w-5 h-5 text-blue-600" /> HMS+
        </div>
        <p className="text-slate-400 font-medium text-[11px] uppercase tracking-widest">
          (c) {new Date().getFullYear()} HMS+ Healthcare Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
