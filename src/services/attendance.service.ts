import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as moment from "moment";


@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel('Attendance') private readonly attendanceModel,
    @InjectModel('Holidays') private readonly holidayModel
  ) {}

  async createAttendance(attendance) {
    try {
      return await this.attendanceModel.insertMany(attendance);
    } catch (error) {
      throw error;
    }
  }

  async getAttendanceByStudentId(studentId: string, month: number, year: number) {
     const startDate = moment(`${year}-${month.toString().padStart(2, '0')}-01`);
  const endDate = startDate.clone().endOf('month');

  // 1. Get attendance
  const attendanceRecords = await this.attendanceModel.aggregate([
    {
      $match: {
        date: { $gte: startDate.toDate(), $lte: endDate.toDate() },
        "attendance.userId": studentId,
        userType: "student"
      }
    },
    {
      $project: {
        date: 1,
        attendance: {
          $filter: {
            input: "$attendance",
            as: "att",
            cond: {
              $eq: ["$$att.userId", studentId]
            }
          }
        }
      }
    },
    { $unwind: "$attendance" },
    {
      $project: {
        date: 1,
        attendanceStatus: "$attendance.attendanceStatus"
      }
    }
  ]);

  // 2. Get holidays spanning the month
  const holidays = await this.holidayModel.find({
    startDate: { $lte: endDate.toDate() },
    endDate: { $gte: startDate.toDate() },
    status: "active"
  }).lean();

  // 3. Expand holidays into a map of date -> title
  const holidayMap: Record<string, string> = {};

  for (const holiday of holidays) {
    const start = moment(holiday.startDate).startOf('day');
    const end = moment(holiday.endDate).startOf('day');

    for (
      let m = start.clone();
      m.isSameOrBefore(end, 'day');
      m.add(1, 'day')
    ) {
      holidayMap[m.format('YYYY-MM-DD')] = holiday.name;
    }
  }

  // 4. Build calendar for the full month
  const calendar = [];
  const today = moment().startOf('day');
  for (
    let m = startDate.clone();
    m.isSameOrBefore(endDate, 'day');
    m.add(1, 'day')
  ) {
    if (m.isAfter(today, 'day')) continue;
    const dateStr = m.format('YYYY-MM-DD');

    const attendance = attendanceRecords.find(a =>
      moment(a.date).format('YYYY-MM-DD') === dateStr
    );

    if (holidayMap[dateStr]) {
      calendar.push({ date: dateStr, status: "holiday", title: holidayMap[dateStr] });
    } else if (attendance) {
      calendar.push({ date: dateStr, status: attendance.attendanceStatus });
    } else {
      if (m.day() === 0) continue; // Skip Sundays
      calendar.push({ date: dateStr, status: "not-marked" });
    }
  }

  return calendar;
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
        classId && classId !== 'undefined' && (qry['class'] = classId);
        sectionId && sectionId !== 'undefined' && (qry['section'] = sectionId)
      } else {
        startDate = moment(`${year}/${month}/01`, 'YYYY/MM/DD')
        endDate = moment(startDate).clone().endOf('month')
        qry['date'] = { $gte: startDate, $lte: endDate }
        classId && classId !== 'undefined' && (qry['class'] = classId);
        sectionId && sectionId !== 'undefined' && (qry['section'] = sectionId)
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