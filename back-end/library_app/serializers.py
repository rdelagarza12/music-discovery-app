from rest_framework import serializers
from playlist_app.models import Playlist, Library, Playlist_Song, Song
import json
from django.core.serializers import serialize

# -------- SONG SERIALIZER
class SongSerialzier(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ["song_name", "artist", "album", "genre"]


#--------- PLAYLIST_SONG_SERIALIZER

class Playlist_SongSerializer(serializers.ModelSerializer):
    actual_song = serializers.SerializerMethodField()

    class Meta:
        model = Playlist_Song
        fields = ["id", "playlist","actual_song"]

    def get_actual_song(self, instance):
        song = SongSerialzier(instance.song).data
        return song
    


    # ----------------------------- PLAYLIST SERIALIZER
    
class PlaylistSerializer(serializers.ModelSerializer):
    playlist_song = serializers.SerializerMethodField()

    class Meta:
        model = Playlist
        fields = ["id", "playlist_name", "max_songs", "playlist_song"]

    def get_playlist_song(self, instance):
        query_playlist_song = instance.playlist_song.all()
        playlist_song_list = [Playlist_SongSerializer(song).data for song in query_playlist_song]
        return playlist_song_list
    

    #----------- LIBRARY
class LibrarySerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username')
    playlist = serializers.SerializerMethodField()

    class Meta:
        model = Library
        fields = ["id", "user", "playlist"]

    def get_playlist(self, instance):
        playlist_list = []
        query_playlist = instance.playlist.all()
        
        if len(query_playlist) > 0:
            for playlist in query_playlist:
                playlist_data = PlaylistSerializer(playlist).data
                playlist_data['playlist_song_count'] = playlist.playlist_song.count()
                playlist_data.pop('playlist_song')
                playlist_list.append(playlist_data)
        
        return playlist_list