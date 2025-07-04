import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Subject } from "./subjects.schema";
import { Model } from "mongoose";


@Injectable()
export class SubjectService {
  constructor(
    @InjectModel(Subject.name) private readonly subjectModel: Model<Subject>,
  ) {}

  async createSubject(subject) {
    try {
      return await this.subjectModel.create(subject);
    } catch (error) {
      throw error;
    }
  }

  async getSubjects(tenantId: string, branchId: string) {
    try {
      return await this.subjectModel.find({tenant: tenantId, branch: branchId, status: 'active'});
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