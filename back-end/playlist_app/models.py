from django.db import models
from django.core import validators as v
from song_app.models import Song
from library_app.models import Library
from .validators import validate_playlist_name
# Create your models here.


class Playlist(models.Model):
    playlist_name = models.CharField(max_length=255, validators=[validate_playlist_name])
    max_songs = models.PositiveBigIntegerField(default=100, validators=[v.MaxValueValidator(1000)])
    library = models.ForeignKey(Library, on_delete=models.CASCADE, related_name="playlist", blank=False)
    def __str__(self):
        return f"Playlist Name: {self.playlist_name}"
    

    def delete_playlist_song(self, song_to_delete):
        try:
            song = self.playlist_song.get(song=song_to_delete)
            song.delete()
        except Playlist_Song.DoesNotExist:
            pass




class Playlist_Song(models.Model):
    song = models.ForeignKey(Song, on_delete=models.CASCADE, related_name="actual_song")
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE, related_name="playlist_song")

    def __str__(self):
        return f"{self.song}"
