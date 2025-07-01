import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateStaffDto } from "../staff/staff.dto";
import { Staff } from "./staff.schema";
import { Model } from "mongoose";
@Injectable()
export class StaffService {
  constructor(
    @InjectModel(Staff.name) private staffModel: Model<Staff>
  ){}

  getStaff(tenantId: string, branchId: string) {
    return this.staffModel.find({ tenant: tenantId, branch: branchId, status: 'active' }).populate('subjects').populate('designation');
  }

  getStaffById(id: string){
    return this.staffModel.findById(id).populate('subjects');
  }

  login(userId: string): Promise<any> {
    return this.staffModel.findOne({$or: [{ email : userId }, { mobileNumber: userId }] }).populate('role').populate('branch').lean();
  }

  updateStaff(id: string, staff){
    return this.staffModel.findByIdAndUpdate({_id: id}, staff);
  }

  async deleteStaff(id: string) {
    try{
      return await this.staffModel.findByIdAndUpdate({_id: id}, { status: 'inactive' });
    } catch (error) {
      throw error;
    }
  }

  async saveStaff(staff: CreateStaffDto) {
    try {
      return await this.staffModel.create(staff);
    } catch (error) {
      throw error;
    }
  }

  async saveStaffBulk(staff: CreateStaffDto[]) {
    try {
      return await this.staffModel.insertMany(staff);
    } catch (error) {
      throw error;
    }
  }

  async getStaffCount(tenantId: string, branchId: string) {
    try {
      return await this.staffModel.countDocuments({ tenant: tenantId, branch: branchId, status: 'active' });
    } catch (error) {
      throw error;
    }
  }

  async changePassword(id: string, password: string) {
    try{
      return await this.staffModel.findOneAndUpdate({ _id: id }, { $set: { password } });
    } catch(error) {
      throw error
    }
  }

}