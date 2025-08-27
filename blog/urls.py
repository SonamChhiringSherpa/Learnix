from django.contrib import admin
from django.urls import path,include
from . import views
urlpatterns = [
    path('blog/', views.blog, name='blog'),
    path('blog/<slug:slug>/', views.blog_detail, name='blog_detail'),
]
