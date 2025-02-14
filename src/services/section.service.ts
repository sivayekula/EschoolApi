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

  async getSections(tenantId?: string) {
    try {
      return await this.sectionModel.find({tenant: tenantId,  status: 'active' });
    } catch (error) {
      throw error;
    }
  }

  async updateSection(id: string, section: any) {
    try {
      return await this.sectionModel.findByIdAndUpdate(id, section);
    } catch (error) {
      throw error;
    }
  }

  async deleteSection(id: string) {
    try {
      return await this.sectionModel.findByIdAndUpdate(id, { status: 'inactive' });
    } catch (error) {
      throw error;
    }
  }

  async deleteSections(classId: string) {
    try {
      return await this.sectionModel.updateMany({ class: classId, status: 'active' }, { status: 'inactive' });
    } catch (error) {
      throw error;
    }
  }
}