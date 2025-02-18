import { Controller, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { WhatsAppService } from "src/services/whatsApp.service";


@Controller('whatsapp')
export class WhatsAppController {
    constructor(
        private readonly whatsAppService: WhatsAppService
    ) {}

    @Post()
    async sendSms(@Req() req, @Res() res) {
        try {
            await this.whatsAppService.sendSms(req.body.phoneNumber, req.body.message);
            return res.status(HttpStatus.OK).json({ message: 'SMS sent successfully' });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }
}