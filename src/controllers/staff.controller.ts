import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateStaffDto } from "src/dto/staff.dto";
import { IStaff } from "src/interfaces/staff.interface";
import { StaffService } from "src/services/staff.service";

@Controller('staff')
export class StaffController {

  constructor(
    private readonly staffService: StaffService
  ){}

  @Post('')
  async saveStaff(@Body() staff: CreateStaffDto): Promise<IStaff> {
    return this.staffService.saveStaff(staff);
  }

  @Get('')
  async getStaff(): Promise<IStaff[]> {
    return this.staffService.getStaff();
  }

}