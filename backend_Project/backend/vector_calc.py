import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
from django import setup
setup()
from api._vector_calc import vector_calc





vector_calc()