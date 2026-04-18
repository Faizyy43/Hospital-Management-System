from django.db import models
from apps.hospitals.models import Hospital

class Staff(models.Model):
    ROLE_CHOICES = (
        ('nurse', 'Nurse'),
        ('receptionist', 'Receptionist'),
        ('lab', 'Lab Technician'),
    )

    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)

    name = models.CharField(max_length=255)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    contact = models.CharField(max_length=15)

    def __str__(self):
        return self.name