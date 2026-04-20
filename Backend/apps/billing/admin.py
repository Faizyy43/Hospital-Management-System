from django.contrib import admin
from .models import Billing

# admin.site.register(Billing)


@admin.register(Billing)
class BillingAdmin(admin.ModelAdmin):
    list_display = ['id', 'appointment', 'amount', 'status', 'payment_method']
    list_filter = ['status', 'payment_method']
    search_fields = ['appointment__patient__user__username']