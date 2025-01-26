import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from "@nestjs/common";
import { ExamDto } from "src/dto/exam.dto";
import { ExamService } from "src/services/exam.service";

@Controller('exam')
export class ExamController {
  constructor(
    private readonly examService: ExamService
  ) {}

  @Post('')
  async createExam(@Req() req, @Body() body: ExamDto, @Res() res) {
    try {
      const requestBody = JSON.parse(JSON.stringify(body))
      requestBody['tenant'] = req.user.tenant
      requestBody['createdBy'] = req.user._id
      const exam = await this.examService.createExam(requestBody);
      res.status(HttpStatus.CREATED).json({ message: 'Exam created successfully', data: exam });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get('')
  async getExams(@Req() req, @Res() res) {
    try {
      const exams = await this.examService.getExams(req.user.tenant);
      exams.forEach((exam) => {
        exam['passPercentage'] = exam.passPercentage || 0
      })
      return res.status(HttpStatus.OK).json({ message: 'Exams fetched successfully', data: exams });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Put(':id')
  async updateExam(@Req() req, @Res() res, @Param('id') id: string) {
    try {
      const requestBody = JSON.parse(JSON.stringify(req.body))
      requestBody['tenant'] = req.user.tenant
      requestBody['createdBy'] = req.user._id
      const exam = await this.examService.updateExam(id, requestBody);
      return res.status(HttpStatus.OK).json({ message: 'Exam updated successfully', data: exam });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Delete(':id')
  async deleteExam(@Res() res, @Param('id') id: string) {
    try {
      await this.examService.deleteExam(id);
      return res.status(HttpStatus.OK).json({ message: 'Exam deleted successfully' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}