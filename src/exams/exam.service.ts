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

  async getExams(tenantId: string, branchId: string) {
    try {
      return await this.examModel.find({tenant: tenantId, branch: branchId, status: 'active'}).populate('class').populate('section').populate('board');
    } catch (error) {
      throw error;
    }
  }

  async getExam(name) {
    return await this.examModel.findById({name: name});
  }

  async updateExam(id, exam) {
    try {
      return await this.examModel.findByIdAndUpdate({_id: id}, exam);
    } catch (error) {
      throw error;
    }
  }

  async deleteExam(id) {
    try {
      return await this.examModel.findByIdAndUpdate({_id: id}, { status: 'inactive' });
    } catch (error) {
      throw error;
    }
  } 
}