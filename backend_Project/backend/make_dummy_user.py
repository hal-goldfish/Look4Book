import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
import django
django.setup()

from api.models import User, Book
from faker import Faker



def main():

	# ユーザを三人追加
	for i in range(3):
		fake = Faker()
		user = User(name = fake.name(), email = fake.email())
		user.save()

		


if __name__ == "__main__":
	main()