from django.urls import path
from .views import HospitalCreateView, HospitalApproveView
from .views import DashboardView


urlpatterns = [
    path('create/', HospitalCreateView.as_view()),
    path('approve/<int:pk>/', HospitalApproveView.as_view()),
    path('dashboard/', DashboardView.as_view()),
]