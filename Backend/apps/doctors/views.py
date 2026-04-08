from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from .models import Doctor, OPDCategory, DoctorAvailability
from .serializers import DoctorSerializer, OPDCategorySerializer, DoctorAvailabilitySerializer
from apps.hospitals.models import Hospital


# 👨‍⚕️ Doctor View
class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all() 
    serializer_class = DoctorSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role == "master_admin":
            return Doctor.objects.all()

        return Doctor.objects.filter(hospital__admin=user)

    def perform_create(self, serializer):
        user = self.request.user

        if user.role != "hospital_admin":
            raise PermissionDenied("Only hospital admin can add doctor")

        hospital = Hospital.objects.get(admin=user)
        serializer.save(hospital=hospital)


# 🏷️ OPD Category View
class OPDCategoryViewSet(viewsets.ModelViewSet):
    queryset = OPDCategory.objects.all()
    serializer_class = OPDCategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role == "master_admin":
            return OPDCategory.objects.all()

        return OPDCategory.objects.filter(hospital__admin=user)

    def perform_create(self, serializer):
        hospital = Hospital.objects.get(admin=self.request.user)
        serializer.save(hospital=hospital)


# ⏰ Availability View
class DoctorAvailabilityViewSet(viewsets.ModelViewSet):
    queryset = DoctorAvailability.objects.all() 
    serializer_class = DoctorAvailabilitySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role == "master_admin":
            return DoctorAvailability.objects.all()

        return DoctorAvailability.objects.filter(doctor__hospital__admin=user)