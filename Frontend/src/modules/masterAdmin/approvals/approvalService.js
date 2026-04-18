// ---------------- REQUESTS ----------------
let requests = [
  {
    id: 1,
    name: "City Hospital",
    type: "Private",
    status: "Pending",
    registrationNumber: "MCI-12345",

    contact: { phone: "9876543210", email: "hospital@mail.com" },
    address: { full: "Ahmedabad, Gujarat", pin: "380001" },

    specialities: ["Cardiology"],
    auditLogs: []
  }
];

// ---------------- APPROVED HOSPITALS ----------------
let hospitals = [];


// -------- REQUEST APIs --------

export const getRequests = async () => requests;

export const getRequestById = async (id) =>
  requests.find(r => r.id === id);


// APPROVE → move to hospitals
export const approveRequest = async (id) => {
  const req = requests.find(r => r.id === id);
  if (!req) return null;

  req.status = "Approved";

  req.auditLogs.push({
    action: "Approved Request",
    date: new Date().toISOString()
  });

  hospitals.push({ ...req });

  requests = requests.filter(r => r.id !== id);

  return req;
};


// REJECT
export const rejectRequest = async (id, reason) => {
  const req = requests.find(r => r.id === id);
  if (!req) return null;

  req.status = "Rejected";

  req.auditLogs.push({
    action: `Rejected: ${reason}`,
    date: new Date().toISOString()
  });

  return req;
};


// -------- HOSPITAL APIs --------

export const getHospitals = async () => hospitals;