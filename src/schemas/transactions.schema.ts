import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

class FeeList {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Fee", index: true })
  fee: mongoose.Schema.Types.ObjectId
  @Prop({ type: Number, required: true })
  amount: number
}
@Schema({ timestamps: true })
export class Transaction {

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false, ref: "TemplateNames" })
  receiptLabel: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, required: true })
  transactionNo: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false, ref: "Student", index: true })
  student: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "AcademicYear", index: true })
  academicYear: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false, ref: "StudentFees", index: true })
  studentFee: mongoose.Schema.Types.ObjectId;

  @Prop({ type: [FeeList], required: false })
  fees: FeeList[];

  @Prop({ type: String, required: true, enum: ['credit', 'debit'], default: 'credit' })
  transactionMode: string;

  @Prop({ type: String, required: false })
  transactionId: string;

  @Prop({ type: String, required: true })
  transactionType: string; // offline or online

  @Prop({ type: String, required: false })
  transactionBank: string;  // bank name if transaction type is online

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: String, required: false })
  proof: string;

  @Prop({ type: String, required: true, default: 'success', enum: ['pending', 'success', 'failed'] })
  transactionStatus: string;

  @Prop({ type: String, required: true, default: 'active' })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  tenant: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  branch: mongoose.Schema.Types.ObjectId
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);