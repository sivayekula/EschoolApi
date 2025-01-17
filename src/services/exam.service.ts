import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class ExamService {
  constructor(
    @InjectModel('Exams') private readonly examModel
  ) {}

  async createExam(exam) {
    try {
      return await this.examModel.create(exam);
    } catch (error) {
      throw error;
    }
  }

  async getExams(tenantId: string) {
    try {
      return await this.examModel.find({tenant: tenantId, status: 'active'}).populate('class').populate('section').populate('classCategory');
    } catch (error) {
      throw error;
    }
  }

  async getExam(name) {
    return await this.examModel.findById({name: name});
  }
}