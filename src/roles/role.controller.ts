import { Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { RoleService } from "./role.service";


@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService
  ) {}

  @Get()
  async getRoles(@Req() req, @Res() res) {
    try {
      const roles = await this.roleService.getRoles(req.user.tenant);
      return res.status(HttpStatus.OK).json({ message: 'Roles fetched successfully', data: roles });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post()
  async createRole(@Req() req, @Res() res) {
    try {
      let requestBody = JSON.parse(JSON.stringify(req.body))
      requestBody['tenant'] = req.user.tenant
      const role = await this.roleService.createRole(requestBody);
      return res.status(HttpStatus.OK).json({ message: 'Role created successfully', data: role });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}