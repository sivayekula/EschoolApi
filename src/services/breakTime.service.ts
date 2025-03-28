import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class BreakTimeService {
  constructor(
    @InjectModel('BreakTime') private readonly breakTimeModel
  ) {}

  async createBreakTime(breakTime) {
    try {
      return await this.breakTimeModel.create(breakTime);
    } catch (error) {
      throw error;
    }
  }

  async getBreakTimes(tenantId: string, branchId: string) {
    try {
      return await this.breakTimeModel.find({ tenant: tenantId, branch: branchId, status: 'active' });
    } catch (error) {
      throw error;
    }
  }

  async getBreakTime(id: string) {
    try {
      return await this.breakTimeModel.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async updateBreakTime(id: string, breakTime) {
    try {
      return await this.breakTimeModel.findByIdAndUpdate(id, breakTime);
    } catch (error) {
      throw error;
    }
  }

  async deleteBreakTime(id: string) {
    try {
      return await this.breakTimeModel.findByIdAndUpdate(id, { status: 'inactive' });
    } catch (error) {
      throw error;
    }
  }
}