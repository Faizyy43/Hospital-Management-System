from django.db import models
from django.conf import settings

class Hospital(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField()
    city = models.CharField(max_length=100)

    admin = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="hospital"
    )

    is_approved = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Bed(models.Model):
    BED_TYPE = (
        ('general', 'General'),
        ('icu', 'ICU'),
        ('emergency', 'Emergency'),
    )

    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)

    bed_type = models.CharField(max_length=20, choices=BED_TYPE)
    total = models.IntegerField()
    available = models.IntegerField()

    def __str__(self):
        return f"{self.hospital.name} - {self.bed_type}"
    