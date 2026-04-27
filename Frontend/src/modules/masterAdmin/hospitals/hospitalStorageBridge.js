const STORAGE_KEYS = ["patients", "doctors", "staff", "appointments", "opdCategories"];

const parseStoredValue = (value, fallback) => {
  if (!value) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

const unique = (values) => [...new Set(values.filter(Boolean).map(String))];

const readScopedCollection = (scope, key) => {
  if (!scope || typeof window === "undefined") {
    return [];
  }

  return parseStoredValue(
    window.localStorage.getItem(`hospital_admin_${scope}_${key}`),
    [],
  );
};

const getSnapshotScore = (snapshot) =>
  STORAGE_KEYS.reduce((total, key) => total + snapshot[key].length, 0);

const getCandidateScopes = (hospital) =>
  unique([
    hospital?._id,
    hospital?.id,
    hospital?.hospitalId,
    hospital?.adminId?._id,
    hospital?.adminId?.id,
    hospital?.adminId,
    "default",
  ]);

export const getHospitalAdminSnapshot = (hospital) => {
  const candidateScopes = Array.isArray(hospital) ? hospital : getCandidateScopes(hospital);

  return candidateScopes
    .map((scope) =>
      STORAGE_KEYS.reduce(
        (snapshot, key) => {
          snapshot[key] = readScopedCollection(scope, key);
          return snapshot;
        },
        {
          scope,
          patients: [],
          doctors: [],
          staff: [],
          appointments: [],
          opdCategories: [],
        },
      ),
    )
    .sort((left, right) => getSnapshotScore(right) - getSnapshotScore(left))[0];
};

export const mergeHospitalAdminSnapshot = (hospital) => {
  const snapshot = getHospitalAdminSnapshot(hospital);

  return {
    ...hospital,
    patients: snapshot.patients.length > 0 ? snapshot.patients : hospital?.patients || [],
    doctors: snapshot.doctors.length > 0 ? snapshot.doctors : hospital?.doctors || [],
    staff: snapshot.staff.length > 0 ? snapshot.staff : hospital?.staff || [],
    appointments: snapshot.appointments.length > 0 ? snapshot.appointments : hospital?.appointments || [],
    opdCategories:
      snapshot.opdCategories.length > 0 ? snapshot.opdCategories : hospital?.opdCategories || [],
    patientCount: snapshot.patients.length || hospital?.patientCount || 0,
    doctorCount: snapshot.doctors.length || hospital?.doctorCount || 0,
    staffCount: snapshot.staff.length || hospital?.staffCount || 0,
    appointmentCount: snapshot.appointments.length || hospital?.appointmentCount || 0,
    opdCount: snapshot.opdCategories.length || hospital?.opdCount || 0,
  };
};
