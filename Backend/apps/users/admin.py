from django.contrib import admin
from .models import User

# admin.site.register(User)

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'email', 'role', 'is_staff']
    search_fields = ['username', 'email']
    list_filter = ['role', 'is_staff']
    ordering = ['id']