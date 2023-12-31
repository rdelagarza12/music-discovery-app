# Generated by Django 4.2.4 on 2023-08-10 16:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('library_app', '0011_remove_library_playlist'),
        ('playlist_app', '0024_remove_playlist_songs_playlist_library_playlist_song'),
    ]

    operations = [
        migrations.AlterField(
            model_name='playlist',
            name='Library',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='library_app.library'),
            preserve_default=False,
        ),
    ]
