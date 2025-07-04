import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from "@nestjs/common";
import { CreateStaffDto } from "../staff/staff.dto";
import { RoleService } from "../roles/role.service";
import { StaffService } from "./staff.service";

@Controller('staff')
export class StaffController {

  constructor(
    private readonly staffService: StaffService,
    private readonly roleService: RoleService
  ){}

  @Post()
  async saveStaff(@Req() req, @Res() res, @Body() body: CreateStaffDto) {
    try {
      const getRoleData = await this.roleService.getRole('staff');
      const requestBody = JSON.parse(JSON.stringify(body))
      requestBody['role'] = getRoleData._id;
      requestBody['password'] = body.firstName.replace(/\s+/g, '').slice(0, 4).toLowerCase() + new Date(body.DOB).getFullYear();
      requestBody['tenant'] = req.user.tenant;
      requestBody['branch'] = req.user.branch;
      requestBody['createdBy'] = req.user._id;
      const staff = await this.staffService.saveStaff(requestBody);
      res.status(HttpStatus.CREATED).json({ message: 'Staff created successfully', data: staff });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post('bulk')
  async saveStaffBulk(@Req() req, @Res() res, @Body() body: CreateStaffDto[]) {
    try {
      const requestBody = JSON.parse(JSON.stringify(body))
      requestBody.forEach((staff) => {
        staff['password'] = staff.firstName.replace(/\s+/g, '').slice(0, 4) + new Date(staff.DOB).getFullYear();
        staff['tenant'] = req.user.tenant
        staff['createdBy'] = req.user._id
      })
      const staff = await this.staffService.saveStaff(requestBody);
      res.status(HttpStatus.CREATED).json({ message: 'Staff created successfully', data: staff });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get()
  async getStaff(@Req() req, @Res() res) {
    try {
      const staff = await this.staffService.getStaff(req.user.tenant, req.user.branch);
      return res.status(HttpStatus.OK).json({ message: 'Staff fetched successfully', data: staff });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get(':id')
  async getStaffById(@Res() res, @Param('id') id: string) {
    try {
      const staff = await this.staffService.getStaffById(id);
      return res.status(HttpStatus.OK).json({ message: 'Staff fetched successfully', data: staff });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Put(':id')
  async update(@Req() req, @Res() res, @Param('id') id: string) {
    try {
      const staff = await this.staffService.updateStaff(id, req.body);
      return res.status(HttpStatus.OK).json({ message: 'Staff updated successfully', data: staff });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Delete(':id')
  async delete(@Res() res, @Param('id') id: string) {
    try {
      await this.staffService.deleteStaff(id);
      return res.status(HttpStatus.OK).json({ message: 'Staff deleted successfully' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

}