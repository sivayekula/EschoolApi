import { Controller, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { BranchService } from "../branch/branch.service";
import { ContactUsService } from "./contactUs.service";


@Controller('contactus')
export class ContactUsController {
  constructor(
    private readonly contactUsService: ContactUsService,
    private readonly branchService: BranchService
  ) { }

  @Post()
  async sendContactEmail(@Req() req, @Res() res) {
    try {
      const requestBody = JSON.parse(JSON.stringify(req.body));
      const branch = await this.branchService.getBranch(requestBody.branch);
      requestBody['email'] = branch.email;
      requestBody['imageUrl'] = requestBody.attachFile?.Location;
      await this.contactUsService.sendContactEmail(requestBody);
      res.status(HttpStatus.OK).send({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Failed to send email' });
    }
  }
}