from django.db import models
from django.conf import settings
from apps.hospitals.models import Hospital

class Patient(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15)
    age = models.IntegerField()

    def __str__(self):
        return self.user.username