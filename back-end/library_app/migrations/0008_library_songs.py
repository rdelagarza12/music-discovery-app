# Generated by Django 4.2.4 on 2023-08-09 18:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('playlist_app', '0011_remove_playlist_library'),
        ('library_app', '0007_remove_library_playlist'),
    ]

    operations = [
        migrations.AddField(
            model_name='library',
            name='songs',
            field=models.ManyToManyField(null=True, to='playlist_app.playlist'),
        ),
    ]
