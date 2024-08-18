from api.models import User, Book

import os
import requests
from io import BytesIO
from django.core.files.base import ContentFile


def get_and_save_data(isbn, user_id):
	url = "https://ndlsearch.ndl.go.jp/api/sru?operation=searchRetrieve&query=isbn%3d\"" + isbn + "\""
	data = requests.get(url)
	text = data.text

	if text.find("Record does not exist") != -1:
		return False
	
	# タイトル
	idx = text.find("title")+9
	title = ""
	for i in range(100):
		if text[idx+i] == '&':
			break
		title += text[idx+i]
	
	# 著者
	idx = text.find("creator")
	author = ""
	if idx == -1:
		pass
	else:
		idx += 11
		for i in range(100):
			if text[idx+i] == '&':
				break
			author += text[idx+i]

	# 出版社
	idx = text.find("publisher")+13
	publisher = ""
	for i in range(100):
		if text[idx+i] == '&':
			break
		publisher += text[idx+i]


	book = Book(ISBN = isbn,
		title = title,
		author = author,
		publisher = publisher, )
	
	book.save()

	
	# 書影
	url_image = "https://ndlsearch.ndl.go.jp/thumbnail/" + isbn + ".jpg"

	response = requests.get(url_image)
	if response.headers['Content-Type'] == "image/jpeg": # 書影がある
		path = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + "/images/" + str(book.id) + ".jpg"
		with open(path, 'wb') as file:
			file.write(response.content)
		book.book_cover = path


	book.save()

	user = User.objects.get(id=user_id)
	print(type(user))
	user.books.add(book)

	return True

