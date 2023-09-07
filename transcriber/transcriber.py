import pika, sys, os, whisper, boto3

INPUT_QUEUE = os.environ.get('INPUT_QUEUE')
OUTPUT_QUEUE = os.environ.get('OUTPUT_QUEUE')
QUEUE_HOST = os.environ.get('QUEUE_HOST')
TRANSCRIPTIONS_BUCKET = os.environ.get('TRANSCRIPTIONS_BUCKET')
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

    inputChannel = connection.channel()
    inputChannel.queue_declare(queue=INPUT_QUEUE)

    outputChannel = connection.channel()
    outputChannel.queue_declare(queue=OUTPUT_QUEUE)

    def callback(ch, method, properties, body):
        try: 
            fileName = body.decode('UTF-8')
            print(f" [x] Received {fileName}")

            result = model.transcribe(f"./files/{fileName}/{fileName}.mp4")

            #print(result["text"])
            f = open(f"./files/{fileName}/{fileName}.txt", "w")
            f.write(result["text"])
            f.close()

            upload_file(f"./files/{fileName}/{fileName}.txt", TRANSCRIPTIONS_BUCKET, f"{fileName}.txt")
            
            outputChannel.basic_publish(exchange='', routing_key=OUTPUT_QUEUE, body=fileName)

            os.remove(f"./files/{fileName}/{fileName}.mp4")
            os.remove(f"./files/{fileName}/{fileName}.txt")

        except Exception as e:
            print(e)

    inputChannel.basic_consume(queue=INPUT_QUEUE, on_message_callback=callback, auto_ack=True)

    print(' [*] Waiting for messages. To exit press CTRL+C')
    inputChannel.start_consuming()

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Interrupted')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)