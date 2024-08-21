from rest_framework import serializers

from .models import User, Book


class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['id', 'name', 'password']
		extra_kwargs = {'password': {'write_only': True}}

		def create(self, validated_data):
			user = User.objects.create_user(**validated_data)
			return user
		

class LoginSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255, write_only=True)
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    def validate(self, data):
        name = data.get('name')
        password = data.get('password')
        userid = User.objects.get(name=name)
        if name == userid.name:
            if password == userid.password:
                return data

            else:
                raise serializers.ValidationError('ログイン失敗')
            




class BookSerializer(serializers.ModelSerializer):
	class Meta:
		model = Book
		fields = ['id', 'ISBN', 'title', 'author', 'publisher']