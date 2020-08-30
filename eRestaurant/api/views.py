from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import Group
from rest_framework.decorators import api_view, APIView
from rest_framework import generics
from rest_framework.response import Response
from .models import User
from .serializers import user_serializer
# Create your views here.

@api_view(['GET'])
def api_overview(request):
    api_urls = {
        'User List':'/user-list/', # List = View all 
        'Create User':'/create-user/', # Create = Create 
        'User Detail':'/user-detail/', # Detail = Retrieve specific object, update or delete
        'Order List':'/order-list/',
        'Create Order':'/create-order/',
        'Order Detail':'/order-detail/',
        'Staff List': '/staff-list/',
        'Create Staff':'/create-staff/',
        'Staff Detail': '/staff-detail/',
        'Customer List':'/customer-list/',
        'Customer Create':'/customer-create/',
        'Customer Detail': '/customer-detail/',
        'Restaurant List':'/restaurant-list/',
        'Restaurant Create':'/restaurant-create/',
        'Restaurant Detail':'/restaurant-detail/',
        #Few missing models, unsure atm


    }
    return Response(api_urls)

#See a list of users in JSON format, class based view

class user_list(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = user_serializer

#Basic user creation, can view in users-list, this is the DjangoRestWay, will need to change when frontend is done

class user_create(generics.CreateAPIView):
   serializer_class = user_serializer
   queryset = User.objects.all()
