from django.db import models

# Create your models here.

class Hospital(models.Model):

    HOSPITAL_TYPE = [
        ('Government', 'Government'),
        ('Private', 'Private'),
        ('Trust', 'Trust'),
        ('Clinic', 'Clinic'),
    ]

    name = models.CharField(max_length=255)
    registration_number = models.CharField(max_length=100, unique=True)
    hospital_type = models.CharField(max_length=20, choices=HOSPITAL_TYPE)

    specialities = models.TextField()  # store comma-separated
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    website = models.URLField(blank=True)

    address = models.TextField()
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    working_hours = models.TextField()  # JSON/text
    holidays = models.TextField(blank=True)

    general_beds = models.IntegerField(default=0)
    icu_beds = models.IntegerField(default=0)
    emergency_beds = models.IntegerField(default=0)

    insurance = models.TextField()

    emergency_services = models.BooleanField(default=False)
    is_24x7 = models.BooleanField(default=False)

    accreditation = models.CharField(max_length=255, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# 📸 Photos (multiple images)
class HospitalImage(models.Model):
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='hospital_images/')