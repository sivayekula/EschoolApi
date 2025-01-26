
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { model } from 'mongoose';
import path from 'path';

@Injectable()
export class StudentFeesService {
  constructor(
    @InjectModel('StudentFees') private readonly studentFeesModel
  ) {}

   async createFees(studentFees) {
    try {
      return await this.studentFeesModel.create(studentFees);
    } catch (error) {
      throw error;
    }
  }

  async getFeesByStudent(studentId: string) {
    try {
      return await this.studentFeesModel.findOne({ student: studentId, status: 'active', paymentStatus: 'pending' }).populate({path: 'feeList.fee', model: 'Fee'});
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
      return await this.studentFeesModel.find({ tenant: tenantId, status: 'active' }).populate('student').populate({path: 'feeList.fee', model: 'Fee'});
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