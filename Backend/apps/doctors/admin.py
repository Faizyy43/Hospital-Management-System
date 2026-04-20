from django.contrib import admin
from .models import Doctor, OPDCategory, DoctorAvailability

# admin.site.register(Doctor)
# admin.site.register(OPDCategory)
# admin.site.register(DoctorAvailability)

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'hospital', 'specialization', 'experience', 'fee']
    search_fields = ['name', 'specialization']
    list_filter = ['hospital', 'specialization']
    ordering = ['id']


@admin.register(OPDCategory)
class OPDCategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'hospital']
    search_fields = ['name']


@admin.register(DoctorAvailability)
class DoctorAvailabilityAdmin(admin.ModelAdmin):
    list_display = ['id', 'doctor', 'day', 'start_time', 'end_time', 'max_patients']
    list_filter = ['day']