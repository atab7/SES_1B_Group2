from rest_framework import serializers
#For whichever model you wish to serialize, import in the following format
# from .models import model
from . models import User, Staff

class user_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class staff_serializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'