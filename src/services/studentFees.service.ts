
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StudentFeesService {
  constructor(
    @InjectModel('StudentFees') private readonly studentFeesModel
  ) {}

   async createFees(studentFees) {
    return await this.studentFeesModel.insertMany(studentFees);
  }

  async getFeesByStudent(studentId: string) {
    try {
      return await this.studentFeesModel.find({ student: studentId, status: 'active', paymentStatus: 'pending' });
    } catch (error) {
      throw error;
    }
  }

  async deleteFees(feesIds: string) {
    try {
      return await this.studentFeesModel.deleteMany({ _id: { $in: feesIds } });
    } catch (error) {
      throw error;
    }
  }

  async getAllFees(tenantId: string) {
    try {
      return await this.studentFeesModel.find({ tenant: tenantId, status: 'active' }).populate('student').populate('fees');
    } catch (error) {
      throw error;
    }
  }

  async collectFees(feesId: string) {
    try {
      return await this.studentFeesModel.findById(feesId);
    } catch (error) {
      throw error;
    }
  }

}