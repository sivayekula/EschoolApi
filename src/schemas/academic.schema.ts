import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Academic extends mongoose.Document {

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Student' })
  student: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Class' })
  class: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Section' })
  section: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  academicYear: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Tenant' })
  tenant: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, required: true, default: 'active' })
  status: string;

}

export const AcademicSchema = SchemaFactory.createForClass(Academic);
