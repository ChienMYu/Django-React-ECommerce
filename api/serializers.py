from rest_framework import serializers 

#import models 
from django.apps import apps
from .models import Cart, Product, Comment, Post, Like
from django.contrib.auth.models import User



class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title','content']

class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type':'password'}, write_only = True)
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {
            'password' : {'write_only': True}
        }
    
    def save(self):
        user = User(
            email=self.validated_data['email'],
            username= self.validated_data['username']
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2: 
            raise serializers.ValidationError({'password': 'Passwords must match'})
        user.set_password(password)
        user.save() #this save function is from the save function from User model not a recursive
        return user

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'