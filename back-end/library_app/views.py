from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Library
from playlist_app.models import Playlist
import json
from django.core.serializers import serialize
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_204_NO_CONTENT
from .serializers import LibrarySerializer, PlaylistSerializer, Playlist_SongSerializer
# Create your views here.

class User_permissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class My_Library(User_permissions):

    def get(self, response):
        user = response.user.id
        my_library = Library.objects.get(user=user)
        serialized_library = LibrarySerializer(my_library).data
        return Response(serialized_library)
    
    def post(self, response):
        My_Library = Library.objects.get(user=response.user.id)
        response.data["library"] = My_Library
        new_playlist = Playlist(**response.data)
        new_playlist.save()
        return Response(PlaylistSerializer(new_playlist).data, status=HTTP_201_CREATED)

    def delete(self, response):
        try:
            if response.data.get("playlist").isdigit():
                single_playlist = response.user.library.playlist.get(id=response.data.get("playlist"))
                
            else:
                print("name")
                single_playlist = response.user.library.playlist.get(playlist_name=response.data.get("playlist"))
        except:
            return Response("Playlist does not exist", status = HTTP_404_NOT_FOUND)
        single_playlist.delete()
        return Response(status=HTTP_204_NO_CONTENT)
    
    
