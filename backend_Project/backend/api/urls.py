# coding: utf-8

from . import views

from .views import all_book_list, user_book_list, book_detail, all_user_list, user_detail
from django.urls import path, include
from django.contrib.staticfiles.urls import static
from django.conf import settings



urlpatterns = [
	path('book/', all_book_list),
	path('book/<int:book_id>/', book_detail),
	path('user/', all_user_list),
	path('user/<int:user_id>/', user_detail),
	path('user/<int:user_id>/books/', user_book_list),
	path('signup/', views.RegisterView.as_view(), name='user-signup'),
	path('login/', views.LoginView.as_view(), name='user-login'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)