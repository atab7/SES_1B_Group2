from django.urls import path, include
from . import views
from django.views.generic import TemplateView
from rest_framework.urlpatterns import format_suffix_patterns

from rest_framework import routers
from .api import *

router = routers.DefaultRouter()
router.register('manageRewards', manager_reward_viewset, 'manageRewards')
router.register('bookings', manager_booking_viewset, 'bookings')
router.register('customer-bookings', customer_booking_viewset, 'customer-bookings')
router.register('make-booking', booking_viewset, 'make-booking')
router.register('restaurants', restaurant_viewset, 'restaurants')
router.register('user', user_viewset, 'user')
router.register('edit-user', edit_user_viewset, 'edit-user')
router.register('edit-staff', edit_staff_viewset, 'edit-staff')
router.register('edit-customer', edit_customer_viewset, 'edit-customer')
router.register('staff', staff_viewset, 'staff')
router.register('customer', customer_viewset, 'customer')
router.register('validation', confirm_email_viewset, 'validation')
router.register('menu', menu_viewset, 'menu')

urlpatterns = router.urls


#urlpatterns = [
#    #path('', views.api_overview, name="api_overview"),
#    path('user-list/', views.user_list.as_view()),
#    path('user-create/', views.user_create.as_view()),
#]
#
#urlpatterns = format_suffix_patterns(urlpatterns)
