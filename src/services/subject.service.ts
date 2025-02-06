import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class SubjectService {
  constructor(
    @InjectModel('Subject') private readonly subjectModel
  ) {}

  async createSubject(subject) {
    try {
      return await this.subjectModel.create(subject);
    } catch (error) {
      throw error;
    }
  }

  async getSubjects() {
    try {
      return await this.subjectModel.find({status: 'active'});
    } catch (error) {
      throw error;
    }
  }

  async updateSubject(id, subject) {
    try {
      return await this.subjectModel.findByIdAndUpdate({_id: id}, subject);
    } catch (error) {
      throw error;
    }
  }

  async deleteSubject(id) {
    try {
      return await this.subjectModel.findByIdAndUpdate({_id: id}, { status: 'inactive' });
    } catch (error) {
      throw error;
    }
  }
}