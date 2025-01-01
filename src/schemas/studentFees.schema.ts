import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';


@Schema({ timestamps: true })
export class StudentFees  extends mongoose.Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Student", index: true })
  student: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  fees: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, index: true })
  tenant: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, required: true })
  feeInstallment: string;

  @Prop({ type: Date, required: true })
  dueDate: Date;

  @Prop({ type: Date, required: false })
  paidDate: Date;

  @Prop({ type: String, required: false })
  paymentMode: string;

  @Prop({ type: String, required: false })
  paymentId: string;

  @Prop({ type: Number, required: true })
  instalmentAmount: number;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: String, required: true, default: 'pending' })
  paymentStatus: string;

  @Prop({ type: String, required: true, default: 'active' })
  status: string;
}

export const StudentFeesSchema = SchemaFactory.createForClass(StudentFees);