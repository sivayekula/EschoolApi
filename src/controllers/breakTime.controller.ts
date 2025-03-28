import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from "@nestjs/common";
import { BreakTimeService } from "../services/breakTime.service";


@Controller('breakTime')
export class BreakTimeController {
  constructor(
    private readonly breakTimeService: BreakTimeService
  ) {}

  @Post()
  async createBreakTime(@Req() req, @Body() breakTime, @Res() res) {
    try {
      let body = JSON.parse(JSON.stringify(breakTime));
      body['tenant'] = req.user.tenant
      body['createdBy'] = req.user._id
      body['branch'] = req.user.branch
      const newBreakTime = await this.breakTimeService.createBreakTime(body);
      return res.status(HttpStatus.CREATED).json({ message: 'Break time created successfully', data: newBreakTime });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get(':id')
  async getBreakTime(@Res() res, @Param('id') id: string) {
    try {
      const breakTime = await this.breakTimeService.getBreakTime(id);
      return res.status(HttpStatus.OK).json({ message: 'Break time fetched successfully', data: breakTime });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get()
  async getBreakTimes(@Req() req, @Res() res) {
    try {
      const breakTimes = await this.breakTimeService.getBreakTimes(req.user.tenant, req.user.branch);
      return res.status(HttpStatus.OK).json({ message: 'Break times fetched successfully', data: breakTimes });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Put(':id')
  async updateBreakTime(@Res() res, @Param('id') id: string, @Body() breakTime) {
    try {
      const updatedBreakTime = await this.breakTimeService.updateBreakTime(id, breakTime);
      return res.status(HttpStatus.OK).json({ message: 'Break time updated successfully', data: updatedBreakTime });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Delete(':id')
  async deleteBreakTime(@Res() res, @Param('id') id: string) {
    try {
      await this.breakTimeService.deleteBreakTime(id);
      return res.status(HttpStatus.OK).json({ message: 'Break time deleted successfully' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}