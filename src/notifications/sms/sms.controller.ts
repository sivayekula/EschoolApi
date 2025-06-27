import { Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { SmsService } from "./sms.service";


@Controller('sms')
export class SmsController {

  constructor(
    private readonly smsService: SmsService
  ) {}

  @Post()
  async sendSms(@Req() req, @Res() res) {
    try {
      await this.smsService.sendSms('', '', req.body.phoneNumber, req.body.message, '');
      return res.status(HttpStatus.OK).json({ message: 'SMS sent successfully' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get()
  async getSMSBalance(@Req() req, @Res() res) {
    try {
      const balance = await this.smsService.getSMSBalance('', '');
      return res.status(HttpStatus.OK).json(balance);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}