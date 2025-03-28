
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

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
      let qry = { student: studentId, status: 'active' }
      return await this.studentFeesModel.findOne(qry).populate({path: 'feeList.fee', model: 'Fee'});
    } catch (error) {
      throw error;
    }
  }

  async deleteFees(feesId: string) {
    try {
      return await this.studentFeesModel.delete({ _id: feesId });
    } catch (error) {
      throw error;
    }
  }

  async updateFees(feesId: string, fees) {
    try {
      return await this.studentFeesModel.findOneAndUpdate({ _id: feesId }, fees);
    } catch (error) {
      throw error;
    }
  }

  async getAllFees(tenantId: string, branchId: string) {
    try {
      return await this.studentFeesModel.find({ tenant: tenantId, branch: branchId, status: 'active' }).populate('student').populate({
        path: 'academics', // First populate academic year
        populate: {
          path: 'class', // Then populate the classes inside academic year
          model: 'Class',
        },
      }).populate({path: 'feeList.fee', model: 'Fee'});
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