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

  async getAcademics(tenantId: string, classId?: string, sectionId?: string): Promise<any> {
    const qry = tenantId ? { tenant: tenantId, status: 'active' } : {};
    if (classId) {
      qry['class'] = classId;
    }
    if (sectionId) {
      qry['section'] = sectionId;
    }
    try {
      return await this.academicModel.find(qry).populate('student').populate('class').populate('section');
    } catch (error) {
      throw error;
    }
  }

  async updateAcademic(studentId: string, academic): Promise<any> {
    try {
      return await this.academicModel.findOneAndUpdate({ student: studentId, status: 'active' }, academic, { new: true });
    } catch (error) {
      throw error;
    }
  }

  async getAcademicByStudent(studentId: string, academicYear?: string): Promise<any> {
    const qry = academicYear ? { student: studentId, academicYear: academicYear, status: 'active' } : { student: studentId, status: 'active' };
    try {
      return await this.academicModel.findOne(qry).populate('class').populate('section').populate('academicYear').populate('student');
    } catch (error) {
      throw error;
    }
  }

  async deleteAcademic(studentId: string) {
    try {
      return await this.academicModel.findOneAndUpdate({ student: studentId, status: 'active' }, { status: 'inactive' });
    } catch (error) {
      throw error;
    }
  }
}