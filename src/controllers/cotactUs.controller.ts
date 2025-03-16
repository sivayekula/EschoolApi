import { Controller, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { ContactUsService } from "src/services/contactUs.service";


@Controller('contactus')
export class ContactUsController {
  constructor(
    private readonly contactUsService: ContactUsService
  ) { }

  @Post()
  async sendContactEmail(@Req() req, @Res() res) {
    try {
      const { name, email, message, subject, imageUrl } = req.body;
      await this.contactUsService.sendContactEmail(name, email, message, subject, imageUrl);
      res.status(HttpStatus.OK).send({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Failed to send email' });
    }
  }
}