# Generated by Django 4.2.4 on 2023-08-21 04:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('song_app', '0005_alter_song_image_cover'),
    ]

    operations = [
        migrations.AlterField(
            model_name='song',
            name='genre',
            field=models.ManyToManyField(blank=True, null=True, related_name='song', to='song_app.genre'),
        ),
    ]
