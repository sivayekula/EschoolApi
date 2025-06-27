import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as admin from 'firebase-admin';
import * as path from 'path';

@Injectable()
export class NotificationService {
  private messaging: admin.messaging.Messaging;
    constructor( private configService: ConfigService ) {
    const app = admin.initializeApp({
      credential: admin.credential.cert(path.join(__dirname, `../../${this.configService.get<string>('GCP_CREDENTIALS')}.json`) as admin.ServiceAccount),
    });

    this.messaging = app.messaging();
  }

  async sendNotification(token: string, title: string, body: string, data: Record<string, string> = {}) {
    const message: admin.messaging.Message = {
      token,
      notification: { title, body },
      data,
      android: {
        priority: 'high',
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
          },
        },
      },
      webpush: {
        headers: { Urgency: 'high' },
        notification: {
          icon: 'https://yourdomain.com/icon.png',
        },
      },
    };

    try {
      const response = await this.messaging.send(message);
      console.log('Push sent:', response);
      return response;
    } catch (error) {
      console.error('Push failed:', error);
      throw error;
    }
  }
}