import { Controller, Delete, Get, HttpStatus, Param, Post, Req, Res } from "@nestjs/common";
import { AcademicYearService } from "src/services/academicYear.service";


@Controller('academicYear')
export class AcademicYearController {
  constructor(
    private readonly academicYearService: AcademicYearService
  ) {}

  @Get()
  async getAcademicYear(@Req() req, @Res() res) {
    try {
      const academicYear = await this.academicYearService.getAcademicYear(req.query.year);
      return res.status(HttpStatus.OK).json({ message: 'Academic Year fetched successfully', data: academicYear });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get('all')
  async getAllAcademicYear(@Req() req, @Res() res) {
    try {
      const academicYear = await this.academicYearService.getAllAcademicYears();
      return res.status(HttpStatus.OK).json({ message: 'Academic Year fetched successfully', data: academicYear });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post()
  async createAcademicYear(@Req() req, @Res() res) {
    let requestBody = JSON.parse(JSON.stringify(req.body))
    requestBody['tenant'] = req.user.tenant
    try {
      const academicYear = await this.academicYearService.createAcademicYear(requestBody);
      return res.status(HttpStatus.OK).json({ message: 'Academic Year created successfully', data: academicYear });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Delete(':id')
  async deleteAcademicYear(@Res() res, @Param('id') id: string) {
    try {
      await this.academicYearService.deleteAcademicYear(id);
      return res.status(HttpStatus.OK).json({ message: 'Academic Year deleted successfully' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}