from django.contrib import admin
from .models import Patient

# admin.site.register(Patient)

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'phone', 'age']
    search_fields = ['user__username', 'phone']