# Generated by Django 4.2.4 on 2023-08-09 19:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('library_app', '0010_remove_library_platlist_library_playlist'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='library',
            name='playlist',
        ),
    ]
