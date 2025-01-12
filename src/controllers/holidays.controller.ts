import { Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { HolidaysService } from "src/services/holidays.service";


@Controller('holidays')
export class HolidaysController {
  constructor(
    private readonly holidayService: HolidaysService
  ) {}

  @Get('')
  async getHolidays(@Req() req, @Res() res) {
    try {
      const holidays = await this.holidayService.getHolidays(req.user.tenant);
      return res.status(HttpStatus.OK).json({ message: 'Holidays fetched successfully', data: holidays });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post('')
  async createHolidays(@Req() req, @Res() res) {
    const data = JSON.parse(JSON.stringify(req.body))
    data['createdBy'] = req.user._id
    data['tenant'] = req.user.tenant
    try {
      const holidays = await this.holidayService.createHoliday(data);
      return res.status(HttpStatus.CREATED).json({ message: 'Holidays created successfully', data: holidays });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

}