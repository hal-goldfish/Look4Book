from django.db import models

import requests
import xml.etree.ElementTree as ET

# Create your models here.

class User(models.Model):
	name = models.CharField(max_length=20)
	email = models.EmailField()

	def __str__(self):
		return self.name


class Book(models.Model):
	ISBN = models.CharField(max_length=13)
	title = models.CharField(max_length=50, null=True)
	author = models.CharField(max_length=20, null=True)
	publisher = models.CharField(max_length=20, null=True)
	overview = models.TextField(null=True)
	# books_cover = models.ImageField(null=True)
	users = models.ManyToManyField(User)



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

	user = User.objects.get(id=1)
	user.book_set.add(book)

	return True

