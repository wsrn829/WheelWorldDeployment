from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model
from django.db import IntegrityError
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

@api_view(['POST'])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=status.HTTP_200_OK)
    else:
        return Response({"message": "Invalid username and/or password."}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def logout_view(request):
    logout(request)
    return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)

@api_view(['POST'])
def register(request):
    print('Request data:', request.data)

    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")
    confirmation = request.data.get("confirmation")

    if password != confirmation:
        return Response({"message": "Passwords must match."}, status=status.HTTP_400_BAD_REQUEST)

    User = get_user_model()
    try:
        user = User.objects.create_user(username, email, password)
        user.save()
        token, _ = Token.objects.get_or_create(user=user)
        print(f'Token for user {user.username}: {token.key}')
        return Response({"token": token.key}, status=status.HTTP_201_CREATED)
    except IntegrityError:
        return Response({"message": "Username already taken."}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print('Error during registration:', e)
        return Response({"message": "An error occurred during registration."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)