import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { first, last } from 'rxjs';
import { IStudent } from 'src/interfaces/student.interface';

@Injectable()
export class StudentService {
  constructor(@InjectModel('Student') private studentModel: Model<IStudent>) {}

  async createStudent(createStudentDto): Promise<IStudent> {
    try {
      let student = await this.studentModel.create(createStudentDto);
      return student;
    } catch (error) {
      throw error;
    }
  }

  async getStudent(tenantId): Promise<IStudent[]> {
    try {
      return await this.studentModel.find({
        tenant: tenantId,
        status: 'active',
      });
    } catch (error) {
      throw error;
    }
  }

  async getStudentById(id: string): Promise<IStudent> {
    try {
      return await this.studentModel.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async getStudentDetails(id: string): Promise<any> {
    try {
      const student = await this.studentModel.findOne({
        _id: id,
        status: 'active',
      });
      return student;
    } catch (error) {
      throw error;
    }
  }

  async getAttendance(tenantId: string) {
    try {
      const result = await this.studentModel.aggregate([
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
