import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateStaffDto } from "../dto/staff.dto";
@Injectable()
export class StaffService {
  constructor(
    @InjectModel('Staff') private staffModel
  ){}

  async getStaff(tenantId: string, branchId: string) {
    try {
      return await this.staffModel.find({ tenant: tenantId, branch: branchId, status: 'active' }).populate('subjects').populate('designation');
    } catch(error) {
      throw error
    }
  }

  async getStaffById(id: string){
    try{
      return await this.staffModel.findById(id).populate('subjects');
    } catch (error) {
      throw error;
    }
  }

  async updateStaff(id: string, staff){
    try{
      return await this.staffModel.findByIdAndUpdate({_id: id}, staff);
    } catch (error) {
      throw error;
    }
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
      return await this.staffModel.updateOne({ _id: id }, { $set: { password } });
    } catch(error) {
      throw error
    }
  }

}