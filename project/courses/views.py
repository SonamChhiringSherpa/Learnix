from django.shortcuts import render
from django.http import Http404

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
