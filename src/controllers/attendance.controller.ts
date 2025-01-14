import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { AttendanceService } from "src/services/attendance.service";


@Controller('attendance')
export class AttendanceController {
  constructor(
    private readonly attendanceService: AttendanceService
  ) {}

  @Get()
  async getAttendances(@Req() req, @Res() res) {
    try {
      const attendance = await this.attendanceService.getAttendances(req.user.userType, req.user.tenant, req.user.academicYear);
      return res.status(200).json(attendance);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  @Post('')
  async createAttendance(@Req() req, @Body() body, @Res() res) {
    try {
      const data = JSON.parse(JSON.stringify(body))
      data['createdBy'] = req.user._id
      const reqData = data.attendance.forEach(element => {
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
      const attendance = await this.attendanceService.createAttendance(reqData);
      return res.status(200).json(attendance);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}