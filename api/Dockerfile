FROM python:latest

WORKDIR /app

RUN apt-get update \
    && apt-get install -y python3 python3-pip

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN pip install gunicorn
COPY . .

CMD ["nohup", "gunicorn", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:8080", "main:app", "&"]

