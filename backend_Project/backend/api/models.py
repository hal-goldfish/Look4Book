from django.db import models
import hashlib
from datetime import timedelta
from django.utils import timezone

# Create your models here.

class Categories:
	categories = [
		"文学・評論",
		"ノンフィクション",
		"ビジネス・経済",
		"歴史・地理",
		"政治・社会",
		"芸能・エンターテインメント",
		"アート・建築・デザイン",
		"人文・思想・宗教",
		"暮らし・健康・料理",
		"サイエンス・テクノロジー",
		"趣味・実用",
		"教育・自己啓発",
		"スポーツ・アウトドア",
		"事典・年鑑・本・ことば",
		"音楽",
		"旅行・紀行",
		"絵本・児童書",
		"コミックス",
	]
	id = {
        "文学・評論": 0,
		"ノンフィクション": 1,
		"ビジネス・経済": 2,
		"歴史・地理": 3,
		"政治・社会": 4,
		"芸能・エンターテインメント": 5,
		"アート・建築・デザイン": 6,
		"人文・思想・宗教": 7,
		"暮らし・健康・料理": 8,
		"サイエンス・テクノロジー": 9,
		"趣味・実用": 10,
		"教育・自己啓発": 11,
		"スポーツ・アウトドア": 12,
		"事典・年鑑・本・ことば": 13,
		"音楽": 14,
		"旅行・紀行": 15,
		"絵本・児童書": 16,
		"コミックス": 17,
	}
 
 


class Book(models.Model):
	ISBN = models.CharField(max_length=13)
	title = models.CharField(max_length=50, null=True)
	author = models.CharField(max_length=20, null=True)
	publisher = models.CharField(max_length=20, null=True)
	overview = models.TextField(null=True)
	book_cover = models.ImageField(upload_to = 'images/', null=True)
	category_id = models.IntegerField(null = True)
    
	def __str__(self):
		return self.title





class User(models.Model):
	name = models.CharField(max_length=20, unique=True)
	password = models.CharField(max_length=20, default="password")
	books = models.ManyToManyField(Book)

	def __str__(self):
		return self.name


# def in_30_days():
#     return timezone.now() + timedelta(days=30)

class AccessToken(models.Model):
    # ひもづくユーザー
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # アクセストークン(max_lengthが40に設定されている理由は、トークンはsha1でハッシュ化した文字列を設定するため)
    token = models.CharField(max_length=40)
    # アクセス日時
    access_datetime = models.DateTimeField()

    def __str__(self):
        # ユーザ名とアクセス日時、トークンが見えるように設定
        dt = timezone.localtime(self.access_datetime).strftime("%Y/%m/%d %H:%M:%S")
        return self.user.name + '(' + dt + ') - ' + self.token

    @staticmethod
    def create(user: User):
        # ユーザの既存のトークンを取得
        if AccessToken.objects.filter(user=user).exists():
            # トークンがすでに存在している場合は削除
            AccessToken.objects.get(user=user).delete()

        # トークン作成（UserID + Password + システム日付のハッシュ値とする）
        dt = timezone.now()
        str = user.name + user.password + dt.strftime('%Y%m%d%H%M%S%f')
        hash = hashlib.sha1(str.encode('utf-8')).hexdigest()

        # トークンをDBに追加
        token = AccessToken.objects.create(
            user=user,
            token=hash,
            access_datetime=dt)

        return token
    
    def get(token_str: str):
        # 引数のトークン文字列が存在するかチェック
        if AccessToken.objects.filter(token=token_str).exists():
            # 存在した場合はトークンを返却
            return AccessToken.objects.get(token=token_str)
        else:
            # 存在しない場合はNoneを返却
            return None

    def check_valid_token(self):
        # このトークンが有効かどうかをチェック
        delta = timedelta(minutes=30)   # 有効時間は30分
        if(delta < timezone.now() - self.access_datetime):
            # 最終アクセス時間から30分以上経過している場合はFalseを返却
            return False

        return True

    def update_access_datetime(self):
        # 最終アクセス日時を現在日時で更新
        self.access_datetime = timezone.now()
        self.save()