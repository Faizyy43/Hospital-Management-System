from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Hospital
from .serializers import HospitalSerializer

# Create your views here.


# ✅ Create Hospital
@api_view(['POST'])
def create_hospital(request):
    serializer = HospitalSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"msg": "Hospital Created", "data": serializer.data})
    return Response(serializer.errors)


# ✅ Get All Hospitals
@api_view(['GET'])
def get_hospitals(request):
    data = Hospital.objects.all()
    serializer = HospitalSerializer(data, many=True)
    return Response(serializer.data)


# ✅ Get Single Hospital
@api_view(['GET'])
def get_hospital(request, id):
    try:
        hospital = Hospital.objects.get(id=id)
    except Hospital.DoesNotExist:
        return Response({"error": "Not found"})
    
    serializer = HospitalSerializer(hospital)
    return Response(serializer.data)


# ✅ Update Hospital
@api_view(['PUT'])
def update_hospital(request, id):
    try:
        hospital = Hospital.objects.get(id=id)
    except Hospital.DoesNotExist:
        return Response({"error": "Not found"})

    serializer = HospitalSerializer(hospital, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"msg": "Updated"})
    return Response(serializer.errors)


# ✅ Delete Hospital
@api_view(['DELETE'])
def delete_hospital(request, id):
    try:
        hospital = Hospital.objects.get(id=id)
    except Hospital.DoesNotExist:
        return Response({"error": "Not found"})

    hospital.delete()
    return Response({"msg": "Deleted"})