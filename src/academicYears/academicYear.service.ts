import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class AcademicYearService {
  constructor(
    @InjectModel('AcademicYear') private readonly academicYearModel
  ) {}

  async getAcademicYear(tenantId: string, branchId: string, id?: string) {
    try {
      let qry = id ? { _id: id } : {tenant: tenantId, branch: branchId, status: 'active' }
      return await this.academicYearModel.findOne(qry);
    } catch (error) {
      throw error;
    }
  }

  async getAllAcademicYears(tenantId: string, branchId: string) {
    try {
      return await this.academicYearModel.find({tenant: tenantId, branch: branchId});
    } catch (error) {
      throw error;
    }
  }

  async createAcademicYear(academicYear) {
    try {
      return await this.academicYearModel.create(academicYear);
    } catch (error) {
      throw error;
    }
  }

  async updateAcademicYear(id: string, tenantId: string, branchId: string) {
    try {
      await this.academicYearModel.findOneAndUpdate({ tenant: tenantId, branch: branchId, status: 'active' }, { $set: { status: 'completed' }} );
      return await this.academicYearModel.findOneAndUpdate({ _id: id, tenant: tenantId, branch: branchId }, { $set: { status: 'active' }} );
    } catch (error) {
      throw error;
    }
  }

  async deleteAcademicYear(id: string) {
    try {
      return await this.academicYearModel.findOneAndDelete({ _id: id });
    } catch (error) {
      throw error;
    }
  }
}