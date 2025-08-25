from django.contrib import admin
from django.urls import path,include
from . import views
urlpatterns = [
    path('login/',views.login_view,name='login'),
    path('register/',views.register_view,name='register'),
    path('forgot-password/',views.forgot_password,name='forgot-password'),
    path('reset-password/<uuid:reset_id>',views.reset_password,name='reset-password'),
]
