import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Building2,
  ChevronRight,
  Clock,
  FileCheck,
  Stethoscope,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import { getDashboardAnalytics } from "../../../../services/dashboardService";

const EMPTY_DASHBOARD = {
  metrics: {
    totalHospitals: 0,
    approvedHospitals: 0,
    totalPatients: 0,
    pendingRequests: 0,
    alertCount: 0,
  },
  recentHospitals: [],
  pendingApprovals: [],
  errorMessage: "",
};

const formatNumber = (value) => new Intl.NumberFormat("en-US").format(value);
const isHealthyStatus = (status) => ["approved", "active"].includes(String(status).toLowerCase());
const MotionDiv = motion.div;

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(EMPTY_DASHBOARD);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      try {
        setLoading(true);
        const response = await getDashboardAnalytics();

        if (isMounted) {
          setDashboard(response);
        }
      } catch (error) {
        if (isMounted) {
          setDashboard({
            ...EMPTY_DASHBOARD,
            errorMessage:
              error?.response?.data?.message || error?.message || "Unable to load dashboard data.",
          });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const stats = useMemo(
    () => [
      {
        title: "Total Hospitals",
        value: loading ? "--" : formatNumber(dashboard.metrics.totalHospitals),
        icon: Building2,
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-100",
        trend: loading ? "Loading" : `${dashboard.metrics.approvedHospitals} approved`,
      },
      {
        title: "Active Patients",
        value: loading ? "--" : formatNumber(dashboard.metrics.totalPatients),
        icon: Users,
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        border: "border-indigo-100",
        trend: loading ? "Loading" : "Live network",
      },
      {
        title: "Pending Requests",
        value: loading ? "--" : formatNumber(dashboard.metrics.pendingRequests),
        icon: FileCheck,
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-100",
        trend:
          loading
            ? "Loading"
            : dashboard.metrics.pendingRequests === 0
              ? "Clear"
              : "Action Req",
      },
      {
        title: "System Alerts",
        value: loading ? "--" : formatNumber(dashboard.metrics.alertCount),
        icon: AlertCircle,
        color: dashboard.metrics.alertCount > 0 ? "text-rose-600" : "text-emerald-600",
        bg: dashboard.metrics.alertCount > 0 ? "bg-rose-50" : "bg-emerald-50",
        border: dashboard.metrics.alertCount > 0 ? "border-rose-100" : "border-emerald-100",
        trend:
          loading
            ? "Loading"
            : dashboard.metrics.alertCount === 0
              ? "Healthy"
              : "Needs Review",
      },
    ],
    [dashboard.metrics, loading],
  );

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-[1600px] mx-auto min-h-screen bg-white">
      <MotionDiv
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 md:mb-8"
      >
        <Link to="/" className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          Master Platform Overview
        </Link>
        <p className="text-slate-500 text-xs md:text-sm mt-1">
          Real-time metrics and network management
        </p>
      </MotionDiv>

      {/* {dashboard.errorMessage && (
        <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {dashboard.errorMessage}
        </div>
      )} */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-6 md:mb-8">
        {stats.map((stat, index) => (
          <MotionDiv
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 sm:p-5 rounded-2xl border ${stat.border} bg-white shadow-sm hover:shadow-md transition-all group`}
          >
            <div className="flex justify-between items-start">
              <div
                className={`p-2.5 sm:p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}
              >
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                {stat.trend}
              </span>
            </div>
            <div className="mt-3 sm:mt-4">
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">{stat.title}</p>
            </div>
          </MotionDiv>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
        >
          <div className="p-4 sm:p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">Hospital Network</h2>
              <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">
                Recently updated facilities
              </p>
            </div>
            <button
              onClick={() => navigate("/admin/hospitals")}
              className="text-[10px] sm:text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors"
            >
              View Directory
            </button>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-white border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400">
                  <th className="p-4 font-semibold w-[45%]">Facility Name</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Patients</th>
                  <th className="p-4 font-semibold text-right">Doctors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading && (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-500 bg-slate-50/50">
                      <p className="font-medium text-slate-800">Loading hospitals...</p>
                    </td>
                  </tr>
                )}

                {!loading &&
                  dashboard.recentHospitals.map((hospital) => (
                    <tr
                      key={hospital.id}
                      onClick={() => navigate(`/admin/hospitals/${hospital.id}`)}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                    >
                      <td className="p-4 text-sm font-medium text-slate-800">
                        <span className="group-hover:text-blue-600 transition-colors">
                          {hospital.name}
                        </span>
                        <span className="block text-xs font-normal text-slate-500 mt-0.5">
                          {hospital.location}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                            isHealthyStatus(hospital.rawStatus)
                              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                              : "bg-amber-50 text-amber-700 border-amber-100"
                          }`}
                        >
                          {isHealthyStatus(hospital.rawStatus) && (
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                          )}
                          {hospital.status}
                        </span>
                      </td>
                      <td className="p-4 text-right text-sm text-slate-600 font-medium">
                        {formatNumber(hospital.patients)}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1 text-sm font-semibold text-slate-700">
                          <Stethoscope className="w-3.5 h-3.5 text-slate-400" />
                          {formatNumber(hospital.doctors)}
                        </div>
                      </td>
                    </tr>
                  ))}

                {!loading && dashboard.recentHospitals.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-500 bg-slate-50/50">
                      <Building2 className="w-10 h-10 mx-auto text-slate-300 mb-3" />
                      <p className="font-medium text-slate-800">No hospitals found.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
        >
          <div className="p-4 sm:p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">Pending Actions</h2>
              <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">
                Requires admin review
              </p>
            </div>
            <button
              onClick={() => navigate("/admin/requests")}
              className="text-[10px] sm:text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors"
            >
              View All
            </button>
          </div>
          <div className="flex-1 p-4 sm:p-5 space-y-3 sm:space-y-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 py-6">
                <Clock className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm font-medium">Loading requests...</p>
              </div>
            ) : dashboard.pendingApprovals.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 py-6">
                <FileCheck className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm font-medium">All caught up!</p>
              </div>
            ) : (
              dashboard.pendingApprovals.map((request) => (
                <div
                  key={request.id}
                  onClick={() => navigate(`/admin/requests/${request.id}`)}
                  className="p-3 sm:p-4 border border-slate-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-xs sm:text-sm text-slate-800">
                      {request.type}
                    </h3>
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                      <Clock className="w-3 h-3" /> {request.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">
                    <span className="font-semibold">{request.hospital}</span> has submitted a
                    request.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded border border-amber-100">
                      {request.status}
                    </span>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        navigate(`/admin/requests/${request.id}`);
                      }}
                      className="w-7 h-7 rounded bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};

export default Dashboard;
