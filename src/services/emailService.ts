import * as nodemailer from 'nodemailer';

export interface ISystemSettings {
  SmtpServerConnectionString: string;
  SmtpFromAddress: string;
}

export interface IEmailSentResponse {
  accepted: string[];
  rejected: string[];
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: {
      from: string,
      to: string[],
  };
    messageId: string;
}

export class EmailService {
  // tslint:disable-next-line:variable-name
  private _transporter: nodemailer.Transporter;
  // tslint:disable-next-line:variable-name
  private _settings: ISystemSettings;
  constructor(settings: ISystemSettings) {
    this._settings = settings;
    this._transporter = nodemailer.createTransport(this._settings.SmtpServerConnectionString);
    this._transporter.verify((error, success) => {
      if (error) return console.error(error);
      if (success) console.log('Server ready to take our messages.');
    });
  }

  public sendMail({ to, content, subject }: { to: string, subject: string, content: string }): Promise<void> {
    const options: nodemailer.SendMailOptions = {
      from: this._settings.SmtpFromAddress,
      to,
      subject,
      text: content,
    };

    return new Promise<void>((
      resolve: (msg: any) => void,
      reject: (err: Error) => void) => {
        this._transporter.sendMail(options, (err, info: IEmailSentResponse) => {
          if (err) reject(err);
          resolve(info);
        });
      });
  }
}
