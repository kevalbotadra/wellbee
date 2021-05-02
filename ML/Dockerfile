FROM python:3.7

RUN pip install Flask gunicorn requests openai nltk sklearn
# RUN apt update -qqy && apt install -qqy 

COPY src/ app/
WORKDIR /app

ENV PORT 8080

CMD exec gunicorn --bind :$PORT --workers 3 --threads 16 --timeout 0 app:app
