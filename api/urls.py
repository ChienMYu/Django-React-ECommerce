from django.urls import path

from . import views

#import built-in login function (view)
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('', views.index, name='api-index'),
    path('posts/', views.posts, name='api-posts'),
    path('posts/<int:post_id>/', views.individualPost, name='api-individualpost'),
    path('posts/create/', views.createPost, name='api-createpost'),
    path('posts/update/<int:post_id>/', views.updatePost, name='api-updatepost'),
    path('posts/delete/<int:post_id>/', views.deletePost, name='api-deletepost'),
    path('products/', views.products, name='api-products'),
    path('products/<int:product_id>', views.individual, name='api-individual'),
    path('login/', obtain_auth_token, name='api-login'),
    path('register/', views.register, name='api-register'),
    path('cart/add/', views.addCart, name='api-addCart'),
    path('cart/', views.myCart, name='api-Cart'),
    path('cart/delete/', views.deleteCart, name='api-deletecart'),
    path('comment/', views.myComment, name='api-mycomment'),
    path('posts/<int:post_id>/comment/', views.postComment, name='api-postcomment'),
    path('posts/<int:post_id>/comment/add', views.addComment, name='api-addcomment'),
    path('myposts/', views.myPosts, name='api-myposts'),
    path('posts/<int:post_id>/comment/delete/', views.deleteComment, name='api-deletecomment'),
    path('posts/<int:post_id>/like/', views.addLike, name='api-addlike'),
    path('posts/<int:post_id>/likes/', views.getLikes, name='api-likes'),
    path('cart/empty/', views.emptyCart, name='api-emptycart'),
]
