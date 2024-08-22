
# Create your views here.

from .models import User, Book, User_Book, AccessToken
from .serializer import UserSerializer, BookSerializer, LoginSerializer, User_BookSerializer

from .get_data import get_and_save_data, only_get_data

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from gensim.models import KeyedVectors

import numpy as np

import pickle


def book(request):
	if request.method == 'GET':
		books = Book.objects.all()
		if "category_id" in request.GET:
			books = books.filter(category_id = request.GET.get("category_id"))
		if "sort_by" in request.GET:
			books = books.order_by(request.GET.get("sort_by"))
		return JsonResponse(BookSerializer(books, many=True).data, safe = False)


def book_list(request):
	if request.method == 'GET':
		if "user_id" in request.GET:
			books = User_Book.objects.filter(_user_id = request.GET.get("user_id"))
		else:
			return JsonResponse({"is_success": "false", "status": "less parameter"})
		if "category_id" in request.GET:
			books = books.filter(category_id = request.GET.get("category_id"))
		if "sort_by" in request.GET:
			books = books.order_by(request.GET.get("sort_by"))
		return JsonResponse(User_BookSerializer(books, many=True).data, safe = False)


def book_get(request):
	if request.method == 'GET':
		if "ISBN" in request.GET:
			if Book.objects.filter(ISBN = request.GET.get("ISBN")).exists():
				book = Book.objects.get(ISBN = request.GET.get("ISBN"))
				return JsonResponse(BookSerializer(book).data, safe = False)
			else:
				res = only_get_data(request.GET.get("ISBN"))
				if res == False:
					return JsonResponse({"is_success": "false", "status": "not exist ISBN"})
				else: 
					return JsonResponse(res)
		else:
			return JsonResponse({"is_success": "false", "status": "less parameter"})
		

def book_detail(request):
	if request.method == 'GET':
		if not ("user_id" in request.GET):
			return JsonResponse({"is_success": "false", "status": "less parameter"})
		if not ("book_id" in request.GET):
			return JsonResponse({"is_success": "false", "status": "less parameter"})
		book = User_Book.objects.get(_user_id = request.GET.get("user_id"), _book_id = request.GET.get("book_id"))
		return JsonResponse(User_BookSerializer(book).data, safe = False)
	
	
# @csrf_exempt
def book_edit(request):
	if request.method == 'POST':
		if not ("user_id" in request.GET):
			return JsonResponse({"is_success": "false", "status": "less parameter"})
		if not ("book_id" in request.GET):
			return JsonResponse({"is_success": "false", "status": "less parameter"})
		
		book = User_Book.objects.get(_user_id = request.GET.get("user_id"), _book_id = request.GET.get("book_id"))
		if "state" in request.POST:
			book.state = request.POST.get("state")
			book.save()
		return JsonResponse({"is_success": "true"})


def book_regist(request):
	if request.method == 'GET':
		if not ("user_id" in request.GET):
			return JsonResponse({"is_success": "false", "status": "less parameter"})
		if not ("ISBN" in request.GET):
			return JsonResponse({"is_success": "false", "status": "less parameter"})
		
		if get_and_save_data(request.GET.get("ISBN"), request.GET.get("user_id")):
			book = User_Book.objects.get(_user_id = request.GET.get("user_id"), ISBN = request.GET.get("ISBN"))
		else:
			return JsonResponse({"is_success": "false", "status": "something wrong"})
		return JsonResponse({"is_success": "true", "book_id": book._book_id})

#@csrf_exempt
def book_search(request):
	if request.method == 'POST':
		if not ("word" in request.POST):
			return JsonResponse({"is_success": "false", "status": "less parameter"})
		
		word = request.POST.get("word")

		model = KeyedVectors.load('api/model/keyword.kv')
		if not model.has_index_for(word):
			return JsonResponse({"is_success": "false", "status": "unkown word"})
		word_vec = model.get_vector(word)
		similar = []

		if "user_id" in request.GET:
			user_books = User_Book.objects.filter(_user_id = request.GET.get("user_id"))
			if "category_id" in request.GET:
				user_books = user_books.filter(category_id = request.GET.get("category_id"))
			
			for book in user_books:
				book_vec = pickle.loads(book.vector)
				cos_simil = book_vec @ word_vec / np.sqrt(np.nansum(np.power(book_vec, 2)) * np.nansum(np.power(word_vec, 2)))
				similar.append((cos_simil, book.id))
			
			res = sorted(similar, reverse=True)[:10]
			res_book = User_Book.objects.filter(id = res[0][1])
			for r in res:
				res_book = res_book | User_Book.objects.filter(id = r[1])

			return JsonResponse(User_BookSerializer(res_book, many=True).data, safe=False)

		else:

			books = Book.objects.all()
			if "category_id" in request.GET:
				books = books.filter(category_id = request.GET.get("category_id"))

			for book in books:
				book_vec = pickle.loads(book.vector)
				cos_simil = book_vec @ word_vec / np.sqrt(np.nansum(np.power(book_vec, 2)) * np.nansum(np.power(word_vec, 2)))
				similar.append((cos_simil, book.id))

			res = sorted(similar, reverse=True)[:10]
			res_book = Book.objects.filter(id = res[0][1])
			for r in res:
				res_book = res_book | Book.objects.filter(id = r[1])

			return JsonResponse(BookSerializer(res_book, many=True).data, safe=False)




	

def user(request):
	if request.method == 'GET':
		if "user_id" in request.GET:
			user = User.objects.get(user_id = request.GET.get("user_id"))
			return JsonResponse(UserSerializer(user).data, safe = False)
		else:
			users = User.objects.all()
			serializer = UserSerializer(users, many=True)
			return JsonResponse(serializer.data, safe=False)
	




# ユーザ登録
class RegisterView(APIView):
    @staticmethod
    def post(request, *args, **kwargs):
        print(request.data)
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):

            # UserIDがすでに使われていた場合
            if User.objects.filter(name=serializer.validated_data['name']).exists():
                return Response({'error': 3}, status=400)

            # エラーなし
            try:
                serializer.save()
            except:
                # データベースエラー
                return Response({'error': 11}, status=500)

            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)



# ログイン
class LoginView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = User.objects.get(name=serializer.validated_data["name"])
            name = serializer.validated_data['name']
            id = user.id
            token = AccessToken.create(user)
            return Response({'detail': "ログインが成功しました。", 'error': 0, 'token': token.token, 'name': name, 'id': id})
        return Response({'error': 1}, status=400)


