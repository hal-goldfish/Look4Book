
# Create your views here.

from .models import User, Book, AccessToken
from .serializer import UserSerializer, BookSerializer, LoginSerializer

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


@csrf_exempt
def all_book_list(request):
	if request.method == 'GET':
		books = Book.objects.all()
		serializer = BookSerializer(books, many=True)
		return JsonResponse(serializer.data, safe=False)
	

def book_detail(request, book_id):
	if request.method == 'GET':
		book = Book.objects.get(id = book_id)
		return JsonResponse(BookSerializer(book).data, safe=False)
	

@csrf_exempt
def all_user_list(request):
	if request.method == 'GET':
		users = User.objects.all()
		serializer = UserSerializer(users, many=True)
		return JsonResponse(serializer.data, safe=False)
	

def user_detail(request, user_id):
	if request.method == 'GET':
		user = User.objects.get(id = user_id)
		return JsonResponse(UserSerializer(user).data, safe=False)


def user_book_list(request, user_id):
	if request.method == 'GET':
		user = User.objects.get(id=user_id)
		books = user.books.all()
		return JsonResponse(BookSerializer(books, many=True).data, safe=False)
	




# ユーザ登録
class RegisterView(APIView):
    @staticmethod
    def post(request, *args, **kwargs):
        print(request.data)
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            # パスワードと確認パスワードが一致しない場合
            if serializer.validated_data['password'] != request.data['password_confirmation']:
                return Response({'error': 2}, status=400)

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


