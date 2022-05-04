import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8273ff80deb8eb",
    pass: "a32748a4fb6943"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
    from: 'Equipe Feedget <equipefeedget@gmail.com>',
    to: 'Bruno Duarte <bastosduartebruno@gmail.com>',
    subject,
    html: body,
  })
  };
}