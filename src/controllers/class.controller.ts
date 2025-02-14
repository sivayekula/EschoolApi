import { Controller, Delete, Get, HttpStatus, Post, Put, Req, Res } from "@nestjs/common";
import { ClassService } from "src/services/class.service";


@Controller('class')
export class ClassController {
  constructor(
    private readonly classService: ClassService
  ) {}

  @Get()
  async getClasses(@Req() req, @Res() res) {
    try {
      const classes = await this.classService.getClasses(req.user.tenant);
      return res.status(HttpStatus.OK).json({ message: 'Classes fetched successfully', data: classes });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get('/:id')
  async getClass(@Res() res, @Req() req) {
    try {
      const classCategory = await this.classService.getClass(req.params.id);
      return res.status(HttpStatus.OK).json({ message: 'Class fetched successfully', data: classCategory });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post()
  async createClass(@Res() res, @Req() req) {
    try {
      let requestBody = JSON.parse(JSON.stringify(req.body))
      requestBody['tenant'] = req.user.tenant
      const classCategory = await this.classService.createClass(requestBody);
      return res.status(HttpStatus.OK).json({ message: 'Class created successfully', data: classCategory });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Put('/:id')
  async updateClass(@Res() res, @Req() req) {
    try {
      const body = JSON.parse(JSON.stringify(req.body))
      body['tenant'] = req.user.tenant
      const classCategory = await this.classService.updateClass(req.params.id, body);
      return res.status(HttpStatus.OK).json({ message: 'Class updated successfully', data: classCategory });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Delete('/:id')
  async deleteClass(@Res() res, @Req() req) {
    try {
      await this.classService.deleteClass(req.params.id);
      return res.status(HttpStatus.OK).json({ message: 'Class deleted successfully' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}