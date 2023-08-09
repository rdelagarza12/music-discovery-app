from django.db import models
from django.core import validators as v
from library_app.models import Library
from song_app.models import Song
# Create your models here.

class Playlist(models.Model):
    playlist_name = models.CharField(max_length=255)
    max_songs = models.PositiveBigIntegerField(default=100, validators=[v.MaxValueValidator(1000)])
    libraries = models.ManyToManyField(Library)


    def __str__(self):
        return f"Playlist Name: {self.playlist_name}"

class Playlist_song(models.Model):
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    song = models.OneToOneField(Song, on_delete=models.CASCADE)

    def __str__(self):
        return f"Playlist: {self.playlist} | Song: {self.song}"