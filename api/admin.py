from django.contrib import admin
from .models import Product, Cart, Comment, Post, Like

# Register your models here.
admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(Comment)
admin.site.register(Post)
admin.site.register(Like)