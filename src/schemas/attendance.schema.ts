import { Prop, Schema } from "@nestjs/mongoose";
import * as mongoose from "mongoose";


@Schema({ timestamps: true })
export class Attendance {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  userId: mongoose.Schema.Types.ObjectId

  @Prop({ type: String, required: true, enum: ['student', 'staff'] })
  userType: string

  @Prop({ type: Date, required: true })
  date: Date

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false })
  class: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false })
  section: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  academicYear: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  tenant: mongoose.Schema.Types.ObjectId

  @Prop({ type: String, required: true, enum: ['present', 'absent', 'leave', 'halfday'] })
  attendance: string

  @Prop({ type: String, required: true, default: 'active' })
  status: string
}