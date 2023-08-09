# Generated by Django 4.2.4 on 2023-08-09 18:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('library_app', '0007_remove_library_playlist'),
        ('playlist_app', '0006_playlist_playlist'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='playlist',
            name='playlist',
        ),
        migrations.AddField(
            model_name='playlist',
            name='playlist',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='library_app.library'),
            preserve_default=False,
        ),
    ]
