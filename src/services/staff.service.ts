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

  async getStaff(tenantId){
    return this.staffModel.find({ tenant: tenantId, status: 'active' }).populate('subjects');
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

  async getAttendance(tenantId: string) {
    try {
      const result = await this.staffModel.aggregate([
        // {
        //   $match: { tenant: tenantId }, // Replace `classFilter` with the desired class value
        // },
        {
          $lookup: {
            from: 'attendances', // The name of the `attendance` collection
            localField: '_id', // Field in `students` collection
            foreignField: 'userId', // Field in `attendance` collection
            as: 'attendance', // Alias for the joined data
          },
        },
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            profilePic: 1,
            staffType: 1,
            attendance: {
              $map: {
                input: '$attendance', // Process attendance array
                as: 'record',
                in: { date: '$$record.date', attendanceStatus: '$$record.attendanceStatus' },
              },
            },
          },
        },
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  }

}