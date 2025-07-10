import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Holidays } from "./holidays.schema";
import { Model } from "mongoose";
import moment from "moment";


@Injectable()
export class HolidaysService {
  constructor(
    @InjectModel(Holidays.name) private readonly holidayModel: Model<Holidays>
  ) {}

  async getHolidays(tenantId: string, branchId: string, academicYear: string) {
    try {
      return await this.holidayModel.find({ tenant: tenantId, branch: branchId, academicYear: academicYear, status: 'active' });
    } catch (error) {
      throw error;
    }
  }

  async getHoliday(id: string, startDate?:string, endDate?:string, tenantId?:string, branchId?:string) {
    try {
      const startOfDay = moment(startDate).startOf('day');
      const endOfDay = moment(endDate).endOf('day');
      let qry = id ? { _id: id } : { startDate : { $gte: startOfDay}, endDate : { $lte: endOfDay }, tenant: tenantId, branch: branchId, status: 'active' };
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