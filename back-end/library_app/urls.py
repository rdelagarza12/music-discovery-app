from django.urls import path
from .views import My_Library

urlpatterns = [
    path("", My_Library.as_view(), name="my_library"),
]