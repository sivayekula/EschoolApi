import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { TemplateNames } from "./templateNames.schema";
import { Model } from "mongoose";


@Injectable()
export class TemplateNamesService {
  constructor(
    @InjectModel(TemplateNames.name) private readonly templateNames: Model<TemplateNames>
  ) { }

  async getTemplateNames(tenantId: string, branchId: string) {
    try {
      tenantId = tenantId !== 'global' ? tenantId : null
      return await this.templateNames.find({ status: 'active', ...(tenantId && {tenant: tenantId}), ...(branchId && {branch: branchId}) }).populate('branch');
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