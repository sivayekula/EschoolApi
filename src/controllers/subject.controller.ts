import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { SubjectService } from "src/services/subject.service";

@Controller('subject')
export class SubjectController {
  constructor(
    private readonly subjectService: SubjectService
  ) {}
  
  @Post('')
  async createSubject(@Body() body, @Res() res) {
    try {
      if(!body.name) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Subject name is required' });
      }
      const subject = await this.subjectService.createSubject(body)
      return res.status(HttpStatus.CREATED).json({ message: 'Subject created successfully', data: subject });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get('')
  async getSubjects(@Res() res) {
    try {
      const subjects = await this.subjectService.getSubjects()
      return res.status(HttpStatus.OK).json({ message: 'Subjects fetched successfully', data: subjects });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}