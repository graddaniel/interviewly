import amqp from 'amqplib/callback_api';
import config from 'config';


export default class MQAdapter {
    channel: any;
    queueAddress: string;

    constructor() {
        this.queueAddress = config.get('rabbitMq.queueAddress');
    }

    init = () => {
        return new Promise<void>((resolve, reject) => {
            amqp.connect(this.queueAddress, (error0, connection) => {
                if (error0) {
                    reject(error0);
                }

                connection.createChannel((error1, channel) => {
                    if (error1) {
                        reject(error0);
                    }

                    this.channel = channel;
                    console.log('Initialized channel.')
                    resolve();
                });
            });
        });
    }

    listen = (
        queueName: string,
        handler: (message: any) => void,
    ) => {             
        this.channel.assertQueue(queueName, {
            durable: false
        });
    
        console.log(`Listening for messages on queue: ${queueName}`);

        this.channel.consume(queueName, (message) => {
            console.log(" [x] Received %s", message.content.toString());

            handler(message.content.toString())
        }, {
            noAck: true
        });
    }

    send = (queueName: string, message: string) => {
        this.channel.assertQueue(queueName, {
            durable: false
        });
      
        this.channel.sendToQueue(
            queueName,
            Buffer.from(message)
        );
    }
}
