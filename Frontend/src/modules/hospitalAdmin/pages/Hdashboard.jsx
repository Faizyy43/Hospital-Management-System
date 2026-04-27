import { useEffect, useMemo, useState } from "react";
import { Users, Calendar, Stethoscope, BriefcaseMedical, LayoutGrid, Clock, ArrowUpRight } from "lucide-react";
import PageHeader from "../../../Layout/PageHeader";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { hydrateHospitalStorage, initializeHospitalStorage, readHospitalStorage } from "../utils/storage";
import { getCurrentHospital } from "../services/currentHospitalService";
import { syncHospitalSnapshot } from "../services/hospitalSnapshotService";

const getTodayLabel = () =>
  new Date().toLocaleDateString("en-US", {
    weekday: "short",
  });

const formatPatientTimeline = (value) => {
  if (!value) {
    return "Recently added";
  }

  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const Hdashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    doctors: [],
    staff: [],
    patients: [],
    appointments: [],
    opdCategories: [],
  });

  useEffect(() => {
    let isMounted = true;

    const loadDashboardData = async () => {
      initializeHospitalStorage();

      try {
        const hospital = await getCurrentHospital();
        hydrateHospitalStorage(hospital);

        if (isMounted) {
          setDashboardData({
            doctors: hospital.doctors || [],
            staff: hospital.staff || [],
            patients: hospital.patients || [],
            appointments: hospital.appointments || [],
            opdCategories: hospital.opdCategories || [],
          });
        }
      } catch {
        if (isMounted) {
          setDashboardData({
            doctors: readHospitalStorage("doctors"),
            staff: readHospitalStorage("staff"),
            patients: readHospitalStorage("patients"),
            appointments: readHospitalStorage("appointments"),
            opdCategories: readHospitalStorage("opdCategories"),
          });
        }
      } finally {
        syncHospitalSnapshot().catch(() => {});
      }
    };

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  const todayLabel = getTodayLabel();

  const stats = useMemo(
    () => [
      { title: "Total Patients", value: String(dashboardData.patients.length), icon: Users, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", trend: "Live" },
      { title: "Today's Appointments", value: String(dashboardData.appointments.filter((appointment) => appointment.day === todayLabel).length), icon: Calendar, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100", trend: "Live" },
      { title: "Doctors Available", value: String(dashboardData.doctors.length), icon: Stethoscope, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", trend: "Live" },
      { title: "Staff Members", value: String(dashboardData.staff.length), icon: BriefcaseMedical, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", trend: "Live" },
      { title: "OPD Categories", value: String(dashboardData.opdCategories.length), icon: LayoutGrid, color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100", trend: "Live" },
    ],
    [dashboardData, todayLabel],
  );

  const patients = useMemo(
    () =>
      [...dashboardData.patients]
        .reverse()
        .slice(0, 5)
        .map((patient) => ({
          ...patient,
          status: patient.status || "Registered",
          date: formatPatientTimeline(patient.createdAt),
        })),
    [dashboardData.patients],
  );

  const recentDoctors = useMemo(
    () =>
      dashboardData.doctors.slice(-5).reverse().map((doctor) => ({
        ...doctor,
        speciality: doctor.speciality || doctor.specialization || "General Practice",
        status: doctor.status || "Available",
      })),
    [dashboardData.doctors],
  );

  const upcomingAppointments = useMemo(
    () => dashboardData.appointments.slice(-5).reverse(),
    [dashboardData.appointments],
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "Admitted":
      case "In Surgery":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">{status}</span>;
      case "Discharged":
      case "Available":
      case "Registered":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">{status}</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">{status}</span>;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <PageHeader
          title="Admin Analytics"
          subtitle="Hospital operations overview and daily throughput"
        />
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => navigate("/hadmin/doctors")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors text-sm"
        >
          <Stethoscope className="w-4 h-4" /> Add Doctor
        </button>
        <button
          onClick={() => navigate("/hadmin/staff")}
          className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2 rounded-lg font-medium shadow-sm transition-colors text-sm"
        >
          <Users className="w-4 h-4" /> Add Staff
        </button>
        <button
          onClick={() => navigate("/hadmin/opd")}
          className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2 rounded-lg font-medium shadow-sm transition-colors text-sm"
        >
          <LayoutGrid className="w-4 h-4" /> Manage OPD
        </button>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-500 text-sm font-medium">{item.title}</p>
                  <h2 className="text-3xl font-bold text-slate-900 mt-2 tracking-tight">
                    {item.value}
                  </h2>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.bg} ${item.color} ${item.border} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-sm">
                <span className={`flex items-center gap-0.5 font-semibold ${item.trend === "Live" ? "text-emerald-500" : "text-slate-500"}`}>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  {item.trend}
                </span>
                <span className="text-slate-400">synced data</span>
              </div>
            </div>
          );
        })}
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">Staff Snapshot</h2>
            <button onClick={() => navigate("/hadmin/staff")} className="text-xs font-semibold text-blue-600 hover:text-blue-800">Manage</button>
          </div>
          <div className="p-5 flex flex-wrap gap-2">
            {dashboardData.staff.length === 0 ? (
              <p className="text-sm text-slate-500">No staff members added yet.</p>
            ) : (
              dashboardData.staff.slice(-8).reverse().map((member) => (
                <span key={member.id} className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  {member.name} - {member.role}
                </span>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden xl:col-span-2">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">OPD Categories</h2>
            <button onClick={() => navigate("/hadmin/opd")} className="text-xs font-semibold text-blue-600 hover:text-blue-800">Manage OPD</button>
          </div>
          <div className="p-5 flex flex-wrap gap-2">
            {dashboardData.opdCategories.length === 0 ? (
              <p className="text-sm text-slate-500">No OPD categories available.</p>
            ) : (
              dashboardData.opdCategories.map((category) => (
                <span key={category} className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                  {category}
                </span>
              ))
            )}
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" /> Upcoming Appointments
            </h2>
            <button onClick={() => navigate("/hadmin/happointments")} className="text-xs font-semibold text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <div className="flex-1 p-5 space-y-4">
            {upcomingAppointments.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 py-6">
                <Calendar className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm font-medium">No appointments booked yet</p>
              </div>
            ) : (
              upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{appointment.patient}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{appointment.doctorName} - {appointment.day}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                      <Clock className="w-3 h-3" /> {appointment.slot}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-slate-400" /> Medical Staff on Duty
            </h2>
            <button onClick={() => navigate("/hadmin/doctors")} className="text-xs font-semibold text-blue-600 hover:text-blue-800">Directory</button>
          </div>
          <div className="flex-1 p-5 space-y-4">
            {recentDoctors.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 py-6">
                <Stethoscope className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm font-medium">No doctors added yet</p>
              </div>
            ) : (
              recentDoctors.map((doctor) => (
                <div key={doctor.id} className="flex justify-between items-center p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      {doctor.name?.replace("Dr. ", "").charAt(0) || "D"}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{doctor.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{doctor.speciality}</p>
                    </div>
                  </div>
                  <div>{getStatusBadge(doctor.status)}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Recent Patients
          </h2>
          <button onClick={() => navigate("/hadmin/patients")} className="text-sm font-semibold text-blue-600 hover:text-blue-800">View Directory</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-xs uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">Patient Name</th>
                <th className="px-6 py-4">Timeline</th>
                <th className="px-6 py-4">Age</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center font-bold text-slate-700 text-xs">
                        {patient.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-800">{patient.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-3.5 h-3.5" /> {patient.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{patient.age} yrs</td>
                  <td className="px-6 py-4">{getStatusBadge(patient.status)}</td>
                </tr>
              ))}
              {patients.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    No patient records available yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Hdashboard;

