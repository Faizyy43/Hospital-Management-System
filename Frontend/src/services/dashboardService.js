import { getRequests } from "../modules/masterAdmin/approvals/approvalService";
import { getHospitals } from "../modules/masterAdmin/hospitals/hospitalDirectoryService";
import { mergeHospitalAdminSnapshot } from "../modules/masterAdmin/hospitals/hospitalStorageBridge";

const TWO_DAYS_IN_MS = 1000 * 60 * 60 * 48;
const relativeTimeFormatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

const getErrorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback;

const formatStatus = (status) => {
  const value = String(status || "unknown");
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const getCollectionSize = (collection, fallback = 0) =>
  Array.isArray(collection) ? collection.length : Number(fallback) || 0;

const formatRelativeTime = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  const diffMs = date.getTime() - Date.now();
  const diffMinutes = Math.round(diffMs / (1000 * 60));

  if (Math.abs(diffMinutes) < 1) {
    return "Just now";
  }

  if (Math.abs(diffMinutes) < 60) {
    return relativeTimeFormatter.format(diffMinutes, "minute");
  }

  const diffHours = Math.round(diffMs / (1000 * 60 * 60));

  if (Math.abs(diffHours) < 24) {
    return relativeTimeFormatter.format(diffHours, "hour");
  }

  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (Math.abs(diffDays) < 30) {
    return relativeTimeFormatter.format(diffDays, "day");
  }

  const diffMonths = Math.round(diffMs / (1000 * 60 * 60 * 24 * 30));

  if (Math.abs(diffMonths) < 12) {
    return relativeTimeFormatter.format(diffMonths, "month");
  }

  const diffYears = Math.round(diffMs / (1000 * 60 * 60 * 24 * 365));
  return relativeTimeFormatter.format(diffYears, "year");
};

const formatHospital = (hospital) => {
  const mergedHospital = mergeHospitalAdminSnapshot(hospital);

  return {
    id: hospital._id,
    name: hospital.name || "Unnamed Hospital",
    location: hospital.address || "Address not available",
    status: formatStatus(hospital.status),
    rawStatus: String(hospital.status || ""),
    patients: getCollectionSize(mergedHospital.patients, mergedHospital.patientCount),
    doctors: getCollectionSize(mergedHospital.doctors, mergedHospital.doctorCount),
    createdAt: hospital.createdAt ? new Date(hospital.createdAt).getTime() : 0,
  };
};

const formatRequest = (request) => ({
  id: request._id,
  type: "New Registration",
  hospital: request.name || "Unnamed Hospital",
  time: formatRelativeTime(request.createdAt),
  status: request.status === "pending" ? "Awaiting Verification" : formatStatus(request.status),
  createdAt: request.createdAt ? new Date(request.createdAt).getTime() : 0,
});

const getAlertCount = (requests) =>
  requests.filter(
    (request) => request.createdAt && Date.now() - request.createdAt >= TWO_DAYS_IN_MS,
  ).length;

export const getDashboardAnalytics = async () => {
  const [hospitalResult, requestResult] = await Promise.allSettled([getHospitals(), getRequests()]);
  const errors = [];

  const hospitals =
    hospitalResult.status === "fulfilled"
      ? hospitalResult.value.map(formatHospital).sort((left, right) => right.createdAt - left.createdAt)
      : [];

  if (hospitalResult.status === "rejected") {
    errors.push(getErrorMessage(hospitalResult.reason, "Unable to load hospitals."));
  }

  const pendingApprovals =
    requestResult.status === "fulfilled"
      ? requestResult.value.map(formatRequest).sort((left, right) => right.createdAt - left.createdAt)
      : [];

  if (requestResult.status === "rejected") {
    errors.push(getErrorMessage(requestResult.reason, "Unable to load requests."));
  }

  const totalPatients = hospitals.reduce((total, hospital) => total + hospital.patients, 0);
  const approvedHospitals = hospitals.filter((hospital) =>
    ["approved", "active"].includes(hospital.rawStatus.toLowerCase()),
  ).length;

  return {
    metrics: {
      totalHospitals: hospitals.length,
      approvedHospitals,
      totalPatients,
      pendingRequests: pendingApprovals.length,
      alertCount: getAlertCount(pendingApprovals),
    },
    recentHospitals: hospitals.slice(0, 5),
    pendingApprovals: pendingApprovals.slice(0, 5),
    errorMessage: errors.join(" "),
  };
};
