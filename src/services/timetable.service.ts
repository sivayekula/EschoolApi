import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class TimetableService {
  constructor(
    @InjectModel('Timetable') private readonly timetableModel
  ) {}

  async getTimetables() {
    return await this.timetableModel.find();
  }

  async createTimetable(timetable) {
    return await this.timetableModel.create(timetable);
  }
}