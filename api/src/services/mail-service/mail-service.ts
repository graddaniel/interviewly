import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import config from 'config';
import 'dotenv/config';


export default class MailService {
    private transport: any;
    private emailNotificationsDelayInMS: number;

    constructor () {
        const host = config.get('mailer.host') as string;
        const port = config.get('mailer.port') as number;
        this.emailNotificationsDelayInMS = config.get('mailer.emailNotificationsDelayInMS') as number

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

    public sendEmailNotifications = async (emailData: any) => {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const {
                        recipient,
                        subject,
                        template,
                        context,
                    } = JSON.parse(emailData);

                    this.sendTemplate(
                        recipient,
                        subject,
                        template,
                        context,
                    );
                } catch(error) {
                    console.error("Failed to send email project notifications", error);
                }

                resolve();
            }, this.emailNotificationsDelayInMS);
        });
    }

    // DEPRECATED; currently only use in password reset which is not attached
    send = async (
        recipient: string,
        subject: string,
        message: string,
    ) => {
        console.log(`Sending email to ${recipient} with subject: ${subject} and message ${message}`)
        try {
            await this.transport.sendMail({
                from: 'notification@interviewlyapp.com',
                to: recipient,
                subject,
                html: message,
            });
        } catch (error) {
            console.error("Failed to send email", error);
        }
    }

    private sendTemplate = async (
        recipient: string,
        subject: string,
        template: string,
        context: any,
    ) => {
        console.log(`Sending template email to ${recipient} with subject: ${subject}.`)
        try {
            await this.transport.sendMail({
                from: 'notification@interviewlyapp.com',
                to: recipient,
                subject,
                template,
                context,
            });
        }catch (error) {
            console.error("Failed to send email", error);
        }
    }
}