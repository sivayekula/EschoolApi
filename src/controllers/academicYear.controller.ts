import { Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from "@nestjs/common";
import { AcademicYearService } from "../services/academicYear.service";


@Controller('academicYear')
export class AcademicYearController {
  constructor(
    private readonly academicYearService: AcademicYearService
  ) {}

  @Get()
  async getAcademicYear(@Req() req, @Res() res) {
    try {
      const academicYear = await this.academicYearService.getAcademicYear(req.user.tenant, req.query.year);
      return res.status(HttpStatus.OK).json({ message: 'Academic Year fetched successfully', data: academicYear });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get('all')
  async getAllAcademicYear(@Req() req, @Res() res) {
    try {
      const academicYear = await this.academicYearService.getAllAcademicYears(req.user.tenant, req.user.branch);
      return res.status(HttpStatus.OK).json({ message: 'Academic Year fetched successfully', data: academicYear });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post()
  async createAcademicYear(@Req() req, @Res() res) {
    let requestBody = JSON.parse(JSON.stringify(req.body))
    requestBody['tenant'] = req.user.tenant
    requestBody['branch'] = req.user.branch
    requestBody['createdBy'] = req.user._id
    requestBody['status'] = 'inactive'
    try {
      const academicYear = await this.academicYearService.createAcademicYear(requestBody);
      return res.status(HttpStatus.OK).json({ message: 'Academic Year created successfully', data: academicYear });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Put(':id')
  async setActiveAcademicYear(@Req() req, @Param('id') id: string, @Res() res) {
    try {
      const academicYear = await this.academicYearService.updateAcademicYear(id, req.user.tenant, req.user.branch);
      return res.status(HttpStatus.OK).json({ message: 'Academic Year updated successfully', data: academicYear });
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