from django.urls import path, register_converter
from library_app.converters import IntOrStringConverter
from .views import Single_Playlist

register_converter(IntOrStringConverter, 'int_or_str')
urlpatterns = [
    path("<int_or_str:playlist>/", Single_Playlist.as_view(), name="single_playlist"),
    # path("<int_or_str:playlistsong>/", Single_Playlist_Song.as_view(), name="single_playlist_song")
]