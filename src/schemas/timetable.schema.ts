import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";


@Schema({ timestamps: true })
export class TimeTable {
  @Prop({ type: String, required: true })
  board: string;
  @Prop({ type: String, required: true })
  category: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  class: mongoose.Schema.Types.ObjectId;
  @Prop({ type: String, required: true })
  section: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false })
  teacher: mongoose.Schema.Types.ObjectId;
  @Prop({ type: [String], required: true })
  theorySubjects: string[];
  @Prop({ type: [String] })
  labSubjects: string[];
  @Prop({ type: [String] })
  extraCurricularSubjects: string[];
  @Prop({ type: [], required: true })
  timetables:any
  @Prop({ type: [], required: true })
  syllabus:any
  @Prop({ type: String, required: true, default: 'active' })
  status: string
}

export const TimeTableSchema = SchemaFactory.createForClass(TimeTable);