from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()


class CourseProgress(models.Model):
    COURSE_CHOICES = (
        ("bash", "Bash"),
        ("html", "HTML"),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="course_progress")
    course = models.CharField(max_length=20, choices=COURSE_CHOICES)
    points = models.IntegerField(default=0)
    badges = models.JSONField(default=list, blank=True)
    lessonsCompleted = models.JSONField(default=dict, blank=True)
    quizzes = models.JSONField(default=dict, blank=True)
    lastLesson = models.IntegerField(default=1)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("user", "course")

    def __str__(self):
        return f"{self.user} - {self.course}"

# Create your models here.
