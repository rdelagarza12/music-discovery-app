from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_204_NO_CONTENT
# Create your views here.

class Master_Sign_Up(APIView):

    def post(self, request):
        request.data["username"] = request.data["email"]
        master_user = User.objects.create_user(**request.data)
        master_user.is_staff = True
        master_user.is_superuser = True
        master_user.save()
        token = Token.objects.create(user=master_user)
        return Response({"master_user": master_user.email, "token" : token.key}, status=HTTP_201_CREATED)
    
    
class Sign_Up(APIView):

    def post(self, request):
        request.data["username"] = request.data["email"]
        master_user = User.objects.create_user(**request.data)
        token = Token.objects.create(user=master_user)
        return Response({"user": master_user.email, "token" : token.key}, status=HTTP_201_CREATED)
    
class Log_In(APIView):

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(username=email, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"user" : user.email, "token": token.key})
        else:
            return Response("No user that matches these credentials", status=HTTP_404_NOT_FOUND)

    
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
