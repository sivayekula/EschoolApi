import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WhatsAppService {
  constructor() {}

  async sendSms(userName: string, password: string, phoneNumber: string, message: string) {
    // Securely store credentials in environment variables
    // Prepare API URL
    const API_URL = 'https://login.bulksmsgateway.in/textmobilesmsapi.php';
    // Function to send SMS
    try {
      const params = new URLSearchParams({
        user: userName || 'dhanu414',
        password: password || 'Dhanu@0414',
        mobile: phoneNumber,
        message: message,
        type: '203',
      });

      const {data} = await axios.get(`${API_URL}?${params.toString()}`);
      if (data?.status == 'failed') throw new Error(data?.response);
      return data;
    } catch (error) {
      console.error('Error sending SMS:', error.message);
      throw error;
    }
  }

  async checkBalance(userName: string, password: string) {
    // Securely store credentials in environment variables
    // Prepare API URL
    const API_URL = 'https://login.bulksmsgateway.in/whtsappuserbalance.php';
    // Function to check balance
    try {
      const params = new URLSearchParams({
        user: userName || 'dhanu414',
        password: password || 'Dhanu@0414',
        type: '3',
      });
      const {data} = await axios.get(`${API_URL}?${params.toString()}`);
      if (data?.status == 'failed') throw new Error(data?.response);
      return data;
    } catch (error) {
      console.error('Error checking balance:', error.message);
      throw error;
    }
  }
}
