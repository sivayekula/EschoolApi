import { Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { ClassService } from "src/services/class.service";


@Controller('class')
export class ClassController {
  constructor(
    private readonly classService: ClassService
  ) {}

  @Get('')
  async getClasses(@Res() res) {
    try {
      const classes = await this.classService.getClasses();
      return res.status(HttpStatus.OK).json({ message: 'Classes fetched successfully', data: classes });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get(':id')
  async getClass(@Res() res, @Req() req) {
    try {
      const classCategory = await this.classService.getClass(req.params.id);
      return res.status(HttpStatus.OK).json({ message: 'Class fetched successfully', data: classCategory });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post('')
  async createClass(@Res() res, @Req() req) {
    try {
      const classCategory = await this.classService.createClass(req.body);
      return res.status(HttpStatus.OK).json({ message: 'Class created successfully', data: classCategory });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}