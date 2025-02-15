import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class ClassCategoryService {
  constructor(
    @InjectModel('ClassCategory') private classCategoryModel
  ) {}

  async getClassCategories(tenantId?: string) {
    try {
      let qry = tenantId ? {tenant: tenantId, status: 'active'} : {status: 'active'}
      return await this.classCategoryModel.find(qry);
    } catch (error) {
      throw error;
    }
  }

  async getClassCategory(id: string) {
    try {
      return await this.classCategoryModel.findOne({_id: id, status: 'active'});
    } catch (error) {
      throw error;
    }
  }

  async createClassCategory(classCategoryObj) {
    try {
      return await this.classCategoryModel.create(classCategoryObj);
    } catch (error) {
      throw error;
    }
  }

  async updateClassCategory(id: string, classCategory: any) {
    try {
      return await this.classCategoryModel.findByIdAndUpdate(id, classCategory);
    } catch (error) {
      throw error;
    }
  }

  async deleteClassCategory(id: string) {
    try {
      return await this.classCategoryModel.findByIdAndUpdate(id, { status: 'inactive' });
    } catch (error) {
      throw error;
    }
  }
}