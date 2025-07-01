import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './student.schema';

@Injectable()
export class StudentService {
  constructor(@InjectModel(Student.name) private studentModel: Model<Student>) {}

  createStudent(createStudentDto) {
    return this.studentModel.create(createStudentDto);
  }

  getStudentsByAadhar(tenant: string, branch: string, aadhar: string[]) {
    return this.studentModel.find({ tenant, branch, aadharNumber: { $in: aadhar } });
  }

  createStudentBulk(createStudentDto) {
    return this.studentModel.insertMany(createStudentDto);
  }

  updateStudent(id: string, updateStudentDto) {
    return this.studentModel.findByIdAndUpdate(id, updateStudentDto, { new: true });
  }
  updateStudentBulk(ids: string[], updatedData) {
    return this.studentModel.updateMany({ _id: { $in: ids } }, updatedData);
  }

  deleteStudent(id: string) {
    return this.studentModel.findByIdAndUpdate({_id: id}, { status: 'deleted' });
  }

  login(admissionNumber: string, branch: string): Promise<any> {
    return this.studentModel.findOne({ admissionNumber, branch, status: 'active' }).populate('branch').populate('role').lean();    
  }

  getStudent(tenant: string, branch: string) {
    return this.studentModel.find({ tenant, branch, status: 'active' });
  }

  async getStudentById(id: string) {
    try {
      return await this.studentModel.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async getStudentDetails(id: string) {
    try {
      const student = await this.studentModel.findOne({
        _id: id,
        status: 'active',
      });
      return student;
    } catch (error) {
      throw error;
    }
  }

  async getStudentCount(tenantId: string, branchId: string, academicYear: string) {
    try {
      return await this.studentModel.countDocuments({ tenant: tenantId, status: 'active' });
    } catch (error) {
      throw error;
    }
  }
  async getStudentList(studentIds: string[]){
    try {
      return await this.studentModel.find({ _id: { $in: studentIds }, status: 'active' }).populate('branch');
    } catch (error) {
      throw error;
    }
  }

  changePassword(id: string, password: string) {
    return this.studentModel.findOneAndUpdate({ _id: id }, { $set: { password } });
  }
}
