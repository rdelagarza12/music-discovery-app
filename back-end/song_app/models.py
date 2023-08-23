from django.db import models


# Create your models here.

class Genre(models.Model):
    genre_name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.genre_name}"



class Song(models.Model):
    spotify_song_id = models.CharField(blank=False, max_length=255)
    song_name = models.CharField(blank=False, max_length=255)
    artist = models.CharField(blank=False, max_length=255)
    album = models.CharField(blank=False, max_length=255)
    genre = models.ManyToManyField(Genre, related_name="song", blank=True)
    image_cover = models.CharField(blank=True, null=True, max_length=255)

    def __str__(self):
        return f"Song: {self.song_name} | Artist: {self.artist} | Album: {self.album}"
    
