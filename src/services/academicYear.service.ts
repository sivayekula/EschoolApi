import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class AcademicYearService {
  constructor(
    @InjectModel('AcademicYear') private readonly academicYearModel
  ) {}

  async getAcademicYear(tenantId: string, id?: string) {
    let qry = id ? { _id: id } : {tenant: tenantId, status: 'active' }
    return await this.academicYearModel.findOne(qry);
  }

  async getAllAcademicYears(tenantId?: string) {
    try {
      return await this.academicYearModel.find({tenant: tenantId});
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

  async updateAcademicYear(id: string, tenantId: string) {
    try {
      await this.academicYearModel.findOneAndUpdate({ tenant: tenantId, status: 'active' }, { $set: { status: 'inactive' }} );
      return await this.academicYearModel.findOneAndUpdate({ _id: id, tenant: tenantId }, { $set: { status: 'active' }} );
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