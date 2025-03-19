import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class AcademicYearService {
  constructor(
    @InjectModel('AcademicYear') private readonly academicYearModel
  ) {}

  async getAcademicYear(id?: string) {
    let qry = id ? { _id: id } : { status: 'active' }
    return await this.academicYearModel.findOne(qry);
  }

  async getAllAcademicYears() {
    try {
      return await this.academicYearModel.find();
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

  async deleteAcademicYear(id: string) {
    try {
      return await this.academicYearModel.findOneAndDelete({ _id: id });
    } catch (error) {
      throw error;
    }
  }
}