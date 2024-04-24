from django.urls import path
from . import views

urlpatterns = [
    path('salesperson/', views.api_list_salesperson, name='api_list_salesperson'),
    path('salesperson/<int:id>/', views.api_show_salesperson, name='api_show_salesperson'),
    path('customer/', views.api_list_customer, name='api_list_customer'),
    path('customer/<int:id>/', views.api_show_customer, name='api_show_customer'),
    path('sale/', views.api_list_sale, name='api_list_sale'),
    path('sale/<int:id>/', views.api_show_sale, name='api_show_sale'),
]