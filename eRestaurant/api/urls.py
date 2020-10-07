from django.urls import path, include
from . import views
from django.views.generic import TemplateView
from rest_framework.urlpatterns import format_suffix_patterns

from rest_framework import routers
from .api import *

router = routers.DefaultRouter()
router.register('manageRewards', manager_reward_viewset, 'manageRewards')
router.register('bookings', booking_viewset, 'bookings')
router.register('restaurants', restaurant_viewset, 'restaurants')
router.register('users', user_viewset, 'users')
router.register('staff', staff_viewset, 'staff')
urlpatterns = router.urls

#urlpatterns = [
#    #path('', views.api_overview, name="api_overview"),
#    path('user-list/', views.user_list.as_view()),
#    path('user-create/', views.user_create.as_view()),
#]
#
#urlpatterns = format_suffix_patterns(urlpatterns)
