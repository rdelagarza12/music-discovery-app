from django.contrib import admin
from library_app.models import Library
from .models import User
from playlist_app.models import Playlist, Playlist_Song
from song_app.models import Song, Genre
# Register y   our models here.
admin.site.register([Library, User, Song, Genre, Playlist, Playlist_Song])