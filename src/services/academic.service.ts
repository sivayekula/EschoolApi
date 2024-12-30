import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class AcademicService {
  constructor(
    @InjectModel('Academics') private readonly academicModel
  ) {}

  async createAcademic(academic): Promise<any> {
    return await this.academicModel.create(academic);
  }

  async getAcademics(tenantId: string): Promise<any> {
    try {
      return await this.academicModel.find({ tenant: tenantId, status: 'active' }).populate('class');
    } catch (error) {
      throw error;
    }
  }

  async getAcademicByStudent(studentId: string): Promise<any> {
    try {
      return await this.academicModel.findone({ student: studentId, status: 'active' }).populate('class');
    } catch (error) {
      throw error;
    }
  }
}