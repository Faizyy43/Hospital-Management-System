import api from "../../../services/api";

export async function getRequests() {
  const response = await api.get("/hospitals/requests");
  return response.data;
}

export async function getRequestById(id) {
  const response = await api.get(`/hospitals/${id}`);
  return response.data;
}

export async function approveRequest(id) {
  const response = await api.patch(`/hospitals/${id}/approve`);
  return response.data;
}

export async function rejectRequest(id) {
  const response = await api.patch(`/hospitals/${id}/reject`);
  return response.data;
}
