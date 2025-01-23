import { Body, Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { CreateStaffDto } from "src/dto/staff.dto";
import { IStaff } from "src/interfaces/staff.interface";
import { StaffService } from "src/services/staff.service";

@Controller('staff')
export class StaffController {

  constructor(
    private readonly staffService: StaffService
  ){}

  @Post('')
  async saveStaff(@Req() req, @Res() res, @Body() body: CreateStaffDto): Promise<IStaff> {
    try {
      const requestBody = JSON.parse(JSON.stringify(body))
      requestBody['password'] = body.firstName.replace(/\s+/g, '').slice(0, 4) + new Date(body.DOB).getFullYear();
      requestBody['tenant'] = req.user.tenant
      requestBody['createdBy'] = req.user._id
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

  @Get('attendance')
  async getAttendance(@Req() req, @Res() res) {
    try {
      const attendance = await this.staffService.getAttendance(req.user.tenant);
      return res.status(HttpStatus.OK).json({ message: 'Attendance fetched successfully', data: attendance });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get('')
  async getStaff(@Req() req, @Res() res): Promise<IStaff[]> {
    try {
      const staff = await this.staffService.getStaff(req.user.tenant);
      return res.status(HttpStatus.OK).json({ message: 'Staff fetched successfully', data: staff });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

}