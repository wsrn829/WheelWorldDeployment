from django.urls import path
from . import views

urlpatterns = [
    path('presentations/', views.list_presentations, name='api_list_presentations'),
    path('presentations/<int:id>', views.show_presentation, name='api_show_presentation'),
    path('presentations/create', views.create_presentation, name='api_create_presentation'),
    path('presentations/update/<int:id>', views.update_presentation, name='api_update_presentation'),
    path('presentations/delete/<int:id>', views.delete_presentation, name='api_delete_presentation'),
]