import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Acadamic extends mongoose.Document {

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  student: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  class: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, required: true })
  section: string;

  @Prop({ type: String, required: true })
  acadamicYear: string;

  @Prop({ type: String, required: true, default: 'active' })
  status: string;

}

export const AcadamicSchema = SchemaFactory.createForClass(Acadamic);
