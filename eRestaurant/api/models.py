from django.db import models
from django.contrib.auth.models import User
import datetime

# Create your models here.
# Need to create serializers for some (maybe all) of these models
#discord API integration


class Restaurant(models.Model):
    name       = models.CharField(max_length=100, null=True)
    address    = models.CharField(max_length=200, null = True)
    open_hours = models.CharField(max_length=100, null=True)
    capacity   = models.IntegerField(null=False, default=150)
    def __str__(self):
        return self.name

class Menu(models.Model):
    menu_type    = models.CharField(max_length=60, null=True, unique=True)
    date_created = models.DateField(null=True)
    last_edited  = models.DateField(null=True)
    def __str__(self):
        return self.menu_type

class Meal(models.Model):
    menu        = models.ForeignKey(Menu, related_name='meals', on_delete=models.CASCADE, null=True, unique=False)
    name        = models.CharField(max_length=100, null=False)
    description = models.CharField(max_length=300, null=True)      
    price       = models.FloatField(null=True)
    is_active   = models.BooleanField(null=False, default=True)
    def __str__(self):
        return self.name

class Staff(models.Model):
    user            = models.ForeignKey(User, related_name='staff', on_delete=models.CASCADE, unique=True, default=0) 
    address         = models.CharField(max_length=200, null=True)
    phone_number    = models.CharField(null=True, max_length=12)
    tax_file_number = models.CharField(null=False, max_length=9)
    restaurant      = models.ForeignKey(Restaurant, related_name='staff', null=False, on_delete=models.PROTECT)
    date_hired      = models.DateField(null=True)
    is_manager      = models.BooleanField(null=False)
    def __str__(self):
        return self.tax_file_number

class Customer(models.Model):
    ID              = models.AutoField(primary_key=True)
    user            = models.ForeignKey(User, related_name='customer', on_delete=models.CASCADE, default=0, unique=True) 
    address         = models.CharField(max_length=200, null=True)
    phone_number    = models.CharField(null=True, max_length=12)
    payment_details = models.CharField(max_length=200, null=True) #Might need to double check 'null=True' --Aryan
    is_confirmed    = models.BooleanField(null=False, default=False)
    def __str__(self):
        return str(self.ID)

class Reward(models.Model):
    code            = models.CharField(null=True, max_length=60)
    date_created    = models.DateField(default=datetime.date.today())
    valid_until     = models.DateField(null=True) 
    points_percent  = models.IntegerField(null=True)
    is_valid        = models.BooleanField(default=True)
    restaurant      = models.ForeignKey(Restaurant, related_name='rewards', on_delete=models.CASCADE, null=True, unique=False)
    restaurant_name = models.CharField(null=True, max_length=60)
    def __str__(self):
        return self.code

class Booking(models.Model):
    ID               = models.AutoField(primary_key=True)
    customer         = models.ForeignKey(User, related_name='bookings', null=False, on_delete=models.PROTECT, unique=False)
    restaurant       = models.ForeignKey(Restaurant, related_name='bookings', null=False, on_delete=models.PROTECT)
    restaurant_name  = models.CharField(null=True, max_length=60)
    date             = models.DateField()
    time             = models.TimeField()
    number_of_people = models.IntegerField(null=True)
    price            = models.DecimalField(null=True, decimal_places=2, max_digits=7)
    reward           = models.CharField(null=True, max_length=60)
    is_active        = models.BooleanField(default=True)
    is_breakfast     = models.BooleanField(default=False)
    is_lunch         = models.BooleanField(default=False)
    is_dinner        = models.BooleanField(default=False)
    def __str__(self):
        return str(self.ID)

class Order(models.Model):
    ID       = models.AutoField(primary_key=True)
    booking  = models.ForeignKey(Booking, related_name='orders', null=True, on_delete=models.PROTECT, unique=False) #Whenever a user is deleted, the order remains with a null value , maybe we can remove this?!?
    meal     = models.ForeignKey(Meal, related_name='orders',  null=False, on_delete=models.PROTECT)
    is_active = models.BooleanField(default=True, null=False)
    def __str__(self):
        return str(self.ID)
    # Foreign key convention: name = models.ForeignKey(parentModel/ForeignKey, null=True, optional(on_delete=models.SET_NULL))
    #meal = models.ForeignKey(...) TBD
