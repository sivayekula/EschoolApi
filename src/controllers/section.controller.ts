import { Body, Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { SectionService } from "src/services/section.service";



@Controller('sections')
export class SectionController {
  constructor(
    private readonly sectionService: SectionService
  ) {}

  @Post('')
  async createSection(@Req() req, @Res() res, @Body() body) {
    try {
      const section = await this.sectionService.createSection(body);
      return res.status(HttpStatus.OK).json({ message: 'Section created successfully', data: section });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get(':id')
  async getSection(@Req() req, @Res() res) {
    try {
      const section = await this.sectionService.getSection(req.params.id);
      return res.status(HttpStatus.OK).json({ message: 'Section fetched successfully', data: section });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
  @Get('')
  async getSections(@Res() res) {
    try {
      const sections = await this.sectionService.getSections();
      return res.status(HttpStatus.OK).json({ message: 'Sections fetched successfully', data: sections });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}