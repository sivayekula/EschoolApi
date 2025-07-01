import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Designation } from "./designation.schema";
import { Model } from "mongoose";


@Injectable()
export class DesignationService {
  constructor(
    @InjectModel(Designation.name) private readonly designationModel: Model<Designation>,
  ){}

  async getDesignations(tenantId: string, branchId: string, staffType?: string) {
    let qry = staffType ? {tenant: tenantId, branch: branchId, staffType: staffType, status: 'active' } : {tenant: tenantId, branch: branchId, status: 'active' }
    try {
      return await this.designationModel.find(qry);
    } catch (error) {
      throw error;
    }
  }

  async getDesignation(id: string) {
    try {
      return await this.designationModel.findById({_id: id});
    } catch (error) {
      throw error;
    }
  }

  async createDesignation(designation: any) {
    try {
      return this.designationModel.create(designation);
    } catch (error) {
      throw error;
    }
  }

  async updateDesignation(id: string, designation: any) {
    try {
      return await this.designationModel.findByIdAndUpdate({_id: id}, designation);
    } catch (error) {
      throw error;
    }
  }

  async deleteDesignation(id: string) {
    try {
      return await this.designationModel.findByIdAndUpdate({_id: id}, { status: 'inactive' });
    } catch (error) {
      throw error;
    }
  }

}