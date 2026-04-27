import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Building, Inbox, Clock, ChevronRight, FileText } from "lucide-react";
import { motion } from "framer-motion";

import { getRequests } from "../approvalService";

const formatRequest = (request) => ({
  id: request._id,
  name: request.name,
  type: "Hospital Request",
  registrationNumber: request._id?.slice(-6)?.toUpperCase() || "N/A",
  status: request.status === "pending" ? "Pending Verification" : request.status,
  date: new Date(request.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }),
  applicant: request.adminId?.name || "Hospital Admin",
});

const RequestList = () => {
  const [search, setSearch] = useState("");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const loadRequests = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getRequests();
        if (isMounted) {
          setRequests(response.map(formatRequest));
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.response?.data?.message || "Unable to load registration requests.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadRequests();

    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = useMemo(
    () =>
      requests.filter((request) =>
        request.name.toLowerCase().includes(search.toLowerCase()) ||
        request.registrationNumber.toLowerCase().includes(search.toLowerCase()),
      ),
    [requests, search],
  );

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto min-h-screen bg-white">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Inbox className="w-6 h-6 text-sky-500" />
            Registration Requests
          </h1>
          <p className="text-slate-500 text-sm mt-1">Review and approve new facility onboarding applications.</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
      >
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by facility name or request id..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="text-sm font-medium text-slate-500 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {filtered.length} Pending
          </div>
        </div>

        {/* {error && (
          <div className="px-5 py-4 border-b border-red-100 bg-red-50 text-sm font-medium text-red-700">
            {error}
          </div>
        )} */}

        <div className="divide-y divide-slate-100">
          {loading && (
            <div className="py-12 text-center text-slate-500 bg-slate-50/50">
              <p className="font-medium text-slate-800">Loading requests...</p>
            </div>
          )}

          {!loading && filtered.map((request, index) => (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              key={request.id}
              onClick={() => navigate(`/admin/requests/${request.id}`)}
              className="p-5 hover:bg-slate-50/80 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-100/50 shrink-0 text-amber-600 group-hover:bg-sky-50 group-hover:text-sky-600 group-hover:border-sky-100 transition-colors">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{request.name}</h3>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 mt-1">
                    <span className="font-semibold text-slate-600">{request.type}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center gap-1 text-slate-500"><FileText className="w-3.5 h-3.5" /> {request.registrationNumber}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Applicant: {request.applicant}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-6 pl-16 sm:pl-0">
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100 block w-max ml-auto mb-1">
                    {request.status}
                  </span>
                  <span className="text-xs text-slate-400 font-medium flex items-center justify-end gap-1"><Clock className="w-3 h-3" /> {request.date}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors hidden sm:block" />
              </div>
            </motion.div>
          ))}

          {!loading && filtered.length === 0 && (
            <div className="py-12 text-center text-slate-500 bg-slate-50/50">
              <Inbox className="w-12 h-12 mx-auto text-slate-300 mb-3" />
              <p className="font-medium text-slate-800">Inbox is empty</p>
              <p className="text-sm mt-1">No pending requests found.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default RequestList;
