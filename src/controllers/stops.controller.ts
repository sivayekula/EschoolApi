import { Controller, Delete, Get, HttpStatus, Post, Put, Req, Res } from "@nestjs/common";
import { StopsService } from "../services/stops.service";


@Controller('stops')
export class StopsController {
  constructor(private readonly stopsService: StopsService) {}

  @Post()
  async createStop(@Req() req, @Res() res) {
    try {
      const body = JSON.parse(JSON.stringify(req.body))
      body['tenant'] = req.user.tenant
      const stop = await this.stopsService.create(body);
      return res.status(HttpStatus.OK).json({ message: 'Stop created successfully', data: stop });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get()
  async getStops(@Req() req, @Res() res) {
    try {
      const stops = await this.stopsService.findAll(req.user.tenant);
      return res.status(HttpStatus.OK).json({ message: 'Stops fetched successfully', data: stops });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get('/:id')
  async getStop(@Req() req, @Res() res) {
    try {
      const stop = await this.stopsService.findOne(req.params.id);
      return res.status(HttpStatus.OK).json({ message: 'Stop fetched successfully', data: stop });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Put('/:id')
  async updateStop(@Req() req, @Res() res) {
    try {
      const body = JSON.parse(JSON.stringify(req.body))
      body['tenant'] = req.user.tenant
      const stop = await this.stopsService.update(req.params.id, body);
      return res.status(HttpStatus.OK).json({ message: 'Stop updated successfully', data: stop });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Delete('/:id')
  async deleteStop(@Req() req, @Res() res) {
    try {
      await this.stopsService.delete(req.params.id);
      return res.status(HttpStatus.OK).json({ message: 'Stop deleted successfully' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}