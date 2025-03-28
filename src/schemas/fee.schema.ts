import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Fee {

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false, ref: "Class" })
  class: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "AcademicYear" })
  academicYear: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "FeeGroup" })
  feeGroup: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Boolean, required: true, default: false })
  isGlobal: boolean;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: String, required: true, default: 'active' })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  tenant: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  branch: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  createdBy: mongoose.Schema.Types.ObjectId
}

export const FeeSchema = SchemaFactory.createForClass(Fee)