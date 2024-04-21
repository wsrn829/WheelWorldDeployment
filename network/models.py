from django.core.validators import RegexValidator
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='post')
    content = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    like = models.ManyToManyField(User, blank=True, related_name='like', )

    class Meta:
        ordering = ['-created_at']

class Follow(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='follows')
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='follower')