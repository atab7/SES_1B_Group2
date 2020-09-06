from django.db import models

# Create your models here.
# Need to create serializers for some (maybe all) of these models

class User(models.Model):
    user_ID = models.IntegerField(primary_key=True) #primary_key=True assigns this field to be the primary key --Aryan
    first_name = models.CharField(max_length=200, null=True) #null=True is required to avoid unique constraint violations when saving multiple objects with blank values, just to be safe i guess ? -->Aryan
    last_name = models.CharField(max_length=200, null=True)
    username = models.CharField(max_length=200, null=True)
    password = models.CharField(max_length=200, null=True) #Research into how to create Django password field

    def __str__(self):
        return self.first_name

class Order(models.Model):
    order_ID = models.IntegerField(primary_key=True)
    date = models.DateTimeField(auto_now_add=True) #Auto adds date created to new orders --Aryan
    payment_details = models.CharField(max_length=200, null=True) #Might need to double check 'null=True' --Aryan
    # Foreign key convention: name = models.ForeignKey(parentModel/ForeignKey, null=True, optional(on_delete=models.SET_NULL))
    user_ID = models.ForeignKey(User, null=True, on_delete=models.SET_NULL) #Whenever a user is deleted, the order remains with a null value , maybe we can remove this?!?
    #meal = models.ForeignKey(...) TBD

class Menu(models.Model):
    menu_ID = models.IntegerField(primary_key=True)

class Item(models.Model):
    item_ID = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200, null=True)
    #picture = there is a way to use an image field here, need to import pillow
    #lunch_dinner = ?

class Recipe(models.Model):
    ingredient_ID = models.IntegerField(primary_key=True)
    item_ID = models.ForeignKey(Item, on_delete=models.SET_NULL, null=True)

class Menu_Item(models.Model):
    menu_ItemID = models.IntegerField(primary_key=True)
    item_1 = models.CharField(max_length = 200, null=True)
    #item_2...
    #item_3...

class Restaurant(models.Model):
    restaurant_ID = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100, null=True)
    address = models.CharField(max_length=200, null = True)
    menu_ID = models.ForeignKey(Menu, on_delete=models.SET_NULL, null=True)
    open_hours = models.CharField(max_length=100, null=True)

class Meal(models.Model):
    meal_ID = models.IntegerField(primary_key=True)
    order_ID = models.ForeignKey(Order, null=True, on_delete=models.SET_NULL) #on_delete=models.SET_NULL , still unsure if this should stay
    #item_ID = models.ForeignKey(Item, ...)

class Ingredient(models.Model):
    ingredient_ID = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200, null=True)
    stock_amount = models.IntegerField(null=True)

class Staff(models.Model):
    user_ID = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    address = models.CharField(max_length=200, null=True)
    phone_number = models.IntegerField(null=True)
    email = models.EmailField(max_length = 200, null=True)
    tax_file_number = models.IntegerField()
    #restaurant_ID
    #date_hired
    def __str__(self):
        return self.user_ID

class Head_Chef(models.Model):
    user_ID = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    #access = 

class Manager(models.Model):
    user_ID = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    #access = 

class Customer(models.Model):
    user_ID = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    address = models.CharField(max_length=200, null=True)
    phone_number = models.IntegerField(null=True)
    email = models.EmailField(max_length=200, null=True)

class Admin(models.Model):
    user_ID = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    #access = 

class Rewards(models.Model):
    rewards_ID = models.IntegerField(primary_key=True)
    points_percent = models.IntegerField()

class Customer_Rewards(models.Model):
    customer_rewardsID = models.IntegerField(primary_key=True)
    user_ID = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    rewards_ID = models.ForeignKey(Rewards, on_delete=models.SET_NULL, null=True)


    