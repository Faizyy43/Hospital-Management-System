from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from .models import Billing
from .serializers import BillingSerializer

class BillingViewSet(viewsets.ModelViewSet):
    queryset = Billing.objects.all()

    serializer_class = BillingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        # 👑 Master Admin → all bills
        if user.role == "master_admin":
            return Billing.objects.all()

        # 🏥 Hospital Admin → hospital bills
        if user.role == "hospital_admin":
            return Billing.objects.filter(appointment__hospital__admin=user)

        # 👤 Patient → own bills
        return Billing.objects.filter(appointment__patient__user=user)

    def perform_create(self, serializer):
        user = self.request.user

        # ❌ Only hospital admin can create bill
        if user.role != "hospital_admin":
            raise PermissionDenied("Only hospital admin can create bill")

        serializer.save()