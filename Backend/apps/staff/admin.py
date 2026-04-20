from django.contrib import admin
from .models import Staff

# admin.site.register(Staff)



@admin.register(Staff)
class StaffAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'hospital', 'role', 'contact']
    search_fields = ['name', 'contact']
    list_filter = ['role', 'hospital']