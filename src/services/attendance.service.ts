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
      return await this.attendanceModel.updateOne({ userId: studentId, date: date }, { $set: { attendanceStatus: attendanceStatus } });
    } catch (error) {
      throw error;
    }
  }
}