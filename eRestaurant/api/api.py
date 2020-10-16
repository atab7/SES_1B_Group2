from .models import *
from rest_framework import viewsets, permissions
from .serializers import * 
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
from datetime import datetime


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
    def set_inactive(self, request, pk=None):
        instance = Reward.objects.filter(pk=pk)[0]
        if not instance:
              return Response(status=status.HTTP_400_BAD_REQUEST)
        instance.is_valid = False
        instance.save()
        return Response(status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        serializer.save()


class edit_user_viewset(viewsets.ModelViewSet):
    serializer_class = user_serializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def create(self, request):
        user = User.objects.filter(username=self.request.user.username)[0]
        if not user:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            data = request.data
            for key in data:
                if key == 'first_name':
                    user.first_name = data[key]
                    user.save()
                elif key == 'last_name':
                    user.last_name = data[key]
                    user.save()
                elif key == 'email':
                    if User.objects.filter(username=data[key]).exists():
                        return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
                    else:
                        user.email = data[key]
                        user.save()
                        user.username = data[key]
                        user.save()
                else:
                    pass
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class edit_staff_viewset(viewsets.ModelViewSet):
    serializer_class = staff_serializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def create(self, request):
        account = None
        try:
            account = Staff.objects.filter(user=self.request.user)[0]
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            data = request.data
            for key in data:
                print(key)
                if key == 'address':
                    account.address = data[key]
                    account.save()
                elif key == 'phone':
                    account.phone_number = data[key]
                    account.save()
                else:
                    pass
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
class edit_customer_viewset(viewsets.ModelViewSet):
    serializer_class = customer_serializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def create(self, request):
        account = None
        try:
            account = Customer.objects.filter(user=self.request.user)[0]
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            data = request.data
            for key in data:
                if key == 'address':
                    account.address = data[key]
                    account.save()
                elif key == 'phone':
                    account.phone_number = data[key]
                    account.save()
                else:
                    pass
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        


class user_viewset(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = user_serializer
    queryset = User.objects.all()
    
    def list(self, request):
        user = User.objects.filter(username=self.request.user.username)[0]
        serializer = user_serializer(user, many=False)
        return Response(serializer.data)
 

class manager_booking_viewset(viewsets.ModelViewSet):
    serializer_class = booking_serializer
    
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):
        date = self.request.query_params.get('date', None)
        try:
            manager = Staff.objects.filter(user=self.request.user)[0]
            return Booking.objects.filter(date=date, restaurant=manager.restaurant)
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)

class customer_booking_viewset(viewsets.ModelViewSet):
    serializer_class = booking_serializer
    
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):
        date = self.request.query_params.get('date', None)
        try:
            return Booking.objects.filter(date=date, customer=self.request.user, is_active=True)
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['patch'], permission_classes=[permissions.IsAuthenticated],
            url_path='cancel-booking', url_name='cancel_booking')
    def set_inactive(self, request, pk=None):
        instance = Booking.objects.filter(pk=pk)[0]
        if not instance:
              return Response(status=status.HTTP_400_BAD_REQUEST)
        instance.is_active = False
        instance.save()
        return Response(status=status.HTTP_200_OK)


class booking_viewset(viewsets.ModelViewSet):
    serializer_class = booking_serializer
    
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    queryset = Booking.objects.all()

    def create(self, request):
        try:
            booking_info = self.request.data
            restaurant = Restaurant.objects.get(pk=booking_info['restaurant'])
            
            is_breakfast = False
            is_lunch = False
            is_dinner = False
            if booking_info['day_time'] == 'Breakfast':
                is_breakfast = True
            elif booking_info['day_time'] == 'Lunch':
                is_lunch = True
            elif booking_info['day_time'] == 'Dinner':
                is_lunch = True

            total_price = 0 
            for order in booking_info['orders']:
                total_price = total_price + order['price']

            new_booking = Booking(price=total_price, is_breakfast=is_breakfast, is_lunch=is_lunch, is_dinner=is_dinner, number_of_people=booking_info['number_of_people'], time=datetime.strptime(booking_info['time'], '%H:%M'), customer=self.request.user, restaurant=restaurant, date=datetime.strptime(booking_info['date'], '%Y-%m-%d'))
            new_booking.save()
            
            for order in booking_info['orders']:
                meal = Meal.objects.get(pk=order['id'])
                order = Order(booking=new_booking, meal=meal)
                order.save()
            
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        #serializer.save(customer=self.request.user)

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

class customer_viewset(viewsets.ModelViewSet):
    serializer_class = customer_serializer
    
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):
        return self.request.user.customer.all()
       

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class confirm_email_viewset(viewsets.ViewSet):
    serializer_class = customer_serializer
    
    permission_classes = [
        permissions.AllowAny,
    ]
    queryset = Customer.objects.all()

    def list(self, request):
        email = self.request.query_params.get('email', None)
        try:
            user = User.objects.filter(username=email)[0]
            customer = Customer.objects.filter(user=user)[0]
            customer.is_confirmed = True
            customer.save()
            return HttpResponseRedirect(redirect_to='http://127.0.0.1:8000/emailconfirmed')
        except:
            return HttpResponseRedirect(redirect_to='http://127.0.0.1:8000/bademail')


class menu_viewset(viewsets.ModelViewSet):
    serializer_class = menu_serializer
    
    permission_classes = [
        permissions.AllowAny,
    ]

    def get_queryset(self):
        menutype = self.request.query_params.get('menutype', None)
        try:
            menu = Menu.objects.get(menu_type=menutype)
            meals = menu.meals.all()
            return meals
        except:
            return Meal.objects.none()
        