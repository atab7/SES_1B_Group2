"""
This file essentially makes the following models visible on the django admin panel. Which allows
us to create the respected objects, etc create a user, staff etc...
"""
from django.contrib import admin
from django.contrib.auth.models import User

# Register your models here.
from .models import *
#Not going to register all models yet, can do later
admin.site.register(Order)
admin.site.register(Restaurant)
admin.site.register(Staff)
admin.site.register(Customer)
admin.site.register(Booking)
admin.site.register(Reward)
