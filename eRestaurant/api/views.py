from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import Group
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from .serializers import user_serializer
# Create your views here.

@api_view(['GET'])
def api_overview(request):
    api_urls = {
        'User List':'/user-list/',
        'Create User':'/create-user/',
        'Order List':'/order-list/',
        'Create Order':'/create-order/',
        'Staff List': '/staff-list/',
        'Create Staff':'/create-staff/',
        'Customer List':'/customer-list/',
        'Customer Create':'/customer-create/'

    }
    return Response(api_urls)

#See a list of users in JSON format
@api_view(['GET'])
def user_list(request):
    users = User.objects.all() #Query all users
    serializer = user_serializer(users, many=True)
    return Response(serializer.data)


#Basic user creation, can view in users-list, this is the DjangoRestWay, will need to change when frontend is done
@api_view(['POST'])
def user_create(request):
    serializer = user_serializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)
