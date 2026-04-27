import api from "./api";

export async function registerPatient(payload) {
  const response = await api.post("/auth/register", payload);
  return response.data;
}

export async function loginUser(payload) {
  const response = await api.post("/auth/login", payload);
  return response.data;
}

export async function requestHospitalRegistration(payload) {
  const response = await api.post("/hospitals/request", payload);
  return response.data;
}
