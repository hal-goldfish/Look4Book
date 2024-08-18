from api.models import User, Book

import requests


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
				publisher = publisher)
	book.save()

	user = User.objects.get(id=user_id)
	print(type(user))
	user.books.add(book)

	return True


# Book 型を返す
def get_data(isbn):
	url = "https://ndlsearch.ndl.go.jp/api/sru?operation=searchRetrieve&query=isbn%3d\"" + isbn + "\""
	data = requests.get(url)
	text = data.text

	if text.find("Record does not exist") != -1:
		return None
	
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
				publisher = publisher)
	

	return book