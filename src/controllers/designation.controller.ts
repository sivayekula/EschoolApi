import { Controller, Delete, Get, HttpStatus, Post, Put, Req, Res } from "@nestjs/common";
import { DesignationService } from "src/services/designation.service";


@Controller('designation')
export class DesignationController {
  constructor(
    private readonly designationService: DesignationService
  ) {}
  
  @Get()
  async getDesignations(@Req() req, @Res() res) {
    try {
      let designations = await this.designationService.getDesignations(req.user.tenant, req.query.staffType)
      return res.status(HttpStatus.OK).json({ message: 'Designations fetched successfully', data: designations });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Get('/:id')
  async getDesignation(@Req() req, @Res() res) {
    try {
      let designation = await this.designationService.getDesignation(req.params.id)
      return res.status(HttpStatus.OK).json({ message: 'Designation fetched successfully', data: designation });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Post()
  async createDesignation(@Req() req, @Res() res) {
    try {
      let requestBody = JSON.parse(JSON.stringify(req.body))
      requestBody['tenant'] = req.user.tenant
      let designation = await this.designationService.createDesignation(requestBody)
      return res.status(HttpStatus.OK).json({ message: 'Designation created successfully', data: designation });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Put(':id')
  async updateDesignation(@Req() req, @Res() res) {
    try {
      let designation = await this.designationService.updateDesignation(req.params.id, req.body)
      return res.status(HttpStatus.OK).json({ message: 'Designation updated successfully', data: designation });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Delete(':id')
  async deleteDesignation(@Req() req, @Res() res) {
    try {
      let designation = await this.designationService.deleteDesignation(req.params.id)
      return res.status(HttpStatus.OK).json({ message: 'Designation deleted successfully', data: designation });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }
}