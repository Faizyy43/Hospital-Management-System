from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from .models import Report
from .serializers import ReportSerializer
from apps.hospitals.models import Hospital


class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        # 👑 Master Admin
        if user.role == "master_admin":
            return Report.objects.all()

        # 🏥 Hospital Admin
        if user.role == "hospital_admin":
            return Report.objects.filter(hospital__admin=user)

        # 👤 Patient
        return Report.objects.filter(patient__user=user)

    def perform_create(self, serializer):
        user = self.request.user

        # ❌ Only hospital admin can upload
        if user.role != "hospital_admin":
            raise PermissionDenied("Only hospital admin can upload reports")

        hospital = Hospital.objects.get(admin=user)
        serializer.save(hospital=hospital)