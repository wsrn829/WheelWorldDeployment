from django.core.validators import RegexValidator
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, validators=[RegexValidator(r'^[a-zA-Z ]+$')])
    date_of_birth = models.DateField()
    about = models.TextField(blank=True)
    country = models.CharField(max_length=100, blank=True, validators=[RegexValidator(r'^[a-zA-Z ]+$')])
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    follows = models.ManyToManyField('self', related_name='followers', symmetrical=False)

    def __str__(self):
        return self.user.username

class Post(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='posts')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

class Comment(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='user_comments')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='post_comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Like(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')