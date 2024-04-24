from django.urls import path
from . import views

urlpatterns = [
    path('automobiles/', views.api_automobiles, name='api_automobiles'),
    path('automobiles/<str:vin>/', views.api_automobile, name='api_automobile'),
    path('manufacturers/', views.api_manufacturers, name='api_manufacturers'),
    path('manufacturers/<int:pk>/', views.api_manufacturer, name='api_manufacturer'),
    path('vehicle_models/', views.api_vehicle_models, name='api_vehicle_models'),
    path('vehicle_models/<int:pk>/', views.api_vehicle_model, name='api_vehicle_model'),
]