from django.db import models
from django.contrib.auth.models import User

# Create your models here.
# Need to create serializers for some (maybe all) of these models


class Menu(models.Model):
    menu_type    = models.CharField(max_length=60, null=True)
    date_created = models.DateField(null=True)
    last_edited  = models.DateField(null=True)
    def __str__(self):
        return self.menu_type

#class Recipe(models.Model):
#    ingredient_ID = models.IntegerField(primary_key=True)
#    item_ID = models.ForeignKey(Item, on_delete=models.SET_NULL, null=True)

class Restaurant(models.Model):
    name       = models.CharField(max_length=100, null=True)
    address    = models.CharField(max_length=200, null = True)
    open_hours = models.CharField(max_length=100, null=True)
    def __str__(self):
        return self.name

class Meal(models.Model):
    name        = models.CharField(max_length=100, null=False)
    description = models.CharField(max_length=300, null=True)
    cost        = models.FloatField(null=True)
    def __str__(self):
        return self.name

#class Ingredient(models.Model):
#    ingredient_ID = models.IntegerField(primary_key=True)
#    name = models.CharField(max_length=200, null=True)
#    stock_amount = models.IntegerField(null=True)

class Staff(models.Model):
    user            = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, default=0) 
    address         = models.CharField(max_length=200, null=True)
    phone_number    = models.IntegerField(null=True)
    tax_file_number = models.IntegerField(null=False)
    restaurant      = models.ForeignKey(Restaurant, null=False, on_delete=models.PROTECT)
    date_hired      = models.DateField(null=True)
    is_manager      = models.BooleanField(null=False)
    def __str__(self):
        return self.tax_file_number

#class Head_Chef(models.Model):
#    user_ID = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    #access = 

class Customer(models.Model):
    user            = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, default=0) 
    address         = models.CharField(max_length=200, null=True)
    phone_number    = models.IntegerField(null=True)
    payment_details = models.CharField(max_length=200, null=True) #Might need to double check 'null=True' --Aryan
    def __str__(self):
        return self.phone_number

#class Admin(models.Model):
#    user_ID = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
#    #access = 

class Reward(models.Model):
    title          = models.CharField(null=False, max_length=60)
    points_percent = models.IntegerField()
    def __str__(self):
        return self.title

class Customer_Rewards(models.Model):
    ID         = models.AutoField(primary_key=True)
    user       = models.ForeignKey(User, on_delete=models.PROTECT, null=False)
    rewards    = models.ForeignKey(Reward, on_delete=models.PROTECT, null=False)
    def __str__(self):
        return self.ID

class Booking(models.Model):
    ID               = models.AutoField(primary_key=True)
    customer         = models.ForeignKey(User, null=False, on_delete=models.PROTECT)
    restaurant       = models.ForeignKey(Restaurant, null=False, on_delete=models.PROTECT)
    date             = models.DateField()
    time             = models.TimeField()
    number_of_people = models.IntegerField(null=True)
    def __str__(self):
        return self.ID

class Order(models.Model):
    ID       = models.AutoField(primary_key=True)
    customer = models.ForeignKey(User, null=False, on_delete=models.PROTECT) #Whenever a user is deleted, the order remains with a null value , maybe we can remove this?!?
    meal     = models.ForeignKey(Meal, null=False, on_delete=models.PROTECT)
    #receipt =
    def __str__(self):
        return self.ID
    # Foreign key convention: name = models.ForeignKey(parentModel/ForeignKey, null=True, optional(on_delete=models.SET_NULL))
    #meal = models.ForeignKey(...) TBD

class Booking_Order(models.Model):
    ID          = models.AutoField(primary_key=True)
    booking     = models.ForeignKey(Booking, null=False, on_delete=models.PROTECT)
    order       = models.ForeignKey(Order, null=False, on_delete=models.PROTECT)
    def __str__(self):
        return self.ID

class Menu_Item(models.Model):
    ID   = models.AutoField(primary_key=True)
    meal = models.ForeignKey(Meal, on_delete=models.SET_NULL, null=True)
    menu = models.ForeignKey(Menu, on_delete=models.SET_NULL, null=True)
    def __str__(self):
        return self.ID