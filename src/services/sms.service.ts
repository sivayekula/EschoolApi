import { Injectable } from '@nestjs/common';
import axios from 'axios';

// Prepare API URL
const API_URL = 'https://www.bulksmsgateway.in/sendmessage.php';

@Injectable()
export class SmsService {
  constructor() {}

  async sendSms(userName: string, password: string, phoneNumber: string, message: string, template:string) {
    // Securely store credentials in environment variables

    // Function to send SMS
    try {
      const params = new URLSearchParams({
        user: userName,
        password: password,
        mobile: phoneNumber,
        message: message,
        sender: 'DGIAKA',
        type: '3',
        template_id: template
      });

      const response = await axios.get(`${API_URL}?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error sending SMS:', error.message);
      return error;
    }
  }
}
