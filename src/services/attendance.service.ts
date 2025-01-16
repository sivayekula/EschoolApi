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

  async updateAttendances(studentId: string, date: string, attendanceStatus: string) {
    try {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0); // Start of the day (00:00:00.000)
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      return await this.attendanceModel.updateOne({ userId: studentId, date: { $gte: startOfDay, $lte: endOfDay } }, { $set: { attendanceStatus: attendanceStatus } });
    } catch (error) {
      throw error;
    }
  }
}