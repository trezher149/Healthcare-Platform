FROM python:3.10.12
WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

EXPOSE 12777
# CMD ["flask", "--app", "main", "run", "--debug"]
CMD ["python3", "main.py"]