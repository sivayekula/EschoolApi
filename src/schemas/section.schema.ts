import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Section {

  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Class" })
  class: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, required: true, default: 'active' })
  status: string;
}

export const SectionSchema = SchemaFactory.createForClass(Section);