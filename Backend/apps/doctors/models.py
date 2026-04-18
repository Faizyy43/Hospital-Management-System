from django.db import models
from apps.hospitals.models import Hospital

# 👨‍⚕️ Doctor
class Doctor(models.Model):
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)

    name = models.CharField(max_length=255)
    specialization = models.CharField(max_length=255)
    experience = models.IntegerField(null=True, blank=True)
    fee = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name


# 🏷️ OPD Category
class OPDCategory(models.Model):
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


# ⏰ Doctor Availability
class DoctorAvailability(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)

    day = models.CharField(max_length=20)  # Monday, Tuesday
    start_time = models.TimeField()
    end_time = models.TimeField()

    max_patients = models.IntegerField()