from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
from library_app.serializers import SongSerialzier, Playlist_SongSerializer, PlaylistSerializer
from .models import  Playlist, Playlist_Song
from song_app.models import Song


# Create your views here.
class User_permissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
class Single_Playlist(User_permissions):


#|---------- FUNCTION TO GRAB A PLAYLIST
    def grab_playlist(self, response, playlist):
        try:
            if (type(playlist)) == int:
                single_playlist = response.user.library.playlist.get(id=playlist)
                return single_playlist
                
            else:
                single_playlist = response.user.library.playlist.get(playlist_name=playlist)
                return single_playlist
        except:
            return None
        
#|--------- FUNCTION TO GRAB A SONG:
    def get_song_by_name(self, song_name):
        try:
            return Song.objects.get(song_name__iexact=song_name)  # Case-insensitive lookup
        except Song.DoesNotExist:
            return None
        
#|----------- GETS A PLAYLIST BY ID OR BY PLAYLIST NAME
    def get(self, response, playlist):
        single_playlist = self.grab_playlist(response,playlist)
        if single_playlist is None:
            return Response(status=HTTP_404_NOT_FOUND)
        return Response(PlaylistSerializer(single_playlist).data)
    

#|-------------- ADDS A SONG TO PLAYLIST

    def post(self , response, playlist):
        try:
            if response.data.get("song").isdigit():
                get_song = Song.objects.get(id=response.data.get("song"))
            else:
                get_song = self.get_song_by_name(response.data.get("song"))
                if get_song is None:
                    return Response(status=HTTP_404_NOT_FOUND)
        except:
            return Response("This song does not exist", status = HTTP_404_NOT_FOUND)
        single_playlist = self.grab_playlist(response,playlist)
        if single_playlist is None:
            return Response(HTTP_404_NOT_FOUND)
        new_song = Playlist_Song(song=get_song, playlist=single_playlist)
        new_song.save()
        return Response(status=HTTP_201_CREATED)


#|-------------- DELETES A SONG FROM PLAYLIST

    def delete(self, response, playlist):
        single_playlist = self.grab_playlist(response,playlist)
        if single_playlist is None:
            return Response(HTTP_404_NOT_FOUND)
        try:
            if response.data.get("song").isdigit():
                song_to_delete = single_playlist.playlist_song.get(id=response.data.get("song"))
            else:
                get_song = self.get_song_by_name(response.data.get("song"))
                if get_song is None:
                    return Response(status=HTTP_404_NOT_FOUND)
                song_to_delete = single_playlist.playlist_song.get(song=get_song)
        except:
            return Response("This Song Does Not Exist", status=HTTP_404_NOT_FOUND)
        song_to_delete.delete()
        return Response(status=HTTP_204_NO_CONTENT)

#|------------- UPDATES NAME OF PLAYLISTS OR MAX    

    def put(self, response, playlist):
        try:
            single_playlist = self.grab_playlist(response, playlist)
        except Playlist.DoesNotExist:
            return Response(status=HTTP_404_NOT_FOUND)

        playlist_name = response.data.get("playlist_name")
        max_songs = response.data.get("max_songs")

        if playlist_name is not None:
            single_playlist.playlist_name = playlist_name

        if max_songs is not None:
            try:
                single_playlist.max_songs = int(max_songs)
            except ValueError:
                return Response("Invalid Number", status=HTTP_400_BAD_REQUEST)

        if playlist_name is not None or max_songs is not None:
            single_playlist.save()
            return Response(status=HTTP_204_NO_CONTENT)

        return Response(status=HTTP_400_BAD_REQUEST)
    

