export const getHospitals = async () => {
const generateLast6Months = () => {
  const months = [];
  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(d.toLocaleString("default", { month: "short" }));
  }

  return months;
};

const rawMonthly = [
  { month: "Jan", value: 50000 },
  { month: "Feb", value: 60000 }
];

const last6Months = generateLast6Months();

const monthly = last6Months.map(month => {
  const found = rawMonthly.find(r => r.month === month);
  return {
    month,
    value: found ? found.value : 0
  };
});

  return [
    {
      id: 1,
      name: "City Hospital",
      type: "Private",
      status: "Approved",
      patients: 320,
    },
    {
      id: 2,
      name: "Apollo Clinic",
      type: "Clinic",
      status: "Pending",
      patients: 210,
    },
  ];
};

export const getHospitalById = async (id) => {
  return {
    id,
    name: "City Hospital",
    registrationNumber: "MCI-12345",
    type: "Private",
    specialities: ["Cardiology", "Orthopaedics"],
    contact: {
      phone: "9876543210",
      email: "hospital@mail.com",
      website: "www.hospital.com",
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
    emergency: true,
    accreditations: ["NABH", "ISO"],
    revenue: {
      total: 1200000,
      monthly: [
        { month: "Jan", value: 100000 },
        { month: "Feb", value: 120000 },
      ],
    },

    patients: [
      { id: 1, name: "John Doe", issue: "Fever" },
      { id: 2, name: "Ali Khan", issue: "Chest Pain" },
    ],

    appointments: [
      { id: 1, status: "Completed", date: "2026-03-20" },
      { id: 2, status: "Pending", date: "2026-03-22" },
    ],

    staff: [
      // Doctors (10)
      { name: "Dr. Smith", role: "Doctor", dept: "Cardiology" },
      { name: "Dr. John", role: "Doctor", dept: "Orthopedic" },
      { name: "Dr. Ali", role: "Doctor", dept: "Neurology" },
      { name: "Dr. Mehta", role: "Doctor", dept: "General" },
      { name: "Dr. Khan", role: "Doctor", dept: "ENT" },
      { name: "Dr. Patel", role: "Doctor", dept: "Dermatology" },
      { name: "Dr. Shah", role: "Doctor", dept: "Pediatrics" },
      { name: "Dr. Rao", role: "Doctor", dept: "Oncology" },
      // { name: "Dr. Iyer", role: "Doctor", dept: "Radiology" },
      // { name: "Dr. Das", role: "Doctor", dept: "Psychiatry" },

      // Nurses (25)
      ...Array.from({ length: 24 }, (_, i) => ({
        name: `Nurse ${i + 1}`,
        role: "Nurse",
        dept: "Ward",
      })),

      // Compounders (5)
      ...Array.from({ length: 5 }, (_, i) => ({
        name: `Compounder ${i + 1}`,
        role: "Compounder",
      })),

      // Other Staff
      { name: "Reception 1", role: "Receptionist" },
      { name: "Reception 2", role: "Receptionist" },
      { name: "Admin 1", role: "Admin" },
      { name: "Cleaner 1", role: "Housekeeping" },
    ],

    requests: [{ id: 1, type: "Add Speciality", status: "Pending" }],

    revenue: {
      total: 500000,
    },
    complaints: [{ id: 1, message: "Delay in appointment" }],

    auditLogs: [{ action: "Approved Hospital", date: "2026-03-01" }],
  };
};

export const getPatientById = async (id) => {
  return {
    id,
    fullName: "Ali Khan",
    mobile: "9876543210",
    email: "ali@mail.com",
    dob: "1998-05-10",
    gender: "Male",
    bloodGroup: "B+",
    emergencyContact: {
      name: "Rahim Khan",
      phone: "9999999999",
    },
    insurance: {
      provider: "LIC",
      policy: "LIC12345",
    },
    address: {
      city: "Ahmedabad",
      state: "Gujarat",
      pin: "380001",
    },

    appointments: [
      {
        id: 1,
        date: "2026-03-20",
        status: "Completed",
        doctor: "Dr. Smith",
        complaint: "Fever",
      },
      {
        id: 2,
        date: "2026-03-25",
        status: "Pending",
        doctor: "Dr. John",
        complaint: "Chest Pain",
      },
    ],
  };
};
