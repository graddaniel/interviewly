import pika, sys, os, whisper, boto3, json

QUEUE_HOST = os.environ.get('QUEUE_HOST')

RECORDINGS_TO_TRANSCRIBE_QUEUE = os.environ.get('RECORDINGS_TO_TRANSCRIBE_QUEUE')
READY_TRANSCRIPTIONS_QUEUE = os.environ.get('READY_TRANSCRIPTIONS_QUEUE')
MEETING_TRANSCRIPTIONS_BUCKET = os.environ.get('MEETING_TRANSCRIPTIONS_BUCKET')

INTERVIEWS_TO_TRANSCRIBE_QUEUE = os.environ.get('INTERVIEWS_TO_TRANSCRIBE_QUEUE')
READY_INTERVIEWS_TRANSCRIPTS_QUEUE = os.environ.get('READY_INTERVIEWS_TRANSCRIPTS_QUEUE')
INTERVIEW_TRANSCRIPTS_BUCKET = os.environ.get('INTERVIEW_TRANSCRIPTS_BUCKET')

AWS_SERVER_PUBLIC_KEY = os.environ.get('AWS_SERVER_PUBLIC_KEY')
AWS_SERVER_SECRET_KEY = os.environ.get('AWS_SERVER_SECRET_KEY')


model = whisper.load_model("base")

def upload_file(file_name, bucket, bucket_key):
    s3_client = boto3.client('s3', 
                      aws_access_key_id=AWS_SERVER_PUBLIC_KEY, 
                      aws_secret_access_key=AWS_SERVER_SECRET_KEY, 
    )

    try:
        response = s3_client.upload_file(file_name, bucket, bucket_key)
    except Exception as e:
        print(e)
        return False
    print(f"Uploaded {bucket_key}")
    return True

def main():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=QUEUE_HOST))

    recordingsToTranscribeChannel = connection.channel()
    recordingsToTranscribeChannel.queue_declare(queue=RECORDINGS_TO_TRANSCRIBE_QUEUE)

    readyTranscriptionsChannel = connection.channel()
    readyTranscriptionsChannel.queue_declare(queue=READY_TRANSCRIPTIONS_QUEUE)

    interviewsToTranscribeChannel = connection.channel()
    interviewsToTranscribeChannel.queue_declare(queue=INTERVIEWS_TO_TRANSCRIBE_QUEUE)

    readyInterviewTranscriptsChannel = connection.channel()
    readyInterviewTranscriptsChannel.queue_declare(queue=READY_INTERVIEWS_TRANSCRIPTS_QUEUE)

    def meetingsCallback(ch, method, properties, body):
        try: 
            fileName = body.decode('UTF-8')
            print(f" [x] Received {fileName}")

            result = model.transcribe(f"./files/{fileName}/{fileName}.mp4")

            #print(result["text"])
            f = open(f"./files/{fileName}/{fileName}.txt", "w")
            f.write(result["text"])
            f.close()

            upload_file(f"./files/{fileName}/{fileName}.txt", MEETING_TRANSCRIPTIONS_BUCKET, f"{fileName}.txt")
            
            readyTranscriptionsChannel.basic_publish(exchange='', routing_key=READY_TRANSCRIPTIONS_QUEUE, body=fileName)

            os.remove(f"./files/{fileName}/{fileName}.mp4")
            os.remove(f"./files/{fileName}/{fileName}.txt")

        except Exception as e:
            print(e)

    def interviewsCallback(ch, method, properties, body):
        try: 
            message = body.decode('UTF-8')
            print(f" [x] Received {message}")
            interviewData = json.loads(message)
            print(f" [x] interviewData {interviewData}")
            filename = interviewData["filename"]
            fileBase = filename.split(".")[0]
            userEmail = interviewData["userEmail"]

            result = model.transcribe(f"./files/{filename}")

            print(result["text"])
            f = open(f"./files/{fileBase}.txt", "w")
            f.write(result["text"])
            f.close()

            upload_file(f"./files/{fileBase}.txt", INTERVIEW_TRANSCRIPTS_BUCKET, f"{fileBase}.txt")
            
            readyInterviewTranscriptsChannel.basic_publish(exchange='', routing_key=READY_INTERVIEWS_TRANSCRIPTS_QUEUE, body=userEmail)

            os.remove(f"./files/{filename}")
            os.remove(f"./files/{fileBase}.txt")

        except Exception as e:
            print(e)

    recordingsToTranscribeChannel.basic_consume(queue=RECORDINGS_TO_TRANSCRIBE_QUEUE, on_message_callback=meetingsCallback, auto_ack=True)
    interviewsToTranscribeChannel.basic_consume(queue=INTERVIEWS_TO_TRANSCRIBE_QUEUE, on_message_callback=interviewsCallback, auto_ack=True)

    print(' [*] Waiting for messages. To exit press CTRL+C')
    recordingsToTranscribeChannel.start_consuming()
    readyInterviewTranscriptsChannel.start_consuming()

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Interrupted')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)