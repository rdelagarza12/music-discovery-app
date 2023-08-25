from django.shortcuts import render
from user_app.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import requests
import base64
from django.http import JsonResponse
from django.views import View
from dotenv import load_dotenv
import os

load_dotenv()

class SpotifyCallbackView(View):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        code = request.GET.get('code')
        state = request.GET.get('state')
        print(code)
        print(state)
        if state is None:
            return JsonResponse({'error': 'state_mismatch'}, status=400)

        client_id = os.environ.get('CLIENT_ID')
        client_secret = os.environ.get('CLIENT_SECRET')
        redirect_uri = 'http://localhost:5173/signin/profile/' 

        auth_header = base64.b64encode(f'{client_id}:{client_secret}'.encode('utf-8')).decode('utf-8')
        token_url = 'https://accounts.spotify.com/api/token'
        payload = {
            'code': code,
            'redirect_uri': redirect_uri,
            'grant_type': 'authorization_code'
        }
        headers = {
            'Authorization': f'Basic {auth_header}',
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        response = requests.post(token_url, data=payload, headers=headers)
        token_data = response.json()

        if 'access_token' in token_data:
            access_token = token_data['access_token']
            refresh_token = token_data.get('refresh_token') 
            expires_in = token_data.get('expires_in')

            user = request.user
            user.spotify_token = {"access_token": access_token, "expires_in": expires_in, "refresh_token": refresh_token}

            return JsonResponse({'access_token' : access_token, "expires_in": expires_in, 'refresh_token' : refresh_token}, status=200)
        else:
            return JsonResponse({'error': 'Token retrieval failed'}, status=500)