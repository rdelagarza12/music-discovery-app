from django.db import models
from django.core import validators as v
from song_app.models import Song
from library_app.models import Library
# Create your models here.


class Playlist(models.Model):
    playlist_name = models.CharField(max_length=255)
    max_songs = models.PositiveBigIntegerField(default=100, validators=[v.MaxValueValidator(1000)])
    library = models.ForeignKey(Library, on_delete=models.CASCADE, name="Library", null=True)
    def __str__(self):
        return f"Playlist Name: {self.playlist_name}"
        


class Playlist_Song(models.Model):
    song = models.OneToOneField(Song, on_delete=models.CASCADE)
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE, name="playlist")

    def __str__(self):
        return f"{self.song}"