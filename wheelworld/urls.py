"""project4 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.http import JsonResponse
from django.http import HttpResponse

def api_root(request):
    """
    A simple view for the root URL ("/").
    """
    return HttpResponse("message": "Welcome to the API root!")

urlpatterns = [
    path('', api_root, name='api_root'),
    path("admin/", admin.site.urls),
    path("api/", include("accounts.urls")),
    path("api/", include("inventory.urls")),
    path("api/", include("sales.urls")),
    path("api/", include("services.urls")),
]
