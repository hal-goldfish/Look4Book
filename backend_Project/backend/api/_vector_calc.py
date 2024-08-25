import os
from api.models import Book, User, User_Book
from sklearn.feature_extraction.text import TfidfVectorizer
from gensim.models import KeyedVectors
import pickle
import numpy as np


# 各本の特徴ベクトルを計算

def vector_calc():

	os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')


	overviews = Book.objects.values_list("overview")
	corpus = []

	for s in overviews:
		corpus.append(s[0].split())

	vectorizer = TfidfVectorizer(analyzer=lambda x: x)
	# tf-idf
	w = vectorizer.fit_transform(corpus)
	feature_names = vectorizer.get_feature_names_out()

	model = KeyedVectors.load('api/model/keyword.kv')

	e = []
	for i in range(0,300):
		e.append(0.0)

	# v = np.empty((0, 300))
	# print(len(feature_names))
	# for word in feature_names:
	# 	if model.has_index_for(word):
	# 		print(model.get_vector(word))
	# 		print(v)
	# 		v = np.append(v, model.get_vector(word).reshape(1,300), axis = 0)
	# 	else:
	# 		print(word)
	# 		print(v)
	# 		v = np.append(v, e.copy().reshape(1,300), axis = 0)

	v = []
	for word in feature_names:
		if model.has_index_for(word):
			v.append(model.get_vector(word).tolist())
		else:
			v.append(e)

	v = np.matrix(v)

	s = w.sum(axis=1)

	doc_vectors = (w @ v) / s

	books = Book.objects.all()
	for book in books:
		book.vector = pickle.dumps(doc_vectors[book.id-1])
		book.save()
	
	user_books = User_Book.objects.all()
	for user_book in user_books:
		user_book.vector = pickle.dumps(doc_vectors[user_book._book_id-1])
		user_book.save()


	return 