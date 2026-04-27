const DEFAULT_KEYS = {
  doctors: [],
  staff: [],
  patients: [
    { id: 1, name: "John Doe", age: 30, disease: "Flu", createdAt: new Date().toISOString() },
    { id: 2, name: "Sarah Khan", age: 25, disease: "Fever", createdAt: new Date().toISOString() },
  ],
  appointments: [],
  opdCategories: [
    "General Medicine", "Cardiology", "Orthopaedics", "Neurology",
    "Gynaecology & Obstetrics", "Paediatrics", "Dermatology", "ENT",
    "Ophthalmology", "Urology", "Nephrology", "Gastroenterology",
    "Oncology", "Psychiatry", "Pulmonology", "Endocrinology",
    "Rheumatology", "Dental", "Physiotherapy", "Radiology & Imaging",
  ],
};

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

const getScopedKey = (key) => {
  const user = getCurrentUser();
  const scope = user?.hospitalId || user?._id || user?.id || "default";
  return `hospital_admin_${scope}_${key}`;
};

export const readHospitalStorage = (key) => {
  const fallback = DEFAULT_KEYS[key];

  try {
    const raw = localStorage.getItem(getScopedKey(key));
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const writeHospitalStorage = (key, value) => {
  localStorage.setItem(getScopedKey(key), JSON.stringify(value));
};

export const hydrateHospitalStorage = (hospital) => {
  if (!hospital) {
    return;
  }

  writeHospitalStorage("doctors", Array.isArray(hospital.doctors) ? hospital.doctors : []);
  writeHospitalStorage("staff", Array.isArray(hospital.staff) ? hospital.staff : []);
  writeHospitalStorage("patients", Array.isArray(hospital.patients) ? hospital.patients : []);
  writeHospitalStorage("appointments", Array.isArray(hospital.appointments) ? hospital.appointments : []);
  writeHospitalStorage("opdCategories", Array.isArray(hospital.opdCategories) ? hospital.opdCategories : []);
};

export const initializeHospitalStorage = () => {
  Object.entries(DEFAULT_KEYS).forEach(([key, fallback]) => {
    const scopedKey = getScopedKey(key);

    if (!localStorage.getItem(scopedKey)) {
      localStorage.setItem(scopedKey, JSON.stringify(fallback));
    }
  });
};
