import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class HolidaysService {
  constructor(
    @InjectModel('Holidays') private readonly holidayModel
  ) {}

  async getHolidays(tenantId: string) {
    try {
      return await this.holidayModel.find({ tenant: tenantId, status: 'active' });
    } catch (error) {
      throw error;
    }
  }

  async createHoliday(holidayObj) {
    try {
      return await this.holidayModel.create(holidayObj);
    } catch (error) {
      throw error;
    }
  }

}