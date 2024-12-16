import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class SubjectService {
  constructor(
    @InjectModel('Subject') private readonly subjectModel
  ) {}

  async createSubject(subject) {
    return await this.subjectModel.create(subject);
  }

  async getSubjects() {
    return await this.subjectModel.find();
  }
}