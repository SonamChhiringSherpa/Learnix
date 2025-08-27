from django.shortcuts import render, get_object_or_404
from .models import Portfolio,Project

def portfolio_detail(request, slug):
    portfolio = get_object_or_404(Portfolio, slug=slug)
    context = {
        'portfolio': portfolio
    }
    return render(request, 'portfolio_detail.html', context)