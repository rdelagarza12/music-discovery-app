# Generated by Django 4.2.4 on 2023-08-09 18:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('playlist_app', '0010_remove_playlist_songs_playlist_songs'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='playlist',
            name='library',
        ),
    ]
