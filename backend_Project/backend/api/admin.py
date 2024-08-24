from django.contrib import admin
from .models import User, Book, User_Book

admin.site.register(User)
admin.site.register(Book)
admin.site.register(User_Book)

