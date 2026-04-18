from rest_framework import serializers
from .models import Appointment

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'
        read_only_fields = ['patient', 'hospital']
    # ❌ Prevent double booking
    def validate(self, data):
        doctor = data['doctor']
        date = data['date']
        time = data['time']

        if Appointment.objects.filter(doctor=doctor, date=date, time=time).exists():
            raise serializers.ValidationError("This slot is already booked")

        return data