import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateStaffDto } from "src/dto/staff.dto";
import { IStaff } from "src/interfaces/staff.interface";

@Injectable()
export class StaffService {
  constructor(
    @InjectModel('Staff') private staffModel: Model<IStaff>
  ){}

  async getStaff(): Promise<IStaff[]> {
    return this.staffModel.find().exec();
  }

  async saveStaff(staff: CreateStaffDto): Promise<IStaff> {
    return this.staffModel.create(staff);
  }

}