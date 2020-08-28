from django.urls import path, include
from . import views
urlpatterns = [
    path('', views.api_overview, name="api_overview"),
    path('user-list/', views.user_list, name="user_list"),
    path('user-create/', views.user_create, name="user_create"),
]