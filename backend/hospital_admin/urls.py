from django.urls import path
from . import views

urlpatterns = [
    path('hospital/create/', views.create_hospital),
    path('hospital/', views.get_hospitals),
    path('hospital/<int:id>/', views.get_hospital),
    path('hospital/update/<int:id>/', views.update_hospital),
    path('hospital/delete/<int:id>/', views.delete_hospital),
]