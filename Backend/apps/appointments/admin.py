from django.contrib import admin
from .models import Appointment

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ['id', 'patient', 'doctor', 'hospital', 'date', 'time', 'status']
    search_fields = ['patient__user__username', 'doctor__name']
    list_filter = ['status', 'date', 'hospital']