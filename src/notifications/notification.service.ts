import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as admin from 'firebase-admin';
import * as path from 'path';

@Injectable()
export class NotificationService {
  constructor(private configService: ConfigService) {
    const serviceAccount = require(path.join(__dirname, `../../${this.configService.get<string>('GCP_CREDENTIALS')}.json`));
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  async sendNotification(deviceToken: string, payload: any) {
    try {
      const response = await admin.messaging().send({
        token: deviceToken,
        notification: {
          title: payload.title,
          body: payload.body,
        },
        data: payload.data || {},
      });
      console.log('Successfully sent message:', response);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  async createNotification(payload: any) {
    try {
      const response = await admin.messaging().send(payload);
      console.log('Successfully sent message:', response);
    } catch (error) {
      console.error('Error sending message:', error);
    }

  }
}