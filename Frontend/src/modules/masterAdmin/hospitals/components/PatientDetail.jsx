import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, User, Phone, Mail, MapPin, Activity, Droplets, HeartPulse, Stethoscope, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // High Fidelity Professional Dummy Data
  const data = {
    id: id || "P-4921",
    fullName: "John Doe",
    gender: "Male",
    dob: "1985-06-15",
    age: 39,
    mobile: "+1 (555) 123-4567",
    email: "john.doe@example.com",
    bloodGroup: "O+",
    insurance: { provider: "BlueCross BlueShield", policy: "POL-123456-89" },
    emergencyContact: { name: "Jane Doe", relation: "Spouse", phone: "+1 (555) 987-6543" },
    address: { full: "456 Oak Lane, Apt 4B", city: "New York", state: "NY", pin: "10001" },
    appointments: [
      { id: "A-1", date: "Mar 12, 2024", time: "10:00 AM", status: "Completed", doctor: "Dr. Alan Grant", complaint: "Severe Migraine", department: "Neurology" },
      { id: "A-2", date: "Mar 20, 2024", time: "02:30 PM", status: "Upcoming", doctor: "Dr. Ellie Sattler", complaint: "Routine Checkup", department: "General Medicine" }
    ]
  };

  return (
    <div className="p-6 md:p-8 max-w-[1200px] mx-auto min-h-screen bg-slate-50/50">
      
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 mb-6 transition-colors">
         <ChevronLeft className="w-4 h-4" /> Back to Patient List
      </button>

      {/* Main Profile Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-sky-100 flex items-center justify-center border-4 border-sky-50 shadow-sm shrink-0">
             <User className="w-10 h-10 text-sky-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{data.fullName}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-1.5 text-sm font-medium text-slate-500">
               <span>PID: {data.id}</span>
               <span>•</span>
               <span>{data.gender}, {data.age} yrs</span>
               <span>•</span>
               <span>DOB: {data.dob}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Info Cards */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm tracking-wide mb-4 flex items-center gap-2 border-b border-slate-100 pb-2"><Phone className="w-4 h-4 text-sky-500"/> Contact Info</h3>
             <div className="space-y-4">
               <div>
                 <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-0.5">Mobile</p>
                 <p className="text-sm font-medium text-slate-700">{data.mobile}</p>
               </div>
               <div>
                 <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-0.5">Email</p>
                 <p className="text-sm font-medium text-slate-700 flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-slate-400"/>{data.email}</p>
               </div>
               <div>
                 <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-0.5 mt-2">Emergency Contact</p>
                 <div className="bg-rose-50 p-3 rounded-xl border border-rose-100/50 mt-1.5">
                   <p className="text-sm border-b border-rose-100 pb-1 mb-1 font-semibold text-rose-800">{data.emergencyContact.name} ({data.emergencyContact.relation})</p>
                   <p className="text-sm font-medium text-rose-700">{data.emergencyContact.phone}</p>
                 </div>
               </div>
             </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm tracking-wide mb-4 flex items-center gap-2 border-b border-slate-100 pb-2"><Activity className="w-4 h-4 text-sky-500"/> Medical & Insurance</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><Droplets className="w-3 h-3 text-red-400"/> Blood</p>
                <div className="text-lg font-bold text-slate-800 bg-slate-50 inline-block px-3 py-1 rounded-lg border border-slate-200">{data.bloodGroup}</div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Vitals</p>
                 <div className="text-sm font-semibold text-slate-700 bg-emerald-50 inline-block px-3 py-1.5 rounded-lg border border-emerald-100 text-emerald-700 w-full flex justify-between items-center"><HeartPulse className="w-4 h-4"/> Stable</div>
              </div>
              <div className="col-span-2 mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-0.5">Insurance Provider</p>
                <p className="text-sm font-bold text-slate-800">{data.insurance.provider}</p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Policy: {data.insurance.policy}</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm tracking-wide mb-4 flex items-center gap-2 border-b border-slate-100 pb-2"><MapPin className="w-4 h-4 text-sky-500"/> Residential Address</h3>
             <div className="space-y-1 text-sm font-medium text-slate-600">
               <p className="text-slate-800">{data.address.full}</p>
               <p>{data.address.city}, {data.address.state}</p>
               <p className="text-slate-400 font-semibold mt-1">ZIP: {data.address.pin}</p>
             </div>
          </motion.div>
        </div>

        {/* Right Column: Appointments & History */}
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
               <div>
                  <h3 className="font-bold text-slate-800 text-base flex items-center gap-2"><Calendar className="w-5 h-5 text-sky-500" /> Patient History & Appointments</h3>
                  <p className="text-xs font-medium text-slate-500 mt-1">Recent hospital visits and scheduled checks.</p>
               </div>
            </div>
            
            <div className="flex-1 p-6">
              <div className="space-y-4">
                {data.appointments.map(a => (
                  <div key={a.id} className="p-5 border border-slate-100 rounded-xl hover:shadow-md transition-shadow bg-white flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                    
                    <div className="flex items-start gap-4">
                      <div className={`mt-0.5 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${a.status === 'Completed' ? 'bg-slate-50 border-slate-200 text-slate-400' : 'bg-sky-50 border-sky-100 text-sky-600'}`}>
                         <Stethoscope className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{a.complaint}</h4>
                        <p className="text-xs font-semibold text-slate-500 mt-1 border-l-2 border-slate-200 pl-2">
                          <span className="text-sky-600">{a.doctor}</span> • {a.department}
                        </p>
                        <p className="text-xs font-medium text-slate-400 mt-1 flex items-center gap-1.5"><Calendar className="w-3 h-3"/> {a.date} at {a.time}</p>
                      </div>
                    </div>

                    <div>
                      <span className={`px-3-5 py-1.5 rounded-full text-xs font-bold tracking-wide border flex items-center justify-center ${
                         a.status === "Completed" ? "bg-slate-50 text-slate-600 border-slate-200" : "bg-amber-50 text-amber-700 border-amber-100"
                      }`}>
                        {a.status}
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default PatientDetail;