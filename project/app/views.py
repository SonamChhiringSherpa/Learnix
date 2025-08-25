from django.shortcuts import render,redirect
from portfolio.models import Portfolio,Project
from .models import ContactMessage
from django.contrib import messages
from blog.models import BlogPost,Category
# Create your views here.
def home(request):
    blog=BlogPost.objects.all().order_by('-updated_at')[:3]
    context={'blog':blog}
    return render(request, 'index.html',context)
def about(request):
    Personal_info = Portfolio.objects.all()
    Projects = Project.objects.all()
    context = {
        'Personal_info': Personal_info,
        'Projects': Projects
    }
    return render(request, 'about.html',context)

def contact(request):
    if request.method == 'POST':
       name=request.POST.get('name')
       email=request.POST.get('email')
       subject=request.POST.get('subject')
       message=request.POST.get('message')
       ContactMessage.objects.create(name=name,email=email,subject=subject,message=message) 
       messages.success(request, f"Thank you {name}, your message has been sent!")
       return redirect("contact")    
    return render(request, 'contact.html')