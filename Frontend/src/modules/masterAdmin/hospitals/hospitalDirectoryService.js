import api from "../../../services/api";

export async function getHospitals() {
  const response = await api.get("/hospitals");
  return response.data;
}

export async function getHospitalById(id) {
  const response = await api.get(`/hospitals/${id}`);
  return response.data;
}
