
import random


import requests



def get_and_save_data(isbn):


	url = "https://ndlsearch.ndl.go.jp/api/sru?operation=searchRetrieve&query=isbn%3d\"" + isbn + "\""
	data = requests.get(url)
	text = data.text

	if text.find("Record does not exist") != -1:
		return False

	
	# 書影
	url_image = "https://ndlsearch.ndl.go.jp/thumbnail/" + isbn + ".jpg"

	response = requests.get(url_image)
	if response.headers['Content-Type'] != "image/jpeg": # 書影がない
		return False

	print("get")

	f = open("ISBNmemo.txt", 'a')
	f.write(isbn + '\n')
	f.close()

	return True

def main():

	# 1000 冊めも
	i = 0
	while i < 1000:
		isbn = "9784"
		odd = 17
		even = 11
		for j in range(8):
			a = random.randint(0,9)
			isbn = isbn + str(a)
			if j % 2 == 0:
				odd += a
			else:
				even += a
		
		lastNum = (10 - (odd + even*3) % 10) % 10
		isbn += str(lastNum)

		print(isbn)

		if get_and_save_data(isbn) == True:
			i += 1

		


if __name__ == "__main__":
	main()