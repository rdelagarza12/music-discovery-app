from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Library
from playlist_app.models import Playlist
import json
from django.core.serializers import serialize
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR
from .serializers import LibrarySerializer, PlaylistSerializer, Playlist_SongSerializer
# Create your views here.

class User_permissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class My_Library(User_permissions):

    def grab_playlist(self, request, playlist):
        try:
            if (type(playlist)) == int:
                single_playlist = request.user.library.playlist.get(id=playlist)
                return single_playlist
                
            else:
                segments = " ".join(playlist.strip("/").split("/")[-1].split("-"))
                try:
                    single_playlist = request.user.library.playlist.get(playlist_name=playlist)
                except:
                    single_playlist = request.user.library.playlist.get(playlist_name=segments)
                return single_playlist
        except:
            return None

    # RETURNS ENTIRE LIBRARY

    def get(self, request):
        user = request.user.id
        my_library = Library.objects.get(user=user)
        serialized_library = LibrarySerializer(my_library).data
        return Response(serialized_library)
    
    def post(self, request):
        try:
            my_library = Library.objects.get(user=request.user)
            playlist = request.data.get('playlist_name')
            formatted_playlist = playlist.replace(" ", "-").replace("_", "-")
            request.data['playlist_name'] = formatted_playlist
            request.data['library'] = my_library
            new_playlist, created = Playlist.objects.get_or_create(**request.data)
            if created:
                new_playlist.save()
                return Response(PlaylistSerializer(new_playlist).data, status=HTTP_201_CREATED)
            else:
                return Response(status=HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            return Response({"error": str(e)}, status=HTTP_500_INTERNAL_SERVER_ERROR)
    
    
    def delete(self, request):
        try:
            if type(request.data.get("playlist")) == int:
                single_playlist = request.user.library.playlist.get(id=request.data.get("playlist"))
            else:
                playlist_to_delete = request.data.get("playlist_name")
                single_playlist = self.grab_playlist(request, playlist_to_delete)
            if single_playlist is None:
                return request("Playlist is None", status=HTTP_404_NOT_FOUND)
        except:
            return Response("Playlist does not exist", status = HTTP_404_NOT_FOUND)
        single_playlist.delete()
        return Response(status=HTTP_204_NO_CONTENT)
    
    
