import { Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from "@nestjs/common";
import { HolidaysService } from "../services/holidays.service";


@Controller('holidays')
export class HolidaysController {
  constructor(
    private readonly holidayService: HolidaysService
  ) {}

  @Get()
  async getHolidays(@Req() req, @Res() res) {
    try {
      const holidays = await this.holidayService.getHolidays(req.user.tenant, req.user.branch, req.user.academicYear);
      return res.status(HttpStatus.OK).json({ message: 'Holidays fetched successfully', data: holidays });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get(':id')
  async getHoliday(@Req() req, @Res() res, @Param('id') id: string) {
    try {
      const holiday = await this.holidayService.getHoliday(id);
      return res.status(HttpStatus.OK).json({ message: 'Holiday fetched successfully', data: holiday });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post()
  async createHolidays(@Req() req, @Res() res) {
    const data = JSON.parse(JSON.stringify(req.body))
    data['createdBy'] = req.user._id
    data['tenant'] = req.user.tenant
    data['branch'] = req.user.branch
    try {
      let holiday = await this.holidayService.getHoliday('', data.startDate, data.endDate);
      if(holiday) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Holidays already exists' });
      const holidays = await this.holidayService.createHoliday(data);
      return res.status(HttpStatus.CREATED).json({ message: 'Holidays created successfully', data: holidays });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Put(':id')
  async updateHolidays(@Req() req, @Res() res, @Param('id') id: string) {
    try {
      const holidays = await this.holidayService.updateHoliday(id, req.body);
      return res.status(HttpStatus.OK).json({ message: 'Holidays updated successfully', data: holidays });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Delete(':id')
  async deleteHolidays(@Res() res, @Param('id') id: string) {
    try {
      await this.holidayService.deleteHoliday(id);
      return res.status(HttpStatus.OK).json({ message: 'Holidays deleted successfully' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

}