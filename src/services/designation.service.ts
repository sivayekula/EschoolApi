import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class DesignationService {
  constructor(
    @InjectModel('Designation') private readonly designationModel
  ){}

  async getDesignations(staffType?: string) {
    let qry = staffType ? { staffType: staffType, status: 'active' } : { status: 'active' }
    try {
      return await this.designationModel.find(qry);
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