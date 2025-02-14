import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class DesignationService {
  constructor(
    @InjectModel('Designation') private readonly designationModel
  ){}

  async getDesignations(tenantId: string, staffType?: string) {
    let qry = staffType ? {tenant: tenantId, staffType: staffType, status: 'active' } : {tenant: tenantId, status: 'active' }
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