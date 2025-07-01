import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";


@Schema({ timestamps: true })
export class Notification {
  @Prop({ type: String, required: true })
  title: string
  @Prop({ type: String, required: true })
  body: string
  @Prop({ type: [String], required: true })
  participant: string[];
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Tenant" })
  tenant: mongoose.Schema.Types.ObjectId
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Branch" })
  branch: mongoose.Schema.Types.ObjectId
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  createdBy: mongoose.Schema.Types.ObjectId
  @Prop({ type: String, required: true, default: 'active' })
  status: string
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);