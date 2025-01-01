import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class ClassCategoryService {
  constructor(
    @InjectModel('ClassCategory') private classCategoryModel
  ) {}

  async getClassCategories() {
    try {
      return await this.classCategoryModel.find({ status: 'active' });
    } catch (error) {
      throw error;
    }
  }

  async getClassCategory(id: string) {
    try {
      return await this.classCategoryModel.findById(id);
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
}