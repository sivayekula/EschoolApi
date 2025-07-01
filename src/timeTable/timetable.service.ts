import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { TimeTable } from "./timetable.schema";
import { Model } from "mongoose";


@Injectable()
export class TimetableService {
  constructor(
    @InjectModel(TimeTable.name) private readonly timetableModel: Model<TimeTable>,
  ) {}

  async getTimetables(tenantId: string, branchId: string) {
    try {
      return await this.timetableModel.find({ tenant: tenantId, branch: branchId, status: 'active' }).populate('class').populate('section').populate('classTeacher').populate('board');
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