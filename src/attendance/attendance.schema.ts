import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import moment from "moment";
import * as mongoose from "mongoose";

class attendance {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  userId: mongoose.Schema.Types.ObjectId

  @Prop({ type: String, required: true, enum: ['present', 'absent', 'leave', 'halfday'] })
  attendanceStatus: string
}

@Schema({ timestamps: true })
export class Attendance {
  
  @Prop({ type: String, required: true, enum: ['student', 'staff'] })
  userType: string

  @Prop({ type: Date, required: true })
  date: Date

  @Prop({ type: [attendance], required: true })
  attendance: attendance[]

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false })
  class: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false })
  section: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false })
  academicYear: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  tenant: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  branch: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  createdBy: mongoose.Schema.Types.ObjectId

  @Prop({ type: String, required: true, default: 'active' })
  status: string
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);