import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export class FeeList  extends mongoose.Document{

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Fee", index: true })
  fee: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, required: true })
  duration: string; // installment or one time

  @Prop({ type: Date, required: false })
  dueDate: Date;

  @Prop({ type: Number, required: true, default: 0 })
  discount: number;

  @Prop({ type: Number, required: true })
  paybalAmount: number; // to be paid afeter discount

  @Prop({ type: Number, required: true, default: 0 })
  paidAmount: number;

  @Prop({ type: String, required: true, default: 'pending', enum: ['pending', 'overdue', 'paid'] })
  paymentStatus: string

}

@Schema({ timestamps: true })
export class StudentFees  extends mongoose.Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Student", index: true })
  student: mongoose.Schema.Types.ObjectId;

  @Prop({ type: [FeeList], required: true })
  feeList: FeeList[]

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, index: true })
  tenant: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, required: true, default: 'pending', enum: ['pending', 'overdue', 'paid'] })
  paymentStatus: string

  @Prop({ type: String, required: true, default: 'active' })
  status: string;
}

export const StudentFeesSchema = SchemaFactory.createForClass(StudentFees);