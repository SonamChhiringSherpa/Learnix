from django.contrib import admin
from .models import Category, BlogPost
# Register your models here.
admin.site.site_header = "Learnix Admin"
admin.site.index_title = "Welcome to Learnix Admin Portal"
class BlogAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}
admin.site.register(Category)
admin.site.register(BlogPost,BlogAdmin)