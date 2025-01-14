import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel('Attendance') private readonly attendanceModel
  ) {}

  async createAttendance(attendance) {
    try {
      return await this.attendanceModel.insertMany(attendance);
    } catch (error) {
      throw error;
    }
  }

  async getAttendances(type: string, tenantId: string, academicYear: string) {
    try {
      const qry = {
        tenant: tenantId,
        userType: type
      }
      if (academicYear) {
        qry['academicYear'] = academicYear;
      }
      return await this.attendanceModel.find(qry).populate('userId');
    } catch (error) {
      throw error;
    }
  }
}