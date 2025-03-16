import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import axios from 'axios';


@Injectable()
export class ContactUsService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "siva.yekula@gmail.com",
        pass: "@Si90327328",
      }
    });
  }

  async sendContactEmail(name: string, email: string, message: string, subject: string, imageUrl?: string) {
    const mailOptions: any = {
      from: 'siva.yekula@gmail.com',
      to: email,
      subject: subject,
      text: `${message}`,
      attachments: [],
    };

    // If an image URL is provided, fetch the image and attach it
    if (imageUrl) {
      try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        mailOptions.attachments.push({
          filename: 'attachment.jpg', // Adjust filename based on image type
          content: response.data,
          encoding: 'base64',
        });
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    }

    try {
      await this.transporter.sendMail(mailOptions);
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, message: 'Failed to send email' };
    }
  }
}