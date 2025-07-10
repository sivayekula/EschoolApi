import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({timestamps: true})
export class Tenant extends mongoose.Document {

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, unique: true, required: true })
  mobileNumber: string;

  @Prop({ type: String, required: true, unique: true })
  organizationCode: string

  @Prop({ type: String, required: false })
  metaInfo: String;

  @Prop({ type: String, required: true, default: "active" })
  status: String

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" })
  createdBy: mongoose.Schema.Types.ObjectId
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);