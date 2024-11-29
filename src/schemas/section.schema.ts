import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Class } from './class.schema';

@Schema({ timestamps: true })
export class Section extends Document {

  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "class" })
  class: Class

  @Prop({ type: String, required: true })
  status: string;
}

export const SectionSchema = SchemaFactory.createForClass(Section);