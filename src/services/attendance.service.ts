import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as moment from "moment";


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

  async getAttendance(tenantId: string, branchId: string, academicYear: string, date?: string, userType?: string, month?: string, year?: string, classId?: string, sectionId?: string) {
    try {
      let startDate;
      let endDate;
      let qry = { tenant: tenantId, branch: branchId, academicYear: academicYear, userType: userType, status: 'active' }
      if (date) {
        startDate = moment(date).startOf('day')
        endDate = moment(date).endOf('day')
        qry['date'] = { $gte: startDate, $lte: endDate }
        if (classId) {
          qry['class'] = classId;
        }
        if (sectionId) {
          qry['section'] = sectionId;
        }
      } else {
        startDate = moment(`${year}/${month}/01`, 'YYYY/MM/DD')
        endDate = moment(startDate).clone().endOf('month')
        qry['date'] = { $gte: startDate, $lte: endDate }
        if (classId) {
          qry['class'] = classId;
        }
        if (sectionId) {
          qry['section'] = sectionId;
        }
      }
      return await this.attendanceModel.find(qry).populate({path: 'attendance.userId', model: userType === 'student' ? 'Student' : 'Staff'});
    } catch (error) {
      throw error;
    }
  }

  async updateAttendances(id: string, userId: string, attendanceStatus: string) {
    try {
      const res = await this.attendanceModel.findOne({ _id: id});
      if (!res)  throw new Error('Attendance not found');
      let attendanceRes = JSON.parse(JSON.stringify(res));
      let userIndex = attendanceRes.attendance.findIndex((element: any) => element.userId.toString() === userId)
      if (userIndex === -1) throw new Error('User not found');
      attendanceRes.attendance[userIndex].attendanceStatus = attendanceStatus;
      return await this.attendanceModel.findOneAndUpdate({ _id: id}, { $set: { attendance: attendanceRes.attendance } });
    } catch (error) {
      throw error;
    }
  }
}