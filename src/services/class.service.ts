import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class ClassService {
  constructor(
    @InjectModel('Class') private readonly classModel
  ) {}

  async getClasses() {
    try {
      return await this.classModel.find();
    } catch (error) {
      throw error;
    }
  }

  async getClass(id: string) {
    try {
      return await this.classModel.findById(id);
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

  
}