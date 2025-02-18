import { Injectable } from '@nestjs/common';
import axios from 'axios';
const USERNAME = process.env.WHATSAPP_USERNAME || 'dhanu414';
const PASSWORD = process.env.WHATSAPP_PASSWORD || 'Dhanu@0414';

// SMS details
const MESSAGE = 'Hello, this is a test message.';
const SENDER = 'INVITE'; // Replace with your actual sender ID
const MOBILE_NUMBER = '9032732879'; // Use international format without '+'

// Prepare API URL
const API_URL = 'https://login.bulksmsgateway.in/textmobilesmsapi.php';

@Injectable()
export class WhatsAppService {
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
        type: '203',
      });

      const {data} = await axios.get(`${API_URL}?${params.toString()}`);
      console.log(`${API_URL}?${params.toString()}`)
      if (data?.status == 'failed') throw new Error(data?.response);
      return data;
    } catch (error) {
      console.error('Error sending SMS:', error.message);
      throw error;
    }
  }
}
