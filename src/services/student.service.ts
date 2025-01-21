import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async createStudentBulk(createStudentDto) {
    try {
      let students = await this.studentModel.insertMany(createStudentDto);
      return students;
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
          $lookup: {
            from: 'academics', // The name of the `class` collection
            localField: '_id', // Field in `students` collection
            foreignField: 'student', // Field in `class` collection
            as: 'academics', // Alias for the joined data
          }
        },
        {
          $unwind: {
            path: '$academics',
            preserveNullAndEmptyArrays: true, // In case some students don't have academic data
          },
        },
        {
          $lookup: {
            from: 'classes', // The name of the `classes` collection
            localField: 'academics.class', // Field in `academics` collection
            foreignField: '_id', // Field in `classes` collection
            as: 'classDetails', // Alias for the joined data
          },
        },
        {
          $lookup: {
            from: 'sections', // The name of the `sections` collection
            localField: 'academics.section', // Field in `academics` collection
            foreignField: '_id', // Field in `sections` collection
            as: 'sectionDetails', // Alias for the joined data
          },
        },
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            profilePic: 1,
            academics: {
              classId: '$academics.classId',
              sectionId: '$academics.sectionId',
              classDetails: { $arrayElemAt: ['$classDetails', 0] }, // Include class details
              sectionDetails: { $arrayElemAt: ['$sectionDetails', 0] }, // Include section details
            },
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
