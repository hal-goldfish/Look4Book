from api.models import User, Book, User_Book, Categories
import requests
from django.utils import timezone
from django.utils.timezone import localtime


def get_and_save_data(isbn, user_id):

	# 本が DB にすでに存在する場合
	if Book.objects.filter(ISBN = isbn).exists():
		book = Book.objects.get(ISBN = isbn)

		# ユーザ - 本が DB にすでに存在する場合
		if User_Book.objects.filter(_user_id = user_id, _book_id = book.id):
			return False
		
		user = User.objects.get(id=user_id)

		user_book = User_Book(
			user = user,
			book = book,
			_user_id = user.id,
			_book_id = book.id,
			state = 0,
			regist_date = localtime(timezone.now()),
			ISBN = book.ISBN,
			title = book.title,
			author = book.author,
			publisher = book.publisher,
			overview = book.overview,
			book_cover = book.book_cover,
			category_id = book.category_id,
		)
		user_book.save()

		return True



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


	# ジャンル
	from openai import OpenAI
	client = OpenAI()

	system_content = """
	# Response format
	以下の選択肢から1つ選んで回答してください。文章では答えないでください。 """
	for c in Categories.categories:
		system_content += c + " | "
	
	user_content = ""
	user_content += "『" + title + "』" + "(" + author + " " + publisher + ")" + "のジャンルは何ですか？"

	completion = client.chat.completions.create(
		model="gpt-4o-mini",
		messages=[
			{
				"role": "system", 
				"content": system_content
			},
			{
				"role": "user",
				"content": user_content
			}
		]
	)

	print(system_content)
	print(user_content)
	print(completion.choices[0].message)

	category = completion.choices[0].message.content
	category_id = 0
	if category in Categories.id:
		category_id = Categories.id[category]
	else:
		category_id = -1                    # カテゴリが不明な場合

	

	# 概要
	system_content = "以下の書籍のテーマ・内容・特徴に関する単語を列挙してください。スペース区切りで、日本語の単語のみを答えてください。文章は答えないでください。"

	user_content = ""
	user_content += "『" + title + "』" + "(" + author + " " + publisher + ")"

	completion = client.chat.completions.create(
		model="gpt-4o-mini",
		messages=[
			{
				"role": "system", 
				"content": system_content
			},
			{
				"role": "user",
				"content": user_content
			}
		]
	)
	print(system_content)
	print(user_content)
	print(completion.choices[0].message)

	overview = completion.choices[0].message.content


	book = Book(ISBN = isbn,
		title = title,
		author = author,
		publisher = publisher, 
		category_id = category_id,
		overview = overview)
	
	book.save()

	
	# 書影
	url_image = "https://ndlsearch.ndl.go.jp/thumbnail/" + isbn + ".jpg"

	response = requests.get(url_image)
	if response.headers['Content-Type'] == "image/jpeg": # 書影がある
		import os
		path = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + "/images/" + str(book.id) + ".jpg"
		with open(path, 'wb') as file:
			file.write(response.content)
		book.book_cover = path

	book.save()

	user = User.objects.get(id=user_id)

	user_book = User_Book(
		user = user,
		book = book,
		_user_id = user.id,
		_book_id = book.id,
		state = 0,
		regist_date = localtime(timezone.now()),
		ISBN = book.ISBN,
		title = book.title,
		author = book.author,
		publisher = book.publisher,
		overview = book.overview,
		book_cover = book.book_cover,
		category_id = book.category_id,
	)
	user_book.save()

	return True



def only_get_data(isbn): 
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


	# ジャンル
	from openai import OpenAI
	client = OpenAI()

	system_content = """
	# Response format
	以下の選択肢から1つ選んで回答してください。 """
	for c in Categories.categories:
		system_content += c + " | "
	
	user_content = ""
	user_content += "『" + title + "』" + "(" + author + " " + publisher + ")" + "のジャンルは何ですか？"

	completion = client.chat.completions.create(
		model="gpt-4o-mini",
		messages=[
			{
				"role": "system", 
				"content": system_content
			},
			{
				"role": "user",
				"content": user_content
			}
		]
	)

	category = completion.choices[0].message.content
	category_id = 0
	if category in Categories.id:
		category_id = Categories.id[category]
	else:
		category_id = -1                    # カテゴリが不明な場合


	book = {
		"ISBN": isbn,
		"title": title,
		"author": author,
		"publisher": publisher, 
		"category_id": category_id
	}
	
	
	# 書影
	# url_image = "https://ndlsearch.ndl.go.jp/thumbnail/" + isbn + ".jpg"

	# response = requests.get(url_image)
	# if response.headers['Content-Type'] == "image/jpeg": # 書影がある
	# 	import os
	# 	path = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + "/images/" + str(book.id) + ".jpg"
	# 	with open(path, 'wb') as file:
	# 		file.write(response.content)
	# 	book.book_cover = path

	return book
