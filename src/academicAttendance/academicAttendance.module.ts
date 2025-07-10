import { Prop, Schema } from "@nestjs/mongoose";
import * as mongoose from "mongoose";


@Schema({ timestamps: true })
export class AcademicAttendance {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'AcademicYear' })
  academicYear: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Class' })
  class: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Section' })
  section: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Tenant' })
  tenant: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Branch' })
  branch: mongoose.Schema.Types.ObjectId

  @Prop({ type: Date, required: true})
  startDate: Date

  @Prop({ type: Date, required: true})
  endDate: Date

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  createdBy: mongoose.Schema.Types.ObjectId
}