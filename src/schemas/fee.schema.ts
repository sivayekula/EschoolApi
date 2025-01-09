import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Fee {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false, ref: "Class" })
  class: mongoose.Schema.Types.ObjectId;
  @Prop({ type: String, required: true })
  academicYear: string;
  @Prop({ type: String, required: true })
  feeGroup: string;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: Number, required: true })
  amount: number;
  @Prop({ type: String, required: true, default: 'active' })
  status: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  tenant: mongoose.Schema.Types.ObjectId
}

export const FeeSchema = SchemaFactory.createForClass(Fee)