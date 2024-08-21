# Generated by Django 3.2.25 on 2024-08-21 12:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ISBN', models.CharField(max_length=13)),
                ('title', models.CharField(max_length=50, null=True)),
                ('author', models.CharField(max_length=20, null=True)),
                ('publisher', models.CharField(max_length=20, null=True)),
                ('overview', models.TextField(null=True)),
                ('book_cover', models.ImageField(null=True, upload_to='images/')),
                ('category_id', models.IntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20, unique=True)),
                ('password', models.CharField(default='password', max_length=20)),
                ('role', models.CharField(default='user', max_length=20)),
                ('books', models.ManyToManyField(to='api.Book')),
            ],
        ),
        migrations.CreateModel(
            name='User_Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('_user_id', models.IntegerField()),
                ('_book_id', models.IntegerField()),
                ('state', models.IntegerField(default=0)),
                ('regist_date', models.DateTimeField()),
                ('ISBN', models.CharField(max_length=13)),
                ('title', models.CharField(max_length=50, null=True)),
                ('author', models.CharField(max_length=20, null=True)),
                ('publisher', models.CharField(max_length=20, null=True)),
                ('overview', models.TextField(null=True)),
                ('book_cover', models.ImageField(null=True, upload_to='images/')),
                ('category_id', models.IntegerField(null=True)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.book')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user')),
            ],
        ),
        migrations.CreateModel(
            name='AccessToken',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(max_length=40)),
                ('access_datetime', models.DateTimeField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user')),
            ],
        ),
    ]
