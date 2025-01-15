import { Body, Controller, Get, Post, Put, Req, Res } from "@nestjs/common";
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
      return res.status(200).json(attendance);
    } catch (error) {
      return res.status(400).json(error);
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
      const attendance = await this.attendanceService.createAttendance(reqData);
      return res.status(200).json(attendance);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}