from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
from library_app.serializers import SongSerialzier, Playlist_SongSerializer, PlaylistSerializer
from .models import  Playlist, Playlist_Song
from song_app.models import Song
import json
from django.core.serializers import serialize


# Create your views here.
class User_permissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
class Single_Playlist(User_permissions):


#|---------- FUNCTION TO GRAB A PLAYLIST
    def grab_playlist(self, request, playlist):
        try:
            if (type(playlist)) == int:
                single_playlist = request.user.library.playlist.get(id=playlist)
                return single_playlist
                
            else:
                segments = " ".join(playlist.strip("/").split("/")[-1].split("-")).lower()
                try:
                    single_playlist = request.user.library.playlist.get(playlist_name=playlist.lower())
                except:
                    single_playlist = request.user.library.playlist.get(playlist_name=segments)
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
    def get(self, request, playlist):
        try:
            single_playlist = self.grab_playlist(request,playlist)
            if single_playlist is None:
                return Response("Playlist is None",status=HTTP_404_NOT_FOUND)
        except:
            return Response("Playlist does not exist", status=HTTP_404_NOT_FOUND)
        return Response(PlaylistSerializer(single_playlist).data)
    

#|-------------- ADDS A SONG TO PLAYLIST

    def post(self , request, playlist):
        try:
            get_song = Song.objects.get(spotify_song_id=request.data.get("spotify_song_id"))
            single_playlist = self.grab_playlist(request,playlist)
            if single_playlist is None:
                return Response("Playlist could not be found", HTTP_404_NOT_FOUND)
            new_song = Playlist_Song(song=get_song, playlist=single_playlist)
            new_song.save()
            return Response(status=HTTP_201_CREATED)            
        except Exception as error:
            print(error)
            return Response("This song does not exist", status = HTTP_404_NOT_FOUND)



#|-------------- DELETES A SONG FROM PLAYLIST

    def delete(self, request, playlist):
        single_playlist = self.grab_playlist(request,playlist)
        if single_playlist is None:
            return Response(HTTP_404_NOT_FOUND)
        my_song = request.data.get("spotify_song_id")
        
        try:
            try:
                song_to_delete = single_playlist.playlist_song.get(spotify_song_id=request.data.get("song"))
                
            except:
                get_song = self.get_song_by_name(my_song)
                if get_song is None:
                    return Response(status=HTTP_404_NOT_FOUND)
                try:
                    song_to_delete = single_playlist.playlist_song.get(song=get_song)
                except:
                    songs_to_delete = single_playlist.playlist_song.filter(song=get_song)
                    return Response(f"There is {len(songs_to_delete)} of this song. Please input the Song ID instead", status=HTTP_400_BAD_REQUEST)
        except:
            return Response("This Song Does Not Exist", status=HTTP_404_NOT_FOUND)
        song_to_delete.delete()
        return Response(status=HTTP_204_NO_CONTENT)

#|------------- UPDATES NAME OF PLAYLISTS OR MAX    

    def put(self, request, playlist):
        try:
            single_playlist = self.grab_playlist(request, playlist)
        except Playlist.DoesNotExist:
            return Response(status=HTTP_404_NOT_FOUND)

        playlist_name = request.data.get("playlist_name").lower()
        max_songs = request.data.get("max_songs")

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
    

class Single_Playlist_Song(User_permissions):

    def get_song(self, song):
        try:
            return Song.objects.get(spotify_song_id=song)
        except Song.DoesNotExist:
            return None
        
    def grab_playlist(self, request, playlist):
        try:
            if (type(playlist)) == int:
                single_playlist = request.user.library.playlist.get(id=playlist)
                return single_playlist
                
            else:
                segments = " ".join(playlist.strip("/").split("/")[-1].split("_")).lower()
                try:
                    single_playlist = request.user.library.playlist.get(playlist_name=playlist.lower())
                except:
                    single_playlist = request.user.library.playlist.get(playlist_name=segments)
                return single_playlist
        except:
            return None

    def get(self, request, playlist, playlistsong):

        single_playlist = self.grab_playlist(request, playlist)
        if single_playlist is None:
            return Response("This Playlist Does Not Exist", status=HTTP_404_NOT_FOUND)
        

        single_song = self.get_song(playlistsong)
        if single_song is None:
            return Response("This Song Does Not Exist", status=HTTP_404_NOT_FOUND)
        try:
            playlist_song = single_playlist.playlist_song.get(song=single_song)
        except:
            return Response("This Playlist Song Does Not Exist", status=HTTP_404_NOT_FOUND)
        
        return Response(Playlist_SongSerializer(playlist_song).data)
    
class All_Playlist_Songs(User_permissions):

    def get(self, request):
        all_songs = []
        my_library = request.user.library
        all_libraries = my_library.playlist.all()
        for playlist in all_libraries:
            serialized_playlist = playlist.playlist_song.all()
            for song in serialized_playlist:
                all_songs.append(Playlist_SongSerializer(song).data)
        return Response(all_songs)
        
        

        