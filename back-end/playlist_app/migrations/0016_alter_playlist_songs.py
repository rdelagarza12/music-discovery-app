# Generated by Django 4.2.4 on 2023-08-09 18:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('playlist_app', '0015_remove_playlist_songs_playlist_songs'),
    ]

    operations = [
        migrations.AlterField(
            model_name='playlist',
            name='songs',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='playlist_app.playlist_song'),
        ),
    ]
