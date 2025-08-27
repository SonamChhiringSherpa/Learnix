from django.contrib import admin
from django.urls import path,include
from . import views
urlpatterns = [
   path('portfolio/<slug:slug>/', views.portfolio_detail, name='portfolio_detail'),
]
