
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


@csrf_exempt
def book(request):
	if request.method == 'POST':
		books = Book.objects.all()
		if "category_id" in request.POST:
			categories = request.POST.get("category_id").split(" ")
			books = books.filter(category_id__in = categories)
		if "sort_by" in request.POST:
			books = books.order_by(request.POST.get("sort_by"))
			if "reverse" in request.POST and request.POST.get("reverse") == "True":
				books = books.reverse()
		return JsonResponse(BookSerializer(books, many=True).data, safe = False)


@csrf_exempt
def book_list(request):
	if request.method == 'POST':
		if not "user_id" in request.POST:
			return JsonResponse({"is_success": "false", "status": "less parameter"})
		
		res = User_Book.objects.filter(_user_id = request.POST.get("user_id"))

		if "category_id" in request.POST:
			categories = request.POST.get("category_id").split(" ")
			res = res.filter(category_id__in = categories)

		if "favorite" in request.POST:
			favs = request.POST.get("favorite").split(" ")
			res = res.filter(favorite__in = favs)

		if "state" in request.POST:
			states = request.POST.get("state").split(" ")
			res = res.filter(state__in = states)

		if "sort_by" in request.POST:
			res = res.order_by(request.POST.get("sort_by"))
			if "reverse" in request.POST and request.POST.get("reverse") == "True":
				res = res.reverse()

		return JsonResponse(User_BookSerializer(res, many=True).data, safe = False)


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
	
	
@csrf_exempt
def book_edit(request):
	if request.method == 'POST':
		if not ("user_id" in request.GET):
			return JsonResponse({"is_success": "false", "status": "less parameter"})
		if not ("book_id" in request.GET):
			return JsonResponse({"is_success": "false", "status": "less parameter"})
		
		book = User_Book.objects.get(_user_id = request.GET.get("user_id"), _book_id = request.GET.get("book_id"))
		user = User.objects.get(id = request.GET.get("user_id"))

		if "state" in request.POST: # state 処理
			before = book.state
			after = int(request.POST.get("state"))
			state_count = user.state_count.split(" ")
			state_count[before] = str(int(state_count[before]) - 1)
			state_count[after] = str(int(state_count[after]) + 1)
			user.state_count = " ".join(state_count)
			book.state = after

		user.save()

		if "favorite" in request.POST: # favorite 処理
			book.favorite = int(request.POST.get("favorite"))

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
		

	

def user(request):
	if request.method == 'GET':
		if "user_id" in request.GET:
			user = User.objects.get(id = request.GET.get("user_id"))
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
            role = user.role
            token = AccessToken.create(user)
            return Response({'detail': "ログインが成功しました。", 'error': 0, 'token': token.token, 'name': name, 'id': id, 'role':role})
        return Response({'error': 1}, status=400)


