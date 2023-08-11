# Generated by Django 4.2.4 on 2023-08-10 19:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('song_app', '0002_alter_song_genre'),
        ('playlist_app', '0028_alter_playlist_song_playlist'),
    ]

    operations = [
        migrations.AlterField(
            model_name='playlist_song',
            name='song',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='playlist_song', to='song_app.song'),
        ),
    ]
