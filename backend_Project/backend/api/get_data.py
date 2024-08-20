from api.models import User, Book, Categories
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

	print(system_content)
	print(user_content)
	print(completion.choices[0].message)


	book = Book(ISBN = isbn,
		title = title,
		author = author,
		publisher = publisher, 
		category = completion.choices[0].message.content)
	
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
	print(type(user))
	user.books.add(book)

	return True

