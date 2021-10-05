from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

#import models
from django.apps import apps
from rest_framework.serializers import Serializer
from .models import Cart, Product, Comment, Post, Like
from rest_framework.authtoken.models import Token

#import serializers
from .serializers import CartSerializer, PostSerializer, ShopSerializer, RegistrationSerializer, CreatePostSerializer, CommentSerializer



# Create your views here.
@api_view(["GET"])
def index(request):
    return Response(
        {'hello': 'there'}
    )

@api_view(['GET'])
def posts(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def individualPost(request, post_id):
    post = Post.objects.get(id=post_id)
    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def createPost(request):
    user = request.user
    post = Post(author=user)
    serializer = CreatePostSerializer(post,data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def updatePost(request, post_id):
    post = Post.objects.get(id=post_id)
    user = request.user
    if post.author != user:
        return Response({'response': "You don't have permission to edit that."})
    serializer = PostSerializer(instance=post, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)
 

@api_view(["DELETE"])
@permission_classes((IsAuthenticated,))
def deletePost(request, post_id):
    post = Post.objects.get(id=post_id)
    user = request.user
    if post.author != user:
        return Response({'response': "You don't have permission to edit that."})
    post.delete()
    return Response({"messages": "Successfully deleted the post."})

@api_view(["GET"])
def products(request):
    products = Product.objects.all()
    serializer = ShopSerializer(products, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def individual(request, product_id):
    product = Product.objects.get(product_id=product_id)
    serializer = ShopSerializer(product, many=False)
    return Response(serializer.data)

@api_view(["POST"])
def register(request):
    serializer = RegistrationSerializer(data = request.data)
    if serializer.is_valid():
        account = serializer.save()
        token = Token.objects.get(user=account).key
        data = {
            'response': "Successfully registered a new user.",
            'email': account.email,
            'username': account.username,
            'token': token,
        }
    else:
        data = serializer.errors
    return Response(data)

# @api_view(["POST"])
# @permission_classes((IsAuthenticated,))
# def addCart(request):
#     serializer = CartSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response("Successfully added to cart")
#     else:
#         print("addCart did not work.")
#         return Response(serializer.errors)
@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def addCart(request):
    user = request.user
    product = Product.objects.get(product_id = request.data['product_id'])
    cart = Cart(user=user, product = product)
    serializer = CartSerializer(cart, data={"user": user.id, "product": product.product_id}, many=False)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

# @api_view(["GET"])
# @permission_classes((IsAuthenticated,))
# def myCart(request,username):
#     cart = Cart.objects.filter(username = username)
#     serializer = CartSerializer(cart, many=True)
#     print("view Cart response went through")
#     return Response(serializer.data)

@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def myCart(request):
    user = request.user
    cart = Cart.objects.filter(user = user)
    print(cart)
    products = [item.product for item in cart]
    print(products)
    serializer = ShopSerializer(products, many=True)
    print("view Cart response went through")
    return Response(serializer.data)

# @api_view(["DELETE"])
# @permission_classes((IsAuthenticated,))
# def deleteCart(request, username, cart_id):
#     cartItem = Cart.objects.get(cart_id=cart_id)
#     if cartItem.username != username:
#         return Response({"messages": "You do not have permission to delete this item."})
#     cartItem.delete()
#     return Response({"messages": "Successfully deleted the item."})
@api_view(["DELETE"])
@permission_classes((IsAuthenticated,))
def deleteCart(request):
    user = request.user
    cart = Cart.objects.filter(user=user).filter(product=request.data['product_id'])[0]
    if cart:
        cart.delete()
        return Response({'response': "Successfully removed item from cart."})
    return Response({'response': "You do not have that item in your cart."})

@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def myComment(request):
    user = request.user
    cart = Comment.objects.filter(user = user)
    serializer = CommentSerializer(cart, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def postComment(request, post_id):
    comments = Comment.objects.filter(post = Post.objects.get(id=post_id))
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def addComment(request, post_id):
    user = request.user
    print(user)
    comment = Comment(user=user)
    serializer = CommentSerializer(comment,data={
        "post": post_id,
        "user": user.id,
        "content" : request.data["content"],
    })
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def myPosts(request):
    user = request.user
    posts = Post.objects.filter(author=user.id)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

# @api_view(['GET'])
# @permission_classes((IsAuthenticated,))
# def getUser(request):
#     user = request.user
#     username = Token.objects.get(key=user)
#     return Response(username)

@api_view(["DELETE"])
@permission_classes((IsAuthenticated,))
def deleteComment(request, post_id):
    user = request.user
    print(user)
    comment = Comment.objects.get(id=request.data['comment_id'])
    if comment.user == user:
        comment.delete()
        return Response({'response': "Successfully removed comment."})
    return Response({'response': "You are not able to remove this comment."})

@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def addLike(request, post_id):
    user = request.user
    post = Post.objects.get(id=post_id)
    if user in post.liked.all():
        post.liked.remove(user)
    else:
        post.liked.add(user)
    like, created = Like.objects.get_or_create(user=user, post_id=post_id)
    if created == False:
        if like.value == 'Like':
            like.value="Unlike"
            like.save()
            return Response({'response': "You have unliked the post."})
        else:
            like.value = 'Like'
            like.save()
            return Response({'response': "You have liked the post."})
    like.save()
    return Response({'response': "You have created a new like entry."})

@api_view(["GET"])
def getLikes(request,post_id):
    post = Post.objects.get(id=post_id)
    likes = post.liked.all().count()
    return Response(likes)

@api_view(["DELETE"])
@permission_classes((IsAuthenticated,))
def emptyCart(request):
    user = request.user
    cart = Cart.objects.filter(user=user)
    if cart:
        cart.delete()
        return Response({'response': "Successfully removed all items from cart."})
    return Response({'response': "You do not have any items to remove from your cart"})