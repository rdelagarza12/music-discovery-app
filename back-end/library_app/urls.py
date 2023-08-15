from django.urls import path
from .views import My_Library

app_name = 'library'

urlpatterns = [
    path("", My_Library.as_view(), name="my_library"),
]