import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { ImageDto } from "src/dto/image.dto";


@Schema({ timestamps: true })
export class Loan {
  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Staff" })
  staff: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Designation" })
  designation: mongoose.Schema.Types.ObjectId

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: Date, required: true })
  issuedDate: Date;

  @Prop({type: String, required: true})
  issueType: string; // cash or cheque

  @Prop({type: String, required: false})
  bankAccount: string;

  @Prop({type: String, required: false})
  transactionId: string;

  @Prop({ type: ImageDto, required: false })
  proof: ImageDto

  @Prop({ type: String, required: true, default: 'active' })
  status: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  tenant: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  branch: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false })
  createdBy: mongoose.Schema.Types.ObjectId

}

export const LoanSchema = SchemaFactory.createForClass(Loan)