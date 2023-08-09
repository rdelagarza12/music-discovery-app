# Generated by Django 4.2.4 on 2023-08-09 18:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('playlist_app', '0005_alter_playlist_songs'),
        ('library_app', '0004_alter_library_playlist'),
    ]

    operations = [
        migrations.AlterField(
            model_name='library',
            name='playlist',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='playlist', to='playlist_app.playlist'),
        ),
    ]
