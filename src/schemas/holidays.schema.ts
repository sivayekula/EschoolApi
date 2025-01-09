import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";


@Schema({ timestamps: true })
export class Holidays {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: Date, required: true })
  startDate: Date;
  @Prop({ type: Date, required: true })
  endDate: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  academicYear: mongoose.Schema.Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  tenant: mongoose.Schema.Types.ObjectId;
  @Prop({ type: String, required: false})
  description: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false })
  createdBy: mongoose.Schema.Types.ObjectId;
  @Prop({ type: String, required: true, default: 'active' })
  status: string;
}

export const HolidaysSchema = SchemaFactory.createForClass(Holidays);

