import { Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { RoleService } from "src/services/role.service";


@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService
  ) {}

  @Get('')
  async getRoles(@Res() res) {
    try {
      const roles = await this.roleService.getRoles();
      return res.status(HttpStatus.OK).json({ message: 'Roles fetched successfully', data: roles });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post('')
  async createRole(@Req() req, @Res() res) {
    try {
      const role = await this.roleService.createRole(req.body);
      return res.status(HttpStatus.OK).json({ message: 'Role created successfully', data: role });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}