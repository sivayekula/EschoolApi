import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';


@Schema({ timestamps: true })
export class StudentFees  extends mongoose.Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  student: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  fees: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  tenant: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, required: true })
  feeInstallment: string;

  @Prop({ type: Date, required: true })
  dueDate: Date;

  @Prop({ type: Date, required: true })
  paidDate: Date;

  @Prop({ type: String, required: true })
  paymentMode: string;

  @Prop({ type: String, required: true })
  paymentId: string;

  @Prop({ type: Number, required: true })
  instalmentAmount: number;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: String, required: true })
  status: string;
}

export const StudentFeesSchema = SchemaFactory.createForClass(StudentFees);