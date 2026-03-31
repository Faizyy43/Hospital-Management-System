// simulate API (replace later with real API call)

export const getDashboardStats = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalHospitals: 120,
        totalPatients: 5400,
        appointments: 2300,
        pendingApprovals: 8,
      });
    }, 500);
  });
};

export const getRecentHospitals = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "City Hospital", type: "Private", status: "Pending" },
        { id: 2, name: "Apollo Clinic", type: "Clinic", status: "Approved" },
        { id: 3, name: "Care Hospital", type: "Private", status: "Rejected" },
      ]);
    }, 500);
  });
};