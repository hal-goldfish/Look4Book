# Generated by Django 3.2.25 on 2024-08-24 19:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20240823_0241'),
    ]

    operations = [
        migrations.AddField(
            model_name='user_book',
            name='is_delete',
            field=models.CharField(default='false', max_length=10),
        ),
    ]
