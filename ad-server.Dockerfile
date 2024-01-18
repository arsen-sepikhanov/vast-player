FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /app
WORKDIR /app
COPY adserver/requirements.txt /app
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY adserver/ /app
EXPOSE 5000
WORKDIR /app/code
CMD [ "python", "app.py" ]