import { Injectable } from '@nestjs/common';
import axios from 'axios';
const USERNAME = process.env.SMS_USERNAME || 'siva9032';
const PASSWORD = process.env.SMS_PASSWORD || 'Admin@123';

// SMS details
const MESSAGE = 'Hello, this is a test message.';
const SENDER = 'INVITE'; // Replace with your actual sender ID
const MOBILE_NUMBER = '919032732879'; // Use international format without '+'

// Prepare API URL
const API_URL = 'https://www.bulksmsgateway.in/sendmessage.php';

@Injectable()
export class SmsService {
  constructor() {}

  async sendSms(phoneNumber: string, message: string) {
    // Securely store credentials in environment variables

    // Function to send SMS
    try {
      const params = new URLSearchParams({
        user: USERNAME,
        password: PASSWORD,
        mobile: MOBILE_NUMBER,
        message: MESSAGE,
        sender: SENDER,
        type: '3',
        template_id: '123',
      });

      const response = await axios.get(`${API_URL}?${params.toString()}`);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error sending SMS:', error.message);
      throw error;
    }
  }
}
