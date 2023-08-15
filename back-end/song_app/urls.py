from django.urls import path
from playlist_app.views import Single_Playlist_Song, All_Playlist_Songs
urlpatterns = [
    path("", All_Playlist_Songs.as_view(), name="all_playlist_songs"),
]