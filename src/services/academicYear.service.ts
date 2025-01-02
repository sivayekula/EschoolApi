import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class AcademicYearService {
  constructor(
    @InjectModel('AcademicYear') private readonly academicYearModel
  ) {}

  async getAcademicYear() {
    return await this.academicYearModel.findOne({ status: 'active' });
  }

  async createAcademicYear(academicYear) {
    return await this.academicYearModel.create(academicYear);
  }
}