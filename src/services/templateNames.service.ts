import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class TemplateNamesService {
  constructor(
    @InjectModel('TemplateNames') private readonly templateNames
  ) { }

  async getTemplateNames(tenantId: string) {
    try {
      return await this.templateNames.find({ tenant: tenantId, status: 'active' });
    } catch (error) {
      throw error;
    }
  }

  async createTemplateNames(templateNamesObj) {
    try {
      return await this.templateNames.create(templateNamesObj);
    } catch (error) {
      throw error;
    }
  }

  async updateTemplateNames(id: string, templateNames: any) {
    try {
      return await this.templateNames.findByIdAndUpdate(id, templateNames);
    } catch (error) {
      throw error;
    }
  }

  async deleteTemplateNames(id: string) {
    try {
      return await this.templateNames.findByIdAndUpdate(id, { status: 'inactive' });
    } catch (error) {
      throw error;
    }
  }
}