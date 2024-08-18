# coding: utf-8

from .views import all_book_list, user_book_list, book_detail, all_user_list, user_detail
from django.urls import path



urlpatterns = [
	path('book/', all_book_list),
	path('book/<int:book_id>/', book_detail),
	path('user/', all_user_list),
	path('user/<int:user_id>/', user_detail),
	path('user/<int:user_id>/books/', user_book_list),
]