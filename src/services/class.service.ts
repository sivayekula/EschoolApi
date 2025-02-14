import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class ClassService {
  constructor(
    @InjectModel('Class') private readonly classModel
  ) {}

  async getClasses(tenantId: string) {
    try {
      return await this.classModel.find({tenant: tenantId, status: 'active'});
    } catch (error) {
      throw error;
    }
  }

  async getClass(id: string) {
    try {
      return await this.classModel.findOne({_id: id, status: 'active'});
    } catch (error) {
      throw error;
    }
  }

  async createClass(classObj) {
    try {
      return await this.classModel.create(classObj);
    } catch (error) {
      throw error;
    }
  }

  async updateClass(id: string, classObj) {
    try {
      return await this.classModel.findByIdAndUpdate(id, classObj);
    } catch (error) {
      throw error;
    }
  }

  async deleteClass(id: string) {
    try {
      return await this.classModel.findByIdAndUpdate(id, { status: 'inactive' });
    } catch (error) {
      throw error;
    }
  }
  
}