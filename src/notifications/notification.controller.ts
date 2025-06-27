import { Controller, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { NotificationService } from "./notification.service";


@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService
  ) {}

  @Post()
  async sendNotification(@Req() req, @Res() res) {
    try {
      await this.notificationService.sendNotification(req.body.token, req.body.title, req.body.body, req.body.data);
      res.status(HttpStatus.OK).json({ message: 'Notification sent successfully' });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error sending notification' });
    }
  }

}