import api from "../../../services/api";
import { initializeHospitalStorage, readHospitalStorage } from "../utils/storage";

const getSnapshotPayload = () => ({
  patients: readHospitalStorage("patients"),
  doctors: readHospitalStorage("doctors"),
  staff: readHospitalStorage("staff"),
  appointments: readHospitalStorage("appointments"),
  opdCategories: readHospitalStorage("opdCategories"),
});

export async function syncHospitalSnapshot() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user || user.role !== "admin" || !user.hospitalId) {
    return null;
  }

  initializeHospitalStorage();

  const response = await api.patch("/hospitals/me/snapshot", getSnapshotPayload());
  return response.data;
}
