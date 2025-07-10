import { Controller, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { NotificationService } from "./notification.service";


@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService
  ) {}

  @Post('send')
  async sendNotification(@Req() req, @Res() res) {
    try {
      await this.notificationService.sendNotification(req.body.token, {title: req.body.title, body: req.body.body, data: req.body.data});
      res.status(HttpStatus.OK).json({ message: 'Notification sent successfully' });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error sending notification' });
    }
  }

  @Post('create')
  async createNotification(@Req() req, @Res() res) {
    console.log(req.body);
    try {
      await this.notificationService.createNotification(req.body);
      res.status(HttpStatus.OK).json({ message: 'Notification created successfully' });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error creating notification' });
    }
  }

}