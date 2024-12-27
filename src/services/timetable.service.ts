import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class TimetableService {
  constructor(
    @InjectModel('Timetable') private readonly timetableModel
  ) {}

  async getTimetables(tenantId: string) {
    try {
      return await this.timetableModel.find({ tenant: tenantId, status: 'active' }).populate('class');
    } catch (error) {
      throw error;
    }
  }

  async createTimetable(timetable) {
    return await this.timetableModel.create(timetable);
  }
}