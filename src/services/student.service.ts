import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IStudent } from '../interfaces/student.interface';

@Injectable()
export class StudentService {
  constructor(@InjectModel('Student') private studentModel: Model<IStudent>) {}

  async createStudent(createStudentDto): Promise<IStudent> {
    try {
      let student = await this.studentModel.create(createStudentDto);
      return student;
    } catch (error) {
      throw error;
    }
  }

  async getStudentsByAadhar(tenant: string, branch: string, aadhar: string[]) {
    let students= await this.studentModel.find({
      tenant: tenant,
      branch: branch,
      aadhar: { $in: aadhar }
    })
    return students
  }

  async createStudentBulk(createStudentDto) {
    try {
      let students = await this.studentModel.insertMany(createStudentDto);
      return students;
    } catch (error) {
      throw error;
    }
  }

  async updateStudent(id: string, updateStudentDto) {
    try {
      let student = await this.studentModel.findByIdAndUpdate(id, updateStudentDto, { new: true });
      return student;
    } catch (error) {
      throw error;
    }
  }

  async updateStudentBulk(ids: string[], updatedData) {
    try {
      return await this.studentModel.updateMany({ _id: { $in: ids } }, updatedData);
    } catch (error) {
      throw error;
    }
  }

  async deleteStudent(id: string) {
    try {
      let student = await this.studentModel.findByIdAndUpdate({_id: id}, { status: 'deleted' });
      return student;
    } catch (error) {
      throw error;
    }
  }

  async getStudent(tenantId: string, branchId: string): Promise<IStudent[]> {
    try {
      return await this.studentModel.find({
        tenant: tenantId,
        branch: branchId,
        status: 'active',
      });
    } catch (error) {
      throw error;
    }
  }

  async getStudentById(id: string): Promise<IStudent> {
    try {
      return await this.studentModel.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async getStudentDetails(id: string): Promise<any> {
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
  async getStudentList(studentIds: string[]): Promise<any> {
    try {
      return await this.studentModel.find({ _id: { $in: studentIds }, status: 'active' }).populate('branch');
    } catch (error) {
      throw error;
    }
  }

  async changePassword(id: string, password: string) {
    try {
      return await this.studentModel.findOneAndUpdate({ _id: id }, { $set: { password } });
    } catch(error){
      throw error
    }
  }
}
