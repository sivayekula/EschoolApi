import { Body, Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { StudentFeesService } from "src/services/studentFees.service";


@Controller('studentFees')
export class StudentFeesController {
  constructor(
    private readonly studentFeesService: StudentFeesService
  ) {}

  @Get(':id')
  async getFeesByStudent(@Req() req, @Res() res) {
    try {
      const fees = await this.studentFeesService.getFeesByStudent(req.params.id);
      return res.status(HttpStatus.OK).json({ message: 'Fees fetched successfully', data: fees });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get('')
  async getAllFees(@Req() req, @Res() res) {
    try {
      const fees = await this.studentFeesService.getAllFees(req.user.tenant);
      return res.status(HttpStatus.OK).json({ message: 'Fees fetched successfully', data: fees });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post('')
  async collectFees(@Req() req, @Res() res, @Body() body) {
    try {
      console.log(req.body, 'body', body)
      // const fees = await this.studentFeesService.collectFees(req.body);
      return res.status(HttpStatus.OK).json({ message: 'Fees collected successfully', data: 'fees' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}