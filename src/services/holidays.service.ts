import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class HolidaysService {
  constructor(
    @InjectModel('Holidays') private readonly holidayModel
  ) {}

  async getHolidays(tenantId: string, branchId: string, academicYear: string) {
    try {
      return await this.holidayModel.find({ tenant: tenantId, branch: branchId, academicYear: academicYear, status: 'active' });
    } catch (error) {
      throw error;
    }
  }

  async getHoliday(id: string, startDate?:string, endDate?:string) {
    try {
      const startOfDay = new Date(startDate);
      startOfDay.setHours(0, 0, 0, 0); // Start of the day (00:00:00.000)
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      let qry = id ? { _id: id } : { startDate : { $gte: startOfDay}, endDate : { $lte: endOfDay } };
      return await this.holidayModel.findOne(qry);
    } catch (error) {
      throw error;
    }
  }

  async updateHoliday(id: string, holidayObj) {
    try {
      return await this.holidayModel.findByIdAndUpdate({ _id: id}, holidayObj);
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

  async deleteHoliday(id: string) {
    try {
      return await this.holidayModel.findByIdAndUpdate({ _id: id}, { status: 'inactive' });
    } catch (error) {
      throw error;
    }
  }

}