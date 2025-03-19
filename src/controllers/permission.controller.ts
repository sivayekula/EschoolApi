import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res } from "@nestjs/common";
import { PermissionService } from "src/services/permission.service";


@Controller('permissions')
export class PermissionController {
  constructor(
    private readonly permissionService: PermissionService
  ) {}

  @Get()
    async getPermission(@Req() req, @Res() res) {
    try {
      let tenant = req.query.tenant || req.user.tenant
      let role = req.query.role
      let designation = req.query.designation
      const permission = await this.permissionService.getPermission(tenant, role, designation);
      return res.status(HttpStatus.OK).json({ message: 'Permission fetched successfully', data: permission });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post()
  async createPermission(@Req() req, @Res() res, @Body() body) {
    try {
      const requestBody = JSON.parse(JSON.stringify(body))
      requestBody['designation'] = requestBody.designation || null
      requestBody['tenant'] = requestBody.tenant || req.user.tenant
      const permission = await this.permissionService.createPermission(requestBody);
      return res.status(HttpStatus.OK).json({ message: 'Permission created successfully', data: permission });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}