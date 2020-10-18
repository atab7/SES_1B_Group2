from .models import *
from rest_framework import viewsets, permissions
from .serializers import * 
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
from datetime import datetime

class customer_reward_viewset(viewsets.ModelViewSet):
    serializer_class = reward_serializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):
        restaurant_id = self.request.query_params.get('restaurant', None)
        if restaurant_id != None:
            try:
                restaurant = Restaurant.objects.get(pk=restaurant_id)
                return Reward.objects.filter(is_valid=True, restaurant=restaurant)
            except Exception as e:
                print(e)
                return Reward.objects.none()
        else:
            return Reward.objects.filter(is_valid=True)

class manager_reward_viewset(viewsets.ModelViewSet):
    serializer_class = reward_serializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):
        #print(self.reverse_action(self.set_inactive.url_name, args=['1']))
        try:
            manager = Staff.objects.get(user=self.request.user)
            return Reward.objects.filter(is_valid=True, restaurant=manager.restaurant)
        except Exception as e:
            print(e)
            return Staff.objects.none()

    @action(detail=True, methods=['patch'], permission_classes=[permissions.IsAuthenticated],
            url_path='remove-reward', url_name='remove_reward')
    def set_inactive(self, request, pk=None):
        instance = Reward.objects.filter(pk=pk)[0]
        if not instance:
              return Response(status=status.HTTP_400_BAD_REQUEST)
        instance.is_valid = False
        instance.save()
        return Response(status=status.HTTP_200_OK)

    def create(self, request):
        try:
            reward_info = self.request.data
            manager = Staff.objects.get(user=self.request.user)
            new_reward = Reward(code=reward_info["code"], points_percent=reward_info['points_percent'], restaurant=manager.restaurant, restaurant_name=manager.restaurant.name)
            new_reward.save()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

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
        except Exception as e:
            print(e)
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
        except Exception as e:
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
            return Booking.objects.filter(date=date, restaurant=manager.restaurant, is_active=True)
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
            return Booking.objects.none()

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

            past_user_bookings = Booking.objects.filter(customer=self.request.user, restaurant=restaurant, date=datetime.strptime(booking_info['date'], '%Y-%m-%d'), is_breakfast=is_breakfast, is_lunch=is_lunch, is_dinner=is_dinner)
            if past_user_bookings.count() > 0:
                return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
            
            current_bookings = Booking.objects.filter(restaurant=restaurant, date=datetime.strptime(booking_info['date'], '%Y-%m-%d'), time=datetime.strptime(booking_info['time'], '%H:%M'))
            capacity = restaurant.capacity
            total_people = 0
            for booking in current_bookings:
                total_people = total_people + booking.number_of_people
                if total_people >= capacity:
                    return Response(status=status.HTTP_451_UNAVAILABLE_FOR_LEGAL_REASONS)

            total_price = 0 
            for order in booking_info['orders']:
                total_price = total_price + order['price']
            
            if booking_info['discount_percentage'] != 0:
                total_price = total_price - (total_price*booking_info['discount_percentage'])
            
            discount_code = 'No Reward'
            if booking_info['discount_code'] != '':
                discount_code = booking_info['discount_code']


            new_booking = Booking(reward=discount_code, restaurant_name=restaurant.name, price=total_price, is_breakfast=is_breakfast, is_lunch=is_lunch, is_dinner=is_dinner, number_of_people=booking_info['number_of_people'], time=datetime.strptime(booking_info['time'], '%H:%M'), customer=self.request.user, restaurant=restaurant, date=datetime.strptime(booking_info['date'], '%Y-%m-%d'))
            new_booking.save()
            
            for order in booking_info['orders']:
                meal = Meal.objects.get(pk=order['id'])
                for i in range(0, order['quantity']):
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

    def create(self, request):
        try:
            info = self.request.data
            user = User.objects.get(username=info['username'])
            user.first_name = info['first_name']
            user.last_name = info['last_name']
            user.save()
            manager    = Staff.objects.get(user=self.request.user)   
            restaurant = manager.restaurant

            staff = Staff(user=user, address=info['address'], phone_number=['number'], restaurant=restaurant, is_manager=True)
            staff.save()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)



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
            meals = menu.meals.filter(is_active=True)
            return meals
        except:
            return Meal.objects.none()

class manage_menu_viewset(viewsets.ModelViewSet):
    serializer_class = menu_serializer
    
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    queryset = Meal.objects.all()

    @action(detail=True, methods=['patch'], permission_classes=[permissions.IsAuthenticated],
            url_path='delete-meal', url_name='delete_meal')
    def set_inactive(self, request, pk=None):
        try:
            instance = Meal.objects.get(pk=pk)
            instance.is_active = False
            instance.save()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def create(self, request):
        meal_info = self.request.data
        try:
            menu = Menu.objects.get(menu_type=meal_info['menu'])
            meal = Meal(menu=menu, name=meal_info['name'], description=meal_info['description'], price=meal_info['price'])
            meal.save()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        


class order_viewset(viewsets.ModelViewSet):
    serializer_class = order_serializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    queryset = Meal.objects.all()
    

    def list(self, request):
        booking_id = self.request.query_params.get('booking', None)
        date = self.request.query_params.get('date', None)
        if booking_id != None:
            try:
                booking = Booking.objects.get(pk=booking_id)
                orders = Order.objects.filter(booking=booking, is_active=True)
                meals = []
                for order in orders:
                    meal = Meal.objects.get(pk=order.meal.id)
                    meals.append({'name':meal.name, 'description':meal.description, 'price':meal.price})

                return Response(status=status.HTTP_200_OK, data=meals)
                
            except Exception as e:
                print(e)
                return Response(status=status.HTTP_400_BAD_REQUEST)

        if date != None:
            try:
                staff = Staff.objects.get(user=self.request.user)   
                restaurant = staff.restaurant
                bookings = Booking.objects.filter(date=date, restaurant=restaurant)
                meals = []
                for booking in bookings:
                    orders = Order.objects.filter(booking=booking, is_active=True)
                    customer = booking.customer
                    customer_name = f'{customer.first_name} {customer.last_name}' 
                    for order in orders:
                        meal = Meal.objects.get(pk=order.meal.id)
                        meals.append({'id':order.pk, 'name':meal.name, 'description':meal.description, 'price':meal.price, 'customer':customer_name, 'time': booking.time})
                return Response(status=status.HTTP_200_OK, data=meals)
            except Exception as e:
                print(e)
                return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['patch'], permission_classes=[permissions.IsAuthenticated],
            url_path='close-order', url_name='close_order')
    def set_inactive(self, request, pk=None):
        try:
            instance = Order.objects.get(pk=pk)
            instance.is_active = False
            instance.save()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

        