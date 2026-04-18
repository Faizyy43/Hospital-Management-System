import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Building, Phone, Mail, MapPin, CheckCircle2, XCircle, FileText, Download, Activity } from "lucide-react";
import { motion } from "framer-motion";

const RequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // High Fidelity Professional Dummy Data
  const data = {
    id: id || "101",
    name: "Sunrise Medical Center",
    type: "Orthopedics",
    registrationNumber: "REG-2024-9981",
    contact: { phone: "+1 (555) 777-8888", email: "admin@sunrisemedical.com" },
    address: { full: "789 Pine Road", city: "Seattle", state: "WA", pin: "98101" },
    specialities: ["Joint Replacement", "Sports Medicine", "Physiotherapy", "Osteopathy"],
    status: "Pending Verification",
    submittedOn: "Oct 12, 2024",
    applicant: "Dr. A. Smith (Chief Surgeon)",
    documents: [
      { name: "Medical_License_2024.pdf", size: "2.4 MB" },
      { name: "Facility_Safety_Audit.pdf", size: "4.1 MB" },
      { name: "Tax_Registration.pdf", size: "1.2 MB" }
    ]
  };

  const handleApprove = () => {
    navigate("/admin/hospitals");
  };

  const handleReject = () => {
    const reason = prompt("Enter rejection reason for auditing purposes:");
    if (!reason) return;
    navigate("/admin/requests");
  };

  return (
    <div className="p-6 md:p-8 max-w-[1200px] mx-auto min-h-screen bg-slate-50/50">

      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 mb-6 transition-colors">
        <ChevronLeft className="w-4 h-4" /> Back to Inbox
      </button>

      {/* HEADER TRAY */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div className="flex gap-5 items-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
            <Building className="w-8 h-8 text-amber-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{data.name}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-1.5 text-sm font-medium text-slate-500">
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">{data.type}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><FileText className="w-4 h-4 text-slate-400" /> {data.registrationNumber}</span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-3">Submitted by {data.applicant} on {data.submittedOn}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={handleReject}
            className="flex-1 sm:flex-none flex justify-center items-center gap-2 bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-sm"
          >
            <XCircle className="w-5 h-5" /> Reject
          </button>
          <button
            onClick={handleApprove}
            className="flex-1 sm:flex-none flex justify-center items-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 px-6 py-2.5 rounded-xl font-semibold transition-colors shadow-sm"
          >
            <CheckCircle2 className="w-5 h-5" /> Approve Facility
          </button>
        </div>
      </motion.div>

      {/* DETAILS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* LEFT COLUMN */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm tracking-wide mb-4 flex items-center gap-2 border-b border-slate-100 pb-3"><Phone className="w-4 h-4 text-sky-500" /> Applicant Contact</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-0.5">Phone Network</p>
                <p className="text-sm font-medium text-slate-700">{data.contact.phone}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-0.5">Official Email</p>
                <p className="text-sm font-medium text-sky-600 flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-slate-400" />{data.contact.email}</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm tracking-wide mb-4 flex items-center gap-2 border-b border-slate-100 pb-3"><MapPin className="w-4 h-4 text-sky-500" /> Registered Address</h3>
            <div className="space-y-1 text-sm font-medium text-slate-600">
              <p className="font-semibold text-slate-800">{data.address.full}</p>
              <p>{data.address.city}, {data.address.state}</p>
              <p className="text-slate-400 font-semibold mt-2 bg-slate-50 p-2 rounded-lg inline-block border border-slate-100">PIN CODE: {data.address.pin}</p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm tracking-wide mb-4 flex items-center gap-2 border-b border-slate-100 pb-3"><Activity className="w-4 h-4 text-sky-500" /> Declared Specialities</h3>
            <div className="flex flex-wrap gap-2">
              {data.specialities.map((s, i) => (
                <span key={i} className="bg-sky-50 text-sky-700 border border-sky-100 px-3 py-1.5 rounded-lg text-sm font-semibold">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm tracking-wide mb-4 flex items-center gap-2 border-b border-slate-100 pb-3"><FileText className="w-4 h-4 text-sky-500" /> Verification Documents</h3>
            <p className="text-xs text-slate-500 font-medium mb-4">The following documents were uploaded by the applicant and require verification.</p>
            <div className="space-y-3">
              {data.documents.map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center border border-indigo-100 shrink-0 text-indigo-600">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{doc.name}</p>
                      <p className="text-xs text-slate-400 font-medium">{doc.size}</p>
                    </div>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-sky-600 transition-colors bg-white rounded-lg border border-slate-200 shadow-sm">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>

    </div>
  );
};

export default RequestDetails;