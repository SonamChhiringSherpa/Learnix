from django.contrib import admin
from .models import CourseProgress

@admin.register(CourseProgress)
class CourseProgressAdmin(admin.ModelAdmin):
    list_display = ("user", "course", "points", "lastLesson", "updated_at")
    search_fields = ("user__username", "user__email")
    list_filter = ("course",)
