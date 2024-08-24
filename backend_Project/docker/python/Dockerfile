FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /backend
WORKDIR /backend
ADD requirements.txt /backend/
RUN pip install -r requirements.txt
ADD . /backend/

RUN ls
RUN python3 ./manage.py runserver 0.0.0.0:8000