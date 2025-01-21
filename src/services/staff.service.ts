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

  async getStaff(tenantId): Promise<IStaff[]> {
    return this.staffModel.find({ tenant: tenantId, status: 'active' }).populate('subjects');
  }

  async saveStaff(staff: CreateStaffDto): Promise<IStaff> {
    return this.staffModel.create(staff);
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