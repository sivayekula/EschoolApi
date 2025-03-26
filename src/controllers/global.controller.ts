import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { GlobalService } from "../services/global.service";

@Controller('')
export class GlobalController {
  constructor(
    private readonly globalService: GlobalService
  ) {}

  @Get('classes')
  async getClass(@Body() body, @Res() res) {
    try {
      const classes = await this.globalService.fetchClasses(body.tenant)
      return res.status(HttpStatus.OK).json({ message: 'Classes fetched successfully', data: classes });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post('subjects')
  async createSubject(@Body() body, @Res() res) {
    try {
      const subject = await this.globalService.saveSubject(body)
      return res.status(HttpStatus.CREATED).json({ message: 'Subject created successfully', data: subject });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get('subjects')
  async getSubject(@Body() body, @Res() res) {
    try {
      const subjects = await this.globalService.fetchSubjects(body.tenant)
      return res.status(HttpStatus.OK).json({ message: 'Subjects fetched successfully', data: subjects });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

}