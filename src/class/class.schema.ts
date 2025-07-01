import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Class extends mongoose.Document {

  @Prop({ type: String, required: true})
  name: string;

  @Prop({ type: String, required: true, default: 'active' })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  tenant: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  branch: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  createdBy: mongoose.Schema.Types.ObjectId;
  
}

export const ClassSchema = SchemaFactory.createForClass(Class);

ClassSchema.index(
  { name: 1, tenant: 1, branch: 1 },
  { unique: true }
);