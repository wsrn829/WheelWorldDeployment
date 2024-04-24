from django.urls import path
from . import views

urlpatterns = [
    path('technicians/', views.api_list_technicians, name='api_list_technicians'),
    path('technicians/<int:id>/', views.api_technician_details, name='api_technician_details'),
    path('appointments/', views.api_list_appointments, name='api_list_appointments'),
    path('appointments/<int:id>/', views.api_appointment_details, name='api_appointment_details'),
    path('appointments/<int:id>/cancel', views.api_update_appt_status_cancel, name='api_update_appt_status_cancel'),
    path('appointments/<int:id>/finish', views.api_update_appt_status_finish, name='api_update_appt_status_finish'),
    path('appointments/history/<str:vin>/', views.api_appointment_history, name='api_appointment_history'),
]