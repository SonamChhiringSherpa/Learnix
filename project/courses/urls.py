from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('course/', views.course, name='course'),

    # Course overview pages
    path('course/bash-course', views.bash_course, name='bash_course'),
    path('course/html-course', views.html_course, name='html_course'),

    # Practice pages
    path('course/bash-practice', views.bash_practice, name='bash_practice'),
    path('course/html-practice', views.html_practice, name='html_practice'),

    # Dynamic lesson routes
    path('course/bash/lesson/<int:num>/', views.bash_lesson, name='bash_lesson'),
    path('course/html/lesson/<int:num>/', views.html_lesson, name='html_lesson'),
]
