from django.db import models
from user_app.models import User
# Create your models here.
class Library(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="library")
    # playlist = models.ManyToManyField(Playlist, name="playlist")


    def __str__(self):
        return f"{self.user} library"
    


