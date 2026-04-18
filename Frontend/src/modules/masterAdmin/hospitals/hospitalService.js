// ---------------- MOCK DATABASE ----------------

// REQUESTS (registration only)
let requests = [
  {
    id: 1,
    name: "City Hospital",
    registrationNumber: "MCI-12345",
    type: "Private",
    owner: "Dr. Khan",

    contact: {
      phone: "9876543210",
      email: "hospital@mail.com",
    },

    address: {
      full: "Ahmedabad, Gujarat",
      pin: "380001",
      gps: "23.0225,72.5714",
    },

    workingHours: "Mon-Sat: 9AM - 8PM",

    bedCapacity: {
      general: 50,
      icu: 10,
      emergency: 5,
    },

    insurance: ["LIC", "Star Health"],
    specialities: ["Cardiology", "Orthopaedics"],

    documents: ["registration.pdf", "nabh.pdf"],

    bankDetails: "HDFC XXXX1234",
  },
];

// APPROVED HOSPITALS (FULL DATA)
let hospitals = [];

// ---------------- HELPERS ----------------

// 6 months revenue
const getLast6Months = () => {
  const months = [];
  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(d.toLocaleString("default", { month: "short" }));
  }

  return months;
};

const normalizeRevenue = (monthly = []) => {
  const last6 = getLast6Months();

  return last6.map((month) => {
    const found = monthly.find((m) => m.month === month);
    return {
      month,
      value: found ? found.value : 0,
    };
  });
};

// CREATE FULL HOSPITAL AFTER APPROVAL
const generateHospital = (req) => ({
  ...req,
  status: "Approved",

  patients: [
    { id: 1, name: "John Doe", issue: "Fever" },
    { id: 2, name: "Ali Khan", issue: "Chest Pain" },
  ],

  appointments: [
    { id: 1, status: "Completed", date: "2026-03-20" },
    { id: 2, status: "Pending", date: "2026-03-22" },
  ],

  staff: [
    { name: "Dr. Smith", role: "Doctor", dept: "Cardiology" },

    ...Array.from({ length: 10 }, (_, i) => ({
      name: `Nurse ${i + 1}`,
      role: "Nurse",
      dept: "Ward",
    })),
  ],

  revenue: {
    total: 500000,
    monthly: normalizeRevenue([
      { month: "Jan", value: 50000 },
      { month: "Feb", value: 60000 },
    ]),
  },

  complaints: [{ id: 1, message: "Delay in appointment" }],

  auditLogs: [
    {
      action: "Hospital Approved",
      date: new Date().toISOString(),
    },
  ],
});

// ---------------- REQUEST APIs ----------------

// list
export const getRequests = async () => requests;

// detail (registration fields)
export const getRequestById = async (id) => requests.find((r) => r.id === id);

// approve → move + transform
export const approveRequest = async (id) => {
  const req = requests.find((r) => r.id === id);
  if (!req) return null;

  const fullHospital = {
    ...generateHospital(req),
    id: req.id, // ensure id exists
  };
  hospitals.push(fullHospital);

  requests = requests.filter((r) => r.id !== id);

  return fullHospital;
};

// reject
export const rejectRequest = async (id, reason) => {
  return {
    id,
    status: "Rejected",
    reason,
  };
};

// ---------------- HOSPITAL APIs ----------------

// list (table view)
export const getHospitals = async () => {
  return hospitals.map((h) => ({
    id: h.id,
    name: h.name,
    type: h.type,
    status: h.status,
    patients: h.patients.length,
  }));
};

// full hospital profile
export const getHospitalById = async (id) => {
  const hospital = hospitals.find((h) => h.id === Number(id));

  if (!hospital) {
    throw new Error("Hospital not found");
  }

  return hospital;
};

// ---------------- PATIENT APIs ----------------

// 🔥 IMPORTANT (your requirement)

export const getPatientById = async (hospitalId, patientId) => {
  const hospital = hospitals.find((h) => h.id === hospitalId);
  if (!hospital) return null;

  const patient = hospital.patients.find((p) => p.id === patientId);
  if (!patient) return null;

  // attach appointment details
  const appointments = hospital.appointments.map((a) => ({
    ...a,
    doctor: "Dr. Smith",
    complaint: patient.issue,
  }));

  return {
    ...patient,
    appointments,
  };
};
