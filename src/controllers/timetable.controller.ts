import { Body, Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { TimetableService } from "src/services/timetable.service";


@Controller('timetable')
export class TimetableController {
  constructor(
    private readonly timetableService: TimetableService
  ) {}

  @Post('')
  async createTimetable(@Req() req, @Res() res, @Body() body) {
    try {
      const timetable = await this.timetableService.createTimetable(body);
      return res.status(HttpStatus.CREATED).json({ message: 'Timetable created successfully', data: timetable });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get('')
  async getTimetables(@Res() res, @Req() req) {
    try {
      const timetables = await this.timetableService.getTimetables(req.user.user.tenant)
      return res.status(HttpStatus.OK).json({ message: 'Timetables fetched successfully', data: timetables });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}