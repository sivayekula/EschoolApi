import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";


@Schema({ timestamps: true })
export class TimeTable {
  @Prop({ type: String, required: true })
  board: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'ClassCategory' })
  category: mongoose.Schema.Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Class' })
  class: mongoose.Schema.Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Section' })
  section: mongoose.Schema.Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Staff' })
  classTeacher: mongoose.Schema.Types.ObjectId;
  @Prop({ type: Array, required: true })
  theorySubjects: any;
  @Prop({ type: Array, required: false })
  labSubjects: any;
  @Prop({ type: Array, required: false })
  extraCurricularSubjects: any;
  @Prop({ type: [], required: true })
  timetables:any
  @Prop({ type: [], required: true })
  syllabus:any
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  tenant: mongoose.Schema.Types.ObjectId
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  createdBy: mongoose.Schema.Types.ObjectId
  @Prop({ type: String, required: true, default: 'active' })
  status: string
}

export const TimeTableSchema = SchemaFactory.createForClass(TimeTable);