from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.

@api_view(['GET'])
def api_overview(request):
    api_urls = {
        'LIST':'/booking-list/',
        'Create':'/booking-create',
    }
    return Response(api_urls)

#Serializers.py needs to be made