// ---------------- MOCK DB ----------------
let hospitals = [
  {
    id: 1,
    name: "City Hospital",
    type: "Private",
    status: "Pending",
    registrationNumber: "MCI-12345",

    contact: {
      phone: "9876543210",
      email: "hospital@mail.com"
    },

    address: {
      full: "Ahmedabad, Gujarat",
      pin: "380001"
    },

    specialities: ["Cardiology", "Orthopaedics"],

    revenue: {
      total: 500000,
      monthly: [
        { month: "Jan", value: 50000 },
        { month: "Feb", value: 60000 }
      ]
    },

    staff: [
      { name: "Dr. Smith", role: "Doctor" },
      { name: "Nurse Joy", role: "Nurse" }
    ],

    auditLogs: []
  },

  {
    id: 2,
    name: "Apollo Clinic",
    type: "Clinic",
    status: "Approved",
    registrationNumber: "MCI-67890",

    contact: {
      phone: "9999999999",
      email: "apollo@mail.com"
    },

    address: {
      full: "Mumbai, Maharashtra",
      pin: "400001"
    },

    specialities: ["Dermatology"],

    revenue: {
      total: 300000,
      monthly: [
        { month: "Jan", value: 30000 },
        { month: "Feb", value: 40000 }
      ]
    },

    staff: [
      { name: "Dr. John", role: "Doctor" }
    ],

    auditLogs: []
  }
];


// ---------------- HELPERS ----------------

// generate last 6 months
const getLast6Months = () => {
  const months = [];
  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(d.toLocaleString("default", { month: "short" }));
  }

  return months;
};

// normalize revenue to always 6 months
const normalizeRevenue = (monthly = []) => {
  const last6 = getLast6Months();

  return last6.map(month => {
    const found = monthly.find(m => m.month === month);
    return {
      month,
      value: found ? found.value : 0
    };
  });
};


// ---------------- SERVICES ----------------

// 1. Get all hospitals (for list)
export const getApprovals = async () => {
  return hospitals;
};


// 2. Get single hospital (with fixed revenue)
export const getApprovalById = async (id) => {
  const hospital = hospitals.find(h => h.id === id);
  if (!hospital) return null;

  return {
    ...hospital,
    revenue: {
      ...hospital.revenue,
      monthly: normalizeRevenue(hospital.revenue?.monthly)
    }
  };
};


// 3. Approve hospital
export const approveHospital = async (id) => {
  const hospital = hospitals.find(h => h.id === id);
  if (!hospital) return null;

  hospital.status = "Approved";

  hospital.auditLogs.push({
    action: "Approved Hospital",
    date: new Date().toISOString()
  });

  return hospital;
};


// 4. Reject hospital
export const rejectHospital = async (id, reason) => {
  const hospital = hospitals.find(h => h.id === id);
  if (!hospital) return null;

  hospital.status = "Rejected";

  hospital.auditLogs.push({
    action: `Rejected: ${reason}`,
    date: new Date().toISOString()
  });

  return hospital;
};


// 5. Pending count (dashboard badge)
export const getPendingCount = async () => {
  return hospitals.filter(h => h.status === "Pending").length;
};


// 6. Add new hospital request
export const addHospitalRequest = async (data) => {
  const newHospital = {
    id: Date.now(),
    ...data,
    status: "Pending",
    auditLogs: [],
    revenue: {
      total: 0,
      monthly: []
    }
  };

  hospitals.push(newHospital);
  return newHospital;
};