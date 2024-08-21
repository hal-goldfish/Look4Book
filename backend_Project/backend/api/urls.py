# coding: utf-8

from . import views

from .views import book, book_list, book_get, book_detail, book_edit, book_regist, user
from django.urls import path, include
from django.contrib.staticfiles.urls import static
from django.conf import settings



urlpatterns = [
	path('book/', book),
	path('book/list', book_list),
	path('book/get/', book_get),
	path('book/detail/', book_detail),
	path('book/edit/', book_edit),
	path('book/regist/', book_regist),
	path('user/', user),
	path('signup/', views.RegisterView.as_view(), name='user-signup'),
	path('login/', views.LoginView.as_view(), name='user-login'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)