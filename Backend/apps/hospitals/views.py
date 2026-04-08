from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Hospital
from .serializers import HospitalSerializer

from rest_framework.views import APIView
from apps.patients.models import Patient
from apps.doctors.models import Doctor
from apps.appointments.models import Appointment
from apps.billing.models import Billing
from apps.hospitals.models import Hospital

# Create your views here.

# 🏥 Create Hospital (Hospital Admin)
class HospitalCreateView(generics.CreateAPIView):
    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(admin=self.request.user)


# 👑 Master Admin Approval
class HospitalApproveView(generics.UpdateAPIView):
    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        hospital = self.get_object()

        if request.user.role != "master_admin":
            return Response({"error": "Only master admin can approve"}, status=403)

        hospital.is_approved = True
        hospital.save()

        return Response({"message": "Hospital approved"})
    

class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # 👑 MASTER ADMIN DASHBOARD
        if user.role == "master_admin":
            data = {
                "total_hospitals": Hospital.objects.count(),
                "total_patients": Patient.objects.count(),
                "total_doctors": Doctor.objects.count(),
                "total_appointments": Appointment.objects.count(),
                "total_revenue": sum(
                    bill.amount for bill in Billing.objects.filter(status="paid")
                )
            }
            return Response(data)

        # 🏥 HOSPITAL ADMIN DASHBOARD
        if user.role == "hospital_admin":
            hospital = Hospital.objects.get(admin=user)

            data = {
                "hospital_name": hospital.name,
                "total_patients": Patient.objects.filter(hospital=hospital).count(),
                "total_doctors": Doctor.objects.filter(hospital=hospital).count(),
                "total_appointments": Appointment.objects.filter(hospital=hospital).count(),
                "total_revenue": sum(
                    bill.amount for bill in Billing.objects.filter(
                        appointment__hospital=hospital,
                        status="paid"
                    )
                )
            }
            return Response(data)

        return Response({"error": "Invalid role"})