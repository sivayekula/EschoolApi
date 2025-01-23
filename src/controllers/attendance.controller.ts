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
      const attendance = await this.attendanceService.updateAttendances(req.body.userId, req.body.date, req.body.attendanceStatus);
      return res.status(HttpStatus.OK).json({message: 'Attendance updated successfully', data: attendance});
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
    }
  }

  @Get('')
  async getAttendance(@Req() req, @Res() res) {
    try {
      if(!req.query.date && !req.query.userType)throw new Error('Date and userType is required')
      const attendance = await this.attendanceService.getAttendance(req.user.tenant, req.query.date, req.query.userType);
      return res.status(HttpStatus.OK).json({message: 'Attendance fetched successfully', data: attendance});
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
    }
  }

  @Post('')
  async createAttendance(@Req() req, @Body() body, @Res() res) {
    try {
      const data = JSON.parse(JSON.stringify(body))
      const reqData = data.attendance.map(element => {
        return {
          userId: element._id,
          userType: data.userType,
          date: data.date,
          attendanceStatus: element.attendanceStatus,
          class: data.class,
          section: data.section,
          academicYear: req.headers['x-academic-year'] || req.user.academicYear,
          tenant: req.user.tenant
        }
      })
      console.log("reqData", reqData);
      
      const attendance = await this.attendanceService.createAttendance(reqData);
      return res.status(HttpStatus.CREATED).json({message: 'Attendance created successfully', data: attendance});
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({message: error.message});
    }
  }
}