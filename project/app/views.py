from django.shortcuts import render
from portfolio.models import Portfolio,Project
# Create your views here.
def home(request):
    return render(request, 'index.html')
def about(request):
    Personal_info = Portfolio.objects.all()
    Projects = Project.objects.all()
    context = {
        'Personal_info': Personal_info,
        'Projects': Projects
    }
    return render(request, 'about.html',context)