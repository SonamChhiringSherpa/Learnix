from django.shortcuts import render
from django.http import Http404
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.forms.models import model_to_dict
from .models import CourseProgress
import json

# Create your views here.
def course(request):
    return render(request, 'courses.html')

def bash_course(request):
    return render(request, 'bash-course.html')
def bash_practice(request):
    return render(request, 'bash-practice.html')
def html_course(request):
    return render(request, 'html-course.html')
def html_practice(request):
    return render(request, 'html-practice.html')

def bash_lesson(request, num: int):
    template_map = {
        1: 'bash-course/bash-lesson-1.html',
        2: 'bash-course/bash-lesson-2.html',
        3: 'bash-course/bash-lesson-3.html',
        4: 'bash-course/bash-lesson-4.html',
        5: 'bash-course/bash-lesson-5.html',
    }
    tpl = template_map.get(num)
    if not tpl:
        raise Http404("Lesson not found")
    return render(request, tpl)

def html_lesson(request, num: int):
    template_map = {
        1: 'html-course/html-lesson-1.html',
        2: 'html-course/html-lesson-2.html',
        3: 'html-course/html-lesson-3.html',
        4: 'html-course/html-lesson-4.html',
        5: 'html-course/html-lesson-5.html',
    }
    tpl = template_map.get(num)
    if not tpl:
        raise Http404("Lesson not found")
    return render(request, tpl)


def _get_or_create_progress(user, course_key: str) -> CourseProgress:
    obj, _ = CourseProgress.objects.get_or_create(user=user, course=course_key)
    return obj


@login_required
@require_http_methods(["GET"])
def progress_get(request, course: str):
    if course not in ("bash", "html"):
        return JsonResponse({"error": "invalid course"}, status=400)
    prog = _get_or_create_progress(request.user, course)
    data = {
        "points": prog.points,
        "badges": prog.badges,
        "lessonsCompleted": prog.lessonsCompleted,
        "quizzes": prog.quizzes,
        "lastLesson": prog.lastLesson,
        "username": request.user.get_username(),
    }
    return JsonResponse(data)


@login_required
@require_http_methods(["POST"])
def progress_update(request, course: str):
    if course not in ("bash", "html"):
        return JsonResponse({"error": "invalid course"}, status=400)
    try:
        payload = json.loads(request.body.decode("utf-8") or "{}")
    except Exception:
        return JsonResponse({"error": "invalid json"}, status=400)

    prog = _get_or_create_progress(request.user, course)
    # Merge-like update with safety
    if "points" in payload and isinstance(payload["points"], int):
        prog.points = max(0, payload["points"])
    if "badges" in payload and isinstance(payload["badges"], list):
        prog.badges = payload["badges"]
    if "lessonsCompleted" in payload and isinstance(payload["lessonsCompleted"], dict):
        prog.lessonsCompleted = payload["lessonsCompleted"]
    if "quizzes" in payload and isinstance(payload["quizzes"], dict):
        prog.quizzes = payload["quizzes"]
    if "lastLesson" in payload and isinstance(payload["lastLesson"], int):
        prog.lastLesson = payload["lastLesson"]
    prog.save()
    return JsonResponse({"ok": True})
