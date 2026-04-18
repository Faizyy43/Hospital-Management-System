export const getDashboardAnalytics = async () => {
  return {
    stats: {
      totalHospitals: 120,
      activeHospitals: 98,
      totalPatients: 15420,
      pendingApprovals: 12,
      revenue: 540000,
    },

    // 10 months
    patientGrowth: [
      { month: "Jan", value: 200 },
      { month: "Feb", value: 350 },
      { month: "Mar", value: 500 },
      { month: "Apr", value: 650 },
      { month: "May", value: 800 },
      { month: "Jun", value: 950 },
      { month: "Jul", value: 1100 },
      { month: "Aug", value: 1300 },
      { month: "Sep", value: 1500 },
      { month: "Oct", value: 1700 },
    ],

    // 10 days
    appointmentsTrend: [
      { day: "Mon", value: 30 },
      { day: "Tue", value: 45 },
      { day: "Wed", value: 60 },
      { day: "Thu", value: 50 },
      { day: "Fri", value: 80 },
      { day: "Sat", value: 90 },
      { day: "Sun", value: 40 },
      { day: "Mon2", value: 70 },
      { day: "Tue2", value: 85 },
      { day: "Wed2", value: 95 },
    ],

    // Top 10 hospitals
    topHospitals: [
      { name: "City Hospital", patients: 320 },
      { name: "Apollo Clinic", patients: 300 },
      { name: "Care Hospital", patients: 280 },
      { name: "Sunrise Hospital", patients: 260 },
      { name: "Medicare Center", patients: 240 },
      { name: "Global Hospital", patients: 220 },
      { name: "LifeCare", patients: 200 },
      { name: "Wellness Hospital", patients: 180 },
      { name: "Green Cross", patients: 160 },
      { name: "Urban Health", patients: 140 },
    ],

    // 10 specialties
    specialties: [
      { name: "Cardiology", value: 120 },
      { name: "Orthopaedics", value: 100 },
      { name: "Dermatology", value: 90 },
      { name: "Neurology", value: 80 },
      { name: "Gynaecology", value: 70 },
      { name: "Paediatrics", value: 60 },
      { name: "ENT", value: 50 },
      { name: "Ophthalmology", value: 40 },
      { name: "Psychiatry", value: 30 },
      { name: "Dental", value: 20 },
    ],

    // 10 months new hospitals
    newHospitals: [
      { month: "Jan", value: 5 },
      { month: "Feb", value: 8 },
      { month: "Mar", value: 6 },
      { month: "Apr", value: 10 },
      { month: "May", value: 12 },
      { month: "Jun", value: 9 },
      { month: "Jul", value: 11 },
      { month: "Aug", value: 14 },
      { month: "Sep", value: 13 },
      { month: "Oct", value: 15 },
    ],

    // 10 months acquisition
    userAcquisition: [
      { month: "Jan", value: 300 },
      { month: "Feb", value: 450 },
      { month: "Mar", value: 600 },
      { month: "Apr", value: 750 },
      { month: "May", value: 900 },
      { month: "Jun", value: 1100 },
      { month: "Jul", value: 1300 },
      { month: "Aug", value: 1500 },
      { month: "Sep", value: 1700 },
      { month: "Oct", value: 2000 },
    ],
  };
};