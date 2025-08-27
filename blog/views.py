from django.shortcuts import render, get_object_or_404
from .models import BlogPost
from django.core.paginator import Paginator
from django.db.models import Q
# Blog List View
def blog(request):
    query = request.GET.get('q')
    
    if query:
        # Search by title or author
        posts_list = BlogPost.objects.filter(
            Q(title__icontains=query) | Q(author__icontains=query)
        ).order_by('-created_at')
        featured_post = None  # No featured post for search results
        regular_posts = None  # Show first 4 posts as “regular”
    else:
        posts_list = BlogPost.objects.order_by('-created_at')
        featured_post = posts_list.first() if posts_list.exists() else None
        regular_posts = posts_list[1:5]  # next 4 posts after featured

    # Pagination
    paginator = Paginator(posts_list, 6)
    page_number = request.GET.get('page')
    posts = paginator.get_page(page_number)

    context = {
        'featured_post': featured_post,
        'regular_posts': regular_posts,
        'all_posts': posts,
        'query': query,
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
