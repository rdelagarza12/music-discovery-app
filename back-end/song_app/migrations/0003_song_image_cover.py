# Generated by Django 4.2.4 on 2023-08-20 19:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('song_app', '0002_alter_song_genre'),
    ]

    operations = [
        migrations.AddField(
            model_name='song',
            name='image_cover',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]