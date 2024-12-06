import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Fee {
  @Prop({ type: String, required: true })
  academicYear: string;
  @Prop({ type: String, required: true })
  feeGroup: string;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true })
  feeApilacable: string;
  @Prop({ type: String, required: true })
  feeInstallment: string;
  @Prop({ type: [Date], required: true })
  dueDates: Date[];
  @Prop({ type: Number, required: true })
  amount: number;
  @Prop({ type: Number, required: true })
  disCount: number; // single payment discount
  @Prop({ type: String, required: true })
  status: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  tenant: mongoose.Schema.Types.ObjectId
}

export const FeeSchema = SchemaFactory.createForClass(Fee)