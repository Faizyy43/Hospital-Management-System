from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DoctorViewSet, OPDCategoryViewSet, DoctorAvailabilityViewSet

router = DefaultRouter()
router.register('doctors', DoctorViewSet)
router.register('opd', OPDCategoryViewSet)
router.register('availability', DoctorAvailabilityViewSet)

urlpatterns = router.urls