import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from "@nestjs/common";
import { TimetableService } from "../services/timetable.service";


@Controller('timetable')
export class TimetableController {
  constructor(
    private readonly timetableService: TimetableService
  ) {}

  @Post()
  async createTimetable(@Req() req, @Res() res, @Body() body) {
    try {
      body['createdBy'] = req.user._id
      body['tenant'] = req.user.tenant
      const timetable = await this.timetableService.createTimetable(body);
      return res.status(HttpStatus.CREATED).json({ message: 'Timetable created successfully', data: timetable });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get()
  async getTimetables(@Res() res, @Req() req) {
    try {
      const timetables = await this.timetableService.getTimetables(req.user.tenant);
      return res.status(HttpStatus.OK).json({ message: 'Timetables fetched successfully', data: timetables });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get(':id')
  async getTimetable(@Res() res, @Param('id') id: string) {
    try {
      const timetable = await this.timetableService.getTimetable(id);
      return res.status(HttpStatus.OK).json({ message: 'Timetable fetched successfully', data: timetable });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Put(':id')
  async updateTimetable(@Req() req, @Res() res, @Param('id') id: string, @Body() body) {
    try {
      body['createdBy'] = req.user._id
      body['tenant'] = req.user.tenant
      const timetable = await this.timetableService.updateTimetable(id, body);
      return res.status(HttpStatus.OK).json({ message: 'Timetable updated successfully', data: timetable });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Delete(':id')
  async deleteTimetable(@Res() res, @Param('id') id: string) {
    try {
      await this.timetableService.deleteTimetable(id);
      return res.status(HttpStatus.OK).json({ message: 'Timetable deleted successfully' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}