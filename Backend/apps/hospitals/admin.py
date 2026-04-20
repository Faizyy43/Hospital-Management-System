from django.contrib import admin
from .models import Hospital, Bed

# admin.site.register(Hospital)
# admin.site.register(Bed)

@admin.register(Hospital)
class HospitalAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'admin', 'is_approved']
    search_fields = ['name', 'address']
    list_filter = ['is_approved']
    ordering = ['id']


@admin.register(Bed)
class BedAdmin(admin.ModelAdmin):
    list_display = ['id', 'hospital', 'bed_type', 'total', 'available']
    list_filter = ['bed_type']
    search_fields = ['hospital__name']