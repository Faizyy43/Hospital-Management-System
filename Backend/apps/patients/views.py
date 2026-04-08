

from rest_framework import generics
from .serializers import PatientRegisterSerializer

class PatientRegisterView(generics.CreateAPIView):
    serializer_class = PatientRegisterSerializer