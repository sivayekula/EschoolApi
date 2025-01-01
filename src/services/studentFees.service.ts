
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
      return await this.studentFeesModel.find({ student: studentId, status: 'active' });
    } catch (error) {
      throw error;
    }
  }

}