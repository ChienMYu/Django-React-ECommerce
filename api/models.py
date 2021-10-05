
from django.db import models

#Auth token Model Set Up
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver 
from rest_framework.authtoken.models import Token


# Create your models here.
class Product(models.Model):
    title = models.CharField(max_length = 300)
    product_id = models.AutoField(primary_key=True)
    product_type = models.CharField(max_length = 100)
    content = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(blank=True, null=True)
    def __str__(self):
        return f'{self.product_id} | {self.product_type} | {self.price}'

#Create post_save/reciever 
@receiver(post_save, sender=User)
def createAuthToken(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

# class Cart(models.Model):
#     product = models.ForeignKey(Product, on_delete= models.CASCADE)
#     username = models.CharField(max_length = 30)
#     cart_id = models.AutoField(primary_key=True)

#     def __str__(self):
#         return f'{self.username} | {self.product}'

class Cart(models.Model):
    product = models.ForeignKey(Product, on_delete= models.CASCADE)
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    cart_id = models.AutoField(primary_key=True)

    def __str__(self):
        return f'{self.user} | {self.product}'




class Post(models.Model):
    title = models.CharField(max_length = 150)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author')
    content = models.TextField()
    date_posted = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    liked = models.ManyToManyField(User,default=None, blank=True, related_name='liked')


    def __str__(self):
        return f'{self.title} | {self.author} | {self.id}'
    
    @property
    def num_likes(self):
        return self.liked.all().count()

LIKE_CHOICES = (
    ('Like', 'Like'),
    ('Unlike', 'Unlike')
)

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post= models.ForeignKey(Post, on_delete=models.CASCADE)
    value = models.CharField(choices=LIKE_CHOICES, default='Like' , max_length=10)

    def __str__(self):
        return f'{self.user} | {self.value} | {self.post}'

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length = 300, default= "defaulted comment")

    def __str__(self):
        return f'{self.user} | comment ID : {self.id} | user ID: {self.user.id} | post ID: {self.post.id}'