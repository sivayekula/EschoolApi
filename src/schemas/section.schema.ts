import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Section {

  @Prop({ type: String, required: true })
  section: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Class" })
  class: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  tenant: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, required: true, default: 'active' })
  status: string;
}

export const SectionSchema = SchemaFactory.createForClass(Section);

SectionSchema.index(
  { section: 1, tenant: 1 },
  { unique: true, partialFilterExpression: { status: "active" } }
);