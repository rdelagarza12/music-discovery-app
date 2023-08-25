from django.core.exceptions import ValidationError
import re

def validate_playlist_name(playlist_name):
    
    print("validate_playlist_name" , playlist_name)
    error_message = "Improper playlist name format"
    regex=r"[a-zA-Z0-9\s]+$"
    goodname = re.match(regex, playlist_name)
    if goodname:
        return playlist_name
    else:
        raise ValidationError(error_message, params={'playlist_name' : playlist_name})
 