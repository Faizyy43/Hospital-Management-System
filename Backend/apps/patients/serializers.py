from rest_framework import serializers
from apps.users.models import User
from .models import Patient


class PatientRegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Patient
        fields = ['username', 'password', 'phone', 'age']

    def create(self, validated_data):
        username = validated_data.pop('username')
        password = validated_data.pop('password')

        # prevent duplicate
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError({
                "username": "Username already exists"
            })

        user = User.objects.create_user(
            username=username,
            password=password,
            role='patient'
        )

        patient = Patient.objects.create(
            user=user,
            **validated_data
        )

        return patient

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "username": instance.user.username,
            "phone": instance.phone,
            "age": instance.age
        }