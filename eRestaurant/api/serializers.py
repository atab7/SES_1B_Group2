from rest_framework import serializers
#For whichever model you wish to serialize, import in the following format
# from .models import model
from . models import *

class reward_serializer(serializers.ModelSerializer):
    class Meta:
        model = Reward
        fields = '__all__'

class user_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class staff_serializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'

class booking_serializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

class restaurant_serializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'