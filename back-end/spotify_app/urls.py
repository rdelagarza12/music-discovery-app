from django.urls import path
from .views import SpotifyCallbackView

urlpatterns = [
    path("", SpotifyCallbackView.as_view(), name="spotify_callback_view")
]