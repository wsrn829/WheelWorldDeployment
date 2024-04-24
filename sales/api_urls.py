from django.urls import path
from . import views

urlpatterns = [
    path('attendees/<int:conference_id>/', views.list_attendees, name='api_list_attendees'),
    path('attendees/<int:id>/', views.show_attendee, name='api_show_attendee'),
    path('attendees/create/', views.create_attendee, name='api_create_attendee'),
    path('attendees/update/<int:id>/', views.update_attendee, name='api_update_attendee'),
    path('attendees/delete/<int:id>/', views.delete_attendee, name='api_delete_attendee'),
]