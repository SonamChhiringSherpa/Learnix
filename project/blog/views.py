from django.shortcuts import render, get_object_or_404
from .models import BlogPost
from django.core.paginator import Paginator

# Blog List View
def blog(request):
    posts_list = BlogPost.objects.order_by('-created_at')
    featured_post = posts_list.first() if posts_list.exists() else None
    regular_posts = posts_list[1:5]  # next 4 posts after featured
    paginator = Paginator(posts_list, 6)
    page_number = request.GET.get('page')
    posts = paginator.get_page(page_number)
    context = {
        'featured_post': featured_post,
        'regular_posts': regular_posts,
        'all_posts': posts,
    }
    return render(request, 'blog.html', context)

# Blog Detail View
def blog_detail(request, slug):
    post = get_object_or_404(BlogPost, slug=slug)
    related_posts = BlogPost.objects.filter(category=post.category).exclude(id=post.id)[:3]
    context = {
        'post': post,
        'related_posts': related_posts,
    }
    return render(request, 'blog-details.html', context)
