from rest_framework import serializers
from .models import Hospital, HospitalImage

class HospitalImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HospitalImage
        fields = ['id', 'image']


class HospitalSerializer(serializers.ModelSerializer):
    images = HospitalImageSerializer(many=True, read_only=True)

    class Meta:
        model = Hospital
        fields = '__all__'