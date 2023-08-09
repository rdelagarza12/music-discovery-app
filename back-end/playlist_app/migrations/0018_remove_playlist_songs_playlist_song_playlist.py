# Generated by Django 4.2.4 on 2023-08-09 19:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('playlist_app', '0017_alter_playlist_songs'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='playlist',
            name='songs',
        ),
        migrations.AddField(
            model_name='playlist_song',
            name='playlist',
            field=models.ManyToManyField(to='playlist_app.playlist'),
        ),
    ]
