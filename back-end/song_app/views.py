from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Song, Genre
from rest_framework import status
# Create your views here.

class Single_Song(APIView):

    def post(self, request):
        try:
            spotify_id = request.data.get("spotify_song_id")
            name = request.data.get("song_name")
            artist = request.data.get("artist")
            album = request.data.get("album")
            genre_names = request.data.get("genre")
            image_cover = request.data.get("image_cover")
            uri = request.data.get("uri")
            
            new_song, created = Song.objects.get_or_create(
                spotify_song_id=spotify_id,
                defaults={
                    "song_name": name,
                    "artist": artist,
                    "album": album,
                    "image_cover": image_cover,
                    "uri": uri
                }
            )
            
            if not created:
                return Response("Song already exists", status=status.HTTP_400_BAD_REQUEST)
            
            genres = []
            for genre_name in genre_names:
                genre, _ = Genre.objects.get_or_create(genre_name=genre_name)
                genres.append(genre)
            
            new_song.genre.set(genres)
            
            return Response(status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
