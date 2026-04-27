import api from "../../../services/api";

export async function getCurrentHospital() {
  const response = await api.get("/hospitals/me/current");
  return response.data;
}
