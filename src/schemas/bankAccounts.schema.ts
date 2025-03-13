import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";


@Schema({ timestamps: true })
export class BankAccounts {
  @Prop({type: String, required: true})
  bankName: string;

  @Prop({type: String, required: true})
  accountNumber: string;

  @Prop({type: String, required: true})
  accountType: string;

  @Prop({type: String, required: true})
  ifscCode: string;

  @Prop({type: Number, required: false})
  balance: number;

  @Prop({type: mongoose.Schema.Types.ObjectId, required: true})
  tenant: mongoose.Schema.Types.ObjectId;

  @Prop({type: mongoose.Schema.Types.ObjectId, required: false})
  createdBy: mongoose.Schema.Types.ObjectId;

  @Prop({type: String, required: true, default: 'active'})
  status: string;
}

export const BankAccountsSchema = SchemaFactory.createForClass(BankAccounts);