import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";


@Schema({ timestamps: true })
export class Loans {

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Staff" })
  staff: mongoose.Schema.Types.ObjectId
 
  @Prop({ type: Number, required: true })
  loanAmount: number;

  @Prop({ type: Number, required: true, default: 0 })
  paidAmount: number;

  @Prop({ type: Date, required: true })
  issuedDate: Date;

  @Prop({type: String, required: true})
  transactionMode: string; // online or offline

  @Prop({type: String, required: false})
  bankAccount: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, required: true, ref: "Transaction"})
  transaction: mongoose.Schema.Types.ObjectId;

  @Prop({type: [mongoose.Schema.Types.ObjectId], required: false, ref: "Transaction"})
  repayTransactions: mongoose.Schema.Types.ObjectId[]

  @Prop({ type: String, required: true, default: 'active' })
  status: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  tenant: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  academicYear: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  branch: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false })
  createdBy: mongoose.Schema.Types.ObjectId

}

export const LoanSchema = SchemaFactory.createForClass(Loans)