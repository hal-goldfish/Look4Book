
# Create your views here.

from .models import User, Book
from .serializer import UserSerializer, BookSerializer

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt


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




