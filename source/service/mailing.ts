import nodemailer from 'nodemailer';
import MailInterface from '../utils/interface';
import logger from '../utils/winston';


export default class MailService {
    private transporter: nodemailer.Transporter;
    constructor(){
            this.createConnection();
    };
    
    private async createConnection() {
        this.transporter = nodemailer.createTransport({
            service:"gmail",
            host:"smtp.gmail.com",
            port: 587,
            auth:{
                user:process.env.GOOGLE_MAIL_SENDER,
                pass:process.env.GOOGLE_APP_KEY
            }
        }) };

    async sendMail(
        requestId: string | number | string[],
        options: MailInterface
    ) {
        return await this.transporter
            .sendMail({ 
                from: process.env.GOOGLE_MAIL_SENDER,
                to: options.to,
                subject: options.subject,
                text: options.text,
                html: options.html,
            })
            .then((info) => {
                logger.info(`${requestId} - Mail sent successfully!!`);
                logger.info(`${requestId} - [MailResponse]=${info.response} [MessageID]=${info.messageId}`);
                return info;
            });
    }
}