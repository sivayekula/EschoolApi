import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class AcademicService {
  constructor(
    @InjectModel('Academics') private readonly academicModel
  ) {}

  async createAcademic(academic: any){
    try {
      return await this.academicModel.create(academic);
    } catch (error) {
      throw error;
    }
  }

  async getAcademics(tenantId: string, branchId: string, academicYear: string, classId?: string, sectionId?: string): Promise<any> {
    const qry = tenantId ? { tenant: tenantId, branch: branchId, academicYear: academicYear, status: 'active' } : {};
    if (classId) {
      qry['class'] = classId;
    }
    if (sectionId) {
      qry['section'] = sectionId;
    }
    try {
      return await this.academicModel.find(qry).populate('student').populate('class').populate('section').populate('board');
    } catch (error) {
      throw error;
    }
  }

  async getStudentsByClassAndSection(tenantId: string, classId: string, sectionId: string): Promise<any> {
    try {
      return await this.academicModel.countDocuments({ tenant: tenantId, class: classId, section: sectionId, status: 'active' });
    } catch (error) {
      throw error;
    }
  }

  async getStudentsCount(tenantId: string, branchId: string, academicYear: string) {
    try {
      return await this.academicModel.countDocuments({ tenant: tenantId, branch: branchId, academicYear: academicYear, status: 'active' });
    } catch (error) {
      throw error;
    }
  }

  async updateAcademic(studentId: string, academic): Promise<any> {
    try {
      return await this.academicModel.findOneAndUpdate({ student: studentId, status: 'active' }, academic);
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

  async promoteStudents(tenantId: string, branchId: string, academicYear: string, body: {studentIds: string[], classId: string, sectionId: string}) {
    try {
      let acadamics = await this.academicModel.find({ student: { $in: body.studentIds }, academicYear: academicYear, status: 'active' });
      // return await this.academicModel.updateMany({ student: { $in: studentIds }, status: 'active' }, { class: classId, section: sectionId });
    } catch (error) {
      throw error;
    }
  }
}