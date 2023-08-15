from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User
from library_app.models import Library
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_204_NO_CONTENT
import requests
from dotenv import load_dotenv
import os
load_dotenv()

client_id = os.environ.get('CLIENT_ID')
client_secret = os.environ.get('CLIENT_SECRET')
# Create your views here.

class Master_Sign_Up(APIView):

    def post(self, request):
        request.data["username"] = request.data["email"]
        master_user = User.objects.create_user(**request.data)
        master_user_library = Library(user=master_user)
        master_user_library.save()
        master_user.is_staff = True
        master_user.is_superuser = True
        master_user.save()
        token = Token.objects.create(user=master_user)
        return Response({"master_user": master_user.email, "token" : token.key}, status=HTTP_201_CREATED)
    
    
class Sign_Up(APIView):

    def post(self, request):
        request.data["username"] = request.data["email"]
        user = User.objects.create_user(**request.data)
        user_library = Library(user=user)
        user_library.save()
        token = Token.objects.create(user=user)
        client_id = os.environ.get('CLIENT_ID')
        client_secret = os.environ.get('CLIENT_SECRET')

        url = 'https://accounts.spotify.com/api/token'
        data = {
            'grant_type': 'client_credentials'
        }
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        auth = (client_id, client_secret)

        response = requests.post(url, data=data, headers=headers, auth=auth)

        if response.status_code == 200:
            response_json = response.json()
            request.user.spotify_token = response_json
        else:
            print('Error:', response.status_code)
        return Response({"user" : user.email,
                "user_token": token.key, 
                "access_token" : response_json.get('access_token'),
                "token_type" : response_json.get('token_type'),
                "expires_in" : response_json.get("expires_in")},
                status=HTTP_201_CREATED)



class Log_In(APIView):

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(username=email, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            client_id = os.environ.get('CLIENT_ID')
            client_secret = os.environ.get('CLIENT_SECRET')

            url = 'https://accounts.spotify.com/api/token'
            data = {
                'grant_type': 'client_credentials'
            }
            headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            auth = (client_id, client_secret)

            response = requests.post(url, data=data, headers=headers, auth=auth)

            if response.status_code == 200:
                response_json = response.json()
                user.spotify_token = response_json
            else:
                print('Error:', response.status_code)
            return Response({"user" : user.email,
                    "user_token": token.key, 
                    "access_token" : response_json.get('access_token'),
                    "token_type" : response_json.get('token_type'),
                    "expires_in" : response_json.get("expires_in")},
                    status=HTTP_201_CREATED)

    
class Log_Out(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)
    
class Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"email": request.user.email})
