import { Controller, Delete, Get, HttpStatus, Post, Put, Req, Res } from "@nestjs/common";
import { RouteService } from "../services/route.service";

@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService){}

  @Post()
  async createRoute(@Req() req, @Res() res) {
    try {
      const body = JSON.parse(JSON.stringify(req.body))
      body['tenant'] = req.user.tenant
      body['createdBy'] = req.user._id
      body['branch'] = req.user.branch
      body['academicYear'] = req.user.academicYear
      const route = await this.routeService.createRoute(body);
      return res.status(HttpStatus.CREATED).json({ message: 'Route created successfully', data: route });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get()
  async getRoutes(@Req() req, @Res() res) {
    try {
      const routes = await this.routeService.getRoutes(req.user.tenant, req.user.branch, req.user.academicYear);
      return res.status(HttpStatus.OK).json({ message: 'Routes fetched successfully', data: routes });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get('/:id')
  async getRoute(@Req() req, @Res() res) {
    try {
      const route = await this.routeService.getRoute(req.params.id);
      return res.status(HttpStatus.OK).json({ message: 'Route fetched successfully', data: route });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Put('/:id')
  async updateRoute(@Req() req, @Res() res) {
    try {
      const body = JSON.parse(JSON.stringify(req.body))
      body['tenant'] = req.user.tenant
      const route = await this.routeService.updateRoute(req.params.id, body);
      return res.status(HttpStatus.OK).json({ message: 'Route updated successfully', data: route });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Delete('/:id')
  async deleteRoute(@Req() req, @Res() res) {
    try {
      await this.routeService.deleteRoute(req.params.id);
      return res.status(HttpStatus.OK).json({ message: 'Route deleted successfully' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}