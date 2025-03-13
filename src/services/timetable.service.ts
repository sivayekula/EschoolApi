import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class TimetableService {
  constructor(
    @InjectModel('Timetable') private readonly timetableModel
  ) {}

  async getTimetables(tenantId: string) {
    try {
      return await this.timetableModel.find({ tenant: tenantId, status: 'active' }).populate('class').populate('section').populate('classTeacher').populate('board');
    } catch (error) {
      throw error;
    }
  }

  async getTimetable(id: string) {
    try {
      return await this.timetableModel.findById(id).populate('class').populate('section').populate('classTeacher').populate('board');
    } catch (error) {
      throw error;
    }
  }

  async createTimetable(timetable) {
    try {
      return await this.timetableModel.create(timetable);
    } catch (error) {
      throw error;
    }
  }

  async updateTimetable(id: string, timetable) {
    try {
      return await this.timetableModel.findByIdAndUpdate({_id: id}, timetable);
    } catch (error) {
      throw error;
    }
  }

  async deleteTimetable(id: string) {
    try {
      return await this.timetableModel.findByIdAndUpdate({_id: id}, { status: 'inactive' });
    } catch (error) {
      throw error;
    }
  }
}