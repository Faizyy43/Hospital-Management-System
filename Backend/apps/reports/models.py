from django.db import models
from apps.patients.models import Patient
from apps.hospitals.models import Hospital

class Report(models.Model):
    name = models.CharField(max_length=100)

    hospital = models.ForeignKey(
        Hospital,
        on_delete=models.CASCADE,
        null=True,      # ✅ allow null
        blank=True      # ✅ allow empty in forms
    )

    title = models.CharField(max_length=255)
    description = models.TextField()

    report_file = models.FileField(upload_to='reports/')

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title