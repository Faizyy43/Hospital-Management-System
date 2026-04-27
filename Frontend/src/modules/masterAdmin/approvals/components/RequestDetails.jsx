import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Building, Phone, Mail, MapPin, CheckCircle2, XCircle, FileText, Activity } from "lucide-react";
import { motion } from "framer-motion";

import { approveRequest, getRequestById, rejectRequest } from "../approvalService";

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

const RequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadRequest = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getRequestById(id);

        if (!response) {
          throw new Error("Request not found");
        }

        if (isMounted) {
          setRequest(response);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.response?.data?.message || loadError.message || "Unable to load request details.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadRequest();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleApprove = async () => {
    try {
      setIsSubmitting(true);
      await approveRequest(id);
      navigate("/admin/hospitals");
    } catch (actionError) {
      setError(actionError.response?.data?.message || "Unable to approve request.");
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    try {
      setIsSubmitting(true);
      await rejectRequest(id);
      navigate("/admin/requests");
    } catch (actionError) {
      setError(actionError.response?.data?.message || "Unable to reject request.");
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 md:p-8 max-w-[1200px] mx-auto min-h-screen bg-slate-50/50">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-sm font-medium text-slate-600">
          Loading request details...
        </div>
      </div>
    );
  }

  if (error && !request) {
    return (
      <div className="p-6 md:p-8 max-w-[1200px] mx-auto min-h-screen bg-slate-50/50">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 mb-6 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Inbox
        </button>
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl shadow-sm">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-[1200px] mx-auto min-h-screen bg-slate-50/50">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 mb-6 transition-colors">
        <ChevronLeft className="w-4 h-4" /> Back to Inbox
      </button>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl shadow-sm">
          {error}
        </div>
      )}

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div className="flex gap-5 items-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
            <Building className="w-8 h-8 text-amber-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{request.name}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-1.5 text-sm font-medium text-slate-500">
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">Hospital Request</span>
              <span>-</span>
              <span className="flex items-center gap-1"><FileText className="w-4 h-4 text-slate-400" /> {request._id?.slice(-6)?.toUpperCase()}</span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-3">
              Submitted by {request.adminId?.name || "Hospital Admin"} on {formatDate(request.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={handleReject}
            disabled={isSubmitting}
            className="flex-1 sm:flex-none flex justify-center items-center gap-2 bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-sm disabled:opacity-60"
          >
            <XCircle className="w-5 h-5" /> Reject
          </button>
          <button
            onClick={handleApprove}
            disabled={isSubmitting}
            className="flex-1 sm:flex-none flex justify-center items-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 px-6 py-2.5 rounded-xl font-semibold transition-colors shadow-sm disabled:opacity-60"
          >
            <CheckCircle2 className="w-5 h-5" /> Approve Facility
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm tracking-wide mb-4 flex items-center gap-2 border-b border-slate-100 pb-3"><Phone className="w-4 h-4 text-sky-500" /> Applicant Contact</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-0.5">Phone Network</p>
                <p className="text-sm font-medium text-slate-700">{request.phone || "Not provided"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-0.5">Official Email</p>
                <p className="text-sm font-medium text-sky-600 flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-slate-400" />{request.email || "Not provided"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-0.5">Admin Contact</p>
                <p className="text-sm font-medium text-slate-700">{request.adminId?.email || "Not provided"}</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm tracking-wide mb-4 flex items-center gap-2 border-b border-slate-100 pb-3"><MapPin className="w-4 h-4 text-sky-500" /> Registered Address</h3>
            <div className="space-y-1 text-sm font-medium text-slate-600">
              <p className="font-semibold text-slate-800">{request.address || "Not provided"}</p>
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm tracking-wide mb-4 flex items-center gap-2 border-b border-slate-100 pb-3"><Activity className="w-4 h-4 text-sky-500" /> Request Status</h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-amber-50 text-amber-700 border border-amber-100 px-3 py-1.5 rounded-lg text-sm font-semibold">
                {request.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-4">
              Additional fields like registration number, specialities, and documents are not stored by the backend yet.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;

