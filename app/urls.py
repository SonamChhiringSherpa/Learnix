from django.contrib import admin
from django.urls import path,include
from . import views
urlpatterns = [
   path('home/',views.home,name='home'),
   path('',views.home,name='home'),
   path('about/',views.about,name='about'),
   path('contact/',views.contact,name='contact'),
   path('page_not_found/',views.custom_404_error,name='page_not_found'),
]
