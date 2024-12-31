import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { arn } from "aws-sdk/clients/finspace";
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