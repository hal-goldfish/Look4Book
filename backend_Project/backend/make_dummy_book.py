import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
import django
django.setup()

from api.get_data import get_and_save_data
import random

from dotenv import load_dotenv
load_dotenv()

def main():

	# id=1 のユーザに本を10冊追加
	i = 0
	while i < 10:
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

		if get_and_save_data(isbn, user_id=1) == True:
			i += 1

		


if __name__ == "__main__":
	main()