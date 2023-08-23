from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Song, Genre
from rest_framework import status
# Create your views here.

class Single_Song(APIView):

    def post(self, request):
        if Song.objects.filter(spotify_song_id=request.data.get("spotify_song_id")).count() > 0:
            return Response(status = status.HTTP_400_BAD_REQUEST)
        spotify_id = request.data.get("spotify_song_id")
        name = request.data.get("song_name")
        artist = request.data.get("artist")
        album = request.data.get("album")
        genre = request.data.get("genre")
        image_cover = request.data.get("image_cover")
        try:
            for genre_type in genre:
                if Genre.objects.filter(genre_name = genre_type) > 0:
                    exist_genre = Genre.objects.get(genre_name = genre_type)
                    new_song = Song(spotify_song_id = spotify_id, song_name = name, artist = artist, album=album, image_cover=image_cover)
                    new_song.save()
                    new_song.genre.set([exist_genre])
        except:
            new_song = Song(spotify_song_id = spotify_id, song_name = name, artist = artist, album=album, image_cover=image_cover)
            new_song.save()            
            for genre_type in genre:
                new_genre = Genre(genre_name = genre_type)
                new_genre.save()
                new_song.genre.set([new_genre])
                new_song.save()
            
        return Response(status = status.HTTP_201_CREATED)
