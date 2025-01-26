import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";


class TimeTable {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Subject" })
  subject: mongoose.Schema.Types.ObjectId

  @Prop({type: Date, required: true})
  examDate: Date

  @Prop({type: String, required: true})
  startTime: string

  @Prop({type: String, required: true})
  endTime: string

  @Prop({type: Number, required: true})
  passMark: number

  @Prop({type: Number, required: true})
  totalMark: number

  @Prop({type: String, required: true})
  syllabus: string

}

@Schema({timestamps: true})
export class Exam {
  
  @Prop({ type: String, required: true })
  name: string

  @Prop({ type: String, required: true })
  board: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "ClassCategory" })
  classCategory: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Class" })
  class: mongoose.Schema.Types.ObjectId

  @Prop({type: mongoose.Schema.Types.ObjectId, required: true, ref: "Section"})
  section: mongoose.Schema.Types.ObjectId

  @Prop({ type: Date, required: true })
  startDate: Date

  @Prop({ type: Date, required: true })
  endDate: Date

  @Prop({ type: [TimeTable], required: true })
  timeTable: TimeTable[]

  @Prop({ type: String, required: true, enum: ['pending', 'cancelled', 'completed'], default: 'pending' })
  examStatus: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  createdBy: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  tenant: mongoose.Schema.Types.ObjectId

  @Prop({ type: String, required: true, default: 'active' })
  status: string
}

export const ExamSchema = SchemaFactory.createForClass(Exam);