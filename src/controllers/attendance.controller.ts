import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Req, Res } from "@nestjs/common";
import { AttendanceService } from "src/services/attendance.service";


@Controller('attendance')
export class AttendanceController {
  constructor(
    private readonly attendanceService: AttendanceService
  ) {}

  @Put('')
  async updateAttendance(@Req() req, @Res() res) {
    try {
      const attendance = await this.attendanceService.updateAttendances(req.body.id, req.body.userId, req.body.date, req.body.attendanceStatus);
      return res.status(HttpStatus.OK).json({message: 'Attendance updated successfully', data: attendance});
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
    }
  }

  @Get('')
  async getAttendance(@Req() req, @Res() res) {
    try {
      if (!req.query.userType) throw new Error('User type is required');
      const attendance = await this.attendanceService.getAttendance(req.user.tenant, req.query.date, req.query.userType, req.query.month, req.query.year);
      return res.status(HttpStatus.OK).json({message: 'Attendance fetched successfully', data: attendance});
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
    }
  }

  @Post('')
  async createAttendance(@Req() req, @Body() body, @Res() res) {
    try {
      const data = JSON.parse(JSON.stringify(body))
      const attendance = data.attendance.map(element => {
        return {
          userId: element._id,
          attendanceStatus: element.attendanceStatus,
        }
      })
      const reqData = {
        userType: data.userType,
        date: data.date,
        attendance: attendance,
        class: data.class,
        section: data.section,
        academicYear: req.headers['x-academic-year'] || req.user.academicYear,
        tenant: req.user.tenant
      }
      const response = await this.attendanceService.createAttendance(reqData);
      return res.status(HttpStatus.CREATED).json({message: 'Attendance created successfully', data: response});
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
    }
  }
}