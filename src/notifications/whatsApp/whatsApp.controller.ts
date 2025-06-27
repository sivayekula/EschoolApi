import { Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { WhatsAppService } from "./whatsApp.service";


@Controller('whatsapp')
export class WhatsAppController {
    constructor(
        private readonly whatsAppService: WhatsAppService
    ) {}

    @Post()
    async sendSms(@Req() req, @Res() res) {
        try {
            await this.whatsAppService.sendSms('', '', req.body.phoneNumber, req.body.message);
            return res.status(HttpStatus.OK).json({ message: 'SMS sent successfully' });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }

    @Get()
    async getSMSBalance(@Req() req, @Res() res) {
        try {
            const balance = await this.whatsAppService.getBalance('dhanu414', 'Dhanu@0414');
            return res.status(HttpStatus.OK).json(balance);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }
}