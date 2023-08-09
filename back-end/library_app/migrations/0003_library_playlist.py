# Generated by Django 4.2.4 on 2023-08-09 17:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('playlist_app', '0004_remove_playlist_libraries'),
        ('library_app', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='library',
            name='playlist',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='playlist', to='playlist_app.playlist'),
        ),
    ]
