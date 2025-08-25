from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import handler404
from django.shortcuts import render

# def custom_404(request, exception):
#     return render(request, '404.html', status=404)

# handler404 = custom_404


urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('app.urls')),
    path('',include('portfolio.urls')),
    path('',include('blog.urls')),
    path('',include('accounts.urls')),
    path('',include('courses.urls')),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

