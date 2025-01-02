import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class SectionService {
  constructor(
    @InjectModel('Section') private readonly sectionModel
  ) {}

  async createSection(sectionObj) {
    try {
      return await this.sectionModel.create(sectionObj);
    } catch (error) {
      throw error;
    }
  }

  async getSection(classId: string) {
    try {
      return await this.sectionModel.find({ class: classId, status: 'active' });
    } catch (error) {
      throw error;
    }
  }

  async getSections() {
    try {
      return await this.sectionModel.find();
    } catch (error) {
      throw error;
    }
  }
}