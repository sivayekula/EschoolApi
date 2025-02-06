import { Prop, Schema } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';


@Schema({ timestamps: true })
export class BreakTime {
  @Prop({ type: String, required: true })
  startTime: string;
  @Prop({ type: String, required: true })
  endTime: string;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  tenant: mongoose.Schema.Types.ObjectId;
  @Prop({ type: String, required: true, default: 'active' })
  status: string;
}