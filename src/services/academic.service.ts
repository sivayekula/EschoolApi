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

  async getAcademics(tenantId: string, branchId: string, academicYear: string, classId?: string, sectionId?: string, status?: string): Promise<any> {
    const qry = { tenant: tenantId, branch: branchId, academicYear: academicYear }
    if (classId) {
      qry['class'] = classId;
    }
    if (sectionId) {
      qry['section'] = sectionId;
    }
    if (status) {
      qry['status'] = status === 'inactive' ? { $ne: 'active' } : 'active';
    }
    try {
      return await this.academicModel.find(qry).populate('student').populate('class').populate('section').populate('board');
    } catch (error) {
      throw error;
    }
  }

  async getStudentsByClassAndSection(tenantId: string, branchId: string, classId: string, sectionId: string): Promise<any> {
    try {
      return await this.academicModel.countDocuments({ tenant: tenantId, branch: branchId, class: classId, section: sectionId, status: 'active' });
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

  async updateAcademic(studentId: string, academic: any) {
    try {
      return await this.academicModel.findOneAndUpdate({student: studentId , status: 'active'}, academic, { new: true });
    } catch (error) {
      throw error;
    }
  }

  async getAcademicByStudent(studentId: string, academicYear?: string): Promise<any> {
    const qry = academicYear ? { student: studentId, academicYear: academicYear} : { student: studentId };
    try {
      return await this.academicModel.findOne(qry).populate('class').populate('section').populate('academicYear').populate('student');
    } catch (error) {
      throw error;
    }
  }

  async getAcademicsByStudents(studentIds: string[], academicYear: string) {
    const qry = { student: { $in: studentIds}, academicYear: academicYear };
    try {
      return await this.academicModel.find(qry).populate('class').populate('section').populate('academicYear').populate('student');
    } catch (error) {
      throw error;
    }
  }

  async deleteAcademic(studentId: string) {
    try {
      return await this.academicModel.findOneAndUpdate({ student: studentId, status: 'active' }, { status: 'deleted' });
    } catch (error) {
      throw error;
    }
  }

  async deleteAcademics(studentIds: string[], status?: string) {
    try {
      return await this.academicModel.updateMany({ student: { $in: studentIds}, status: 'active' }, { status:  status ? status : 'inactive' });
    } catch (error) {
      throw error;
    }
  }
}