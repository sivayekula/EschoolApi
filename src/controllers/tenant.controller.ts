import { Body, Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { TenantService } from "src/services/tenant.service";


@Controller('tenant')
export class TenantController {
  constructor(
    private readonly tenantService: TenantService
  ) {}

  @Post('')
  async createTenant(@Req() req, @Res() res, @Body() body) {
    try {
      const tenant = await this.tenantService.createTenant(body);
      return res.status(HttpStatus.CREATED).json({ message: 'Tenant created successfully', data: tenant });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get('')
  async getTenants(@Res() res) {
    try {
      const tenants = await this.tenantService.getTenants();
      return res.status(HttpStatus.OK).json({ message: 'Tenants fetched successfully', data: tenants });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}