from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Library
from playlist_app.models import Playlist
import json
from django.core.serializers import serialize
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
from .serializers import LibrarySerializer, PlaylistSerializer, Playlist_SongSerializer
# Create your views here.

class User_permissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class My_Library(User_permissions):

    def grab_playlist(self, response, playlist):
        try:
            if (type(playlist)) == int:
                single_playlist = response.user.library.playlist.get(id=playlist)
                return single_playlist
                
            else:
                segments = " ".join(playlist.strip("/").split("/")[-1].split("_"))
                try:
                    single_playlist = response.user.library.playlist.get(playlist_name=playlist)
                except:
                    single_playlist = response.user.library.playlist.get(playlist_name=segments)
                return single_playlist
        except:
            return None

    # RETURNS ENTIRE LIBRARY

    def get(self, response):
        user = response.user.id
        my_library = Library.objects.get(user=user)
        serialized_library = LibrarySerializer(my_library).data
        return Response(serialized_library)
    
    def post(self, request):
        my_library = Library.objects.get(user=request.user)
        playlist_name = request.data.get("playlist_name").lower()
        if Playlist.objects.filter(library=my_library, playlist_name=playlist_name).exists():
            return Response("Playlist name already exists in your library", status=HTTP_400_BAD_REQUEST)
        new_playlist = Playlist(library=my_library, **request.data)
        new_playlist.playlist_name = playlist_name
        new_playlist.save()
        return Response(PlaylistSerializer(new_playlist).data, status=HTTP_201_CREATED)
    
    
    def delete(self, response):
        try:
            if type(response.data.get("playlist")) == int:
                single_playlist = response.user.library.playlist.get(id=response.data.get("playlist"))
            else:
                playlist_to_delete = response.data.get("playlist_name")
                single_playlist = self.grab_playlist(response, playlist_to_delete)
            if single_playlist is None:
                return Response("Playlist is None", status=HTTP_404_NOT_FOUND)
        except:
            return Response("Playlist does not exist", status = HTTP_404_NOT_FOUND)
        single_playlist.delete()
        return Response(status=HTTP_204_NO_CONTENT)
    
    
