import { Controller, Delete, Get, HttpStatus, Param, Post, Req, Res } from "@nestjs/common";
import { TemplateNamesService } from "./templateNames.service";


@Controller('templateNames')
export class TemplateNamesController {
  constructor(
    private readonly templateNamesService: TemplateNamesService
  ) { }

  @Get()
  async getTemplateNames(@Req() req, @Res() res) {
    try {
      const templateNames = await this.templateNamesService.getTemplateNames(req.user.tenant, req.user.branch);
      return res.status(HttpStatus.OK).json({ message: 'Template names fetched successfully', data: templateNames });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post()
  async createTemplateNames(@Req() req, @Res() res) {
    const requestBody = JSON.parse(JSON.stringify(req.body))
    requestBody['tenant'] = requestBody.tenantId || req.user.tenant
    requestBody['branch'] = requestBody.branchId || req.user.branch
    requestBody['createdBy'] = req.user._id
    try {
      const templateNames = await this.templateNamesService.createTemplateNames(requestBody);
      return res.status(HttpStatus.OK).json({ message: 'Template names created successfully', data: templateNames });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Delete(':id')
  async deleteTemplateNames(@Res() res, @Param('id') id: string) {
    try {
      await this.templateNamesService.deleteTemplateNames(id);
      return res.status(HttpStatus.OK).json({ message: 'Template names deleted successfully' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}