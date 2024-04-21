from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from django.core.paginator import Paginator
from .models import User, Post, Follow

def index(request):
    return render(request, "network/index.html")

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

#New Post
@login_required
def new_post(request):
    if request.method == 'POST':
        content =request.POST['content']
        post = Post.objects.create(user=request.user, content=content)
        return redirect('posts')
    return render(request, 'network/new_post.html')

#All Posts
@login_required
def posts(request):
    posts = Post.objects.all()
    paginator = Paginator(posts, 3)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, 'network/posts.html', {'page_obj': page_obj})

#Profile
@login_required
def profile(request, user_id):
    #Get profile and check if the user is following
    profile = User.objects.get(id=user_id)
    following = Follow.objects.filter(user=profile, follower=request.user).exists()

    followers = [x.user for x in request.user.follower.all()]
    followers_count = len(followers)

    posts = Post.objects.filter(user=profile).order_by('-created_at')

    paginator = Paginator(posts, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'network/profile.html',
    {'profile': profile, 'following': following, 'followers': followers, 'followers_count': followers_count, 'posts': posts, 'page_obj': page_obj}
    )

#Follow
@login_required
def follow(request, user_id):
    # Get the user to be followed
    user_to_follow = get_object_or_404(User, id=user_id)

    # Create a new Follow object
    Follow.objects.create(user=user_to_follow, follower=request.user)

    # Redirect back to the user's profile page (or wherever you want)
    return redirect('profile', user_id=user_id)

@login_required
def unfollow(request, user_id):
    # Get the user to be unfollowed
    user_to_unfollow = get_object_or_404(User, id=user_id)

    # Delete the Follow object
    Follow.objects.filter(user=user_to_unfollow, follower=request.user).delete()

    # Redirect back to the user's profile page (or wherever you want)
    return redirect('profile', user_id=user_id)

#Edit Post
@login_required
def edit_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)

    if request.method == 'POST':
        post.content = request.POST['content']
        post.save()
        return redirect('profile', user_id=post.user.id)

    return render(request, 'network/edit_post.html', {'post': post})

#Like and Unlike
@login_required
def like_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)

    # Check if the user has already liked the post
    if post.like.filter(id=request.user.id).exists():
        post.like.remove(request.user)
    else:
        post.like.add(request.user)

    return redirect('posts')

#Following Posts
@login_required
def following_posts(request):
    # Get all the users that the current user is following
    following = User.objects.filter(follows__follower=request.user)

    # Get all the posts of the users the current user is following
    posts = Post.objects.filter(user__in=following).order_by('-created_at')

    paginator = Paginator(posts, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'network/following_posts.html', {'page_obj': page_obj})

@login_required
def following(request):
    # Get all the users that the current user is following
    following = User.objects.filter(follows__follower=request.user)

    # Get all the posts of the users the current user is following
    posts = Post.objects.filter(user__in=following).order_by('-created_at')

    paginator = Paginator(posts, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'network/following.html', {'page_obj': page_obj})