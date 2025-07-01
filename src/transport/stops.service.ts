import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class StopsService {
  constructor(@InjectModel('Stop') private readonly stopModel) {}

  async create(stop: any) {
    try {
      return await this.stopModel.create(stop);
    } catch (error) {
      throw error;
    }
  }

  async findAll(tenantId: string, branchId: string, academicYear: string) {
      
    try {
      return await this.stopModel.find({tenant: tenantId, branch: branchId, academicYear: academicYear, status: 'active'}).populate('route');
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      return await this.stopModel.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, stop: any) {
    try {
      return await this.stopModel.findByIdAndUpdate(id, stop);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      return await this.stopModel.findByIdAndUpdate(id, { status: 'inactive' });
    } catch (error) {
      throw error;
    }
  }
}