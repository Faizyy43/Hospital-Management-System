from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from .models import Appointment
from .serializers import AppointmentSerializer


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.none()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role == "master_admin":
            return Appointment.objects.all()

        if user.role == "hospital_admin":
            return Appointment.objects.filter(hospital__admin=user)

        return Appointment.objects.filter(patient__user=user)

    def perform_create(self, serializer):
        user = self.request.user

        if user.role != "patient":
            raise PermissionDenied("Only patients can book appointments")

        patient = getattr(user, "patient", None)
        if not patient:
            raise PermissionDenied("Patient profile not found")

        doctor = serializer.validated_data.get('doctor')
        if not doctor:
            raise PermissionDenied("Doctor is required")

        hospital = doctor.hospital

        serializer.save(patient=patient, hospital=hospital)