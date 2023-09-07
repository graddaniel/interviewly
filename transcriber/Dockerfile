FROM python:3.8-slim
WORKDIR /app
COPY transcriber /app/transcriber
WORKDIR /app/transcriber
RUN apt update
RUN apt install -y ffmpeg
RUN pip3 install pika
RUN pip install boto3
RUN pip install -vv "openai-whisper==20230124"
ENTRYPOINT ["python", "-u", "transcriber.py"]