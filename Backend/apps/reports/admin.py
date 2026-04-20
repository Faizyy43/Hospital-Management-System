from django.contrib import admin
from .models import Report

# admin.site.register(Report)

@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'hospital', 'created_at']
    search_fields = ['title']
    list_filter = ['hospital', 'created_at']