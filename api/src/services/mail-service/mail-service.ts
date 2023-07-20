import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import config from 'config';
import 'dotenv/config';


export default class MailService {
    private transport: any;

    constructor () {
        const host = config.get('mailer.host') as string;
        const port = config.get('mailer.port') as number;

        const user = process.env.MAILER_USER as string;
        const password = process.env.MAILER_PASSWORD as string

        this.transport = nodemailer.createTransport({
            host,
            port,
            auth: {
                user,
                pass: password,
            }
        });

        this.transport.use('compile', hbs({
            viewEngine: {
                layoutsDir: './views/layouts/',
                defaultLayout: false,
                partialsDir: './views/',
            },
            viewPath: './views/',
        }))

        this.transport.verify((error, success) => {
            if (error) {
              console.log(error);
            } else {
              console.log('MailerService is ready.');
            }
        });
    }

    send = async (
        recipient: string,
        subject: string,
        message: string,
    ) => {
        console.log(`Sending email to ${recipient} with subject: ${subject} and message ${message}`)
        return await this.transport.sendMail({
            from: 'notification@interviewlyapp.com',
            to: recipient,
            subject,
            html: message,
        });
    }

    sendTemplate = async (
        recipient: string,
        subject: string,
        template: string,
        context: any,
    ) => {
        console.log(`Sending template email to ${recipient} with subject: ${subject}.`)
        return await this.transport.sendMail({
            from: 'notification@interviewlyapp.com',
            to: recipient,
            subject,
            template,
            context,
        });
    }
}