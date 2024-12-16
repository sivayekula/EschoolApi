
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
}