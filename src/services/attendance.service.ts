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

  async getAttendance(tenantId: string, date?: string, userType?: string, month?: string, year?: string, classId?: string, sectionId?: string) {
    try {
      let startDate;
      let endDate;
      let qry = { tenant: tenantId, userType: userType, status: 'active' }
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

  async updateAttendances(id: string, userId: string, date: string, attendanceStatus: string) {
    try {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0); // Start of the day (00:00:00.000)
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      const attendanceRes = await this.attendanceModel.findOne({ _id: id, date: { $gte: startOfDay, $lte: endOfDay } });
      if (!attendanceRes)  throw new Error('Attendance not found');
      let userIndex = attendanceRes.attendance.findIndex((element: any) => element.userId.toString() === userId)
      if (userIndex === -1) throw new Error('User not found');
      let data = attendanceRes.attendance[userIndex].attendanceStatus = attendanceStatus;
      return await this.attendanceModel.findOneAndUpdate({ _id: id, date: { $gte: startOfDay, $lte: endOfDay } }, { $set: { attendance: data } });
    } catch (error) {
      throw error;
    }
  }
}