from django.urls import path
from . import views

urlpatterns = [
    path('api/states', views.list_states, name='api_list_states'),
    path('api/locations', views.list_locations, name='api_list_locations'),
    path('api/locations/<int:id>', views.show_location, name='api_show_location'),
    path('api/conferences', views.list_conferences, name='api_list_conferences'),
    path('api/conferences/<int:id>', views.show_conference, name='api_show_conference'),
]