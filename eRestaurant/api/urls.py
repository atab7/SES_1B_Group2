from django.urls import path, include
from . import views
from rest_framework.urlpatterns import format_suffix_patterns
urlpatterns = [
    path('', views.api_overview, name="api_overview"),
    path('user-list/', views.user_list.as_view()),
    path('user-create/', views.user_create.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)