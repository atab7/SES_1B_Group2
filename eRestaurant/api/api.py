from .models import *
from rest_framework import viewsets, permissions
from .serializers import * 

class booking_viewset(viewsets.ModelViewSet):
    serializer_class = booking_serializer
    
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):
        return self.request.user.bookings.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class restaurant_viewset(viewsets.ModelViewSet):
    queryset = Restaurant.objects.all()
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = restaurant_serializer