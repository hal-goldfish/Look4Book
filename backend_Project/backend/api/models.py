from django.db import models


# Create your models here.

class Book(models.Model):
	ISBN = models.CharField(max_length=13)
	title = models.CharField(max_length=50, null=True)
	author = models.CharField(max_length=20, null=True)
	publisher = models.CharField(max_length=20, null=True)
	overview = models.TextField(null=True)
	book_cover = models.ImageField(upload_to = 'images/', null=True)

	def __str__(self):
		return self.title


class User(models.Model):
	name = models.CharField(max_length=20)
	email = models.EmailField()
	books = models.ManyToManyField(Book)

	def __str__(self):
		return self.name
