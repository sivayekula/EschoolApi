
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StudentFees } from './studentFees.schema';
import { Model } from 'mongoose';

@Injectable()
export class StudentFeesService {
  constructor(
    @InjectModel(StudentFees.name) private readonly studentFeesModel: Model<StudentFees>,
  ) {}

   async createFees(studentFees) {
    try {
      return await this.studentFeesModel.create(studentFees);
    } catch (error) {
      throw error;
    }
  }

  async getFeesByStudent(studentId: string, academicYear?: string) {
    try {
      let qry = { student: studentId, academicYear: academicYear};
      return await this.studentFeesModel.findOne(qry).populate({path: 'feeList.fee', model: 'Fee'});
    } catch (error) {
      throw error;
    }
  }

  async getFeeByStudent(studentId: string, academicYear: string) {
    try {
      let qry = { student: studentId, academicYear: academicYear};
      return await this.studentFeesModel.findOne(qry);
    } catch (error) {
      throw error;
    }
  }

  async deleteFees(feesId: string) {
    try {
      return await this.studentFeesModel.deleteOne({ _id: feesId });
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

  async getAllFees(tenantId: string, branchId: string, academicYear: string) {
    try {
      return await this.studentFeesModel.find({ tenant: tenantId, branch: branchId, academicYear: academicYear, status: 'active' }).populate('student').populate({
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

  async getFeesByStudentAndAcademic(studentIds: string[], academicYear: string) {
    try {
      return await this.studentFeesModel.find({ student:{ $in: studentIds}, academicYear: academicYear});
    } catch (error) {
      throw error;
    }
  }

}