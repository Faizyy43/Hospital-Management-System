import api from "../../../services/api";

export async function getPublicHospitals() {
  const response = await api.get("/hospitals/directory/public");
  return response.data;
}
