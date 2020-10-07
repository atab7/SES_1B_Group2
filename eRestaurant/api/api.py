from .models import *
from rest_framework import viewsets, permissions
from .serializers import * 
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

class manager_reward_viewset(viewsets.ModelViewSet):
    serializer_class = reward_serializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):
        #print(self.reverse_action(self.set_inactive.url_name, args=['1']))
        return Reward.objects.filter(is_valid=True)

    @action(detail=True, methods=['patch'], permission_classes=[permissions.IsAuthenticated],
            url_path='remove-reward', url_name='remove_reward')
    def set_inactive(self, requestm, pk=None):
        instance = Reward.objects.filter(pk=pk)[0]
        if not instance:
              return Response(status=status.HTTP_400_BAD_REQUEST)
        instance.is_valid = False
        instance.save()
        return Response(status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        serializer.save()


class user_viewset(viewsets.ModelViewSet):
    serializer_class = user_serializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]
    
    def update_firstname(instance, firstname):
        instance.firstname = firstname
        instance.save()

    def update_lastname(instance, lastname):
        instance.lastname = lastname
        instance.save()

    def get_field_dict(instance):
        field_dict = {
            "first_name": update_firstname,
            "last_name": update_lastname,
        }
        return field_dict
    
    @action(detail=True, methods=['patch'], permission_classes=[permissions.IsAuthenticated],
            url_path='edit-user', url_name='edit_user')
    def edit_user(self, request, pk=None):
        user = User.objects.filter(username=pk)[0]
        if not user:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        try:
            data = request.data
            field_dict = get_field_dict()
            for key in data:
                if(request.data[key] != "None"):
                    field_dict[key](user, request.data[key])
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def get_queryset(self):
        queryset = ''
        try:
            queryset = self.request.user.staff.all()
            return queryset
        except AttributeError as error:
            return Staff.objects.none()


class booking_viewset(viewsets.ModelViewSet):
    serializer_class = booking_serializer
    
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):
        date = self.request.query_params.get('date', None)
        try:
            return Booking.objects.filter(date=date)
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)


class customer_booking_viewset(viewsets.ModelViewSet):
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

class staff_viewset(viewsets.ModelViewSet):
    serializer_class = staff_serializer
    
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):
        return self.request.user.staff.all()