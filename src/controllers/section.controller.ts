import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Req, Res } from "@nestjs/common";
import { SectionService } from "src/services/section.service";



@Controller('sections')
export class SectionController {
  constructor(
    private readonly sectionService: SectionService
  ) {}

  @Post()
  async createSection(@Req() req, @Res() res, @Body() body) {
    try {
      const requestBody = JSON.parse(JSON.stringify(body))
      requestBody['tenant'] = req.user.tenant
      const section = await this.sectionService.createSection(requestBody);
      return res.status(HttpStatus.OK).json({ message: 'Section created successfully', data: section });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get('/:id')
  async getSection(@Req() req, @Res() res) {
    try {
      const section = await this.sectionService.getSection(req.params.id);
      return res.status(HttpStatus.OK).json({ message: 'Section fetched successfully', data: section });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
  @Get()
  async getSections(@Req() req, @Res() res) {
    try {
      const sections = await this.sectionService.getSections(req.user.tenant);
      return res.status(HttpStatus.OK).json({ message: 'Sections fetched successfully', data: sections });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Put('/:id')
  async updateSection(@Req() req, @Res() res) {
    try {
      const body = JSON.parse(JSON.stringify(req.body))
      body['tenant'] = req.user.tenant
      const section = await this.sectionService.updateSection(req.params.id, body);
      return res.status(HttpStatus.OK).json({ message: 'Section updated successfully', data: section });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Delete('/:id')
  async deleteSection(@Req() req, @Res() res) {
    try {
      await this.sectionService.deleteSection(req.params.id);
      return res.status(HttpStatus.OK).json({ message: 'Section deleted successfully' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}