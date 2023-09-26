import amqp from 'amqplib/callback_api';
import config from 'config';

import type { Channel } from 'amqplib';
import type { Connection } from 'amqplib/callback_api';

type QueueListener = {
    queueName: string,
    handler: (message: any) => Promise<void>,
    messagesLimit?: number,
};

export default class MQAdapter {
    channel: Channel;
    queueAddress: string;
    connection: Connection;
    queueNameToChannelMap: Map<string, Channel>;

    constructor() {
        this.queueAddress = config.get('rabbitMq.queueAddress');

        this.queueNameToChannelMap = new Map<string, Channel>;
    }

    init = () => {
        return new Promise<void>((resolve, reject) => {
            amqp.connect(this.queueAddress, (error, connection) => {
                console.log("Connecting MQ")
                if (error) {
                    reject(error);
                }

                this.connection = connection;

                console.log("Connected MQ", this.queueAddress, connection);
                resolve();
            });
        });
    }

    createChannel = () => {
        return new Promise<void>((resolve, reject) => {
            this.connection.createChannel((error, channel: Channel) => {
                if (error) {
                    reject(error);
                }

                this.channel = channel;

                resolve();
            });
        })
    }

    createChannelWithQueueListeners = (
        queueListeners: QueueListener[],
        ack = false,
    ) => {
        return new Promise<void>((resolve, reject) => {
            this.connection.createChannel((error, channel: Channel) => {
                if (error) {
                    reject(error);
                }

                console.log('Initialized channel.');

                queueListeners.map(({
                    queueName,
                    handler,
                    messagesLimit,
                }) => {
                    console.log("Connecting to queue", queueName, messagesLimit)
                    channel.assertQueue(queueName, {
                        durable: false,
                    });
                    
                    if (ack) {
                        if (!messagesLimit) {
                            console.error("messagesLimit should be defined when using acks. Using default - no limit");
                            channel.prefetch(0);
                        } else {
                            channel.prefetch(messagesLimit);
                        }
                    }

                    this.queueNameToChannelMap.set(queueName, channel);
                    
                    console.log(`Listening for messages on queue: ${queueName}`);
                    
                    channel.consume(queueName, async message => {
                        if (!message) {
                            console.log(" [x] Received empty message");

                            return;
                        }

                        console.log(" [x] Received %s", message.content.toString());
            
                        try {
                            await handler(message.content.toString());

                            if (ack) {
                                channel.ack(message)
                            }
                        } catch (error) {
                            if (ack) {
                                channel.nack(error)
                            }
                        }
                    }, {
                        noAck: !ack,
                    });

                })
                console.log('Added queue definitions.');
                resolve();
            });
        });
    }

    send = (queueName: string, message: string) => {
        const channel = this.queueNameToChannelMap.get(queueName);
        if (!channel) {
            console.error(`${queueName} has no assigned channel`);
            return;
        }

        channel.assertQueue(queueName, {
            durable: false
        });
      
        channel.sendToQueue(
            queueName,
            Buffer.from(message)
        );
    }
}
