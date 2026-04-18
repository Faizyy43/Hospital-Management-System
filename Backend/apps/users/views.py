from django.shortcuts import render
from rest_framework import generics
from .serializers import RegisterSerializer
from .models import User

# Create your views here.

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response

# ✅ Register
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


# ✅ Custom Login
class CustomLoginView(TokenObtainPairView):

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        data = response.data

        user = User.objects.get(username=request.data['username'])

        return Response({
            "token": data,
            "role": user.role,
            "username": user.username
        })