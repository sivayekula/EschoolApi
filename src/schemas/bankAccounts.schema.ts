import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";


@Schema({ timestamps: true })
export class BankAccounts {
  @Prop({type: String, required: true, enum: ['online', 'offline'], default: 'online'})
  mode: string;
  
  @Prop({type: String, required: true})
  name: string;

  @Prop({type: String, required: true})
  accountNumber: string;

  @Prop({type: String, required: false})
  accountType: string;

  @Prop({type: String, required: false})
  ifscCode: string;

  @Prop({type: Number, required: false, default: 0})
  currentBalance: number;

  @Prop({type: mongoose.Schema.Types.ObjectId, required: true})
  tenant: mongoose.Schema.Types.ObjectId;

  @Prop({type: mongoose.Schema.Types.ObjectId, required: true})
  branch: mongoose.Schema.Types.ObjectId;

  @Prop({type: mongoose.Schema.Types.ObjectId, required: true})
  createdBy: mongoose.Schema.Types.ObjectId;

  @Prop({type: String, required: true, default: 'active'})
  status: string;
}

export const BankAccountsSchema = SchemaFactory.createForClass(BankAccounts);