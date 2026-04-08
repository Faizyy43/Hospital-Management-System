from rest_framework import serializers
from .models import Doctor, OPDCategory, DoctorAvailability

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'
        read_only_fields = ['hospital']


class OPDCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = OPDCategory
        fields = '__all__'
        read_only_fields = ['hospital']


class DoctorAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorAvailability
        fields = '__all__'