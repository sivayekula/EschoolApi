import { Controller, Get, Post, Req, Res } from "@nestjs/common";
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
  async createAttendance(@Req() req, @Res() res) {
    try {
      const attendance = await this.attendanceService.createAttendance(req.body);
      return res.status(200).json(attendance);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}