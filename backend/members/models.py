from django.db import models
from django.conf import settings
from django.contrib.auth.models import User

class Member(models.Model):
    date = models.DateField()
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100)
    birthday = models.DateField()
    age = models.IntegerField()
    sex = models.CharField(max_length=10)
    marital_status = models.CharField(max_length=20)
    address = models.TextField()
    bus_stop = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    occupation = models.CharField(max_length=100)
    office_address = models.TextField(blank=True, null=True)
    invited_by = models.CharField(max_length=100)
    born_again = models.BooleanField()
    want_membership = models.BooleanField()
    prayer_request = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    # profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Contact(models.Model):
    name = models.CharField(max_length=100, default='Unknown')
    email = models.EmailField(default='N/A')
    message = models.TextField(default='N/A')
    phone = models.CharField(max_length=20, default='0000000000')
    subject = models.CharField(max_length=200, default='General Inquiry')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True,null=True)

    def __str__(self):
        return f"Contact from {self.name}"
    

class Testimony(models.Model):
    CATEGORY_CHOICES = [
        ('healing', 'Healing'),
        ('salvation', 'Salvation'),
        ('provision', 'Divine Provision'),
        ('deliverance', 'Deliverance'),
        ('breakthrough', 'Breakthrough'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    testimony = models.TextField()
    image = models.ImageField(upload_to='media/testimony/user_%(user_id)s/', null=True, blank=True)
    video = models.SlugField(null=True, blank=True)

    def __str__(self):
        return f'Testimony by {self.user} in {self.category}' 