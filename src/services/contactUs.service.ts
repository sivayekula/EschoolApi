import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import axios from 'axios';


@Injectable()
export class ContactUsService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",  // Gmail SMTP server
      port: 465,               // Use port 465 for SSL
      secure: true,
      auth: {
        user: "siva.yekula@gmail.com",
        pass: "zkbs rlro gfzt qvhe",
      }
    });
  }

  async sendContactEmail(body) {
    const mailOptions: any = {
      from: 'siva.yekula@gmail.com',
      to: body.email,
      subject: body.issueSubject + ' - ' + body.issueFacingwith,
      text: `${body.issueDetails}`,
      attachments: [],
    };

    // If an image URL is provided, fetch the image and attach it
    if (body.imageUrl) {
      try {
        const response = await axios.get(body.imageUrl, { responseType: 'arraybuffer' });
        mailOptions.attachments.push({
          filename: 'attachment.jpg', // Adjust filename based on image type
          content: response.data,
          encoding: 'base64',
        });
      } catch (error) {
        console.log('Error fetching image:', error);
      }
    }

    try {
      await this.transporter.sendMail(mailOptions);
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      console.log('Error sending email:', error);
      return { success: false, message: 'Failed to send email' };
    }
  }
}