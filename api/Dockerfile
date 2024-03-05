FROM python:latest

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN yes | sudo apt install nginx
RUN yes | sudo apt install openssl

COPY . .

WORKDIR /

CMD [ "uvicorn", "app.main:app", "--host=0.0.0.0"]
