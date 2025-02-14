import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Req, Res } from "@nestjs/common";
import { SubjectService } from "src/services/subject.service";

@Controller('subject')
export class SubjectController {
  constructor(
    private readonly subjectService: SubjectService
  ) {}
  
  @Post()
  async createSubject(@Req() req, @Body() body, @Res() res) {
    try {
      if(!body.name) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Subject name is required' });
      }
      let requestBody = JSON.parse(JSON.stringify(body))
      requestBody['tenant'] = req.user.tenant
      const subject = await this.subjectService.createSubject(body)
      return res.status(HttpStatus.CREATED).json({ message: 'Subject created successfully', data: subject });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get()
  async getSubjects(@Req() req, @Res() res) {
    try {
      const subjects = await this.subjectService.getSubjects(req.body.tenant)
      return res.status(HttpStatus.OK).json({ message: 'Subjects fetched successfully', data: subjects });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Put(':id')
  async updateSubject(@Req() req, @Res() res) {
    try {
      if(!req.body.name) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Subject name is required' });
      }
      const subject = await this.subjectService.updateSubject(req.params.id, req.body)
      return res.status(HttpStatus.OK).json({ message: 'Subject updated successfully', data: subject });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Delete(':id')
  async deleteSubject(@Req() req, @Res() res) {
    try {
      await this.subjectService.deleteSubject(req.params.id)
      return res.status(HttpStatus.OK).json({ message: 'Subject deleted successfully' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}