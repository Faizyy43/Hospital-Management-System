import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, MapPin, Phone, Mail, Globe, Activity, ShieldCheck, Clock, FileText, CheckCircle2, Building2, Users, Stethoscope, CalendarDays, LayoutGrid, BadgePlus } from "lucide-react";
import { motion } from "framer-motion";

import { getHospitalById } from "../hospitalDirectoryService";
import { mergeHospitalAdminSnapshot } from "../hospitalStorageBridge";

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

const toTitleCase = (value) =>
  value
    ? value.charAt(0).toUpperCase() + value.slice(1)
    : "N/A";

const InfoRow = ({ icon: Icon, value, className = "text-slate-600" }) => (
  <div className={`flex items-center gap-3 text-sm ${className}`}>
    <Icon className="w-4 h-4 text-slate-400" />
    <span>{value || "Not provided"}</span>
  </div>
);

const EmptyPanel = ({ title, description }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
    <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
    <h3 className="text-lg font-bold text-slate-800">{title}</h3>
    <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">{description}</p>
  </motion.div>
);

const InfoCard = ({ title, icon: Icon, children, className = "" }) => (
  <div className={`bg-white p-5 rounded-2xl border border-slate-200 shadow-sm ${className}`}>
    <div className="flex items-center gap-2 mb-2 pb-3 border-b border-slate-50">
      <Icon className="w-4 h-4 text-sky-500" />
      <h3 className="font-bold text-slate-800 text-sm tracking-wide">{title}</h3>
    </div>
    {children}
  </div>
);

const HospitalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview");
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadHospital = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getHospitalById(id);

        if (isMounted) {
          setHospital(mergeHospitalAdminSnapshot(response));
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.response?.data?.message || "Unable to load hospital details.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadHospital();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const data = useMemo(() => {
    if (!hospital) return null;

    return {
      id: hospital._id,
      name: hospital.name || "Unnamed Hospital",
      type: hospital.type || "General Facility",
      registrationNumber: hospital._id?.slice(-6)?.toUpperCase() || "N/A",
      status: toTitleCase(hospital.status),
      specialities: hospital.specialities || [],
      contact: {
        phone: hospital.phone || "Not provided",
        email: hospital.email || "Not provided",
        website: hospital.website || "Not provided",
      },
      address: {
        full: hospital.address || "Not provided",
        pin: hospital.pin || "Not provided",
        gps: hospital.gps || "Not provided",
      },
      bedCapacity: hospital.bedCapacity || null,
      insurance: hospital.insurance || [],
      accreditations: hospital.accreditations || [],
      patients: hospital.patients || [],
      doctors: hospital.doctors || [],
      appointments: hospital.appointments || [],
      staff: hospital.staff || [],
      opdCategories: hospital.opdCategories || [],
      requests: hospital.requests || [],
      auditLogs: hospital.auditLogs || [],
      joined: hospital.createdAt,
      counts: {
        patients: hospital.patientCount || (hospital.patients || []).length,
        doctors: hospital.doctorCount || (hospital.doctors || []).length,
        staff: hospital.staffCount || (hospital.staff || []).length,
        appointments: hospital.appointmentCount || (hospital.appointments || []).length,
        opdCategories: hospital.opdCount || (hospital.opdCategories || []).length,
      },
    };
  }, [hospital]);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "patients", label: "Patient Logs" },
    { id: "doctors", label: "Doctors" },
    { id: "appointments", label: "Appointments" },
    { id: "staff", label: "Facility Staff" },
    { id: "opd", label: "OPD Categories" },
    { id: "audit", label: "Audit & Compliance" },
    { id: "requests", label: "Admin Requests" },
  ];

  if (loading) {
    return (
      <div className="p-6 md:p-8 max-w-[1600px] mx-auto min-h-screen bg-slate-50/50">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-sm font-medium text-slate-600">
          Loading hospital details...
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6 md:p-8 max-w-[1600px] mx-auto min-h-screen bg-slate-50/50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Directory
        </button>
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl shadow-sm">
          {error || "Hospital not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto min-h-screen bg-slate-50/50">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Directory
      </button>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8"
      >
        <div className="flex gap-5 items-center">
          <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0">
            <Activity className="w-8 h-8 text-sky-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{data.name}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-1.5 text-sm text-slate-500">
              <span className="font-semibold text-slate-700">{data.type}</span>
              <span>-</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> {data.registrationNumber}
              </span>
            </div>
            <div className="flex gap-2 mt-3 flex-wrap">
              {data.specialities.length > 0 ? (
                data.specialities.map((speciality, index) => (
                  <span key={index} className="bg-sky-50 border border-sky-100 text-sky-700 px-2.5 py-1 text-xs font-semibold rounded-md">
                    {speciality}
                  </span>
                ))
              ) : (
                <span className="bg-slate-100 border border-slate-200 text-slate-500 px-2.5 py-1 text-xs font-semibold rounded-md">
                  No specialities added
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 border ${
            data.status === "Approved" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-amber-50 text-amber-700 border-amber-100"
          }`}>
            {data.status === "Approved" && <CheckCircle2 className="w-3.5 h-3.5" />}
            {data.status}
          </span>
          <p className="text-xs text-slate-400 font-medium">Joined {formatDate(data.joined)}</p>
        </div>
      </motion.div>

      <div className="flex gap-1 overflow-x-auto border-b border-slate-200 mb-6 custom-scrollbar pb-1">
        {tabs.map((currentTab) => (
          <button
            key={currentTab.id}
            onClick={() => setTab(currentTab.id)}
            className={`px-4 py-2.5 text-sm font-semibold rounded-t-xl transition-colors whitespace-nowrap ${
              tab === currentTab.id
                ? "bg-white text-sky-600 border-t border-l border-r border-slate-200 relative top-[1px]"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
            }`}
          >
            {currentTab.label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <InfoCard title="Live Facility Summary" icon={Activity} className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3 mt-4">
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 flex items-center gap-2"><Users className="w-4 h-4" /> Patients</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{data.counts.patients}</p>
              </div>
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 flex items-center gap-2"><Stethoscope className="w-4 h-4" /> Doctors</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{data.counts.doctors}</p>
              </div>
              <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-600 flex items-center gap-2"><Building2 className="w-4 h-4" /> Staff</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{data.counts.staff}</p>
              </div>
              <div className="rounded-xl border border-sky-100 bg-sky-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-sky-600 flex items-center gap-2"><CalendarDays className="w-4 h-4" /> Appointments</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{data.counts.appointments}</p>
              </div>
              <div className="rounded-xl border border-rose-100 bg-rose-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-rose-600 flex items-center gap-2"><LayoutGrid className="w-4 h-4" /> OPD</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{data.counts.opdCategories}</p>
              </div>
            </div>
          </InfoCard>

          <InfoCard title="Contact Directives" icon={Phone}>
            <div className="space-y-3 mt-4">
              <InfoRow icon={Phone} value={data.contact.phone} />
              <InfoRow icon={Mail} value={data.contact.email} />
              <InfoRow icon={Globe} value={data.contact.website} className={data.contact.website === "Not provided" ? "text-slate-600" : "text-sky-600 font-medium"} />
            </div>
          </InfoCard>

          <InfoCard title="Physical Address" icon={MapPin}>
            <div className="space-y-2 mt-4 text-sm text-slate-600">
              <p className="font-medium text-slate-800">{data.address.full}</p>
              <p>PIN Code: <span className="font-semibold">{data.address.pin}</span></p>
              <p className="text-xs bg-slate-100 px-2 py-1 rounded inline-block mt-2">GPS: {data.address.gps}</p>
            </div>
          </InfoCard>

          <InfoCard title="Capacity & Operations" icon={Activity}>
            {data.bedCapacity ? (
              <div className="space-y-2 mt-4 text-sm text-slate-600">
                <p className="flex justify-between border-b border-slate-50 pb-2"><span>General Beds</span> <span className="font-semibold text-slate-900">{data.bedCapacity.general || 0}</span></p>
                <p className="flex justify-between border-b border-slate-50 pb-2"><span>ICU Units</span> <span className="font-semibold text-slate-900">{data.bedCapacity.icu || 0}</span></p>
                <p className="flex justify-between pb-1"><span>Emergency</span> <span className="font-semibold text-amber-600">{data.bedCapacity.emergency || 0}</span></p>
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-500">No capacity data available.</p>
            )}
          </InfoCard>

          <InfoCard title="Insurance Providers" icon={FileText} className="md:col-span-2">
            {data.insurance.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-4">
                {data.insurance.map((insurance, index) => (
                  <span key={index} className="bg-slate-100 text-slate-700 px-3 py-1.5 text-sm font-medium rounded-lg border border-slate-200">
                    {insurance}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-500">No insurance providers added.</p>
            )}
          </InfoCard>

          <InfoCard title="Accreditations" icon={ShieldCheck}>
            {data.accreditations.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1 mt-4 text-sm font-medium text-emerald-700">
                {data.accreditations.map((accreditation, index) => <li key={index}>{accreditation}</li>)}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-slate-500">No accreditations available.</p>
            )}
          </InfoCard>
        </motion.div>
      )}

      {tab === "patients" && (
        data.patients.length > 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-800">Master Patient Index</h3>
              <p className="text-xs text-slate-500">Authorized administrative view only</p>
            </div>
            <div className="divide-y divide-slate-100">
              {data.patients.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => navigate(`/admin/patients/${patient.id}`)}
                  className="p-4 hover:bg-slate-50 cursor-pointer flex justify-between items-center transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
                      {patient.name?.charAt(0) || "P"}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-900 group-hover:text-blue-600">{patient.name}</h4>
                      <p className="text-xs text-slate-500">ID: {String(patient.id || patient._id || "N/A").toUpperCase()} - Age: {patient.age || "N/A"}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold bg-amber-50 text-amber-700 px-2.5 py-1 flex items-center rounded border border-amber-100">
                      {patient.disease || patient.issue || "No issue added"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <EmptyPanel title="No patient data" description="This hospital has no patient records uploaded yet." />
        )
      )}

      {tab === "doctors" && (
        data.doctors.length > 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-800">Doctor Directory</h3>
              <p className="text-xs text-slate-500">Licensed doctors available in this facility</p>
            </div>
            <div className="divide-y divide-slate-100">
              {data.doctors.map((doctor, index) => (
                <div key={doctor.id || doctor._id || index} className="p-4 flex justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">
                      {(doctor.name || "D").replace("Dr. ", "").charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-900">{doctor.name || "Doctor"}</h4>
                      <p className="text-xs text-slate-500">{doctor.speciality || doctor.specialization || "General Practice"}</p>
                    </div>
                  </div>
                  <div className="text-right text-xs text-slate-500">
                    <p>{doctor.experience || 0} years</p>
                    <p>{doctor.schedule?.days?.join(", ") || "Schedule not set"}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <EmptyPanel title="No doctor data" description="This hospital has no doctor directory uploaded yet." />
        )
      )}

      {tab === "appointments" && (
        data.appointments.length > 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-800">Appointment Schedule</h3>
              <p className="text-xs text-slate-500">Recent bookings and visit schedule</p>
            </div>
            <div className="divide-y divide-slate-100">
              {data.appointments.map((appointment, index) => (
                <div key={appointment.id || appointment._id || index} className="p-4 flex justify-between items-center gap-4">
                  <div>
                    <p className="font-semibold text-sm text-slate-900">{appointment.patient || appointment.patientName || "Walk-in Patient"}</p>
                    <p className="text-xs text-slate-500">{appointment.doctorName || appointment.doctor || "Doctor not assigned"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-slate-700">{appointment.day || appointment.date || "Date not set"}</p>
                    <p className="text-xs text-slate-500">{appointment.slot || appointment.time || "Time not set"}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <EmptyPanel title="No appointment data" description="No appointment records are available for this hospital yet." />
        )
      )}

      {tab === "staff" && (
        data.staff.length > 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-800">Facility Staff</h3>
              <p className="text-xs text-slate-500">Administrative and care support team</p>
            </div>
            <div className="divide-y divide-slate-100">
              {data.staff.map((member, index) => (
                <div key={member.id || member._id || index} className="p-4 flex justify-between items-center gap-4">
                  <div>
                    <p className="font-semibold text-sm text-slate-900">{member.name || "Staff Member"}</p>
                    <p className="text-xs text-slate-500">{member.role || "Staff"} {member.department ? `- ${member.department}` : ""}</p>
                  </div>
                  <div className="text-right text-xs text-slate-500">
                    <p>{member.shift || "Shift not set"}</p>
                    <p>{member.accessLevel || member.dept || "Standard access"}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <EmptyPanel title="No staff data" description="This hospital has not uploaded staff details yet." />
        )
      )}

      {tab === "opd" && (
        data.opdCategories.length > 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="mb-4">
              <h3 className="font-bold text-slate-800">OPD Categories</h3>
              <p className="text-xs text-slate-500">Departments configured by the hospital admin</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.opdCategories.map((category, index) => (
                <span key={`${category}-${index}`} className="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-700">
                  <BadgePlus className="w-3.5 h-3.5" />
                  {category}
                </span>
              ))}
            </div>
          </motion.div>
        ) : (
          <EmptyPanel title="No OPD data" description="This hospital has not added OPD categories yet." />
        )
      )}

      {tab === "audit" && (
        data.auditLogs.length > 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-800">Audit Timeline</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {data.auditLogs.map((log, index) => (
                <div key={index} className="p-4">
                  <p className="font-semibold text-slate-800">{log.action}</p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1"><Clock className="w-3 h-3" /> {formatDate(log.date)}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <EmptyPanel title="No audit data" description="No compliance or audit records are available for this hospital yet." />
        )
      )}

      {tab === "requests" && (
        data.requests.length > 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-800">Admin Requests</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {data.requests.map((request, index) => (
                <div key={request.id || index} className="p-4">
                  <p className="font-semibold text-slate-800">{request.type || "Request"}</p>
                  <p className="text-xs text-slate-500 mt-1">{request.status || "Pending"}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <EmptyPanel title="No admin requests" description="There are no admin-side requests recorded for this hospital." />
        )
      )}
    </div>
  );
};

export default HospitalDetail;
