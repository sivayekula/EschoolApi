import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateStaffDto } from "../dto/staff.dto";
import { IStaff } from "../interfaces/staff.interface";

@Injectable()
export class StaffService {
  constructor(
    @InjectModel('Staff') private staffModel: Model<IStaff>
  ){}

  async getStaff(tenantId: string, branchId: string) {
    return this.staffModel.find({ tenant: tenantId, branch: branchId, status: 'active' }).populate('subjects').populate('designation');
  }

  async getStaffById(id: string){
    try{
      return this.staffModel.findById(id).populate('subjects');
    } catch (error) {
      throw error;
    }
  }

  async updateStaff(id: string, staff){
    try{
      return this.staffModel.findByIdAndUpdate({_id: id}, staff);
    } catch (error) {
      throw error;
    }
  }

  async deleteStaff(id: string) {
    try{
      return this.staffModel.findByIdAndUpdate({_id: id}, { status: 'inactive' });
    } catch (error) {
      throw error;
    }
  }

  async saveStaff(staff: CreateStaffDto) {
    try {
      return this.staffModel.create(staff);
    } catch (error) {
      throw error;
    }
  }

  async saveStaffBulk(staff: CreateStaffDto[]) {
    try {
      return this.staffModel.insertMany(staff);
    } catch (error) {
      throw error;
    }
  }

  async getStaffCount(tenantId: string, branchId: string) {
    try {
      return this.staffModel.countDocuments({ tenant: tenantId, branch: branchId, status: 'active' });
    } catch (error) {
      throw error;
    }
  }

}