import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res } from "@nestjs/common";
import { PermissionService } from "src/services/permission.service";


@Controller('permissions')
export class PermissionController {
  constructor(
    private readonly permissionService: PermissionService
  ) {}

  @Get('/:id/:tenant?')
    async getPermission(@Req() req, @Res() res, @Param('id') id: string) {
    try {
      const permission = await this.permissionService.getPermission(id, req.params.tenant || req.user.tenant);
      return res.status(HttpStatus.OK).json({ message: 'Permission fetched successfully', data: permission });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post('')
  async createPermission(@Req() req, @Res() res, @Body() body) {
    try {
      const requestBody = JSON.parse(JSON.stringify(body))
      requestBody['tenant'] = requestBody.tenant || req.user.tenant
      const permission = await this.permissionService.createPermission(requestBody);
      return res.status(HttpStatus.OK).json({ message: 'Permission created successfully', data: permission });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}