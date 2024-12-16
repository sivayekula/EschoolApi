import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class ExamService {
  constructor(
    @InjectModel('Exams') private readonly examModel
  ) {}

  async createExam(exam) {
    return await this.examModel.create(exam);
  }

  async getExams() {
    return await this.examModel.find();
  }

  async getExam(name) {
    return await this.examModel.findById({name: name});
  }
}