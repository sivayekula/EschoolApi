import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";


@Schema({ timestamps: true })
export class Stop {

  @Prop({type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Route' })
  route: mongoose.Schema.Types.ObjectId

  @Prop({ type: String, required: true })
  name: string

  @Prop({ type: Number, required: true })
  amount: number

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  tenant: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  branch: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  createdBy: mongoose.Schema.Types.ObjectId
  
  @Prop({ type: String, required: true, default: 'active' })
  status: string
}

export const StopSchema = SchemaFactory.createForClass(Stop);